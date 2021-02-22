<template>
  <div>
    <div align="center" class="q-pa-md">
      <div v-if="$q.platform.is.desktop">
        <q-img
          style="max-width: 500px; width: 100%"
          src="../../../public/images/grammar/label-grammaraction.png"
        ></q-img>
      </div>

      <!-- Box Content Answer -->
      <div
        :class="{ 'q-pa-sm q-my-lg box-content-main': $q.platform.is.desktop }"
        v-if="currentStep == 1 || currentStep == 2"
      >
        <div :class="{ 'border-dash q-py-md q-px-xl': $q.platform.is.desktop }">
          <div class="row">
            <div class="col-auto" v-for="i in totalQuestion" :key="i">
              <q-img
                width="45px"
                :src="
                  require(`../../../public/images/question-${
                    currentQuestion + 1 == i ? 'current' : 'default'
                  }.png`)
                "
              >
                <div
                  class="transparent absolute-center no-padding text-black"
                  style="height: 65%"
                >
                  <span>{{ i }}</span>
                </div>
              </q-img>
            </div>
          </div>

          <div class="q-mt-lg box-question q-pa-md" align="center">
            <span class="f20">
              {{ question.question }}
            </span>
          </div>

          <div class="q-mt-lg">
            <div
              class="q-mt-sm q-pb-md"
              v-for="(item, index) in question.choices"
              :key="index"
            >
              <multiplechoice-btn
                @click="
                  currentStep != 1 || learningMode != 'control'
                    ? $emit('sendAnswer', item)
                    : null
                "
                :choice="item.choice"
                :index="index"
                :class="{
                  'disabled cursor-not-allowed':
                    currentStep == 1 && learningMode == 'control',
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Waiting -->
      <div
        v-if="currentStep == 7"
        :class="{
          'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop,
          'absolute-center full-width': $q.platform.is.mobile,
        }"
      >
        <div class="q-pa-md q-px-xl" :class="{ 'border-dash': $q.platform.is.desktop }">
          <div
            class="row justify-center"
            style="min-height: calc(100vh - 400px); max-height: fit-content"
          >
            <div class="self-center" style="max-width: 400px; width: 100%">
              <waiting></waiting>
              <div align="center" class="q-py-md">
                <span
                  class="f36 text-brown-8 text-bold"
                  style="font-size: max(1.7vw, 20px)"
                  >รอเพื่อนก่อนนะ</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Show Score -->
      <div
        class="box-content-main row"
        :class="$q.platform.is.desktop ? 'q-pa-sm q-my-lg ' : 'absolute-bottom'"
        v-if="currentStep == 3"
      >
        <div
          class="col-12 relative-position"
          style="border-bottom: 0px; z-index: 2"
          :class="{ 'border-dash': $q.platform.is.desktop }"
        >
          <div
            class="row center"
            style="margin-top: 120px"
            :class="
              $q.platform.is.desktop ? 'q-pa-md justify-center' : 'q-pa-xs justify-around'
            "
          >
            <div
              class="row justify-center relative-position"
              :class="$q.platform.is.desktop ? 'q-mx-lg' : 'q-mx-sm'"
              style="margin-bottom: -40px"
              v-for="i in 4"
              :key="i"
            >
              <div
                class="box-show-score row relative-position self-end"
                :data-color="colorGraph[i - 1].color"
                style="height: 250px"
                :style="$q.platform.is.desktop ? 'width:100px' : 'width:60px'"
              >
                <div class="absolute-top" style="top: -90px">
                  <q-img width="60px" src="../../../public/images/grammar/img-score.png">
                    <div class="transparent absolute-center shadow-0" style="top: 40%">
                      <span class="text-black f24 text-bold">10</span>
                    </div></q-img
                  >
                </div>
                <div
                  class="col-12 self-start box-show-score-header q-pb-md relative-position"
                  style="margin-top: -15px"
                  :data-color="colorGraph[i - 1].color"
                >
                  &nbsp;
                </div>
                <div
                  class="col-12 self-end box-show-score-footer q-pb-sm relative-position"
                  style="margin-bottom: -15px"
                  :data-color="colorGraph[i - 1].color"
                >
                  <q-icon
                    :name="colorGraph[i - 1].icon"
                    size="35px"
                    class="text-white"
                    style="margin-top: -40%"
                  ></q-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 box-content-show-score relative-position">
          <div class="q-py-lg q-mb-sm absolute-bottom" align="center">
            <span class="text-white f24">สรุปคำตอบที่ถูกเลือก</span>
          </div>
        </div>
      </div>

      <!-- Show Answer Correct And Incorrect -->
      <div
        :class="{ 'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop }"
        v-if="currentStep == 4"
      >
        <div class="q-pa-xl" :class="{ 'border-dash': $q.platform.is.desktop }">
          <div class="q-py-md box-show-answer relative-position">
            <q-img
              class="absolute-center"
              style="max-width: 400px"
              :style="$q.platform.is.desktop ? 'width:40%' : 'width:100%'"
              :src="
                require(`../../../public/images/${
                  question.isCorrect ? '' : 'in'
                }correct-img.png`)
              "
            ></q-img>
          </div>
        </div>

        <div v-if="learningMode != 'control'">
          <q-btn label="คำอธิบาย" class="custom-btn" @click="$emit('goToDescription')">
            <div class="absolute-left" style="top: 5px; left: 5px">
              <div
                style="width: 10px; height: 10px; border-radius: 50%"
                class="bg-white"
              ></div>
            </div>
            <div class="absolute-left" style="top: 7px; left: 18px">
              <div
                style="width: 6px; height: 6px; border-radius: 50%"
                class="bg-white"
              ></div>
            </div>
          </q-btn>
        </div>
      </div>

      <!-- Description -->
      <div
        :class="{ 'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop }"
        v-if="currentStep == 5"
      >
        <div :class="{ 'border-dash q-py-md q-px-xl': $q.platform.is.desktop }">
          <div class="row">
            <div class="col-auto" v-for="i in totalQuestion" :key="i">
              <q-img
                width="45px"
                :src="
                  require(`../../../public/images/question-${
                    currentQuestion + 1 == i ? 'correct' : 'default'
                  }.png`)
                "
              >
                <div
                  class="transparent absolute-center no-padding text-black"
                  style="height: 65%"
                >
                  <span>{{ i }}</span>
                </div>
              </q-img>
            </div>
          </div>

          <div class="q-py-md box-show-answer relative-position">
            <div class="q-mt-lg box-question q-pa-md" align="center">
              <span class="f20">
                {{ question.question }}
              </span>
            </div>

            <div class="q-mt-lg box-description" align="center">
              <div
                class="f16 shadow-3"
                style="
                  border-radius: 10px 10px 0px 0px;
                  background-color: #30416b;
                  color: white;
                "
              >
                <div class="q-py-sm">คำอธิบาย</div>
              </div>
              <div
                class="bg-white flex flex-center"
                style="min-height: 150px; border-radius: 0px 0px 10px 10px"
              >
                {{ question.description }}
              </div>
            </div>
          </div>

          <div v-if="learningMode != 'control'">
            <q-btn label="ข้อต่อไป" class="custom-btn" @click="$emit('nextQuestion')">
              <div class="absolute-left" style="top: 5px; left: 5px">
                <div
                  style="width: 10px; height: 10px; border-radius: 50%"
                  class="bg-white"
                ></div>
              </div>
              <div class="absolute-left" style="top: 7px; left: 18px">
                <div
                  style="width: 6px; height: 6px; border-radius: 50%"
                  class="bg-white"
                ></div>
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import waiting from "../waiting";
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn";
export default {
  components: {
    waiting,
    multiplechoiceBtn,
  },
  props: {
    currentQuestion: {
      type: Number,
      default: 0,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
    question: {
      type: Object,
      default: () => {},
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    learningMode: {
      type: String,
      default: "selfLearning",
    },
  },
  emits: ["sendAnswer", "goToDescription", "nextQuestion"],
  setup(prop) {
    const colorGraph = [
      { color: "red", icon: "fas fa-spider" },
      { color: "blue", icon: "fas fa-fish" },
      { color: "purple", icon: "fas fa-dove" },
      { color: "green", icon: "fas fa-frog" },
    ];

    return {
      colorGraph,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  border: 5px solid #a36112;
  background-color: #fff;
  border-radius: 10px;
}
.box-description {
  background-color: #fff;
  border-radius: 10px;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.box-show-answer {
  min-height: calc(50vh);
  max-height: fit-content;
}

.box-content-show-score {
  background-color: #0095b6;
  height: 150px;
}

.box-show-score {
  min-height: 100px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);

  .box-show-score-footer,
  .box-show-score-header {
    border-radius: 50%;
  }

  .box-show-score-footer {
    box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header {
    box-shadow: 0 -3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header[data-color="red"] {
    background-color: #ff8e8e;
  }
  .box-show-score-header[data-color="blue"] {
    background-color: #61b0ea;
  }
  .box-show-score-header[data-color="purple"] {
    background-color: #e3a8ff;
  }
  .box-show-score-header[data-color="green"] {
    background-color: #81c972;
  }

  .box-show-score-footer[data-color="red"] {
    background-color: #ff6464;
  }
  .box-show-score-footer[data-color="blue"] {
    background-color: #067fd8;
  }
  .box-show-score-footer[data-color="purple"] {
    background-color: #ce67ff;
  }
  .box-show-score-footer[data-color="green"] {
    background-color: #549745;
  }
}

.box-show-score[data-color="red"] {
  background-color: #ff6464;
}

.box-show-score[data-color="blue"] {
  background-color: #067fd8;
}
.box-show-score[data-color="purple"] {
  background-color: #ce67ff;
}
.box-show-score[data-color="green"] {
  background-color: #549745;
}

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
</style>
