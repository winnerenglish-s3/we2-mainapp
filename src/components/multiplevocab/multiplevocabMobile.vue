<template>
  <div class="box-container-mobile">
    <div class="row relative-position full-height">
      <div class="col-12">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="col-12 self-end row">
        <div class="col-12">
          <div class="box-question q-pa-md" style="font-size: max(3vw, 16px)">
            <span v-html="practiceData.question"></span>
          </div>
        </div>
        <div class="col-12 q-mt-md">
          <div class="box-answer row justify-center items-center q-px-sm">
            <div
              v-if="activeBy == 'answer'"
              class="relative-position col-6 self-center q-pa-xs cursor-pointer"
              align="center"
              v-for="(item, index) in practiceData.choices"
              :key="index"
              @click="sendAnswer(item.index, index)"
            >
              <img
                style="width: 100%"
                :src="
                  require(`../../../public/images/multiplevocab/button-theme/multiplevocab-theme-1-choices-${
                    isSendAnswer
                      ? currentAnswer == item.index
                        ? isCorrectAnswer
                          ? 'correct'
                          : 'incorrect'
                        : 'default'
                      : 'default'
                  }.png`)
                "
              />
              <div class="absolute-center font-content no-pointer-events" align="center">
                <div v-if="isSendAnswer && currentAnswer == item.index">
                  <q-icon
                    :name="
                      isCorrectAnswer ? 'far fa-check-circle' : 'far fa-times-circle'
                    "
                    size="30px"
                    :class="isCorrectAnswer ? 'text-green' : 'text-red'"
                  ></q-icon>
                </div>

                <span
                  :class="
                    isSendAnswer ? (currentAnswer == index ? 'text-black' : null) : null
                  "
                  v-html="item.choice"
                >
                </span>
              </div>
            </div>

            <div v-if="activeBy == 'description'" class="col-12">
              <div class="box-container-description shadow-5">
                <div class="bg-blue-10">
                  <div class="box-header-description">
                    <q-img
                      class="no-padding"
                      width="1000px"
                      :src="
                        require(`../../../public/images/multiplevocab/multiplevocab-theme-1-description.png`)
                      "
                    ></q-img>
                  </div>
                </div>

                <div class="q-px-lg q-py-md font-16">
                  <div class="q-mb-sm" v-if="!isCorrectAnswer">
                    <span class="text-red">{{
                      `
                    "${
                      practiceData.choices.filter((x) => x.index == currentAnswer)[0]
                        .choice
                    }"
                  `
                    }}</span>
                    <span> เป็นคำตอบที่ ผิด </span>
                  </div>
                  <div class="q-pb-md">
                    <span
                      >คำตอบที่ถูกต้อง คือ
                      <span class="text-green">{{
                        `  "${
                          practiceData.choices.filter(
                            (x) => x.index == practiceData.correctAnswer
                          )[0].choice
                        }"`
                      }}</span></span
                    >
                  </div>
                  <div v-html="practiceData.description"></div>
                </div>

                <div class="q-my-md" align="center">
                  <q-img
                    v-if="
                      isSendAnswer &&
                      practiceData.currentQuestion + 1 != practiceData.totalQuestion
                    "
                    @click="nextQuestion()"
                    class="cursor-pointer"
                    width="200px"
                    src="../../../public/images/next-question-btn.png"
                  ></q-img>
                  <q-img
                    v-else
                    @click="$emit('callback-finishpractice')"
                    class="cursor-pointer"
                    width="200px"
                    src="../../../public/images/success-btn.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { ref } from "vue";
export default {
  components: {
    headerBar,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // Initial Data
    const activeBy = ref("answer");
    const activeHover = ref(null);

    // Function Send Answer
    const isSendAnswer = ref(false);
    const currentAnswer = ref(null);
    const isCorrectAnswer = ref(false);

    const sendAnswer = (choiceIndex) => {
      isSendAnswer.value = true;

      currentAnswer.value = choiceIndex;

      if (Number(props.practiceData.correctAnswer) == currentAnswer.value) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      emit("callback-sendanswer", isCorrectAnswer.value);

      setTimeout(() => {
        activeBy.value = "description";
      }, 500);
    };

    // Function Next Question
    const nextQuestion = () => {
      isSendAnswer.value = false;
      activeBy.value = "answer";

      emit("callback-nextquestion");
    };

    return {
      activeBy,
      activeHover,
      isSendAnswer,
      isCorrectAnswer,
      currentAnswer,
      sendAnswer,
      nextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-container-description {
  max-width: 1000px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.box-header-description {
  width: 90%;
  overflow: hidden;
}

.box-container-mobile {
  min-width: 360px;
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.box-header-main {
  width: calc(100% - 25%);
}

.box-question {
  max-height: 100px;
  min-height: 120px;
  height: fit-content;
  border: 4px solid #6f3c00;
  background-color: #fff0da;
}

.box-answer {
  max-width: 700px;
  width: 100%;
  margin: auto;
}

.btn-choices {
  max-width: 300px;
  width: 100%;
}

.font-content {
  font-size: 16px;
}
</style>
