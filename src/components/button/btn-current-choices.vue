<template>
  <div>
    <div
      class="btn-no relative-position"
      :class="{
        'btn-no-correct': status == true,
        'btn-no-current': no == currentQuestion,
        'btn-no-incorrect': status == false && currentQuestion > no,
        'btn-no-disable': no > currentQuestion,
      }"
    >
      <div
        class="absolute"
        style="
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: white;
          top: 7px;
          left: 3px;
        "
      ></div>
      <div
        class="absolute"
        style="
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: white;
          top: 3px;
          left: 8px;
        "
      ></div>
      <div class="absolute-center" style="left: 13px">{{ no }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    currentQuestion: {
      type: Number,
      default: 0,
    },
    no: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-no {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid #662707;
}
.btn-no-correct {
  background-image: linear-gradient(#90ff9c, #00b912);
}
.btn-no-current {
  background-image: linear-gradient(#85f0ff, #0085ff);
}
.btn-no-disable {
  background-image: linear-gradient(#fefefe, #a8a8a8);
}
.btn-no-incorrect {
  background-image: linear-gradient(#fd323a, #fd323a);
}
</style>
