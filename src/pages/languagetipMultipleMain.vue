<template>
  <q-page class="bg-language">
    <div>
      <app-bar
        :isHasInstruction="true"
        :isHasHelp="true"
        :isShowHome="false"
        :isShowPause="isSynchronize ? false : true"
        :isLoadPractice="isLoadPractice"
        @callback-showdialoghelp="isShowDialogHelp = true"
        @callback-restart="reStart"
        :themeSync="themeSync"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <languagetip-pc
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      @callback-finishpractice="isFinishPractice = true"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></languagetip-pc>

    <languagetip-mobile
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></languagetip-mobile>

    <finish-practice-dialog
      :isFinishPractice="isFinishPractice"
      @reStart="reStart"
    ></finish-practice-dialog>
  </q-page>
</template>

<script>
import languagetipPc from "../components/languagetip/languagetipMultiplePc";
import languagetipMobile from "../components/languagetip/languagetipMultipleMobile";
import finishPracticeDialog from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
export default {
  components: {
    languagetipPc,
    languagetipMobile,
    finishPracticeDialog,
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();

    const questionList = ref([]);
    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      correctAnswer: 0,
      choices: [],
      question: "",
      description: "",
    });

    const isLoadPractice = ref(false);
    const isFinishPractice = ref(false);

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
          console.log(`${error} : Get Hooks Language tip lesson`);
        }

        // Get Api
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        // // เก็บข้อมูลที่ได้จาก axios
        tempPractice = response.data;

        // // copy แบบฝึกหัด
        let setPracticeList = [...tempPractice];

        // // เก็บข้อมูลคำศัพท์เสริม
        // practiceData.extraSound = extraSound;

        // // สุ่มคำตอบของแต่ละข้อ
        setPracticeList = setPracticeList.map((x, index) => {
          let choices = x.choices.sort(() => Math.random() - 0.5);
          x.choices = choices;
          return x;
        });

        // เรียงแบบฝึกหัด
        setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

        //  สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        // // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
        setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

        // // เก็บข้อมูลแบบฝึกหัดทั้งหมด
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

      //
      practiceData.question = questionList.value[practiceData.currentQuestion].question;

      practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

      practiceData.correctAnswer =
        questionList.value[practiceData.currentQuestion].correctAnswer;

      practiceData.description =
        questionList.value[practiceData.currentQuestion].description;
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

    onMounted(funcLoadPractice);

    return {
      practiceData,
      isLoadPractice,
      reStart,
      funcSelectedQuestion,
      isFinishPractice,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-language {
  background-image: url("../../public/images/languagetip/bg-languagetip.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
}
</style>
