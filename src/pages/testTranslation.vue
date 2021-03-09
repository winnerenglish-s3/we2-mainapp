<template>
  <div class="absolute-center text-h5" v-if="isLoad">
    <span v-html="questionList[currentQuestion].sentenceEng"></span>

    <div class="q-py-xl">
      <q-separator></q-separator>
    </div>

    <div class="q-pt-lg">
      <!-- <span v-html="showString"> </span> -->
      <span v-for="(item, index) in testQuestion" :key="index">
        <q-btn class="bg-red" v-if="item.isAnswer" @click="removeWord(item)">{{
          item.currentAnswer
        }}</q-btn>
        <span v-else>{{ item.answer }}</span>
      </span>
    </div>

    <div class="q-gutter-md q-pt-lg">
      <q-btn
        color="amber"
        text-color="black"
        v-for="(item, index) in questionList[currentQuestion].sentenceExtra"
        @click="clickAnswer(item, index)"
      >
        {{ item }}
      </q-btn>
    </div>

    <div class="q-pt-lg" align="center">
      <q-btn
        label="Next Question"
        @click="nextQuestion()"
        color="teal"
        text-color="white"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { axios } from "src/boot/axios";

function test() {
  console.log("1234");
}

export default {
  setup() {
    // Quasar
    const $q = useQuasar();
    const questionList = ref([]);
    const currentQuestion = ref(0);
    const isLoad = ref(false);
    const currentBucketArray = ref([]);
    const currentPosition = ref(0);
    const testQuestion = ref([]);

    const getPractice = async () => {
      $q.loading.show();
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
      const postData = {
        practiceListId: "OWCKBt5W8oKVmhffxnx4",
      };

      let response = await axios.post(apiURL, postData);
      response.data.sort((a, b) => a.order - b.order);
      questionList.value = response.data;
      let findUnderline = questionList.value[currentQuestion.value].sentenceEng.match(
        /<s*u>(.*?)<s*\/u>/gm
      );
      for (let i = 0; i < findUnderline.length; i++) {
        currentBucketArray.value.push("_______");
      }
      isLoad.value = true;
      $q.loading.hide();
    };

    const clickAnswer = (item, index) => {
      let findAnswer = testQuestion.value.filter(
        (x) => x.isAnswer && x.currentAnswer == ""
      )[0];

      testQuestion.value[findAnswer.index].currentAnswer = item;

      questionList.value[currentQuestion.value].sentenceExtra.splice(index, 1);
    };

    const removeWord = (data) => {
      questionList.value[currentQuestion.value].sentenceExtra.push(data.currentAnswer);
      testQuestion.value[data.index].currentAnswer = "";
    };

    const funcShowString = () => {
      console.clear();

      if (isLoad.value) {
        let findUnderline = questionList.value[currentQuestion.value].sentenceEng.match(
          /<s*u>(.*?)<s*\/u>/gm
        );

        let replacedString = questionList.value[currentQuestion.value].sentenceEng;

        replacedString = replacedString.replace(/&nbsp;/g, "");

        replacedString = replacedString.split(/<s*u>(.*?)<s*\/u>/gm);

        replacedString = replacedString.map((res, index) => {
          let newData = {
            answer: res,
            isAnswer: false,
            currentAnswer: "",
            index: index,
          };

          let moveArrUnderline = null;

          for (let i = 0; i < findUnderline.length; i++) {
            let newTag = findUnderline[i].replace(/<u>/g, "").replace(/<\/u>/g, "");

            if (newData.answer == newTag) {
              moveArrUnderline = i;

              findUnderline.splice(moveArrUnderline, 1);
              newData.isAnswer = true;
              break;
            }
          }

          return newData;
        });

        // replacedString = replacedString.replace(
        //   newTag,
        //   `<button>${currentBucketArray.value[i] || "_______"}</button>`
        // );

        testQuestion.value = replacedString;
      }
    };

    const nextQuestion = () => {
      currentPosition.value = 0;
      currentQuestion.value++;
      currentBucketArray.value = [];
    };

    onMounted(async () => {
      await getPractice();
      await funcShowString();
    });

    return {
      questionList,
      currentQuestion,
      isLoad,
      clickAnswer,
      currentBucketArray,
      currentPosition,
      testQuestion,
      removeWord,
      nextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped></style>
