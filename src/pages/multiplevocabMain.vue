<template>
  <q-page class="bg-multiplevocab">
    <multiplevocab-pc
      :choices="choices"
      :extravocabs="extravocabList"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :themeSync="themeSync"
      @callback="testRandom()"
      v-if="$q.platform.is.desktop"
      class="box-container-main"
    ></multiplevocab-pc>

    <multiplevocab-mobile
      :choices="choices"
      :extravocabs="extravocabList"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :themeSync="themeSync"
      @callback="testRandom()"
      v-if="$q.platform.is.mobile"
    ></multiplevocab-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center box-extravocab q-pa-md">
            <q-tabs
              v-model="tab"
              shrink
              dense
              class="box-header-extravocab"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm col-6" name="vocab" label="ตัวช่วย" />
              <q-tab class="q-pa-sm col-6" name="extra" label="คำศัพท์เสริม" />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="vocab">
                  <div class="row">
                    <div
                      :class="$q.platform.is.desktop ? 'col-6' : 'col-12'"
                      :style="index % 2 == 0 ? 'border-right:1px solid #C4C4C4' : ''"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in vocabList"
                      :key="index"
                    >
                      <div class="q-pa-sm">
                        <span>{{ item.vocab }}</span>
                        <br />
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel class="no-padding" name="extra">
                  <div class="row">
                    <div
                      :class="$q.platform.is.desktop ? 'col-6' : 'col-12'"
                      :style="index % 2 == 0 ? 'border-right:1px solid #C4C4C4;' : ''"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in extravocabList"
                      :key="index"
                    >
                      <div class="q-pa-sm">
                        <span>{{ item.vocab }}</span>
                        <br />
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div
              v-if="$q.platform.is.desktop"
              align="center"
              class="q-pa-md bg-white"
              style="border-radius: 0px 0px 7px 7px"
            >
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                style="width: 200px"
                src="../../public/images/close-help-btn-pc.png"
              ></q-img>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                src="../../public/images/close-help-btn-mobile.png"
              ></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import multiplevocabPc from "../components/multiplevocab/multiplevocabPc";
import multiplevocabMobile from "../components/multiplevocab/multiplevocabMobile";
export default {
  components: {
    multiplevocabPc,
    multiplevocabMobile,
  },
  props: {
    isStartPractice: {
      type: Boolean,
      default: () => true,
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false,
    },
    themeSync: {
      type: Number,
      default: () => false,
    },
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        th: "เลือกคำต้องที่ถูกต้อง",
        en: "Choose the best correct answer",
      },
      totalStar: 0,
      numberOfPractice: 0,
      currentQuestion: 0,
      totalQuestion: 10,
      practiceTime: 10,
      choices: ["attack", "protest", "sign", "litter"],
      vocabList: [
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
      ],
      extravocabList: [
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
      ],

      isPracticeTimeout: false,
      funcPracticeTime: "",

      isHasHelp: true,
      isHasInstruction: true,
    };
  },
  methods: {
    closeHelpBtn() {
      this.$emit("closeHelp");
    },
    finishBtn() {
      console.log("Finish");
    },
    resetBtn() {
      this.currentQuestion = 0;
      this.isFinishPractice = false;

      this.currentTimeStart();
    },
    startPractice() {
      this.isStartPractice = false;

      this.currentTimeStart();
    },
    currentTimeStart() {
      this.isPracticeTimeout = true;

      let min = 0;
      let sec = this.practiceTime;

      this.funcPracticeTime = setInterval(() => {
        if (sec == 0) {
          this.isPracticeTimeout = false;

          clearInterval(this.funcPracticeTime);

          setTimeout(() => {
            this.testRandom();
          }, 500);
        }

        sec--;
      }, 1000);
    },
    testRandom() {
      if (this.currentQuestion + 1 == 10) {
        this.$emit("isShowFinishPractice", true);

        if (this.numberOfPractice != 2) {
          this.numberOfPractice += 1;
        } else {
          this.numberOfPractice = 1;
        }

        this.$emit("numberOfPractice", this.numberOfPractice);
        return;
      } else {
        this.currentQuestion += 1;

        this.currentTimeStart();
      }

      this.choices.sort((x) => Math.random() - 0.5);
      let randomStar = Math.ceil(Math.random() * 10);

      if (randomStar % 2 == 0) {
        if (this.totalStar != 3) {
          this.totalStar += 1;
        } else {
          this.totalStar = 0;
        }
      }
    },
  },
  mounted() {
    if (this.isHasHelp) {
      this.$emit("isShowButtonHelp");
    }

    if (this.isHasInstruction) {
      this.$emit("isShowButtonInstruction");
    }
  },
};
</script>

<style lang="scss" scoped>
.bg-multiplevocab {
  background-image: url("../../public/images/multiplevocab/bg-multivocab.png");
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.box-instruction-pc {
  background-color: transparent;
  width: 80%;
  height: 45%;
  bottom: 5px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-instruction-mobile {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 20px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-finish {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 16px;
  margin: auto;
  font-size: 16px;
  color: #000;
}

.btn-start {
  background-image: url("../../public/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}

.box-extravocab {
  max-width: 600px;
  min-width: 290px;
  width: 100%;
}

.box-header-extravocab {
  background-color: #9f220c;
  color: #f3ab14;
  border-radius: 7px 7px 0px 0px;
}

.header-extravocab-active {
  background-color: #9f220c;
}
</style>
