<template>
  <q-page class="bg-translation">
    <div>
      <app-bar :themeSync="themeSync" :isShowHome="true"></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main relative-position" v-if="isLoadPractice">
      <div>
        <div>
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div>
      <div align="center">
        <div class="box-question q-pa-md">
          <span v-html="practiceData.questionTh"></span>
        </div>
        <div class="box-content-question q-pb-xl q-pa-md row">
          <!-- @start="drag = true"
            @end="drag = false" -->
          <div class="q-ma-xs" v-for="(item, index) in testQuestion">
            <div class="self-end f18" v-html="item.answer"></div>
          </div>
        </div>

        <div class="box-content-answer q-pa-md q-mt-lg row">
          <div class="q-ma-sm" v-for="(item, index) in testChoices">
            <div align="center">
              <q-btn push class="bg-amber shadow-1">{{ item }}</q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-12 absolute-top" align="center">
        <header-bar :practiceData="practiceData"></header-bar>
      </div> -->
      <!-- <div class="col relative-position q-pa-md">
        <q-card class="absolute-center box-content-question shadow-5" square>
          <q-card-section>
            <div class="q-pa-md">
              <span v-html="practiceData.question"></span>
            </div>
          </q-card-section>
        </q-card>
      </div> -->
      <!-- <div class="col-6 box-content-question q-pt-md">
        <div class="q-mt-xl q-pa-lg">
          <div class="box-question q-pa-md">
            <span class="f16" v-html="practiceData.questionTh"> </span>
          </div>

          <div class="box-answer q-mb-xl q-mt-lg">
            <div class="q-my-md row justify-center">
              <div v-for="(item, index) in practiceData.choices">
                <q-btn
                  no-caps
                  :label="item"
                  push
                  rounded
                  class="bg-amber-7 f16 q-ma-sm"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import appBar from "../components/app-bar";
import headerBar from "../components/header-time-progress";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { db } from "src/router";
export default {
  components: {
    appBar,
    headerBar,
    draggable: VueDraggableNext,
  },
  props: {
    themeSync: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // Initial Route
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const questionList = ref([]);
    const practiceData = reactive({
      totalQuestion: 0,
      totalStar: 0,
      currentQuestion: 2,
      question: "",
      choices: [],
      questionTh: "",
    });
    const isLoadPractice = ref(false);

    // Function : Load Practice
    const funcLoadPractice = async () => {
      console.clear();

      try {
        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        // Get Practice Data
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        // Question List : Set Question
        questionList.value = response.data;

        // เรียงแบบฝึกหัด
        questionList.value.sort((a, b) => a.order - b.order);

        // สุ่มแบบฝึกหัด
        // questionList.value.sort(() => Math.random() - 0.5);

        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    const testQuestion = ref([]);
    const testChoices = ref([]);

    const funcSelectedQuestion = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Question
      let newQuestion = questionList.value[practiceData.currentQuestion].sentenceEng;

      newQuestion = newQuestion.split(" ");

      newQuestion = newQuestion.map((x) => {
        let newData = {
          isAnswer: false,
          answer: x,
          currentAnswer: "",
        };

        let tagMatch = x.match(/<s*u>(.*>?)<s*\/u>/gm) || 0;

        if (tagMatch.length) {
          newData.isAnswer = true;
          newData.answer = newData.answer.replace(
            /<s*u>(.*>?)<s*\/u>/g,
            `<div class="relative-position" style="width:100px;height:40px;border-radius:10px;background-color:#A9A9A9;box-shadow:0px 1px 3px #000;"></div>`
          );
        }

        return newData;
      });

      // Practice Data : Show Question
      practiceData.question = newQuestion;

      testQuestion.value = newQuestion;

      // Practice Data : Show Question Th
      practiceData.questionTh =
        questionList.value[practiceData.currentQuestion].sentenceTh;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value[practiceData.currentQuestion].sentenceExtra;

      testChoices.value = questionList.value[practiceData.currentQuestion].sentenceExtra;
    };

    // Mounted
    onMounted(() => {
      funcLoadPractice();
    });

    return { practiceData, isLoadPractice, testQuestion, testChoices };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  // background-image: url("../../public/images/translation/bg-translation.png");
  background-size: cover;
  background-color: #fff;
}

.box-content-question {
  max-width: 800px;
  width: 90%;
  max-height: fit-content;
  min-height: calc(100vh - 30%);
}

.box-content-question {
  width: 800px;
  background-image: url("../../public/images/translation/bg-translation-content.png");
  background-size: cover;
  background-position: center;
}

.box-content-answer {
  width: 800px;
}

.box-question {
  width: 800px;
  background-color: #fff;
  border: 4px solid #895200;
}
</style>
