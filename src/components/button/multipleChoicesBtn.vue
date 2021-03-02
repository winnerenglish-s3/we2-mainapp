<template>
  <div>
    <q-btn
      class="btn-choice q-px-md relative-position row"
      :class="isDisable ? 'btn-diable-bg no-pointer-events' : 'btn-bg cursor-pointer'"
      style="width: 100%; max-width: 1000px"
      no-caps
      align="left"
    >
      <div
        class="choice-circle"
        :class="isDisable ? 'choice-circle-bg-disable ' : 'choice-circle-bg'"
        v-if="index == 0"
      ></div>
      <div
        class="choice-square"
        :class="isDisable ? 'choice-square-bg-disable ' : 'choice-square-bg'"
        v-if="index == 1"
      ></div>
      <div
        class="choice-triangle"
        :class="isDisable ? 'choice-triangle-bg-disable ' : 'choice-triangle-bg'"
        v-if="index == 2"
      ></div>
      <q-icon
        name="fas fa-star"
        v-if="index == 3"
        class="choice-star"
        :class="isDisable ? 'choice-star-bg-disable ' : 'choice-star-bg'"
      ></q-icon>
      <span class="q-pl-md" :class="{ f20: $q.platform.is.desktop }">
        <span v-html="choice"> </span>
      </span>

      <div class="absolute-right circle-1" style="top: 10px; right: 10px"></div>
      <div class="absolute-right circle-2" style="top: 23px; right: 12px"></div>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: {
    choice: {
      type: String,
      defulat: "",
    },
    index: {
      type: Number,
      defulat: 0,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.btn-choice {
  border-radius: 10px;
  box-shadow: 2px 3px 0px 0px #4935018f;
  height: 50px;
}
.btn-bg {
  background-image: linear-gradient(#ffd361, #ffbb0d);
}
.btn-diable-bg {
  background-image: linear-gradient(#e7e7e7, #ababab);
}

.btn-choice:hover {
  background-image: linear-gradient(#4bddfe, #2c9bc0);
  box-shadow: 0px 3px 10px 0px #0082ba;
}

.choice-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;

  box-shadow: 1px 1px 3px 1px grey;
}

.choice-circle-bg {
  background-image: linear-gradient(#f66287, #f03362);
}
.choice-circle-bg-disable {
  background-color: #8f8d8c;
}

.choice-square {
  width: 30px;
  height: 30px;

  box-shadow: 1px 1px 3px 1px grey;
}

.choice-square-bg {
  background-image: linear-gradient(#067fd8, #0b5f9b);
}
.choice-square-bg-disable {
  background-color: #8f8d8c;
}
.choice-triangle {
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
}

.choice-triangle-bg-disable {
  border-bottom: 20px solid #8f8d8c;
}
.choice-triangle-bg {
  border-bottom: 20px solid #991a99;
}

.choice-star {
  font-size: 30px;
}

.choice-star-bg {
  color: #8f5839;
}
.choice-star-bg-disable {
  color: #8f8d8c;
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
