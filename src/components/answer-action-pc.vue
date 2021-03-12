<template>
  <div>
    <q-dialog
      maximized
      v-model="isAnswerAction"
      position="bottom"
      seamless
      no-esc-dismiss
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="no-padding">
          <div class="row justify-center">
            <div class="col-6 relative-position" style="max-width: 1000px; width: 100%">
              <div class="relative-position" style="top: 50%; left: -3%">
                <q-img
                  style="transform: rotate(-10deg)"
                  width="200px"
                  src="../../public/images/spellingbee/octopus.gif"
                />
              </div>
            </div>
          </div>
          <div
            align="center"
            class="q-pa-md row justify-center"
            :class="isCorrectAnswer ? 'bg-correct' : 'bg-incorrect'"
            style="min-height: 120px; max-height: fit-content"
          >
            <div class="row" style="max-width: 1000px; width: 100%">
              <div class="col-2" style="width: 150px"></div>
              <div class="col-1 self-start" style="width: 60px">
                <q-icon
                  size="4em"
                  color="green"
                  style="color: #58cc02"
                  v-if="isCorrectAnswer"
                  name="far fa-check-circle"
                ></q-icon>
                <q-icon
                  size="4em"
                  style="color: #ec0b1b"
                  v-else
                  name="far fa-times-circle"
                ></q-icon>
              </div>
              <div
                class="col self-start q-px-md"
                :style="isCorrectAnswer ? 'color:#58CC02' : 'color:#EC0B1B'"
                align="left"
              >
                <span class="text-bold f20" v-if="isCorrectAnswer"> ถูกต้อง</span>
                <span class="text-bold f20" v-if="!isCorrectAnswer">
                  คำตอบที่ถูกต้อง คือ</span
                >
                <br />
                <div class="q-my-xs">
                  <span class="f16" v-html="answer"></span>
                </div>
              </div>
              <q-space></q-space>
              <div class="self-center" style="width: 200px">
                <q-btn
                  v-if="!isFinishPractice"
                  @click="$emit('callback-nextquestion')"
                  v-close-popup
                  class="text-white rounded-borders"
                  :class="isCorrectAnswer ? 'btn-correct' : 'btn-incorrect'"
                  style="width: 150px"
                  push
                >
                  ข้อต่อไป
                </q-btn>

                <q-btn
                  v-if="isFinishPractice"
                  @click="$emit('callback-finishpractice')"
                  v-close-popup
                  class="text-black rounded-borders btn-default"
                  style="width: 150px"
                  push
                >
                  จบแบบฝึกหัด
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  emits: ["callback-nextquestion", "callback-finishpractice"],
  props: {
    isAnswerAction: {
      type: Boolean,
      default: () => false,
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => false,
    },
    answer: {
      type: String,
      default: "",
    },
    isFinishPractice: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-correct {
  background-color: #d7ffb8;
}

.bg-incorrect {
  background-color: #ffdfe0;
}

.btn-correct {
  background-color: #58a700;
}

.btn-incorrect {
  background-color: #ff4b4b;
}

.btn-default {
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
}
</style>
