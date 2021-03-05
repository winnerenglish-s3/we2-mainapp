<template>
  <div>
    <div class="box-container-main relative-position">
      <div>
        <div>
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div>
      <div align="center">
        <div class="box-question q-pa-md">
          <span v-html="practiceData.questionTh"></span>
        </div>
        <div class="box-content-question q-pb-xl q-pa-lg row">
          <div class="self-center" v-for="(item, index) in practiceData.question">
            <div class="f18 q-ma-xs" v-html="item.answer" v-if="!item.isAnswer"></div>
            <div
              v-if="item.isAnswer"
              :data-selected="selectedBoxAnswer == index ? true : false"
              class="relative-position cursor-pointer q-ma-xs q-my-sm btn-selected-answer row items-center justify-center q-pa-xs"
              :class="selectedBoxAnswer == index ? 'bg-cyan-3' : 'bg-grey-6'"
              @click="selectedBoxAnswer = index"
            >
              <div class="col-12 absolute-center" style="top: -0px">
                <q-icon
                  v-if="selectedBoxAnswer == index"
                  name="fas fa-caret-down"
                  class="text-red-10"
                  size="36px"
                ></q-icon>
              </div>
              <div>
                <span>{{ item.answer }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="box-content-answer q-pa-md q-mt-lg row">
          <div class="q-ma-sm" v-for="(item, index) in practiceData.choices">
            <div align="center">
              <q-btn no-caps push class="bg-amber shadow-1">{{ item }}</q-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-12 absolute-top" align="center">
        <header-bar :practiceData="practiceData"></header-bar>
      </div> -->
      <!-- <div class="col relative-position q-pa-md">
        <q-card class="absolute-center box-content-question shadow-5" square>
          <q-card-section>
            <div class="q-pa-md">
              <span v-html="practiceData.question"></span>
            </div>
          </q-card-section>
        </q-card>
      </div> -->
      <!-- <div class="col-6 box-content-question q-pt-md">
        <div class="q-mt-xl q-pa-lg">
          <div class="box-question q-pa-md">
            <span class="f16" v-html="practiceData.questionTh"> </span>
          </div>

          <div class="box-answer q-mb-xl q-mt-lg">
            <div class="q-my-md row justify-center">
              <div v-for="(item, index) in practiceData.choices">
                <q-btn
                  no-caps
                  :label="item"
                  push
                  rounded
                  class="bg-amber-7 f16 q-ma-sm"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import headerBar from "../../components/header-time-progress";
import { ref } from "vue";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
  },
  setup(props) {
    const selectedBoxAnswer = ref(
      props.practiceData.question.filter((x) => x.answer == "")[0].index
    );

    return { selectedBoxAnswer };
  },
};
</script>

<style lang="scss" scoped>
.box-content-question {
  max-width: 800px;
  width: 90%;
  max-height: fit-content;
  min-height: calc(100vh - 30%);
}

.box-content-question {
  width: 800px;
  background-image: url("../../../public/images/translation/bg-translation-content.png");
  background-size: cover;
  background-position: center;
}

.box-content-answer {
  width: 800px;
}

.box-question {
  width: 800px;
  background-color: #fff;
  border: 4px solid #895200;
}

.btn-selected-answer {
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  box-shadow: 0px 1px 3px #000;
  transition: 0.2s;
  transform: scale(1);
}

.btn-selected-answer:active {
  transition: 0.2s;
  transform: scale(0.95);
}
</style>
