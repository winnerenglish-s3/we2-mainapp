<template>
  <q-page class="bg-conversation">
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

    <conversation-multi-pc
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      @callback-playsound="funcPlaySound"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></conversation-multi-pc>
    <conversation-multi-mobile
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      @callback-playsound="funcPlaySound"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></conversation-multi-mobile>

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
              indicator-color="transparent"
              align="justify"
            >
              <q-tab class="q-pa-sm no-pointer-events" name="video" label="วิดีโอ" />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="video">
                  <div class="row">
                    <div
                      :class="$q.platform.is.mobile ? 'col-12 q-pb-md' : 'col'"
                      class="row"
                    >
                      <div class="col-12 q-pa-md">
                        <span> xxxxxx </span>
                      </div>
                      <div class="col-12 q-px-md">
                        <video
                          style="width: 100%; border: 1px solid #000"
                          src="../../public/video/example.mp4"
                          controls
                          controlsList="nodownload"
                        ></video>
                      </div>
                      <div v-if="$q.platform.is.desktop" class="col-12 self-end">
                        <div
                          align="center"
                          class="q-pa-md bg-white"
                          style="border-radius: 0px 0px 7px 7px"
                        >
                          <q-img
                            @click="closeHelpBtn()"
                            class="cursor-pointer"
                            style="width: 200px"
                            src="../../public/images/close-help-btn-pc.png"
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                @click="closeHelpBtn()"
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
import conversationMultiPc from "../components/conversation/conversationmultiPc";
import conversationMultiMobile from "../components/conversation/conversationmultiMobile";
import finishPracticeDialog from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
export default {
  components: {
    conversationMultiPc,
    conversationMultiMobile,
    appBar,
    finishPracticeDialog,
  },
  props: {
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

    const funcLoadPractice = async () => {
      console.clear();

      try {
        let tempPractice = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
        practiceData.totalQuestion = getData.data().numOfPractice;

        try {
          // let getLesson = await lessonHooks
          //   .lesson()
          //   .phonics(getData.data().level, getData.data().unit);
          // lessonList.value = getLesson;
          // selectLesson.value = lessonList.value[0].vdoLink;
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
        tempPractice = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = [...tempPractice];

        // เก็บข้อมูลคำศัพท์เสริม
        // practiceData.extraSound = extraSound;

        // สุ่มคำตอบของแต่ละข้อ
        setPracticeList = setPracticeList.map((x, index) => {
          let choices = x.choices.sort(() => Math.random() - 0.5);
          x.choices = choices;
          return x;
        });

        // สุ่มแบบฝึกหัด
        setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

        // สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

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

      // Function
      reStart,
      funcSelectedQuestion,
      funcPlaySound,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-conversation {
  background-image: url("../../public/images/conversation/bg-conversation.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
}

.box-container-main {
  max-width: 1600px;
  width: 100%;
  height: calc(100vh - 50px);
  margin: auto;
}

.box-help-practice-pc {
  overflow: hidden;
  max-width: 600px;
  min-width: 290px;
  width: 100%;
  border-radius: 0px 0px 7px 7px;
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
</style>
