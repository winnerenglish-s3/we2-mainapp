<template>
  <div>
    <q-toolbar :style="themeColor" :class="$route.name == 'flashcard' ? 'z-top' : ''">
      <div class="row header-container">
        <div class="col-6">
          <q-btn
            icon="fas fa-home"
            v-if="!isShowDialogFlashcard"
            class="shadow-2 btn-header q-mr-md btn-width-mobile"
            @click="$router.push('/lobby')"
          ></q-btn>
          <q-btn
            icon="fas fa-arrow-left"
            v-if="
              $q.platform.is.mobile && isShowDialogFlashcard && $route.name == 'flashcard'
            "
            class="shadow-2 btn-header btn-width-mobile"
            @click="returnCloseDialog()"
          ></q-btn>
          <q-btn
            icon="fas fa-pause"
            @click="isShowSetting = true"
            v-if="isShowPauseBtn"
            class="shadow-2 btn-header btn-width-mobile"
          ></q-btn>
        </div>

        <div align="right" class="col-6">
          <q-btn
            v-if="isShowInstructionBtn"
            @click="isShowDialogInstruction = true"
            icon="fas fa-info-circle"
            class="shadow-2 btn-header q-mr-md"
            :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
            :label="!$q.platform.is.mobile ? 'คำสั่ง' : ''"
          ></q-btn>
          <q-btn
            v-if="isShowHelpBtn"
            @click="isShowDialogHelp = true"
            icon="fas fa-lightbulb"
            class="shadow-2 btn-header"
            :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
            :label="!$q.platform.is.mobile ? 'ตัวช่วย' : ''"
          ></q-btn>
        </div>
      </div>
    </q-toolbar>

    <!-- Dialog Start Practice -->
    <q-dialog maximized v-model="isStartPractice" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <q-img
            contain
            class="absolute-center"
            :style="
              $q.platform.is.desktop
                ? 'max-width:800px;width:100%'
                : 'max-width:340px;width:100%'
            "
            :src="
              require($q.platform.is.desktop
                ? '../../public/images/start-practice-pc.png'
                : '../../public/images/start-practice-mobile.png')
            "
          >
            <div
              class="absolute-top row"
              :class="
                $q.platform.is.desktop
                  ? 'box-header-practice-pc'
                  : 'box-header-practice-mobile'
              "
            >
              <div class="self-center full-width" align="center">
                <span
                  class="text-header-practice"
                  :style="
                    $q.platform.is.desktop
                      ? 'font-size: max(1.8vw, 30px)'
                      : 'font-size:24px'
                  "
                >
                  {{
                    practiceNameList.filter((x) => x.type == $route.name).length
                      ? practiceNameList.filter((x) => x.type == $route.name)[0].name
                      : ""
                  }}
                </span>
              </div>
            </div>
            <div
              :class="
                $q.platform.is.desktop ? 'box-instruction-pc' : 'box-instruction-mobile'
              "
              class="absolute-bottom row full-width"
            >
              <div class="col-12 self-center q-py-md" align="center">
                <span>{{ instruction.en }}</span>
                <div class="q-py-xs"></div>
                <span>{{ instruction.th }}</span>
              </div>
              <div class="col-12 q-py-sm self-end" align="center">
                <div @click="startPractice()" class="btn-start cursor-pointer"></div>
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Finish Practice -->
    <q-dialog maximized v-model="isFinishPractice" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <div v-if="!isNotProgress">
              <q-img
                width="350px"
                style="margin: auto"
                src="../../public/images/flower_1.png"
              ></q-img>
            </div>
            <div class="box-content-finish">
              <q-img
                v-if="!isNotProgress"
                class="absolute-center"
                fit="contain"
                width="320px"
                style="top: 24px"
                src="../../public/images/bg-success-start.png"
              >
                <div
                  class="absolute-center transparent full-width"
                  style="top: 40%"
                  align="center"
                >
                  <q-rating
                    v-model="totalStar"
                    size="4em"
                    color="warning"
                    icon-selected="star"
                    max="3"
                    readonly
                  />
                </div>
              </q-img>

              <div class="box-finish absolute-bottom">
                <div align="center" v-if="!isNotProgress">
                  <span>จบแบบฝึกหัด</span>
                  <br />
                  <span>ระดับที่ 5 - บทที่ 12</span>
                  <div class="q-mt-md">
                    <span>จำนวนครั้งในการทำ : {{ numberOfPractice }}/2</span>
                  </div>
                </div>

                <div v-else align="center">
                  <span style="font-size: max(1vw, 24px)">คะแนนไม่ผ่านเกณฑ์</span>
                </div>
              </div>
            </div>
            <div align="center">
              <q-btn-group
                spread
                style="width: 292px; height: 40px; border-radius: 0px 0px 5px 5px"
              >
                <q-btn
                  push
                  @click="resetBtn()"
                  label="ทำใหม่อีกครั้ง"
                  text-color="white"
                  style="background-color: #014270"
                />
                <q-btn
                  v-if="!isNotProgress"
                  push
                  @click="finishBtn()"
                  label="จบแบบฝึกหัด"
                  style="background-color: #ffbd13"
                />
                <q-btn
                  v-if="isNotProgress"
                  push
                  label="ทบทวน"
                  style="background-color: #ffbd13"
                />
              </q-btn-group>
            </div>
            <div style="" v-if="!isNotProgress">
              <q-img width="350px" src="../../public/images/flower_2.png"></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Instruction  -->
    <q-dialog maximized v-model="isShowDialogInstruction" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <q-img
            contain
            class="absolute-center"
            :style="
              $q.platform.is.desktop
                ? 'max-width:700px;width:100%'
                : 'max-width:330px;width:100%'
            "
            :src="
              require($q.platform.is.desktop
                ? '../../public/images/bg-instruction-pc.png'
                : '../../public/images/bg-instruction-mobile.png')
            "
          >
            <div
              class="absolute-top row transparent text-black"
              :class="
                $q.platform.is.desktop
                  ? 'box-content-instruction-pc'
                  : 'box-content-instruction-mobile'
              "
            >
              <div
                class="self-center full-width q-py-md"
                align="center"
                style="font-size: max(0.7vw, 14px)"
              >
                <div>
                  <span>{{ instruction.en }}</span>
                </div>
                <div>
                  <span>{{ instruction.th }}</span>
                </div>
              </div>

              <div class="col-12 self-end q-py-md" align="center">
                <q-img
                  @click="closeInstructionBtn()"
                  class="cursor-pointer"
                  width="200px"
                  src="../../public/images/close-help-btn-pc.png"
                ></q-img>
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Setting -->
    <q-dialog maximized="" v-model="isShowSetting" persistent="">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <q-img width="300px" src="../../public/images/dialog-setting.png">
              <div class="absolute-center transparent fit">
                <div class="q-mt-lg q-pt-sm q-px-md row">
                  <div class="q-px-md">
                    <q-icon
                      size="29px"
                      class="btn-header-color q-mr-md"
                      name="fas fa-volume-up"
                    ></q-icon
                    ><span class="text-black">เสียงประกอบ</span>
                  </div>
                  <q-space></q-space>
                  <div class="q-pr-sm">
                    <toggle-button
                      :value="true"
                      color="#427B00"
                      :labels="{ checked: 'เปิด', unchecked: 'ปิด' }"
                    />
                  </div>
                </div>
                <div class="q-mt-lg q-px-md row">
                  <div class="q-px-md">
                    <q-icon
                      size="29px"
                      class="btn-header-color q-mr-md"
                      name="fas fa-music"
                    ></q-icon
                    ><span class="text-black">เพลง</span>
                  </div>
                  <q-space></q-space>
                  <div class="q-px-sm">
                    <toggle-button
                      :value="true"
                      color="#427B00"
                      :labels="{ checked: 'เปิด', unchecked: 'ปิด' }"
                    />
                  </div>
                </div>
                <div class="q-mt-lg q-pa-xs" align="center">
                  <img
                    class="cursor-pointer"
                    @click="isShowSetting = false"
                    src="../../public/images/btn-continue.png"
                    width="210px"
                    alt=""
                  />
                </div>
                <div class="q-pa-xs q-mt-xs" align="center">
                  <img
                    class="cursor-pointer"
                    src="../../public/images/btn-restart.png"
                    width="210px"
                    alt=""
                  />
                </div>
                <div class="q-pa-xs q-mt-xs" align="center">
                  <img
                    class="cursor-pointer"
                    src="../../public/images/btn-out-practice.png"
                    width="210px"
                    alt=""
                  />
                </div>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import getColorTheme from "../../public/themeColor.json";
import { db } from "src/router";
import { ref, reactive, computed, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  props: {
    isShowDialogFlashcard: {
      type: Boolean,
      default: () => false,
    },
    isShowInstructionBtn: {
      type: Boolean,
      default: () => false,
    },
    isShowHelpBtn: {
      type: Boolean,
      default: () => false,
    },
    isShowPauseBtn: {
      type: Boolean,
      default: () => false,
    },
    isFinishPractice: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    // Set Router
    const route = useRoute();
    const router = useRouter();

    const returnCloseDialog = () => {
      emit("showDialogFlashcard");
    };

    // เซ็ทสีของ Theme ที่ใช้
    const colorTheme = ref(getColorTheme);
    const setTheme = ref(1);

    const themeColor = computed(() => {
      return `background-color:${colorTheme.value[setTheme.value - 1].hex}`;
    });

    const instruction = reactive({
      en: "Eng ?????????????????????????????????",
      th: "ไทย ?????????????????????????????????",
    });

    const isStartPractice = ref(true);
    const isShowDialogHelp = ref(false);
    const isNotProgress = ref(true);

    const startPractice = () => {
      isStartPractice.value = false;
    };

    const resetBtn = () => {
      router.push("/practicemain");
    };

    const finishBtn = () => {
      router.push("/practicemain");
    };

    const isShowDialogInstruction = ref(false);

    const closeInstructionBtn = () => {
      isShowDialogInstruction.value = false;
    };

    const totalStar = ref(0);
    const numberOfPractice = ref(0);

    const practiceNameList = ref([
      {
        type: "spellingbee",
        name: "สะกดคำ",
      },
      {
        type: "matching",
        name: "จับคู่คำศัพท์",
      },
      {
        type: "multiplevocab",
        name: "เลือกคำตอบ",
      },
      {
        type: "conversationmultiple",
        name: "เลือกคำตอบ",
      },
      {
        type: "phonicsmultiple",
        name: "เลือกคำตอบ",
      },
      {
        type: "languagetipmultiple",
        name: "เลือกคำตอบ",
      },
      {
        type: "grammarmultiple",
        name: "เลือกคำตอบ",
      },
      {
        type: "grammaraction",
        name: "ถามตอบไวยากรณ์",
      },
    ]);

    // TODO : Setting
    const isShowSetting = ref(false);

    return {
      colorTheme,
      themeColor,
      returnCloseDialog,
      resetBtn,
      finishBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.btn-header {
  border: 1px solid#FFC52E;
  background-color: #6d4300;
  border-radius: 10px;
  color: #ffc52e;
}

.btn-width-mobile {
  width: 40px;
}

.box-header-practice-pc {
  background-color: transparent;
  width: 35%;
  height: 21%;
  margin: auto;
  top: 49px;
}

.box-header-practice-mobile {
  background-color: transparent;
  width: 80%;
  height: 15%;
  margin: auto;
  top: 49px;
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

.box-content-instruction-mobile {
  width: 100%;
  height: 95%;
}

.btn-start {
  background-image: url("../../public/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}

.text-header-practice {
  line-height: 100%;
  color: #ffc022;
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

.box-content-finish {
  position: relative;
  background-image: url("../../public/images/dialog-notificate-practice.png");
  background-repeat: no-repeat;
  width: 290px;
  height: 214px;
  margin: auto;
}

.btn-header-color {
  color: #a36112;
}
</style>
