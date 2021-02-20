<template>
  <div>
    <q-btn
      class="btn-choice q-px-md relative-position row cursor-pointer"
      style="width: 100%"
      no-caps
      align="left"
    >
      <div class="choice-circle" v-if="index == 0"></div>
      <div class="choice-square" v-if="index == 1"></div>
      <div class="choice-triangle" v-if="index == 2"></div>
      <q-icon name="fas fa-star" v-if="index == 3" class="choice-star"></q-icon>
      <span class="q-pl-md" :class="{ f20: $q.platform.is.desktop }">
        {{ choice }}
      </span>

      <div class="absolute-right circle-1" style="top: 10px; right: 10px"></div>
      <div class="absolute-right circle-2" style="top: 23px; right: 12px"></div>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: ["choice", "index"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.btn-choice {
  border-radius: 10px;
  box-shadow: 2px 3px 0px 0px #4e3801;
  height: 50px;
  background-image: linear-gradient(#ffd361, #ffbb0d);
}

.btn-choice:hover {
  background-image: linear-gradient(#4bddfe, #2c9bc0);
  box-shadow: 0px 3px 10px 0px #0082ba;
}

.choice-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: linear-gradient(#f66287, #f03362);
  box-shadow: 1px 1px 3px 1px grey;
}
.choice-square {
  width: 30px;
  height: 30px;
  background-image: linear-gradient(#067fd8, #0b5f9b);
  box-shadow: 1px 1px 3px 1px grey;
}
.choice-triangle {
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 20px solid #b43ded;
  background-image: linear-gradient(#067fd8, #0b5f9b);
}
.choice-star {
  font-size: 30px;
  color: #8f5839;
}
.circle-1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
.circle-2 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
</style>
