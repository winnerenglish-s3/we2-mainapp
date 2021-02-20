<template>
  <q-page
    :class="$q.platform.is.desktop ? 'bg-grammaraction' : 'bg-mobile'"
    :theme="themeSync"
  >
    <app-bar></app-bar>
    <grammar-action-pc
      :currentQuestion="currentQuestion"
      :totalQuestion="questionList.length"
      :question="questionList[currentQuestion]"
      :currentStep="currentStep"
      :learningMode="learningMode"
      @sendAnswer="checkAnswer"
      @goToDescription="currentStep = 5"
      @nextQuestion="nextQuestion"
    ></grammar-action-pc>
  </q-page>
</template>

<script>
import grammarActionPc from "../components/grammar/grammarActionPc";
import grammarActionMobile from "../components/grammar/grammarActionMobile";
import appBar from "../components/app-bar";
import { ref, onBeforeUnmount } from "vue";
import { db } from "src/router";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  components: {
    grammarActionPc,
    grammarActionMobile,
    appBar,
  },

  setup() {
    // const grammar action question
    const questionList = ref([
      {
        question: "Chaing Rai is _____ the north of Thailand.",
        choices: [
          {
            choice: "Choice A",
            index: 0,
          },
          {
            choice: "Choice B",
            index: 1,
          },
          {
            choice: "Choice C",
            index: 2,
          },
          {
            choice: "Choice D",
            index: 3,
          },
        ],
        correctAnswer: 0,
        description: "Description",
      },
      {
        question: "Surat Thani is _____ the north of Thailand.",
        choices: [
          {
            choice: "Choice A",
            index: 0,
          },
          {
            choice: "Choice B",
            index: 1,
          },
          {
            choice: "Choice C",
            index: 2,
          },
          {
            choice: "Choice D",
            index: 3,
          },
        ],
        correctAnswer: 1,
        description: "Description",
      },
    ]);

    // ข้อปัจจุบัน
    const currentQuestion = ref(0);
    // หน้าปัจจุบัน
    // 1 = หน้าคำถาม ยังกดตอบไม่ได้
    // 2 = กดคำตอบได้
    // 3 = ตอบแล้ว ไปหน้ารอ
    // 4 = กราฟ
    // 5 = เฉลย ถูก - ผิด
    // 6 = คำอธิบาย
    const currentStep = ref(1);
    const learningMode = ref("selfLearning");
    // Listen Synchronize
    const synchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          currentQuestion.value = data.data().grammarAction.currentQuestion;
          currentStep.value = data.data().grammarAction.currentStep;
          learningMode.value = "control";
        } else {
          learningMode.value = "selfLearning";
        }
      });

    const checkAnswer = (val) => {
      if (learningMode.value == "control") {
        // กรณี Teacher control mode
        currentStep.value = 7; //waiting
      } else {
        currentStep.value = 4;
      }
      if (
        questionList.value[currentQuestion.value].correctAnswer == val.index
      ) {
        questionList.value[currentQuestion.value].isCorrect = true;
        console.log("ตอบถูก");
      } else {
        questionList.value[currentQuestion.value].isCorrect = false;
        console.log("ตอบผิด");
      }
    };

    const nextQuestion = () => {
      if (currentQuestion.value < questionList.value.length - 1) {
        currentQuestion.value++;
        currentStep.value = 1;
      } else {
        alert("จบแบบฝึกหัด");
      }
    };

    onBeforeUnmount(() => {
      synchronize();
    });
    return {
      currentQuestion,
      currentStep,
      questionList,
      checkAnswer,
      learningMode,
      nextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-grammaraction {
  background-color: #b2dfff;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.bg-grammaraction[theme="1"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-1.png");
}

.bg-grammaraction[theme="2"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-2.png");
}

.bg-mobile {
  background-color: #eabd94;
}
</style>
