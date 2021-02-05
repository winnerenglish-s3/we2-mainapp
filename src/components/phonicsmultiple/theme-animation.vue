<template>
  <div style="margin-bottom:-6px;">
    <animation-1
      v-if="themeSync == 1"
      :choicesLength="choicesLength"
      :isSendAnswer="isSendAnswer"
      :selectAnswer="selectAnswer"
      :isCorrect="isCorrect"
    ></animation-1>
    <animation-2
      v-if="themeSync == 2"
      :choicesLength="choicesLength"
      :isSendAnswer="isSendAnswer"
      :selectAnswer="selectAnswer"
      :isCorrect="isCorrect"
    ></animation-2>
  </div>
</template>

<script>
import animation1 from "./animation-1";
import animation2 from "./animation-2";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0
    },
    choicesLength: {
      type: Number,
      default: 0
    },
    selectAnswer: {
      type: Number,
      default: 0
    },
    isCorrect: {
      type: Boolean,
      default: () => false
    },
    isSendAnswer: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    animation1,
    animation2
  }
};
</script>

<style lang="scss" scoped></style>
