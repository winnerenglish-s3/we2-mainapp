<template>
  <div style="margin-bottom:-6px;background-color:#667ea2;">
    <animation-1
      v-if="themeSync == 1"
      :isCorrect="isCorrect"
      :isSendAnswer="isSendAnswer"
    ></animation-1>
    <animation-2
      v-if="themeSync == 2"
      :isCorrect="isCorrect"
      :isSendAnswer="isSendAnswer"
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
