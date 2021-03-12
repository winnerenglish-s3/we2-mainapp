<template>
  <div>
    <div>
      <div>
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
    </div>

    <div class="" align="center">
      <div class="box-header-question row justify-center q-px-md q-py-sm" align="left">
        <span class="f14" v-html="practiceData.questionTh"></span>
      </div>
      <div class="box-content-question q-pa-md" align="left">
        <div class="row">
          <div
            class="self-center"
            v-for="(item, index) in practiceData.question"
            @click="selectedBoxAnswer = index"
          >
            <div class="self-center relative-position">
              <div class="f14 q-mx-xs" v-html="item.answer" v-if="!item.isAnswer"></div>
              <div
                v-if="item.isAnswer"
                class="q-my-sm q-mx-sm"
                @click="
                  !isSendAnswer
                    ? item.currentAnswer != ''
                      ? funcRemoveAnswer(item.currentAnswer, index)
                      : null
                    : ''
                "
                :class="
                  !isSendAnswer
                    ? currentSelectAnswerBox == index
                      ? 'btn-selected-answer bg-amber-4'
                      : item.currentAnswer != ''
                      ? 'btn-has-answer cursor-pointer'
                      : 'btn-not-selected-answer'
                    : item.isCorrectAnswer
                    ? 'btn-correct'
                    : 'btn-incorrect'
                "
                align="center"
              >
                <span>{{ item.currentAnswer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-md">
        <div class="box-content-answer q-pa-sm" align="left">
          <q-btn
            push
            class="q-ma-sm f14"
            :class="
              allChooseAnswer ? 'bg-disable no-pointer-events' : 'bg-amber cursor-pointer'
            "
            v-for="(item, index) in practiceData.choices"
            @click="funcSelectedAnswer(item, index)"
            no-caps
            >{{ item }}</q-btn
          >
        </div>

        <div class="q-py-md" align="center">
          <q-img
            v-show="!isSendAnswer"
            width="200px"
            :class="allChooseAnswer ? 'cursor-pointer' : 'no-pointer-events'"
            @click="!isSendAnswer ? funcSendAnswer() : null"
            :src="
              require(`../../../public/images/send-answer-btn${
                allChooseAnswer ? '' : '-noactive'
              }.png`)
            "
          ></q-img>
        </div>
      </div>
    </div>

    <answer-action
      :isAnswerAction="isSendAnswer"
      :isCorrectAnswer="isCorrectAnswer"
      :answer="showQuestionEng"
      :isFinishPractice="isFinishPractice"
      @callback-nextquestion="funcNextQuestion()"
      @callback-finishpractice="$emit('callback-finishpractice')"
    ></answer-action>
  </div>
</template>

<script>
import headerBar from "../../components/header-time-progress";
import answerAction from "../answer-action-mobile";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
    answerAction,
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // Initial Router
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const selectedBoxAnswer = ref(0);
    const isDialogAnswer = ref(false);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);
    const isFinishPractice = ref(false);

    const currentSelectAnswerBox = computed(() => {
      let nextAnswer = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      );

      if (nextAnswer.length) {
        return nextAnswer[0].index;
      } else {
        return null;
      }
    });

    const useRandomFakeChoice = computed(() => {
      let setRandom = 3;

      let setFilter = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      );

      if (setFilter.length) {
        let totalAnswerLength = props.practiceData.choices.length;

        let answer = setFilter[0].answer;
        let currentChoiceIndex = props.practiceData.choices.indexOf(answer);

        let tempRandom = [];

        const reRandom = () => {
          tempRandom = [currentChoiceIndex];

          if (totalAnswerLength <= setRandom) {
            setRandom = totalAnswerLength - 1 || 1;
          }

          try {
            for (let i = 0; i < setRandom - 1; i++) {
              let fakeRandom = Math.floor(Math.random() * totalAnswerLength);

              if (tempRandom.includes(fakeRandom)) {
                reRandom();
                break;
              } else {
                tempRandom.push(fakeRandom);
              }
            }
          } catch (error) {
            reRandom();
            console.log(error);
          }
        };

        reRandom();

        tempRandom.sort(() => Math.random() - 0.5);

        return tempRandom;
      } else {
        return [];
      }
    });

    const funcSelectedAnswer = (data, index) => {
      props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      )[0].currentAnswer = data;

      props.practiceData.choices.splice(index, 1);
    };

    const funcRemoveAnswer = (data, index) => {
      props.practiceData.choices.push(data);

      props.practiceData.question[index].currentAnswer = "";
    };

    const showQuestionEng = computed(() => {
      let newSetQuestion = props.practiceData.questionEng
        .split(/<s*u>(.*?)<s*\/u>/gm)
        .join(" ");

      return newSetQuestion;
    });

    const allChooseAnswer = computed(() => {
      let finish = props.practiceData.question.filter(
        (x) => x.isAnswer && x.currentAnswer == ""
      );

      if (finish.length) {
        return false;
      } else {
        return true;
      }
    });

    const funcSendAnswer = () => {
      isSendAnswer.value = true;

      let getAllAnswer = props.practiceData.question.filter((x) => x.isAnswer);

      let checkAllAnswer = getAllAnswer.map((x) => {
        if (x.currentAnswer == x.answer) {
          x.isCorrectAnswer = true;
        } else {
          x.isCorrectAnswer = false;
        }
        return x;
      });

      if (props.practiceData.currentQuestion + 1 == props.practiceData.totalQuestion) {
        isFinishPractice.value = true;
      }

      isCorrectAnswer.value = checkAllAnswer.every((x) => x.isCorrectAnswer);

      console.log(isCorrectAnswer.value);
    };

    const funcNextQuestion = () => {
      isSendAnswer.value = false;

      emit("callback-nextquestion");
    };

    return {
      isSendAnswer,
      isFinishPractice,
      isCorrectAnswer,
      selectedBoxAnswer,
      useRandomFakeChoice,
      currentSelectAnswerBox,
      allChooseAnswer,
      funcSelectedAnswer,
      funcRemoveAnswer,
      funcSendAnswer,
      funcNextQuestion,

      showQuestionEng,
      isDialogAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-header-question {
  max-width: 600px;
  width: 100%;
  background-color: #7c451e;
  border-radius: 10px 10px 0px 0px;
  color: #fff;
}

.box-content-question {
  max-width: 600px;
  width: 100%;
  background-image: url("../../../public/images/translation/bg-translation-content.png");
  background-size: cover;
  background-position: center;
}

.box-content-answer {
  max-width: 600px;
  width: 100%;
  background-color: #f9f1df;
  border: 3px solid #7c451e;
  border-radius: 10px;
}

.btn-selected-answer {
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px dashed #ad7301;
}

.btn-has-answer {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: linear-gradient(180deg, #ffd058 0%, #ffbb0c 100%);
  box-shadow: 0px 3px 0px #d6af4a;
  border-radius: 7px;
  transition: 0.2s;
  transform: scale(1);
}

.btn-has-answer::before {
  content: "x";
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 10px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  background-color: #7c451e;
  color: white;
  border-radius: 50%;
  box-shadow: 0px 1px 7px rgba(85, 85, 85, 0.521);
  padding-top: 2px;
}

.btn-has-answer:active {
  transition: 0.2s;
  transform: scale(0.9);
}

.btn-not-selected-answer {
  width: 100px;
  height: 35px;
  border-bottom: 1px solid;
}

.btn-correct {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #95ecdc;
  box-shadow: 0px 3px 0px #32b59d;
  border-radius: 7px;
}

.btn-incorrect {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #ff6b71;
  box-shadow: 0px 3px 0px #ff0711;
  border-radius: 7px;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.bg-disable {
  background-color: #ecdcbe;
}
</style>
