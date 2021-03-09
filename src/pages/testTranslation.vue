<template>
  <div class="absolute-center text-h5" v-if="isLoad">
    <span v-html="questionList[currentQuestion].sentenceEng"></span>

    <div class="q-py-xl">
      <q-separator></q-separator>
    </div>

    <div class="q-pt-lg">
      <span v-html="showString"> </span>
      <!-- <span v-for="(item, index) in showString" :key="index" v-html="item"> </span> -->
    </div>

    <div class="q-gutter-md q-pt-lg">
      <q-btn
        color="amber"
        text-color="black"
        v-for="(item, index) in questionList[currentQuestion].sentenceExtra"
        @click="clickAnswer(item)"
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

    const clickAnswer = (item) => {
      currentBucketArray.value[currentPosition.value] = item;
      currentPosition.value++;
      let findRemoveIndex = questionList.value[
        currentQuestion.value
      ].sentenceExtra.indexOf(item);
      questionList.value[currentQuestion.value].sentenceExtra.splice(findRemoveIndex, 1);
    };
    const showString = computed(() => {
      if (isLoad.value) {
        let findUnderline = questionList.value[currentQuestion.value].sentenceEng.match(
          /<s*u>(.*?)<s*\/u>/gm
        );
        let replacedString = questionList.value[currentQuestion.value].sentenceEng;

        for (let i = 0; i < findUnderline.length; i++) {
          replacedString = replacedString.replace(
            findUnderline[i],
            `<button>${currentBucketArray.value[i] || "_______"}</button>`
          );
        }

        return replacedString;
      }
    });

    const nextQuestion = () => {
      currentPosition.value = 0;
      currentQuestion.value++;
      currentBucketArray.value = [];
    };

    onMounted(() => {
      getPractice();
    });

    return {
      questionList,
      currentQuestion,
      isLoad,
      showString,
      clickAnswer,
      currentBucketArray,
      currentPosition,
      nextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped></style>
