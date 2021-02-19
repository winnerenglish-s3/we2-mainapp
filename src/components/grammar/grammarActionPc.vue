<template>
  <div>
    <div align="center" class="q-pa-md">
      <div>
        <q-img
          style="max-width: 500px; width: 100%"
          src="../../../public/images/grammar/label-grammaraction.png"
        ></q-img>
      </div>

      <!-- Box Content Answer -->
      <div
        class="box-content-main q-pa-sm q-my-lg"
        v-if="!isSendAnswer && (currentStep == 1 || currentStep == 2)"
      >
        <div class="border-dash q-py-md q-px-xl">
          <div class="row">
            <div class="col-auto" v-for="i in totalQuestion" :key="i">
              <q-img
                width="45px"
                :src="
                  require(`../../../public/images/question-${
                    currentQuestion + 1 == i
                      ? 'current'
                      : currentQuestion + 1 > i
                      ? answerList[i - 1]
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
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
            <span class="f20" @click="testActive()">
              {{ question.question }}
            </span>
          </div>

          <div class="q-mt-lg">
            <div
              class="q-mt-sm"
              v-for="(item, index) in question.choices"
              :key="index"
            >
              <q-img
                @mouseenter="activeChoices = index"
                @mouseleave="activeChoices = null"
                @click="currentStep == 2 ? sendAnswer(index) : null"
                fit="contain"
                :src="
                  require(`../../../public/images/grammar/choices-action-${
                    index + 1
                  }${
                    currentStep == 2
                      ? activeChoices == index
                        ? '-hover'
                        : ''
                      : '-dis'
                  }.png`)
                "
              >
                <div class="transparent fit no-padding">
                  <div
                    v-ripple="currentStep == 2"
                    class="relative-position row"
                    :class="currentStep == 2 ? 'cursor-pointer' : ''"
                    style="height: 80%; width: 99%; margin: auto"
                  >
                    <div
                      class="self-center"
                      style="width: 80%; margin: auto"
                      align="left"
                    >
                      <span class="text-black f18">{{ item.choice }}</span>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>

      <!-- Waiting -->
      <div class="box-content-main q-pa-sm q-my-lg" v-if="isSendAnswer">
        <div class="border-dash q-pa-md q-px-xl">
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
      <div class="box-content-main q-pa-sm q-my-lg row" v-if="currentStep == 3">
        <div
          class="col-12 border-dash relative-position"
          style="border-bottom: 0px; z-index: 2"
        >
          <div class="q-pa-md row justify-center" style="margin-top: 120px">
            <div
              class="row justify-center relative-position q-mx-lg"
              style="margin-bottom: -40px"
              v-for="i in 4"
              :key="i"
            >
              <div
                class="box-show-score row relative-position self-end"
                :data-color="colorGraph[i - 1].color"
                style="height: 250px"
              >
                <div class="absolute-top" style="top: -90px">
                  <q-img
                    width="60px"
                    src="../../../public/images/grammar/img-score.png"
                  >
                    <div
                      class="transparent absolute-center shadow-0"
                      style="top: 40%"
                    >
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
      <div class="box-content-main q-pa-sm q-my-lg" v-if="currentStep == 4">
        <div class="border-dash q-pa-xl">
          <div class="q-py-md box-show-answer relative-position">
            <q-img
              class="absolute-center"
              style="max-width: 400px; width: 40%"
              :src="
                require(`../../../public/images/${
                  answerList[currentQuestion] ? '' : 'in'
                }correct-img.png`)
              "
            ></q-img>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="box-content-main q-pa-sm q-my-lg" v-if="currentStep == 5">
        <div class="border-dash q-py-md q-px-xl">
          <div class="row">
            <div class="col-auto" v-for="i in totalQuestion" :key="i">
              <q-img
                width="45px"
                :src="
                  require(`../../../public/images/question-${
                    currentQuestion + 1 == i
                      ? 'current'
                      : currentQuestion + 1 > i
                      ? answerList[i - 1]
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
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
              <span class="f20" @click="testActive()">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import waiting from "../waiting";
export default {
  components: {
    waiting,
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
  },
  setup(props) {
    const colorGraph = [
      { color: "red", icon: "fas fa-spider" },
      { color: "blue", icon: "fas fa-fish" },
      { color: "purple", icon: "fas fa-dove" },
      { color: "green", icon: "fas fa-frog" },
    ];
    const isSendAnswer = ref(null);

    const currentQuestion = ref(0);

    const activeChoices = ref(null);

    const activeByTeacher = ref(null);

    const testActive = () => {
      activeByTeacher.value = "start";
    };

    const answerList = ref([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);

    const sendAnswer = (index) => {
      isSendAnswer.value = true;
      currentQuestion.value++;

      let randomAnswer = Math.ceil(Math.random() * 4);

      if (randomAnswer == index) {
        answerList.value[currentQuestion.value - 1] = true;
      } else {
        answerList.value[currentQuestion.value - 1] = false;
      }
    };

    watch(
      () => props.currentStep,
      () => {
        // console.log("watching");
        isSendAnswer.value = false;
      }
    );

    return {
      currentQuestion,
      activeByTeacher,
      testActive,
      activeChoices,
      answerList,
      sendAnswer,
      isSendAnswer,
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
  width: 100px;
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
</style>
