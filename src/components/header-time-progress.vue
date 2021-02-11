<template>
  <div class="row relative-position q-pt-sm">
    <div
      class="col-3 self-center row q-py-sm q-pb-md"
      style="max-width: 300px; width: 60%"
    >
      <!-- <question-star
        :currentQuestion="currentQuestion"
        :totalQuestion="totalQuestion"
        :totalStar="totalStar"
      ></question-star> -->
      <div class="box-current-question self-center q-mx-md">
        <span class="text-white" style="font-size: max(1.1vw, 14px)">99/99</span>
      </div>
      <div class="box-start self-center" align="center">
        <q-rating
          style="font-size: max(1.6vw, 22px)"
          :max="3"
          v-model="totalStar"
          color="brown-6"
          color-selected="amber-5"
          class="no-pointer-events"
        >
        </q-rating>
      </div>
    </div>
    <q-space></q-space>
    <div
      class="col-3 self-center q-pb-sm"
      style="max-width: 200px; width: 40%"
      align="right"
    >
      <div v-if="$route.name != 'readingmultiple' && $route.name != 'grammaraction'">
        <time-progress
          style="margin-top: 7px"
          align="right"
          :practiceTime="practiceTime"
          :isPracticeTimeout="isPracticeTimeout"
        ></time-progress>
      </div>

      <div v-if="$route.name == 'readingmultiple'" align="right">
        <q-btn-group rounded>
          <q-btn
            @click="reFontSize('decrease')"
            rounded
            :padding="$q.platform.is.mobile ? '1vw 16px' : '7px 16px'"
            class="bg-button"
          >
            <span> A <span class="absolute" style="top: 2px">-</span> </span>
          </q-btn>
          <q-btn
            @click="reFontSize('increase')"
            rounded
            :padding="$q.platform.is.mobile ? '1vw 16px' : '7px 16px'"
            class="bg-button"
          >
            <span> A <span class="absolute" style="top: 2px">+</span> </span>
          </q-btn>
        </q-btn-group>

        <q-btn
          :padding="$q.platform.is.mobile ? '1vw 12px' : '7px 16px'"
          class="bg-button q-ml-md q-mr-sm"
          style="border-radius: 7px"
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
  props: {
    currentQuestion: {
      default: 0,
      type: Number,
    },
    totalQuestion: {
      default: 0,
      type: Number,
    },
    totalStar: {
      default: 0,
      type: Number,
    },
    practiceTime: {
      default: 30,
      type: Number,
    },
    isPracticeTimeout: {
      default: () => false,
      type: Boolean,
    },
    setFontSize: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const fontSize = ref(props.setFontSize);

    const reFontSize = (type) => {
      if (type == "decrease") {
        emit("reFontSize", (fontSize.value -= 2));
      } else {
        emit("reFontSize", (fontSize.value += 2));
      }
    };

    return { reFontSize, fontSize };
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
