<template>
  <q-page class="bg-reading">
    <app-bar></app-bar>
    <div class="box-container-main">
      <div class="row">
        <div class="col-12 bg-white" align="center">
          <div class="relative-position">
            <header-bar
              :setFontSize="fontSize"
              @decreaseFont="decreaseFont"
              @increaseFont="increaseFont"
              @playSound="playSound"
            ></header-bar>
          </div>
          <div class="box-container-reading">
            <div class="" align="center">
              <span class="f24">{{ readingContent.titleEn }} </span>
            </div>
            <div class="q-mt-sm q-py-md box-content q-px-lg" align="left">
              <span :style="`font-size:${fontSize}px;`" v-html="highLightText">
              </span>
            </div>
          </div>
        </div>
        <div
          class="col-12 row items-center justify-center q-py-md"
          :class="{ 'q-px-lg': $q.platform.is.mobile }"
          align="center"
        >
          <div class="col">
            <div class="box-question q-pa-md">
              <span class="f20" v-html="questionList[currentQuestion].question">
              </span>
            </div>
            <div class="box-container-content">
              <div
                class="q-my-md row q-col-gutter-md justify-between"
                v-if="!isShowDescription"
              >
                <!-- Choice -->
                <div
                  class="col-xs-12 col-sm-6 q-px-sm"
                  v-for="(item, index) in questionList[currentQuestion].choices"
                  :key="index"
                >
                  <q-btn
                    @click="checkAnswer(item.index)"
                    align="left"
                    class="custom-btn"
                    no-caps
                    style="width: 100%"
                    :style="
                      $q.platform.is.desktop ? ' height: 60px' : 'height:40px'
                    "
                  >
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

                    <div class="q-pl-md">{{ item.choice }}</div>
                  </q-btn>
                </div>
              </div>

              <!-- Description -->
              <div class="q-my-md" align="left" v-else>
                <div class="bg-white q-pa-md shadow-1 rounded-borders">
                  <div>
                    คำตอบที่ถูกต้อง คือ
                    <span class="text-green-4">{{
                      questionList[currentQuestion].choices[
                        questionList[currentQuestion].correctAnswer
                      ].choice
                    }}</span>
                  </div>
                  <div class="q-my-md">
                    <span
                      v-html="questionList[currentQuestion].description"
                    ></span>
                  </div>

                  <div
                    class="q-my-md"
                    v-for="(ref, index) in questionList[currentQuestion]
                      .highLightList"
                  >
                    อ้างอิง#{{ index + 1 }} : {{ ref }}
                  </div>

                  <div class="q-mt-lg" align="center">
                    <q-btn
                      @click="nextQuestion()"
                      align="center"
                      class="custom-btn"
                      no-caps
                      style="width: 200px; height: 40px"
                    >
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
                      <div class="f16" align="center">ข้อต่อไป</div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Answer Animation -->
    <q-dialog maximized v-model="isShowAnswerAnimation">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="flex flex-center fit">
            <q-img
              style="max-width: 350px; width: 100%"
              src="../../public/images/light-answer.png"
              class="animation-rotate"
            ></q-img>
            <q-img
              class="absolute"
              style="max-width: 167.92px; width: 100%"
              :src="
                require(`../../public/images/icon-${
                  questionList[currentQuestion].isCorrect
                    ? 'correct'
                    : 'incorrect'
                }-answer.png`)
              "
            >
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <finish-practice
      :isFinishPractice="isShowFinishPractice"
      :totalStar="star.summaryStar"
      @reStart="reStart"
      @finish="finish"
    ></finish-practice>
  </q-page>
</template>

<script>
import readingMultiplePc from "../components/reading/readingMultiplePc";
import readingMultipleMobile from "../components/reading/readingMultipleMobile";
import appBar from "../components/app-bar";
import finishPractice from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress";
import { ref, computed } from "vue";
export default {
  components: {
    readingMultiplePc,
    readingMultipleMobile,
    appBar,
    headerBar,
    finishPractice,
  },
  setup(props) {
    // Font Size
    const fontSize = ref(16);
    const decreaseFont = () => {
      fontSize.value++;
    };
    const increaseFont = () => {
      fontSize.value--;
    };
    // Reading Content
    const readingContent = ref({
      contentTh: "",
      contentEn:
        "<p>The White House has been the home at the American President and his family for over 200 years. It was built in 1790 in Washington, D.C. The location was chosen by George Washington who was the President at that time. However, he was the only President who never lived in the White House.</p><p>When it was finished in 1800, the new President, John Adams, and his wife moved into the White House. Since then, every American President and his family have lived in the White House.</p><p>The first White House was burned down during the 1812 war and another one was built after the war. The original White House had 62 rooms, but it was later expanded and an office space, which is called the West Wing now, was added. In 1948, President Truman added more rooms. The White House now has 132 rooms, 35 bathrooms, 3 elevators, 412 doors and 147 windows! It also has a swimming pool, a bowling alley, a movie theatre, a doctor's clinic and barbershop. So the President can do a lot of things without leaving home.</p>",
      titleTh: "ทำเนียบขาว",
      titleEn: "The White House",
      soundURL: "",
    });

    // Question List
    const questionList = ref([
      {
        question: "AAA",
        choices: [
          {
            choice: "A",
            index: 0,
          },
          {
            choice: "B",
            index: 1,
          },
          {
            choice: "C",
            index: 2,
          },
          {
            choice: "D",
            index: 3,
          },
        ],
        correctAnswer: 0,
        highLightList: [
          "The White House has been the home at the American President and his family for over 200 years.",
          "However, he was the only President who never lived in the White House",
        ],
        description: "คำอธิบาย",
      },
      {
        question: "BBB",
        choices: [
          {
            choice: "A",
            index: 0,
          },
          {
            choice: "B",
            index: 1,
          },
          {
            choice: "C",
            index: 2,
          },
          {
            choice: "D",
            index: 3,
          },
        ],
        correctAnswer: 1,
        highLightList: ["D.C. The location was chosen by George Washington"],
        description: "คำอธิบาย",
      },
    ]);

    // แสดงผลหน้าอธิบายคำตอบ
    const isShowDescription = ref(false);
    // แสดงผล animation ตรวจคำตอบ
    const isShowAnswerAnimation = ref(false);
    var timeoutAnimation;
    // ตรวจคำตอบ
    const checkAnswer = (index) => {
      clearTimeout(timeoutAnimation);
      if (index == questionList.value[currentQuestion.value].correctAnswer) {
        console.log("ตอบถูก");
        questionList.value[currentQuestion.value].isCorrect = true;
      } else {
        console.log("ตอบผิด");
        questionList.value[currentQuestion.value].isCorrect = false;
      }
      isShowDescription.value = true;
      isShowAnswerAnimation.value = true;
      timeoutAnimation = setTimeout(() => {
        isShowAnswerAnimation.value = false;
      }, 700);
    };

    // Current Question
    const currentQuestion = ref(0);
    const isShowFinishPractice = ref(false);
    // Next Question
    const nextQuestion = () => {
      if (currentQuestion.value < questionList.value.length - 1) {
        isShowDescription.value = false;
        currentQuestion.value++;
      } else {
        // alert("จบแบบฝึกหัด");
        isShowFinishPractice.value = true;
      }
    };

    // Star Calculation
    const star = computed(() => {
      let score = questionList.value.filter((x) => x.isCorrect);
      score = (score.length / questionList.value.length) * 100;
      let summaryStar;
      if (score >= 80) {
        summaryStar = 3;
      } else if (score >= 65) {
        summaryStar = 2;
      } else if (score >= 50) {
        summaryStar = 1;
      }
      return { score, summaryStar };
    });

    // Highlight Text In Content
    const highLightText = computed(() => {
      if (isShowDescription.value) {
        let highLight = questionList.value[currentQuestion.value].highLightList;
        let content = readingContent.value.contentEn;

        highLight.forEach((element) => {
          content = content.replace(
            element,
            `<span style='background-color:rgba(255,170,46,0.3)'>${element}</span>`
          );
        });
        return content;
      } else {
        return readingContent.value.contentEn;
      }
    });

    // Re Start Practice
    const reStart = () => {
      console.log("restart");
    };
    // Finish Practice
    const finish = () => {
      console.log("finish");
    };

    // Play Reading Sound
    const playSound = () => {
      console.log("play sound");
      let audio = new Audio(readingContent.value.soundURL);
      audio.play();
    };

    return {
      readingContent,
      questionList,
      currentQuestion,
      fontSize,
      nextQuestion,
      decreaseFont,
      increaseFont,
      isShowDescription,
      checkAnswer,
      isShowAnswerAnimation,
      highLightText,
      playSound,
      isShowFinishPractice,
      star,
      reStart,
      finish,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-reading {
  background-image: url("../../public/images/reading/bg-reading.png");
  background-size: cover;
}
.box-question {
  max-width: 1000px;
  width: 100%;
  border: 4px solid #6f3c00;
  background-color: #fff;
  border-radius: 5px;
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-container-reading {
  max-width: 1000px;
}

.box-content {
  height: 50%;
  overflow: hidden;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}
</style>
