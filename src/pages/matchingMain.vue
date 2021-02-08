<template>
  <q-page class="bg-matching">
    <matching-pc
      :themeSync="themeSync"
      :totalQuestion="state.totalQuestion"
      :totalStar="state.totalStar"
      :currentQuestion="state.currentQuestion"
      :numberOfPractice="state.numberOfPractice"
      :practiceTime="state.practiceTime"
      :isCorrectAnswer="state.isCorrectAnswer"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></matching-pc>
    <matching-mobile
      :themeSync="themeSync"
      :totalQuestion="state.totalQuestion"
      :totalStar="state.totalStar"
      :currentQuestion="state.currentQuestion"
      :numberOfPractice="state.numberOfPractice"
      :practiceTime="state.practiceTime"
      :isCorrectAnswer="state.isCorrectAnswer"
      v-if="$q.platform.is.mobile"
    ></matching-mobile>

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
import matchingPc from "../components/matching/matchingPc";
import matchingMobile from "../components/matching/matchingMobile";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
export default {
  props: {
    themeSync: {
      type: Number,
      require: true,
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    matchingPc,
    matchingMobile,
  },
  setup(props, { emit }) {
    // initial
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    // Extra Vocab
    const tab = ref("vocab");
    const vocabList = ref([
      {
        vocab: "dog",
        meaning: "สุนัข",
      },
      {
        vocab: "cat",
        meaning: "แมว",
      },
      {
        vocab: "buffalo",
        meaning: "ควาย",
      },
      {
        vocab: "chicken",
        meaning: "ไก่",
      },
      {
        vocab: "cow",
        meaning: "วัว",
      },
      {
        vocab: "duck",
        meaning: "เป็ด",
      },
      {
        vocab: "goldfish",
        meaning: "ปลาทอง",
      },
      {
        vocab: "rabbit",
        meaning: "กระต่าย",
      },
      {
        vocab: "hamster",
        meaning: "	หนูแฮมสเตอร์",
      },
      {
        vocab: "elephant",
        meaning: "ช้าง",
      },
      {
        vocab: "horse",
        meaning: "ม้า",
      },
    ]);

    // State Practice Data
    const state = reactive({
      totalStar: 0,
      totalQuestion: 7,
      currentQuestion: 0,
      numberOfPractice: 0,
      isCorrectAnswer: false,
      practiceTime: 10,
      isPracticeTimeout: false,
      funcPracticeTime: "",
    });

    // TODO : แสดงปุ่มตัวช่วยถ้ามี
    const isHasHelp = ref(true);

    // TODO : แสดงปุ่มคำสั่งถ้ามี
    const isHasInstruction = ref(true);

    // TODO : เช็คโหลดข้อมูลแบบฝึกหัดถ้าเสร็จแล้วจะเป็น True
    const isLoadPractice = ref(false);

    const closeHelpBtn = () => {
      emit("closeHelp");
    };

    onMounted(() => {
      if (isHasHelp) {
        emit("isShowButtonHelp");
      }

      if (isHasInstruction) {
        emit("isShowButtonInstruction");
      }
    });

    return {
      state,
      isHasHelp,
      isHasInstruction,
      isLoadPractice,
      tab,
      vocabList,
      closeHelpBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-matching {
  background-image: url("../../public/images/multiplevocab/bg-multivocab.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
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
