<template>
  <div class="row relative-position q-pt-sm">
    <div class="self-center row q-py-sm q-pb-md" style="max-width: 250px; width: 45%">
      <div class="box-current-question self-center q-mx-md">
        <span class="text-white" style="font-size: max(1.1vw, 14px)">
          {{ `${practiceData.currentQuestion + 1}/${practiceData.totalQuestion}` }}
        </span>
      </div>
      <div class="box-start self-center" align="center">
        <q-rating
          style="font-size: max(1.6vw, 22px)"
          :max="3"
          v-model="practiceData.totalStar"
          color="brown-6"
          color-selected="amber-5"
          class="no-pointer-events"
        >
        </q-rating>
      </div>
    </div>
    <q-space></q-space>
    <div class="self-center q-pb-sm" style="max-width: 200px; width: 55%" align="right">
      <div
        v-if="
          $route.name != 'readingmultiple' &&
          $route.name != 'grammaraction' &&
          $route.name != 'clozeTest'
        "
      >
        <time-progress
          style="margin-top: 7px"
          align="right"
          :practiceTime="practiceTime"
          :isPracticeTimeout="isPracticeTimeout"
        ></time-progress>
      </div>

      <div
        v-if="$route.name == 'readingmultiple' || $route.name == 'clozeTest'"
        align="right"
        class="q-px-md q-mt-sm"
      >
        <q-btn-group rounded>
          <q-btn
            @click="$emit('increaseFont')"
            rounded
            :padding="$q.platform.is.mobile ? '1vw 16px' : '7px 16px'"
            class="bg-button"
          >
            <span> A <span class="absolute" style="top: 2px">-</span> </span>
          </q-btn>
          <q-btn
            @click="$emit('decreaseFont')"
            rounded
            :padding="$q.platform.is.mobile ? '1vw 16px' : '7px 16px'"
            class="bg-button"
          >
            <span> A <span class="absolute" style="top: 2px">+</span> </span>
          </q-btn>
        </q-btn-group>

        <q-btn
          v-if="$route.name == 'readingmultiple'"
          :padding="$q.platform.is.mobile ? '1vw 12px' : '7px 16px'"
          class="bg-button q-ml-md"
          style="border-radius: 7px"
          @click="$emit('playSound')"
        >
          <q-icon size="20px" name="fas fa-volume-up"></q-icon>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import questionStar from "./question-star";
import timeProgress from "./time-progress";
import { ref } from "vue";
export default {
  components: {
    questionStar,
    timeProgress,
  },
  emits: ["increaseFont", "decreaseFont", "playSound"],
  props: {
    // totalQuestion: {
    //   default: 0,
    //   type: Number,
    // },
    // totalStar: {
    //   default: 0,
    //   type: Number,
    // },
    // practiceTime: {
    //   default: 30,
    //   type: Number,
    // },
    // isPracticeTimeout: {
    //   default: () => false,
    //   type: Boolean,
    // },
    practiceData: {
      type: Object,
      default: () => {},
    },
    setFontSize: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const fontSize = ref(props.setFontSize);
    return { fontSize };
  },
};
</script>

<style lang="scss" scoped>
.box-current-question {
  width: fit-content;
  background-color: #6d4300;
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 0px #4d2f02;
}

.box-start {
  width: fit-content;
  background-color: #6d4300;
  padding: 3px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 0px #4d2f02;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}
</style>
