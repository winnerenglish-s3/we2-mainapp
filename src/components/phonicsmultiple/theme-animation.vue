<template>
  <div style="margin-bottom: -6px">
    <animation-1
      :choicesLength="choicesLength"
      :isSendAnswer="isSendAnswer"
      :currentAnswer="currentAnswer"
      :isCorrectAnswer="isCorrectAnswer"
    ></animation-1>
    <!-- <animation-2
      :choicesLength="choicesLength"
      :isSendAnswer="isSendAnswer"
      :currentAnswer="currentAnswer"
      :isCorrectAnswer="isCorrectAnswer"
    ></animation-2> -->
  </div>
</template>

<script>
import animation1 from "./animation-1";
import animation2 from "./animation-2";
export default {
  props: {
    choicesLength: {
      type: Number,
      default: 0,
    },
    currentAnswer: {
      type: Number,
      default: 0,
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => false,
    },
    isSendAnswer: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    animation1,
    animation2,
  },
};
</script>

<style lang="scss" scoped></style>
