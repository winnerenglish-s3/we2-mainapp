<template>
  <div>
    <div class="row">
      <div v-for="i in practiceData.totalQuestion">
        <q-img
          class="brx"
          width="45px"
          src="../../public/images/question-default.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
