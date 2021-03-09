<template>
  <div class="absolute-center text-h5" v-if="isLoad">
    <span v-html="questionList[currentQuestion].sentenceEng"></span>

    <div class="q-py-xl">
      <q-separator></q-separator>
    </div>

    <div class="q-gutter-md">
      <q-btn
        color="amber"
        text-color="black"
        v-for="(item, index) in questionList[currentQuestion].sentenceExtra"
        @click="clickAnswer(item)"
      >
        {{ item }}
      </q-btn>
    </div>

    <div class="q-pt-lg">
      <span v-html="showString"> </span>
    </div>

    <div align="center">
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
import { axios } from "src/boot/axios";
export default {
  setup() {
    const questionList = ref([]);
    const currentQuestion = ref(0);
    const isLoad = ref(false);
    const currentBucketArray = ref([]);
    const currentPosition = ref(0);

    const getPractice = async () => {
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
      const postData = {
        practiceListId: "OWCKBt5W8oKVmhffxnx4",
      };
      let response = await axios.post(apiURL, postData);
      let sort = response.data.sort((a, b) => a.order - b.order);
      questionList.value = response.data;
      let findUnderline = questionList.value[currentQuestion.value].sentenceEng.match(
        /<s*u>(.*?)<s*\/u>/gm
      );
      for (let i = 0; i < findUnderline.length; i++) {
        currentBucketArray.value.push("_________________");
      }

      isLoad.value = true;
    };

    const clickAnswer = (item) => {
      currentBucketArray.value[currentPosition.value] = item;
      currentPosition.value++;
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
            currentBucketArray.value[i]
          );
        }

        return replacedString;
      }
    });

    const nextQuestion = () => {
      currentPosition.value = 0;
      currentQuestion.value++;
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
