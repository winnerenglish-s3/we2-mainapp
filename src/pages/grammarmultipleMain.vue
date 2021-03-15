<template>
  <q-page class="bg-grammarmultiple">
    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div>
      <app-bar
        :isHasInstruction="isHasInstruction"
        :isHasHelp="isHasHelp"
        :instructionData="instructionData"
        :isLoadPractice="isLoadPractice"
        :isShowHome="false"
        :isShowPause="isSynchronize ? false : true"
        @callback-showdialoghelp="funcShowDialogHelp"
        @callback-restart="reStart"
      ></app-bar>
    </div>

    <grammar-multiple-pc
      :practiceData="practiceData"
      class="box-container-main"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-showdialoghelp="funcShowDialogHelp"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></grammar-multiple-pc>

    <grammar-multiple-mobile
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-showdialoghelp="funcShowDialogHelp"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></grammar-multiple-mobile>

    <!-- Help Grammar Video -->
    <q-dialog maximized v-model="isDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="box-dialog-lesson absolute-center">
            <div class="text-amber" style="border: 1px solid #2d3081" align="center">
              <q-tabs
                v-model="tabHelp"
                no-caps
                outside-arrows
                mobile-arrows
                class="text-amber shadow-0"
              >
                <q-tab name="content" class="f16" label="เนื้อหา" />
                <q-tab
                  name="extra"
                  v-if="$q.platform.is.mobile"
                  class="f16"
                  label="คำศัพท์เสริม"
                />
              </q-tabs>
            </div>

            <div class="bg-white">
              <q-tab-panels v-model="tabHelp" animated class="no-padding">
                <q-tab-panel name="content" class="no-padding">
                  <div class="box-content-lesson">
                    <div
                      :style="$q.platform.is.desktop ? '' : 'overflow: hidden'"
                      v-for="(item, index) in showLessonVideo"
                    >
                      <div>
                        <q-img
                          fit="contain"
                          :style="
                            $q.platform.is.desktop
                              ? 'width: 100%'
                              : 'width: 200%;left:-2px;'
                          "
                          :src="item.imageUrl"
                        ></q-img>
                      </div>
                      <div class="q-my-sm">
                        <q-img
                          class="relative-position"
                          fit="contain"
                          style="width: 200%; left: -100%"
                          v-if="$q.platform.is.mobile"
                          :src="item.imageUrl"
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="extra" class="no-padding">
                  <div class="box-content-lesson q-pt-sm">
                    <div v-for="(item, index) in practiceData.extraVocab">
                      <div class="q-px-md q-py-xs">
                        {{ item.vocab }}
                        <br />
                        {{ item.meaning }}
                      </div>
                      <hr />
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
              <div class="col-12">
                <q-img
                  @click="isDialogHelp = false"
                  fit="contain"
                  class="cursor-pointer"
                  :src="
                    require($q.platform.is.desktop
                      ? '../../public/images/close-popup-btn-pc.png'
                      : '../../public/images/close-help-btn-mobile.png')
                  "
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <finish-practice-dialog
      :isFinishPractice="isFinishPractice"
      @reStart="reStart"
    ></finish-practice-dialog>
  </q-page>
</template>

<script>
import grammarMultiplePc from "../components/grammar/grammarMultiplePc";
import grammarMultipleMobile from "../components/grammar/grammarMultipleMobile";
import finishPracticeDialog from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
import lessonHooks from "../hooks/lessonHooks.js";
export default {
  components: {
    grammarMultiplePc,
    grammarMultipleMobile,
    finishPracticeDialog,
    appBar,
  },
  props: {
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: [],
  setup(props, { emit }) {
    // ------------------------ Initial Data Route
    const route = useRoute();
    const router = useRouter();

    // ------------------------ Initial Practice Data
    const tabHelp = ref("content");
    const isHasHelp = ref(true);
    const isHasInstruction = ref(true);
    const instructionData = reactive({
      th: "เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมลงในช่องว่าง",
      eng: "Choose the best answer to fill in the blank.",
    });

    const questionList = ref([]);
    const practiceData = reactive({
      currentQuestion: 0,
      totalQuestion: 0,
      totalStar: 0,
      question: "",
      choices: [],
      correctAnswer: 0,
      description: "",
      extraVocab: [],
      refs: [],
    });

    const isDialogHelp = ref(false);
    const selectedLesson = ref(1);
    const lessonList = ref([]);
    const showLessonVideo = ref([]);
    const refContent = ref([]);
    const isFinishPractice = ref(false);
    const isLoadPractice = ref(false);

    // ------------------------ Function Load Practice
    const funcLoadPractice = async () => {
      console.clear();
      try {
        // Set Level and Unit and Skill
        let level = 0;
        let unit = 0;

        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        level = getData.data().level;
        unit = getData.data().unit;

        try {
          let getLesson = await lessonHooks.lesson().grammar(level, unit);

          lessonList.value = getLesson;
        } catch (error) {
          console.log(`${error} : Get Hooks Grammar lesson`);
        }

        // Get Practice Data
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        // Question List : Set Question
        let setQuestion = response.data;
        setQuestion = [...setQuestion];

        setQuestion.sort(() => Math.random() - 0.5);

        setQuestion = setQuestion.slice(0, practiceData.totalQuestion);

        questionList.value = setQuestion;

        // Function : เลือกแบบฝึกหัด แล้วส่งค่า true ไปบอกว่านี้คือการโหลดครั้งแรก
        funcSelectedQuestion(true);

        // Load Practice Success
        isLoadPractice.value = true;
      } catch (error) {
        // Keep Error Log
        console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectedQuestion = (firstTime) => {
      // Check : เช็คข้อมูลถ้าไม่ใช่ครั้งแรกที่โหลดข้อมูลนี้ จะเป็น false
      firstTime = firstTime || false;

      // First check : ถ้าเช็คโหลดครั้งแรกแล้วไม่เป็นความจริง จะทำการ เพิ่มค่าในการเลือกแบบฝึกหัดต่อไป
      if (!firstTime) {
        // เพิ่มค่าเลือกแบบฝึกหัดต่อไป หรือ เลือกข้อต่อไปนั้นเอง
        practiceData.currentQuestion++;
      }

      let helpExtra = [...questionList.value];
      let tempExtra = [];

      helpExtra.forEach((res) => {
        tempExtra.push(...res.extraVocab);
      });

      // Practice Data : Show Ref
      practiceData.refs = questionList.value[practiceData.currentQuestion].refs;

      // Practice Data : Show Extra Vocab
      practiceData.extraVocab = tempExtra;

      // Practice Data : Show Question
      practiceData.question = questionList.value[practiceData.currentQuestion].question;

      // Practice Data : Show Choices
      practiceData.choices = questionList.value[practiceData.currentQuestion].choices;
      practiceData.choices.sort(() => Math.random() - 0.5);

      // Practice Data : Choice Number Correct Answer
      practiceData.correctAnswer =
        questionList.value[practiceData.currentQuestion].correctAnswer;

      // Practice Data : Show Description
      practiceData.description =
        questionList.value[practiceData.currentQuestion].description ||
        "ยังไม่ได้ใส่คำอธิบาย";

      // Grammar Lesson Video
      refContent.value = [];
      showLessonVideo.value = lessonList.value;
    };

    const funcShowDialogHelp = (valRefs) => {
      isDialogHelp.value = true;

      refContent.value = valRefs || [];
      let tempArr = [];

      if (refContent.value.length) {
        refContent.value.forEach((res) => {
          let findLess = lessonList.value.filter((x) => x.id == res.id);

          tempArr.push(...findLess);
        });

        showLessonVideo.value = tempArr;
      } else {
        showLessonVideo.value = lessonList.value;
      }

      selectedLesson.value = showLessonVideo.value[0].value;
    };

    const reStart = () => {
      isFinishPractice.value = false;
      isLoadPractice.value = false;

      practiceData.totalQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.question = [];
      practiceData.choices = [];
      practiceData.currentQuestion = 0;

      funcLoadPractice();
    };

    // Mounted Function First time
    onMounted(() => {
      funcLoadPractice();
    });

    return {
      tabHelp,
      isLoadPractice,
      isHasHelp,
      isHasInstruction,
      instructionData,
      isDialogHelp,
      lessonList,
      selectedLesson,
      questionList,
      practiceData,
      funcSelectedQuestion,
      showLessonVideo,
      funcShowDialogHelp,
      isFinishPractice,
      reStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-grammarmultiple {
  background-image: url("../../public/images/grammar/bg-grammarmultiple.png");
  background-size: cover;
  background-position: center;
}

.box-dialog-lesson {
  max-width: 800px;
  width: 90%;
  background-color: #2d3081;
  border-radius: 15px;
  overflow: hidden;
}

.box-lesson-list {
  background-color: #fff0da;
  height: 450px;
  overflow-x: auto;
}

/* width */
.box-lesson-list::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-lesson-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-lesson-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-lesson-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-active:active {
  transition: 0.2s;
  transform: scale(0.95);
}

.btn-selected {
  background-color: #48dbfc;
}

.box-content-lesson {
  height: calc(100vh - 150px);
  overflow-x: auto;
}

/* width */
.box-content-lesson::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-content-lesson::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-lesson::-webkit-scrollbar-thumb {
  background: #e20418;
}

/* Handle on hover */
.box-content-lesson::-webkit-scrollbar-thumb:hover {
  background: #d30315;
}
</style>
