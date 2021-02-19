<template>
  <q-page
    :class="$q.platform.is.desktop ? 'bg-grammaraction' : 'bg-mobile'"
    :theme="themeSync"
  >
    <grammar-action-pc
      :currentQuestion="currentQuestion"
      :totalQuestion="questionList.length"
      :question="questionList[currentQuestion]"
      :currentStep="currentStep"
      v-if="$q.platform.is.desktop"
    ></grammar-action-pc>
    <grammar-action-mobile v-if="$q.platform.is.mobile"></grammar-action-mobile>
  </q-page>
</template>

<script>
import grammarActionPc from "../components/grammar/grammarActionPc";
import grammarActionMobile from "../components/grammar/grammarActionMobile";
import { ref, onMounted, onBeforeUnmount } from "vue";
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
    // 0 = หน้าคำถาม ยังกดตอบไม่ได้
    // 1 = กดคำตอบได้
    // 2 = ตอบแล้ว ไปหน้ารอ
    // 3 = กราฟ
    // 4 = เฉลย ถูก - ผิด
    // 5 = คำอธิบาย
    const currentStep = ref(0);
    // Listen Synchronize
    const synchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          currentQuestion.value = data.data().grammarAction.currentQuestion;
          currentStep.value = data.data().grammarAction.currentStep;
        }
      });

    onBeforeUnmount(() => {
      synchronize();
    });
    return { currentQuestion, currentStep, questionList };
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
