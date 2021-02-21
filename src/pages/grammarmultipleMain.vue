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
        @callback-showdialoghelp="isShowDialogLesson = true"
      ></app-bar>
    </div>

    <grammar-multiple-pc
      :practiceData="practiceData"
      class="box-container-main"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectPraticeData"
      @callback-showdialoghelp="funcRefContent"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></grammar-multiple-pc>
    <grammar-multiple-mobile
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectPraticeData"
      @callback-showdialoghelp="funcRefContent"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></grammar-multiple-mobile>

    <!-- Help Grammar Video -->
    <q-dialog maximized v-model="isShowDialogLesson" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="box-dialog-lesson absolute-center">
            <div class="row text-amber" align="center">
              <div class="col-1 self-center" style="width: 70px"></div>
              <div class="col self-center f18">วิดีโอ</div>
              <div class="col-1 self-center q-pa-sm" style="width: 70px" align="right">
                <q-btn v-close-popup dense round flat>
                  <q-icon name="fas fa-times"></q-icon>
                </q-btn>
              </div>
            </div>

            <div class="bg-white row">
              <div
                class="col-2 box-lesson-list"
                style="width: 250px"
                v-if="$q.platform.is.desktop"
              >
                <div class="q-pa-sm" v-for="(item, index) in showLessonVideo">
                  <div
                    v-ripple
                    class="btn-active relative-position shadow-2 q-pa-md rounded-borders cursor-pointer"
                    :class="selectedLesson == item.value ? 'btn-selected' : 'bg-white'"
                    @click="selectedLesson = item.value"
                  >
                    <div align="left">
                      {{ item.label }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col row q-pa-sm">
                <div class="col-12 q-mt-xs q-mb-md" v-if="$q.platform.is.mobile">
                  <q-select
                    dense
                    outlined
                    filled
                    emit-value
                    map-options
                    :options="showLessonVideo"
                    v-model="selectedLesson"
                  ></q-select>
                </div>
                <div class="col-12 self-start">
                  <iframe
                    id="myVideo"
                    width="100%"
                    height="315"
                    :src="showLessonVideo.filter((x) => x.value == selectedLesson)[0].vdo"
                    frameborder="0"
                    allow="accelerometer; autoplay; "
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="col-12 row q-mb-md q-mt-sm">
                  <div class="self-center col-2 q-pa-sm" style="width: 70px">
                    <q-btn
                      @click="selectedLesson == 1 ? null : (selectedLesson -= 1)"
                      :size="$q.platform.is.desktop ? '16px' : '12px'"
                      push
                      round
                      class="bg-amber text-white"
                    >
                      <q-icon
                        :size="$q.platform.is.desktop ? '50px' : '30px'"
                        name="fas fa-caret-left"
                        class=""
                        style="margin-left: -5px"
                      ></q-icon>
                    </q-btn>
                  </div>
                  <div class="col self-center q-pt-sm" align="center">
                    <q-img
                      @click="playVideo()"
                      class="btn-active cursor-pointer"
                      width="200px"
                      style="max-width: 200px; width: 100%"
                      src="../../public/images/btn-play-video.png"
                    ></q-img>
                  </div>
                  <div
                    class="self-center col-2 q-pa-sm"
                    style="max-width: 70px; width: 100%"
                    align="right"
                  >
                    <q-btn
                      @click="
                        selectedLesson == showLessonVideo.length
                          ? null
                          : (selectedLesson += 1)
                      "
                      :size="$q.platform.is.desktop ? '16px' : '12px'"
                      push
                      round
                      class="bg-amber text-white"
                    >
                      <q-icon
                        :size="$q.platform.is.desktop ? '50px' : '30px'"
                        name="fas fa-caret-right"
                        style="margin-right: -5px"
                      ></q-icon>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="col-12" v-if="$q.platform.is.mobile">
                <q-img
                  @click="isShowDialogLesson = false"
                  fit="contain"
                  src="../../public/images/close-help-btn-mobile.png"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import grammarMultiplePc from "../components/grammar/grammarMultiplePc";
import grammarMultipleMobile from "../components/grammar/grammarMultipleMobile";
import appBar from "../components/app-bar";
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
import lessonHooks from "../hooks/lessonHooks.js";
export default {
  components: {
    grammarMultiplePc,
    grammarMultipleMobile,
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  emits: [],
  setup(props, { emit }) {
    // ------------------------ Initial Data Route
    const route = useRoute();
    const router = useRouter();

    // ------------------------ Initial Practice Data
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
    });

    const isShowDialogLesson = ref(false);
    const selectedLesson = ref(1);
    const lessonList = ref([
      {
        vdo: "https://youtube.com/embed/TsUKSnRGfm4",
        label: "#Content 1",
        ref: "1",
        value: 1,
      },
      {
        vdo: "https://youtube.com/embed/vLzsow_ZxDU",
        label: "#Content 2",
        ref: "2",
        value: 2,
      },
      {
        vdo: "https://youtube.com/embed/E0IfcXBxyic",
        label: "#Content 3",
        ref: "3",
        value: 3,
      },
      {
        vdo: "https://youtube.com/embed/iF8Vv7YgjLQ",
        label: "#Content 4",
        ref: "4",
        value: 4,
      },
      {
        vdo: "https://youtube.com/embed/3aCctY3DGac",
        label: "#Content 5",
        ref: "3",
        value: 5,
      },
      {
        vdo: "https://youtube.com/embed/Hi6cxx_tdMU",
        label: "#Content 6",
        ref: "4",
        value: 6,
      },
    ]);
    const showLessonVideo = ref([]);
    const refContent = ref(null);

    const isLoadPractice = ref(false);

    // ------------------------ Function Load Practice
    const funcLoadPractice = async () => {
      console.clear();
      try {
        // Set Level and Unit and Skill
        let level = 0;
        let unit = 0;
        let skill = "";

        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // console.log(getData.data());

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        level = getData.data().level;
        unit = getData.data().unit;
        skill = getData.data().skill;

        try {
          let getLesson = await lessonHooks.lesson().grammar(level, unit);
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
        questionList.value = response.data;
        questionList.value.sort(() => Math.random() - 0.5);

        // Function : เลือกแบบฝึกหัด แล้วส่งค่า true ไปบอกว่านี้คือการโหลดครั้งแรก
        funcSelectPraticeData(true);

        // Load Practice Success
        isLoadPractice.value = true;
      } catch (error) {
        // Keep Error Log
        console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectPraticeData = (firstTime) => {
      // Check : เช็คข้อมูลถ้าไม่ใช่ครั้งแรกที่โหลดข้อมูลนี้ จะเป็น false
      firstTime = firstTime || false;

      // First check : ถ้าเช็คโหลดครั้งแรกแล้วไม่เป็นความจริง จะทำการ เพิ่มค่าในการเลือกแบบฝึกหัดต่อไป
      if (!firstTime) {
        // เพิ่มค่าเลือกแบบฝึกหัดต่อไป หรือ เลือกข้อต่อไปนั้นเอง
        practiceData.currentQuestion++;
      }

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
      refContent.value = false;
      showLessonVideo.value = lessonList.value;
    };

    const funcRefContent = (val) => {
      refContent.value = val.ref;
      isShowDialogLesson.value = true;

      if (refContent.value) {
        showLessonVideo.value = lessonList.value.filter((x) => x.ref == refContent.value);

        selectedLesson.value = showLessonVideo.value[0].value;
      }
    };

    const playVideo = () => {
      console.clear();
      let el = document.getElementById("myVideo");

      el.click();

      setTimeout(() => {
        let hasAutoplay = el.src.indexOf("?autoplay=1");

        hasAutoplay = hasAutoplay == -1 ? 0 : 1;

        if (hasAutoplay) {
          let newLink = el.src.split("?");

          newLink = newLink[0];

          el.src = newLink;
        } else {
          var symbol = el.src.indexOf("?") > -1 ? "&" : "?";

          el.src = el.src + symbol + "autoplay=1";
        }
      }, 300);
    };

    // Mounted Function First time
    onMounted(() => {
      funcLoadPractice();
    });

    return {
      isLoadPractice,
      isHasHelp,
      isHasInstruction,
      instructionData,
      isShowDialogLesson,
      lessonList,
      selectedLesson,
      questionList,
      practiceData,
      funcSelectPraticeData,
      playVideo,
      showLessonVideo,
      funcRefContent,
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
  max-width: 850px;
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
</style>
