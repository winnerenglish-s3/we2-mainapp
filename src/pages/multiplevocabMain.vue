<template>
  <q-page class="bg-multiplevocab">
    <div>
      <app-bar
        :isHasHelp="isHasHelp"
        :isHasInstruction="isHasInstruction"
        :instructionData="instructionData"
        :isShowHome="false"
        :isShowPause="true"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <multiplevocab-pc
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-sendanswer="fucnSendAnswer"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.desktop && isLoadPractice"
      class="box-container-main"
    ></multiplevocab-pc>

    <multiplevocab-mobile
      :practiceData="practiceData"
      :themeSync="themeSync"
      @callback-sendanswer="fucnSendAnswer"
      @callback-nextquestion="funcSelectedQuestion"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.mobile && isLoadPractice"
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

    <finish-practice-dialog :isFinishPractice="isFinishPractice"></finish-practice-dialog>

    <instruction-dialog
      v-if="isLoadPractice"
      :isShowDialogInstruction="true"
      :en="instructionData.eng"
      :th="instructionData.th"
    ></instruction-dialog>
  </q-page>
</template>

<script>
import multiplevocabPc from "../components/multiplevocab/multiplevocabPc";
import multiplevocabMobile from "../components/multiplevocab/multiplevocabMobile";
import appBar from "../components/app-bar";
import instructionDialog from "../components/instructionDialog";
import finishPracticeDialog from "../components/finishPracticeDialog";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { db } from "src/router";
export default {
  components: {
    multiplevocabPc,
    multiplevocabMobile,
    appBar,
    instructionDialog,
    finishPracticeDialog,
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

  setup(props) {
    // Initial Data
    const isLoadPractice = ref(false);
    const route = useRoute();
    const router = useRouter();

    // Initial Practice Data
    const instructionData = ref({
      eng: "Choose the best answer to fill in the blank.",
      th: "เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมลงในช่องว่าง",
    });
    const questionList = ref([]);

    // ข้อมูลแบบฝึกหัด
    const practiceData = reactive({
      currentQuestion: 0,
      totalQuestion: 0,
      totalStar: 0,
      question: "",
      choices: [],
      correctAnswer: 0,
      description: "",
      extraVocab: [],
    });
    const isHasHelp = ref(true);
    const isHasInstruction = ref(true);
    const isFinishPractice = ref(false);

    // โหลดข้อมูลแบบฝึกหัด
    const funcLoadPractice = async () => {
      console.clear();

      try {
        let multipleList = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
        practiceData.totalQuestion = getData.data().numOfPractice;

        // Get Api
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
        const postData = {
          practiceListId: practiceListId,
        };
        const response = await axios.post(apiURL, postData);

        // เก็บข้อมูลที่ได้จาก axios
        multipleList = response.data;

        // เก็บข้อมูลที่ได้จาก axios
        let setExtraVocab = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = [...multipleList];

        // เก็บคำศัพท์เสริม
        setExtraVocab = setExtraVocab.map((x) => x.extraVocab).filter((x) => x.length);

        let tempExtra = [];

        // เอาคำศัพท์เสริมที่ได้มาต่อกัน
        setExtraVocab.forEach((res) => {
          tempExtra.push(...res);
        });

        // เก็บข้อมูลคำศัพท์เสริม
        practiceData.extraVocab = tempExtra;

        // สุ่มคำตอบของแต่ละข้อ
        setPracticeList = setPracticeList.map((x) => {
          let choices = x.choices.sort(() => Math.random() - 0.5);
          x.choices = choices;
          return x;
        });

        // สุ่มแบบฝึกหัด
        setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
        setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

        // เก็บข้อมูลแบบฝึกหัดทั้งหมด
        questionList.value = setPracticeList;

        console.log(questionList.value);

        // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    // ส่งคำตอบมาว่าเป็นจริงหรือเท็จ
    const fucnSendAnswer = (isAnswer) => {
      console.log(isAnswer);
    };

    // เลือกแบบฝึกหัดเมื่อมีการเปลื่ยนข้อ หรือ โหลดข้อมูลครั้งแรก
    const funcSelectedQuestion = (firstTime) => {
      firstTime = firstTime || false;

      if (!firstTime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Question
      practiceData.question = questionList.value[practiceData.currentQuestion].question;

      // Practice Data : Show Choices
      practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

      // Practice Data : Show Description
      practiceData.description =
        questionList.value[practiceData.currentQuestion].description;

      // Practice Data : Correct Answer
      practiceData.correctAnswer =
        questionList.value[practiceData.currentQuestion].correctAnswer;
    };

    // Mounted Load Practice
    onMounted(funcLoadPractice);

    return {
      practiceData,
      funcSelectedQuestion,
      isFinishPractice,
      isLoadPractice,
      instructionData,
      isHasHelp,
      isHasInstruction,
      fucnSendAnswer,
    };
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        th: "เลือกคำต้องที่ถูกต้อง",
        en: "Choose the best correct answer",
      },
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

      isHasHelp: true,
      isHasInstruction: true,
    };
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
