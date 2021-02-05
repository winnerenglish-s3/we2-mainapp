<template>
  <div>
    <div class=" bg-white">
      <div class="relative-position bg-white box-header ">
        <header-bar
          :setFontSize="fontSize"
          @reFontSize="reFontSize"
        ></header-bar>
      </div>

      <div class=" q-pa-md">
        <div align="center" class="q-py-sm">
          <span style="font-size:max(3vw,18px)">The White House</span>
        </div>
        <div class="q-mt-md">
          <span :style="`font-size:max(2.5vw,${fontSize}px)`">
            &nbsp;&nbsp;&nbsp;The White House has been the home at the American
            President and his family for over 200 years. It was built in 1790 in
            Washington, D.C. The location was chosen by George Washington who
            was the President at that time. However, he was the only President
            who never lived in the White House. <br /><br />
            &nbsp;&nbsp;&nbsp;When it was finished in 1800, the new President,
            John Adams, and his wife moved into the White House. Since then,
            every American President and his family have lived in the White
            House. <br /><br />
            &nbsp;&nbsp;&nbsp;The first White House was burned down during the
            1812 war and another one was built after the war. The original White
            House had 62 rooms, but it was later expanded and an office space,
            which is called the West Wing now, was added. In 1948, President
            Truman added more rooms. The White House now has 132 rooms, 35
            bathrooms, 3 elevators, 412 doors and 147 windows! It also has a
            swimming pool, a bowling alley, a movie theatre, a doctor's clinic
            and barbershop. So the President can do a lot of things without
            leaving home.</span
          >
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="box-question q-pa-md " style="font-size:max(3vw,14px)">
        The White House is the home of the American ______________.
      </div>

      <div class="q-mt-md" v-if="!isSendAnswer">
        <div v-for="i in 4" :key="i" class="q-mt-sm">
          <q-img
            @click="sendAnswer(i)"
            src="../../../public/images/choices-main-default-mobile.png"
          >
            <div
              class="transparent no-padding row text-black"
              align="left"
              style="width:85%;height:80%;left:7%;"
            >
              <span
                style="font-size:max(2.5vw,12px)"
                class="relative-position self-center"
                >{{ `Choice ${i}` }}</span
              >
            </div>
          </q-img>
        </div>
      </div>

      <div class="q-my-md" v-if="isSendAnswer">
        <div class="bg-white q-pa-md shadow-1 rounded-borders">
          <div>
            คำตอบที่ถูกต้อง คือ <span class="text-green-4">President</span>
          </div>
          <div class="q-my-md">
            The White House is the home of the American President.
            ทำเนียบขาวเป็นบ้านของประธานาธิบดีของอเมริกา
          </div>

          <div class="q-my-md">
            อ้างอิง#1 : The White House has been the home at the American
            President and his family for over 200 years.
          </div>

          <div class="q-mt-lg" align="center">
            <q-img
              style="max-width: 200px; width: 100%"
              class="cursor-pointer"
              @click="nextQuestion()"
              src="../../../public/images/next-question-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <q-dialog maximized="" v-model="isShowCorrectAnswer">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="flex flex-center fit">
            <q-img
              style="max-width:350px;width:100%;"
              src="../../../public/images/light-answer.png"
              class="animation-rotate"
            ></q-img>
            <q-img
              class="absolute"
              style="max-width:167.92px;width:100%;"
              :src="
                require(`../../../public/images/icon-${
                  isCorrect ? 'correct' : 'incorrect'
                }-answer.png`)
              "
            >
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { ref } from "vue";
export default {
  components: {
    headerBar
  },
  setup(props) {
    const isSendAnswer = ref(false);

    const fontSize = ref(16);

    const isCorrect = ref(null);

    const isShowCorrectAnswer = ref(false);

    const reFontSize = data => {
      fontSize.value = data;
    };

    const sendAnswer = index => {
      isSendAnswer.value = true;
      isShowCorrectAnswer.value = true;

      if (index == 1) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }

      setTimeout(() => {
        isShowCorrectAnswer.value = false;
      }, 1500);
    };

    const nextQuestion = () => {
      isSendAnswer.value = false;
    };

    return {
      fontSize,
      reFontSize,
      isCorrect,
      isShowCorrectAnswer,
      isSendAnswer,
      sendAnswer,
      nextQuestion
    };
  }
};
</script>

<style lang="scss" scoped>
.box-header {
  position: sticky;
  top: 50px;
}
.box-question {
  max-width: 1000px;
  width: 100%;
  border: 4px solid #6f3c00;
  background-color: #fff;
  border-radius: 5px;
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
