<template>
  <div>
    <animation-1
      v-if="themeSync == 1"
      :isSendAnswer="isSendAnswer"
      :isCorrectAnswer="isCorrectAnswer"
    ></animation-1>

    <animation-2
      v-if="themeSync == 2"
      :isSendAnswer="isSendAnswer"
      :isCorrectAnswer="isCorrectAnswer"
    ></animation-2>
  </div>
</template>

<script>
import animation1 from "./animation-1";
import animation2 from "./animation-2";
export default {
  props: {
    isSendAnswer: {
      type: Boolean,
      default: () => false
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => false
    },
    themeSync: {
      type: Number,
      default: 0
    }
  },
  components: {
    animation1,
    animation2
  }
};
</script>

<style lang="scss" scoped></style>
