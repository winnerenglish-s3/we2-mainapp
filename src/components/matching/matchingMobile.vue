<template>
  <div class="box-container-matching row">
    <div class="col-12">
      <div>
        <header-bar
          :totalQuestion="10"
          :currentQuestion="5"
          :totalStar="2"
        ></header-bar>
      </div>
      <div class="q-mt-xs box-question row justify-center">
        <div class="self-center">
          <span> นักวิชาการ, ผู้คงแก่เรียน, ผู้ได้รับทุนการศึกษา </span>
        </div>
      </div>
      <div class="q-mt-md q-pa-md" align="center">
        <span style="font-size: max(3vw, 16px)" class="font-medium"
          >เลือกจับคู่คำศัพท์</span
        >
      </div>
    </div>

    <div class="col-12 relative-position" style="height:fit-content">
      <div class="box-choices row no-wrap ">
        <div
          name="section"
          class="col-7 relative-position section "
          :class="index == currentQuestion ? null : 'section-notactive '"
          align="center"
          :id="`section` + index"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <q-img
            style="width:95%;"
            :src="
              require(`../../../public/images/matching/button-theme/matching-theme-${themeSync}-choices-${
                isSendAnswer && index == currentQuestion
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
              }.png`)
            "
          >
            <div class="transparent absolute-center full-width">
              <span
                :class="
                  isSendAnswer && index == currentQuestion
                    ? isCorrect
                      ? 'text-black'
                      : 'text-red'
                    : 'text-black'
                "
                style="font-size: 16px"
                >{{ `Choice ` + item }}</span
              >
              <div
                v-if="isSendAnswer && index == currentQuestion && !isCorrect"
                class="text-black q-mt-sm"
              >
                <span>คำตอบที่ถูกต้องคือ</span>
                <br />
                <span> What the ... </span>
              </div>
            </div>
          </q-img>
        </div>

        <div class="btn btn-left">
          <q-img
            @click="isSendAnswer || isPrevious ? null : backChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-left.png"
          ></q-img>
        </div>
        <div class="btn btn-right">
          <q-img
            @click="isSendAnswer || isNext ? null : nextChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-right.png"
          ></q-img>
        </div>
      </div>
    </div>

    <div class="col-12 self-end q-pt-md q-pb-sm" align="center">
      <q-img
        width="200px"
        v-if="!isSendAnswer"
        @click="sendAnswer()"
        src="../../../public/images/matching/btn-matching-active.png"
      ></q-img>
      <q-img
        width="200px"
        v-if="isSendAnswer"
        @click="nextQuestion()"
        src="../../../public/images/next-question-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { onMounted, ref } from "vue";
export default {
  components: {
    headerBar
  },
  props: {
    themeSync: {
      type: Number,
      require: true
    }
  },
  setup(props) {
    const testCount = ref(5);
    const dataList = ref([]);
    const currentQuestion = ref(0);

    const isNext = ref(false);
    const isPrevious = ref(false);

    const isSendAnswer = ref(false);
    const isCorrect = ref(false);

    const nextQuestion = () => {
      isSendAnswer.value = false;
    };

    const sendAnswer = () => {
      isSendAnswer.value = true;

      let randomAnswer = Math.ceil(Math.random() * 10);

      if (randomAnswer % 2 == 0) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }
    };

    // TODO : Function กดเลือกการ์ดใบก่อนหน้านี้
    const backChoice = () => {
      isPrevious.value = true;
      let active = currentQuestion.value - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      let firstChoiceLength = dataList.value
        .map((x, index) => {
          return { data: x, index: index };
        })
        .filter((x, index) => x.data != "")[0];

      console.log(firstChoiceLength);

      // if (
      //   dataList.value[firstChoiceLength.index - 1] == "" ||
      //   currentQuestion.value == 2
      // ) {
      //   let lastChoice = dataList.value
      //     .map((x, index) => {
      //       return { data: x, index: index };
      //     })
      //     .filter((x, index) => x.data != "");

      //   console.log();

      //   dataList.unshift(lastChoice[lastChoice.length -1].data)
      // }

      setTimeout(() => {
        currentQuestion.value = active;
        isPrevious.value = false;
      }, 300);
    };

    // TODO : Function กดเลือกการ์ดใบถัดไป
    const nextChoice = () => {
      isNext.value = true;
      let active = currentQuestion.value + 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      let lastChoiceLength = dataList.value.length - 2;

      if (lastChoiceLength == active) {
        let dataFirst = dataList.value
          .map((x, index) => {
            return { data: x, index: index };
          })
          .filter((x, index) => x.data != "")[0];

        console.log(dataFirst);
        dataList.value.push(dataFirst.data);

        dataList.value[dataFirst.index] = "";
      }

      setTimeout(() => {
        currentQuestion.value = active;
        isNext.value = false;
      }, 300);
    };

    const loadPracticeData = () => {
      for (let i = 0; i < testCount.value; i++) {
        let randomNumber = Math.ceil(Math.random() * testCount.value);

        dataList.value.push(randomNumber);
      }

      currentQuestion.value = Math.ceil(testCount.value / 2) - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + currentQuestion.value);
        el.scrollIntoView();
      }, 100);
    };

    onMounted(loadPracticeData);

    return {
      testCount,
      dataList,
      currentQuestion,
      isNext,
      isPrevious,
      isSendAnswer,
      isCorrect,
      nextQuestion,
      sendAnswer,
      backChoice,
      nextChoice
    };
  }
};
</script>

<style lang="scss" scoped>
.box-container-matching {
  height: calc(100vh - 50px);
}

.box-question {
  border: 5px solid#A36112;
  background-color: #fff0da;
  min-height: 100px;
  max-height: fit-content;
}

.box-choices {
  width: 100vw;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overscroll-behavior-block: contain;
  overflow-x: hidden;
}

.section {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 5px;
  transition: 0.3s;
  transform: scale(1);
}

.section-notactive {
  transition: 0.1s;
  transform: scale(0.85);
}

.btn {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  color: #6d4300;
  transform-box: fill-box;
}

.btn-left {
  left: 5%;
}

.btn-right {
  right: 5%;
}

// Scroll Bar bottom
/* width */
.box-choices::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.box-choices::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 0px;
}

/* Handle */
.box-choices::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 0px;
}
</style>
