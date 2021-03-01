<template>
  <q-page class="bg-phonics">
    <div>
      <app-bar
        :isHasInstruction="true"
        :isHasHelp="true"
        :isShowHome="false"
        :isShowPause="isSynchronize ? false : true"
        :isLoadPractice="isLoadPractice"
        :themeSync="themeSync"
        @callback-showdialoghelp="isShowDialogHelp = true"
        @callback-restart="reStart"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <phonics-multi-pc
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      @callback-playsound="funcPlaySound"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></phonics-multi-pc>

    <phonics-multi-mobile
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      @callback-playsound="funcPlaySound"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></phonics-multi-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0 q-pa-md">
        <q-card-section class="fit">
          <div
            class="absolute-center"
            :class="
              $q.platform.is.desktop ? 'box-help-practice-pc' : 'box-help-practice-mobile'
            "
          >
            <q-tabs
              v-model="tab"
              shrink
              dense
              class="box-header-help text-warning"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm" name="video" label="วิดีโอ" />
              <q-tab
                v-if="$q.platform.is.mobile"
                class="q-pa-sm"
                name="word"
                label="เทียบเสียง"
              />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="video">
                  <div class="row">
                    <div
                      :class="
                        $q.platform.is.mobile
                          ? 'col-12 q-pa-md'
                          : 'col-3 box-help-left q-pa-sm'
                      "
                      class=" "
                      :style="$q.platform.is.mobile ? '' : 'width: 230px'"
                    >
                      <!-- Desktop -->
                      <div
                        v-for="(item, index) in lessonList"
                        v-if="$q.platform.is.desktop"
                        :key="index"
                        v-ripple
                        class="relative-position cursor-pointer q-py-sm q-px-sm rounded-borders q-mb-sm box-choices"
                        :style="
                          selectLesson == item.vdoLink
                            ? 'background-color:#48DBFC'
                            : 'background-coor:#fff;'
                        "
                        @click="selectLesson = item.vdoLink"
                      >
                        {{ item.name }}
                      </div>

                      <div v-if="$q.platform.is.mobile" align="center">
                        <q-select
                          dense
                          filled
                          borderless=""
                          class="rounded-borders"
                          v-model="selectLesson"
                          :options="lessonList"
                          map-options
                          emit-value
                        ></q-select>
                      </div>
                    </div>
                    <div
                      :class="
                        $q.platform.is.mobile ? 'col-12 q-pt-md q-px-md q-pb-xl' : 'col'
                      "
                      class="row"
                    >
                      <div class="col-12" :class="$q.platform.is.mobile ? '' : 'q-pa-sm'">
                        <q-video
                          :ratio="16 / 9"
                          :src="
                            lessonList.filter((x) => x.vdoLink == selectLesson)[0].vdoLink
                          "
                        ></q-video>
                        <div class="row q-mt-md">
                          <div>
                            <q-img
                              class="cursor-pointer btn-hover"
                              width="50px"
                              src="../../public/images/phonicsmulti/btn-left-help-phonics.png"
                            ></q-img>
                          </div>
                          <q-space></q-space>

                          <q-space></q-space>
                          <div>
                            <q-img
                              class="cursor-pointer btn-hover"
                              width="50px"
                              src="../../public/images/phonicsmulti/btn-right-help-phonics.png"
                            ></q-img>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="$q.platform.is.desktop"
                        class="col-12 self-end q-pt-sm"
                        style="border-top: 2px solid #b4b4b4"
                      >
                        <div
                          align="center"
                          class="q-pa-md bg-white"
                          style="border-radius: 0px 0px 7px 7px"
                        >
                          <q-img
                            v-close-popup
                            class="cursor-pointer"
                            style="width: 200px"
                            src="../../public/images/close-help-btn-pc.png"
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panels> </q-tab-panels>
                <q-tab-panel class="no-padding" name="word">
                  <div class="box-help-word">
                    <div
                      class="row justify-around q-pa-sm q-px-lg"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in practiceData.extraSound"
                    >
                      <div>{{ item.vocab }}</div>
                      <div>
                        <span>เทียบเสียงไทย</span>
                      </div>
                      <div>
                        {{ item.alphabets }}
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                v-close-popup
                class="cursor-pointer"
                src="../../public/images/close-help-btn-mobile.png"
              ></q-img>
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
import phonicsMultiPc from "../components/phonicsmultiple/phonicsMultiplePc";
import phonicsMultiMobile from "../components/phonicsmultiple/phonicsMultipleMobile";
import finishPracticeDialog from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import lessonHooks from "../hooks/lessonHooks";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
export default {
  components: {
    appBar,
    phonicsMultiPc,
    phonicsMultiMobile,
    finishPracticeDialog,
  },
  props: {
    isStartPractice: {
      type: Boolean,
      default: () => true,
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false,
    },
    themeSync: {
      type: Number,
      default: 1,
    },
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();
    const tab = ref("video");

    // Practice Data
    const questionList = ref([]);
    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      question: "",
      choices: [],
      correctAnswer: 0,
      extraSound: [],
    });
    const selectLesson = ref("");
    const selectAudioSound = ref(null);
    const isLoadPractice = ref(false);
    const isFinishPractice = ref(false);
    const lessonList = ref([]);
    const extraSound = reactive([
      {
        vocab: "A",
        alphabets: "แ",
      },
      {
        vocab: "B",
        alphabets: "บ",
      },
      {
        vocab: "C",
        alphabets: "ซ, ค",
      },
      {
        vocab: "D",
        alphabets: "ด",
      },
      {
        vocab: "E",
        alphabets: "เ, อี",
      },
      {
        vocab: "F",
        alphabets: "ฟ",
      },
      {
        vocab: "G",
        alphabets: "ก",
      },
      {
        vocab: "H",
        alphabets: "ฮ",
      },
      {
        vocab: "I",
        alphabets: "อิ, ไ",
      },
      {
        vocab: "J",
        alphabets: "จ",
      },
      {
        vocab: "K",
        alphabets: "ค, ก",
      },
      {
        vocab: "L",
        alphabets: "ล",
      },
      {
        vocab: "M",
        alphabets: "ม",
      },
      {
        vocab: "N",
        alphabets: "น",
      },
      {
        vocab: "O",
        alphabets: "โ, อ",
      },
      {
        vocab: "P",
        alphabets: "พ",
      },
      {
        vocab: "Q",
        alphabets: "คว",
      },
      {
        vocab: "R",
        alphabets: "ร",
      },
      {
        vocab: "S",
        alphabets: "ซ, ส",
      },
      {
        vocab: "T",
        alphabets: "ท",
      },
      {
        vocab: "U",
        alphabets: "อั, อิว, อู",
      },
      {
        vocab: "V",
        alphabets: "ว",
      },
      {
        vocab: "W",
        alphabets: "ว",
      },
      {
        vocab: "X",
        alphabets: "กซ",
      },
      {
        vocab: "Y",
        alphabets: "ย, วี, อาย",
      },
      {
        vocab: "Z",
        alphabets: "ซ",
      },
    ]);

    const funcLoadPractice = async () => {
      console.clear();

      try {
        let multipleList = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
        practiceData.totalQuestion = getData.data().numOfPractice;

        try {
          let getLesson = await lessonHooks
            .lesson()
            .phonics(getData.data().level, getData.data().unit);

          lessonList.value = getLesson;

          selectLesson.value = lessonList.value[0].vdoLink;
        } catch (error) {
          console.log(`${error} : Get Hooks Grammar lesson`);
        }

        // Get Api
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
        const postData = {
          practiceListId: practiceListId,
        };
        const response = await axios.post(apiURL, postData);

        // เก็บข้อมูลที่ได้จาก axios
        multipleList = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = [...multipleList];

        // เก็บข้อมูลคำศัพท์เสริม
        practiceData.extraSound = extraSound;

        // สุ่มคำตอบของแต่ละข้อ
        setPracticeList = setPracticeList.map((x, index) => {
          x.choices.map((xx, index) => {
            xx.index = index + 1;
          });

          let choices = x.choices.sort(() => Math.random() - 0.5);
          x.choices = choices;
          return x;
        });

        // สุ่มแบบฝึกหัด
        setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
        setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

        // เก็บข้อมูลแบบฝึกหัดทั้งหมด
        questionList.value = setPracticeList;

        // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectedQuestion = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Question
      practiceData.question = questionList.value[practiceData.currentQuestion].question;

      // Practice Data : Show Choice
      practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

      // Practice Data : Correct Answer
      practiceData.correctAnswer =
        questionList.value[practiceData.currentQuestion].correctAnswer;
    };

    const reStart = () => {
      isFinishPractice.value = false;
      isLoadPractice.value = false;

      practiceData.totalQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.question = "";
      practiceData.choices = [];
      practiceData.currentQuestion = 0;

      funcLoadPractice();
    };

    const funcPlaySound = (url) => {
      if (selectAudioSound.value != null) {
        selectAudioSound.value.pause();
      }

      selectAudioSound.value = new Audio(url);
      selectAudioSound.value.play();
    };

    onMounted(funcLoadPractice);

    return {
      practiceData,
      isLoadPractice,
      isFinishPractice,
      lessonList,
      selectLesson,
      tab,

      // Function
      reStart,
      funcSelectedQuestion,
      funcPlaySound,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-phonics {
  background-image: url("../../public/images/phonicsmulti/bg-phonics.png");
  background-size: cover;
  background-position: center;
}

.box-container-main {
  max-width: 1600px;
  width: 100%;
  height: calc(100vh - 50px);
  margin: auto;
}

.box-help-practice-pc {
  max-width: 800px;
  min-width: 290px;
  width: 100%;
}

.box-help-practice-mobile {
  max-width: 400px;
  width: 100%;
}

.box-header-help {
  background-color: #9f220c;
  color: #fff;
  border-radius: 7px 7px 0px 0px;
  font-size: 20px;
}

.box-help-left {
  background-color: #fff0da;
  height: 500px;
  overflow: auto;
}

.box-choices {
  background-color: #ffffff;
  box-shadow: 0 1px 1px #000;
}

/* width */
.box-help-left::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-help-left::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-help-left::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-help-left::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-hover {
  transition: 0.3s;
  transform: scale(1);
}

.btn-hover:hover {
  transition: 1s;
  transform: scale(0.95);
}

.box-help-word {
  height: 500px;
  overflow: auto;
}

/* width */
.box-help-word::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-help-word::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-word::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-word::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}
</style>
