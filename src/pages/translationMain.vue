<template>
  <q-page class="bg-translation">
    <div>
      <app-bar></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main row relative-position" v-if="isLoadPractice">
      <div class="col-12 absolute-top" align="center">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="col relative-position q-pa-md">
        <q-card class="absolute-center box-content-question shadow-5" square>
          <q-card-section>
            <div class="q-pa-md">
              <span v-html="practiceData.question"></span>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 box-content-answer q-pt-md">
        <div class="q-mt-xl q-pa-lg">
          <div class="box-question q-pa-md">
            <span class="f16">
              {{ practiceData.questionTh }}
            </span>
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
      </div>
    </div>
  </q-page>
</template>

<script>
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
      currentQuestion: 0,
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
        questionList.value.sort(() => Math.random() - 0.5);

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
      let newQuestion = questionList.value[
        practiceData.currentQuestion
      ].sentenceEng.replace(/<s*u>(.*?)<s*\/u>/g, "____________");

      practiceData.question = newQuestion;

      // Practice Data : Show Question Th
      practiceData.questionTh =
        questionList.value[practiceData.currentQuestion].sentenceTh;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value[practiceData.currentQuestion].sentenceExtra;

      console.log(questionList.value);
    };

    // Mounted
    onMounted(() => {
      funcLoadPractice();
    });

    return { practiceData, isLoadPractice };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  background-image: url("../../public/images/translation/bg-translation.png");
  background-size: cover;
}

.box-content-question {
  max-width: 800px;
  width: 90%;
  max-height: fit-content;
  min-height: calc(100vh - 30%);
}

.box-content-answer {
  max-width: 600px;
  width: 100%;
  background-image: url("../../public/images/translation/bg-translation-content.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}

.box-question {
  background-color: #fff;
  border: 5px solid #a36112;
  border-radius: 10px;
}

.box-answer {
}
</style>
