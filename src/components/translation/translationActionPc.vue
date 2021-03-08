<template>
  <div align="center">
    <div class="box-content">
      <div align="left" class="q-pa-md">
        <current-button-choices></current-button-choices>
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
          v-for="(item, index) in practiceData.choices"
          :class="
            !useRandomFakeChoice.includes(index)
              ? 'bg-grey-5 no-pointer-events'
              : 'bg-amber cursor-pointer'
          "
          @click="funcSelectedAnswer(item, index)"
          no-caps
          >{{ item }}</q-btn
        >
      </div>

      <!-- BOX : BUTTON ANSWER -->
      <div class="q-my-md q-pa-lg" align="center">
        <q-img
          width="180px"
          src="../../../public/images/send-answer-btn-noactive.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import currentButtonChoices from "../button/btn-current-choices";
import { ref, computed } from "vue";
export default {
  components: {
    currentButtonChoices,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const selectedBoxAnswer = ref(0);

    const currentSelectAnswerBox = computed(() => {
      let nextAnswer = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      )[0].index;

      console.log(nextAnswer);

      return nextAnswer;
    });

    const useRandomFakeChoice = computed(() => {
      let setRandom = 3;
      let setFilter = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      );
      let totalAnswerLength = setFilter.length;
      let correctAnswer = setFilter[0].correctAnswer;
      let currentChoiceIndex = props.practiceData.choices.indexOf(correctAnswer);

      let tempRandom = [];

      if (totalAnswerLength == 1) {
        return;
      }

      console.log(totalAnswerLength);

      const reRandom = () => {
        tempRandom = [currentChoiceIndex];

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

      console.log(tempRandom);

      tempRandom.sort(() => Math.random() - 0.5);

      return tempRandom;
    });

    const funcSelectedAnswer = (data, index) => {
      props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      )[0].currentAnswer = data;

      props.practiceData.choices.splice(index, 1);
    };

    const funcSelectedBackAnswer = (data, index) => {
      console.log(index);
      props.practiceData.choices.push(data);

      props.practiceData.question[index].currentAnswer = "";
    };

    return {
      selectedBoxAnswer,
      useRandomFakeChoice,
      currentSelectAnswerBox,
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

.btn-has-answer:active {
  transition: 0.2s;
  transform: scale(0.9);
}

.btn-not-selected-answer {
  width: 100px;
  height: 35px;
  border-bottom: 1px solid;
}
</style>
