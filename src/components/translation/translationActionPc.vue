<template>
  <div align="center">
    <div class="box-content">
      <!-- Step : 0 -->
      <div v-if="currentStep == 0">
        <div align="left" class="q-pa-md row">
          <current-button-choices
            class="q-ma-xs"
            :no="index + 1"
            :currentQuestion="practiceData.currentQuestion + 1"
            v-for="(item, index) in practiceData.totalQuestion"
          ></current-button-choices>
        </div>
        <div>
          <div class="box-question q-pa-md bg-white row justify-center" align="left">
            <span class="f16" v-html="practiceData.questionTh"></span>
          </div>
          <div class="box-content-writing q-pa-md bg-white row q-py-xl">
            <div
              class="self-center relative-position"
              v-for="(item, index) in practiceData.question"
              @click="selectedBoxAnswer = index"
            >
              <div class="f18 q-mx-xs" v-html="item.answer" v-if="!item.isAnswer"></div>
              <div
                v-if="item.isAnswer"
                class="q-my-sm q-mx-sm"
                @click="
                  item.currentAnswer != ''
                    ? funcSelectedBackAnswer(item.currentAnswer, index)
                    : null
                "
                :class="
                  currentSelectAnswerBox == index
                    ? 'btn-selected-answer bg-amber-4'
                    : item.currentAnswer != ''
                    ? 'btn-has-answer cursor-pointer'
                    : 'btn-not-selected-answer'
                "
              >
                {{ item.currentAnswer }}
              </div>
            </div>
          </div>
        </div>

        <!-- BOX : Answer -->
        <div class="q-my-lg">
          <q-btn
            push
            class="q-ma-sm"
            :class="
              allChooseAnswer ? 'bg-grey-5 no-pointer-events' : 'bg-amber cursor-pointer'
            "
            v-for="(item, index) in practiceData.choices"
            @click="funcSelectedAnswer(item, index)"
            no-caps
            >{{ item }}</q-btn
          >
        </div>

        <!-- BOX : BUTTON ANSWER -->
        <div class="q-my-md q-pa-lg" align="center">
          <q-img
            width="180px"
            :class="allChooseAnswer ? 'cursor-pointer' : 'no-pointer-events'"
            @click="$emit('callback-nextquestion'), (currentStep = 1)"
            :src="
              require(`../../../public/images/send-answer-btn${
                allChooseAnswer ? '' : '-noactive'
              }.png`)
            "
          ></q-img>
        </div>
      </div>

      <div v-if="currentStep == 1" class="q-py-lg">
        <div
          :class="{
            'box-content-main q-pa-sm absolute-center': $q.platform.is.desktop,
            'absolute-center full-width': $q.platform.is.mobile,
          }"
        >
          <div
            class="q-pa-md q-px-xl relative-position"
            :class="{ 'border-dash': $q.platform.is.desktop }"
          >
            <div
              class="row justify-center"
              style="min-height: calc(100vh - 400px); max-height: fit-content"
            >
              <div class="self-center" style="max-width: 500px; width: 100%">
                <waiting></waiting>
                <div align="center" class="q-py-sm">
                  <span
                    class="f36 text-brown-8 text-bold"
                    style="font-size: max(1.7vw, 20px)"
                    >รอเพื่อนก่อนนะ</span
                  >
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
import currentButtonChoices from "../button/btn-current-choices";
import waiting from "../waiting";
import { ref, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    currentButtonChoices,
    waiting,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-nextquestion"],
  setup(props) {
    // Initial Router
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const currentStep = 0;

    const selectedBoxAnswer = ref(0);

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

    const funcSelectedBackAnswer = (data, index) => {
      props.practiceData.choices.push(data);

      props.practiceData.question[index].currentAnswer = "";
    };

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

    return {
      currentStep,
      selectedBoxAnswer,
      useRandomFakeChoice,
      currentSelectAnswerBox,
      allChooseAnswer,
      funcSelectedAnswer,
      funcSelectedBackAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-content {
  max-width: 800px;
}

.box-question {
  border: 5px solid #a36112;
  border-radius: 7px 7px 0px 0px;
  border-bottom: transparent;
  background-color: #fff;
}

.box-content-writing {
  border: 5px solid #a36112;
  border-radius: 0px 0px 7px 7px;
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
</style>
