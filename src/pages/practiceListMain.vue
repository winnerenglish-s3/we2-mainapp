<template>
  <q-page class="full-height" :class="{ row: $q.platform.is.desktop }">
    <div class="col-12 self-start">
      <app-bar></app-bar>
    </div>

    <!-- DESKTOP -->
    <div
      class="col-12 row bg-practice-main desktop-only"
      style="max-height: fit-content; min-height: calc(100vh - 50px)"
    >
      <!-- รายการแบบฝึกหัด -->

      <div class="col self-center" align="center">
        <div class="row relative-position">
          <!-- ปุ่มกดย้อนกลับ -->
          <div class="col self-center">
            <q-img
              v-if="selectSkill != 'Vocabulary'"
              @click="previousSkill()"
              class="cursor-pointer"
              width="40px"
              src="../../public/images/practicelist/previous-list-btn.png"
            ></q-img>
          </div>
          <!-- รายละเอียด Unit ทั้งหมด -->

          <div class="col-6 box-container-pracitcelist">
            <div class="row box-content-practicelist q-py-sm q-px-md">
              <div
                class="col-3 self-center"
                style="width: 100px"
                algin="center"
              ></div>
              <div class="col self-center" algin="center">
                <span class="f20 text-amber-5">{{ selectSkill }}</span>
              </div>
              <div
                class="col-3 self-center"
                style="width: 100px"
                algin="center"
              >
                <q-select
                  v-model="selectLevel"
                  :options="levelList"
                  map-options
                  emit-value
                  dense=""
                  bg-color="amber-5"
                  round=""
                  outlined=""
                />
              </div>
            </div>

            <div class="q-pl-lg q-pt-md q-pb-sm q-pr-md">
              <div class="row">
                <div class="col self-center">
                  <div class="box-content-progress-practice" align="left">
                    <div class="progress-bar" style="width: 80%"></div>
                  </div>
                </div>
                <div class="col-2" style="width: 50px">
                  <span class="f16"
                    >{{ showAllPassedPractice() }}/{{
                      showNumberOfAllPracticeInLevel()
                    }}</span
                  >
                </div>
              </div>
              <div class="q-my-md box-content-practice-list">
                <div
                  v-ripple
                  class="relative-position row q-mr-sm q-mb-md bg-white box-content cursor-pointer"
                  :class="
                    activeUnit == i
                      ? 'content-current'
                      : unitCompleteList[i - 1]
                      ? 'content-success'
                      : 'content-default'
                  "
                  v-for="i in totalUnit"
                  @click="showPracticeList(i), (activeUnit = i)"
                  :key="i"
                >
                  <div
                    class="col-2 q-pa-sm"
                    :class="
                      activeUnit == i
                        ? 'bg-current'
                        : unitCompleteList[i - 1]
                        ? 'bg-success text-white'
                        : 'bg-default'
                    "
                  >
                    <span class="f24 text-bold">
                      {{ i }}
                    </span>
                  </div>
                  <div class="col self-center q-px-sm" align="left">
                    <span class="f16" v-if="showPracticeListName(i)">
                      {{ showPracticeListName(i).nameEng }}
                    </span>
                  </div>
                  <div class="col-2 self-center" style="width: 60px">
                    <q-icon
                      v-if="unitCompleteList[i - 1]"
                      size="22px"
                      name="fas fa-check"
                      class="text-success"
                    ></q-icon>
                    <span v-else class="f16">
                      <span v-if="showPracticeListName(i)">{{
                        `${showPassedPracticeNumber(i)}/${
                          showPracticeListName(i).totalPractice
                        }`
                      }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ปุ่มกดไปข้างหน้า -->

          <div class="col self-center" align="center">
            <q-img
              v-if="selectSkill != 'Listening & Speaking'"
              @click="nextSkill()"
              class="cursor-pointer"
              width="40px"
              src="../../public/images/practicelist/next-list-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
      <!-- แบบฝึกหัดต่างๆ -->
      <div class="col self-start row bg-map full-height justify-center">
        <div class="self-center col" align="center">
          <q-img
            style="max-width: 800px; width: 100%"
            src="../../public/images/practicelist/bg-map-theme-1.png"
          >
            <div
              class="transparent absolute-center row box-content-menu justify-center items-center"
              style="max-width: 800px; width: 50%"
            >
              <div
                class="col-6 self-center"
                align="center"
                v-for="(item, index) in practiceListShow"
                :key="index"
              >
                <div class="">
                  <q-img
                    contain=""
                    style="max-width: 150px"
                    class="cursor-pointer"
                    :src="showIconPractice(item.practiceType)"
                    @click="gotoPractice(item)"
                  >
                    <div
                      class="transparent absolute-bottom no-padding"
                      style="width: 80%; bottom: 13px; margin: auto"
                      align="left"
                    >
                      <div class="" align="center">
                        <span>{{ `${index + 1}. ${item.practiceType} ` }}</span>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div style="background-color: #ffe6cf">
      <div class="q-pt-md row q-px-md">
        <div style="width: 100px" algin="center">
          <q-select
            v-model="selectLevel"
            :options="levelList"
            map-options
            emit-value
            dense=""
            bg-color="amber-5"
            round=""
            outlined=""
          />
        </div>
        <div class="col q-pl-md">
          <q-select
            v-model="selectSkill"
            bg-color="white"
            round
            outlined
            emit-value
            map-options
            dense
            :options="skillOptions"
          >
            <template v-slot:selected>
              <div class="absolute-center">
                {{
                  skillOptions.filter((x) => x.value == selectSkill)[0].label
                }}
              </div>
            </template>
          </q-select>
        </div>
      </div>
      <div class="q-pl-lg q-pt-md q-pb-sm q-pr-md">
        <div class="row">
          <div class="col self-center">
            <div class="box-content-progress-practice" align="left">
              <div class="progress-bar" style="width: 80%"></div>
            </div>
          </div>
          <div class="col-2 offset-1" style="width: 50px">
            <span class="f16"
              >{{ showAllPassedPractice() }}/{{
                showNumberOfAllPracticeInLevel()
              }}</span
            >
          </div>
        </div>
        <div class="q-my-md">
          <div
            v-ripple
            class="relative-position row q-mr-sm q-mb-md bg-white box-content cursor-pointer"
            :class="
              activeUnit == i
                ? 'content-current'
                : unitCompleteList[i - 1]
                ? 'content-success'
                : 'content-default'
            "
            v-for="i in totalUnit"
            @click="showPracticeList(i), (activeUnit = i)"
            :key="i"
          >
            <div
              class="col-2 q-pa-sm"
              :class="
                activeUnit == i
                  ? 'bg-current'
                  : unitCompleteList[i - 1]
                  ? 'bg-success text-white'
                  : 'bg-default'
              "
            >
              <div align="center">
                <span class="f24 text-bold">
                  {{ i }}
                </span>
              </div>
            </div>
            <div class="col self-center q-px-sm" align="left">
              <div class="q-py-sm">
                <span class="f16" v-if="showPracticeListName(i)">
                  {{ showPracticeListName(i).nameEng }}
                </span>
              </div>
            </div>
            <div class="col-2 self-center" style="width: 60px">
              <q-icon
                v-if="unitCompleteList[i - 1]"
                size="22px"
                name="fas fa-check"
                class="text-success"
              ></q-icon>
              <span v-else class="f16">
                <span v-if="showPracticeListName(i)">{{
                  `${showPassedPracticeNumber(i)}/${
                    showPracticeListName(i).totalPractice
                  }`
                }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sohw Practice Dialog Mobile -->
    <q-dialog
      v-model="isShowPracticeDialogMobile"
      persistent
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="bg-mobile-practice">
        <q-toolbar style="background-color: #9f220c">
          <div class="row header-container">
            <div class="col-6">
              <q-btn
                v-close-popup
                icon="fas fa-arrow-left"
                class="shadow-2 btn-header btn-width-mobile"
              ></q-btn>
            </div>
          </div>
        </q-toolbar>
        <q-card-section>
          <div class="row">
            <div
              class="col-6 self-center"
              align="center"
              v-for="(item, index) in practiceListShow"
              :key="index"
            >
              <div class="">
                <q-img
                  contain=""
                  style="max-width: 150px"
                  class="cursor-pointer"
                  :src="showIconPractice(item.practiceType)"
                  @click="gotoPractice(item)"
                >
                  <div
                    class="transparent absolute-bottom no-padding"
                    style="width: 80%; bottom: 13px; margin: auto"
                    align="left"
                  >
                    <div align="center">
                      <span>{{ `${index + 1}. ${item.practiceType} ` }}</span>
                    </div>
                  </div>
                </q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import studentHooks from "../hooks/studentHooks.js";
import practiceHooks from "../hooks/practiceHooks";
import { db } from "src/router/index.js";
import { useQuasar, scroll } from "quasar";
import { useRouter } from "vue-router";
import appBar from "../components/app-bar";
export default {
  props: {
    unitList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    appBar,
  },
  method: {
    testInput() {
      console.log("1234");
    },
  },
  setup() {
    // Router
    const $q = useQuasar();
    const router = useRouter();

    // UID
    const uid = $q.sessionStorage.getItem("uid");
    const { getScrollTarget, setVerticalScrollPosition } = scroll;

    // Course Data
    const selectLevel = ref("");

    // level changed
    watch(selectLevel, (newValue, oldValue) => {
      getPractice();
    });

    const skillOptions = [
      {
        label: "คำศัพท์",
        value: "Vocabulary",
      },
      {
        label: "ไวยากรณ์",
        value: "Grammar",
      },
      {
        label: "การอ่าน",
        value: "Reading",
      },
      {
        label: "การเขียน",
        value: "Writing",
      },
      {
        label: "การออกเสียง",
        value: "Phonics",
      },
      {
        label: "การฟังและการพูด",
        value: "Listening & Speaking",
      },
    ];

    const totalUnit = ref(0);
    const levelList = ref([]);
    // Get Course
    const getCourse = async () => {
      let course = await studentHooks.student().course();
      let allLevel = await practiceHooks.level();
      course.forEach(async (element) => {
        levelList.value.push({
          label:
            "ระดับ" + allLevel.filter((x) => x.level == element.level)[0].level,
          value: allLevel.filter((x) => x.level == element.level)[0].level,
          unit: Number(
            allLevel.filter((x) => x.level == element.level)[0].unit
          ),
        });
      });
      selectLevel.value = levelList.value[0].value;
      totalUnit.value = levelList.value[0].unit;
    };

    // Practice Data
    const practiceList = ref([]);
    const practiceName = ref([]);
    const selectSkill = ref("Vocabulary");

    // Next skill (Desktop)
    const nextSkill = () => {
      if (selectSkill.value == "Vocabulary") {
        selectSkill.value = "Grammar";
      } else if (selectSkill.value == "Grammar") {
        selectSkill.value = "Reading";
      } else if (selectSkill.value == "Reading") {
        selectSkill.value = "Writing";
      } else if (selectSkill.value == "Writing") {
        selectSkill.value = "Phonics";
      } else if (selectSkill.value == "Phonics") {
        selectSkill.value = "Listening & Speaking";
      }
    };

    const previousSkill = () => {
      if (selectSkill.value == "Grammar") {
        selectSkill.value = "Vocabulary";
      } else if (selectSkill.value == "Reading") {
        selectSkill.value = "Grammar";
      } else if (selectSkill.value == "Writing") {
        selectSkill.value = "Reading";
      } else if (selectSkill.value == "Phonics") {
        selectSkill.value = "Writing";
      } else if (selectSkill.value == "Listening & Speaking") {
        selectSkill.value = "Phonics";
      }
    };

    // Skill changed (Mobile)
    watch(selectSkill, (newValue, oldValue) => {
      getPractice();
    });
    const practiceLog = ref([]);

    const getPractice = async () => {
      $q.loading.show({
        delay: 0,
      });
      // Get Practice List
      practiceList.value = await practiceHooks
        .practice(selectLevel.value)
        .practiceList();

      // Get Practice Name
      practiceName.value = await practiceHooks
        .practice(selectLevel.value)
        .practiceName();

      // Get PracticeLog
      practiceLog.value = await practiceHooks
        .practice(selectLevel.value)
        .log(uid);
      $q.loading.hide();
    };

    // โชว์ชื่อยูนิต
    const showPracticeListName = (unit) => {
      let totalPractice = practiceList.value.filter(
        (x) =>
          x.level == selectLevel.value.toString() &&
          x.unit == unit.toString() &&
          x.skill == selectSkill.value
      ).length;

      let filter = practiceName.value.filter(
        (x) =>
          x.level == selectLevel.value.toString() &&
          x.unit == unit.toString() &&
          x.skill == selectSkill.value
      )[0];

      if (filter) {
        filter.totalPractice = totalPractice;
        return filter;
      }
    };

    // โชว์จำนวนแบบฝึกหัดที่มีทั้งหมดภายในเลเวล-ทักษะ
    const showNumberOfAllPracticeInLevel = () => {
      let totalPracticeInLevel = practiceList.value.filter(
        (x) =>
          x.level == selectLevel.value.toString() &&
          x.skill == selectSkill.value
      ).length;
      return totalPracticeInLevel;
    };

    // โชว์จำนวนแบบฝึกหัดที่ทำไปแล้ว ภายใน เลเวล ยูนิต ทักษะ
    const showPassedPracticeNumber = (unit) => {
      let result =
        practiceLog.value.filter(
          (x) =>
            x.level == selectLevel.value &&
            x.skill == selectSkill.value &&
            x.unit == unit
        ).length || 0;
      return result;
    };

    // โชว์จำนวนแบบฝึกหัดที่ทำไปแล้วทั้งหมด ภายในเลเวล
    const showAllPassedPractice = () => {
      let result =
        practiceLog.value.filter(
          (x) => x.level == selectLevel.value && x.skill == selectSkill.value
        ).length || 0;
      return result;
    };

    // โชว์แบบฝึกหัด ที่ถูกเลือกจากลิสท์ด้านซ้าย
    const isShowPracticeDialogMobile = ref(false);
    const practiceListShow = ref([]);
    const showPracticeList = (unit) => {
      let temp = [];
      temp = practiceList.value.filter(
        (x) =>
          x.level == selectLevel.value.toString() &&
          x.unit == unit.toString() &&
          x.skill == selectSkill.value
      );

      temp.sort((a, b) => a.order - b.order);
      practiceListShow.value = temp;

      if ($q.platform.is.mobile) {
        isShowPracticeDialogMobile.value = true;
      }
    };

    // แสดงผลไอคอนแบบฝึกหัด
    const showIconPractice = (type) => {
      let nameImage = require("../../public/images/practicelist/action-1-btn.png");
      if (type == "flashcard") {
        nameImage = require("../../public/images/practicelist/teaching-btn.png");
      } else if (type == "matching") {
        nameImage = require("../../public/images/practicelist/matching-1-btn.png");
      } else if (type == "multiplechoices") {
        nameImage = require("../../public/images/practicelist/multiple-1-btn.png");
      }

      return nameImage;
    };
    // route to แบบฝึกหัด

    const gotoPractice = (data) => {
      let routerName = "";
      if (data.practiceType == "flashcard") {
        routerName = "/flashcard/";
      } else if (data.practiceType == "matching") {
        routerName = "/matching/";
      }

      router.push(routerName + data.practiceListId);
    };

    onMounted(async () => {
      $q.loading.show({
        delay: 0,
      });
      await getCourse();
      await getPractice();
      $q.loading.hide();
    });

    // --------------------------------------------

    const activeUnit = ref(null);

    const unitCompleteList = ref([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);

    return {
      // Course Data
      selectLevel,
      totalUnit,

      // Practice Data
      selectSkill,
      practiceList,
      showPracticeListName,
      showPracticeList,
      practiceListShow,
      showIconPractice,
      gotoPractice,
      showPassedPracticeNumber,
      // SKill select for mobile
      selectSkill,
      skillOptions,
      showAllPassedPractice,
      showNumberOfAllPracticeInLevel,
      nextSkill,
      previousSkill,

      //
      levelList,
      unitCompleteList,
      activeUnit,
      // mobile dialog
      isShowPracticeDialogMobile,
    };
  },
};
</script>

<style scoped>
.bg-mobile-practice {
  background-image: url("../../public/images/practicelist/bg-map-theme-1.png");
  background-position: center;
}
.btn-header {
  border: 1px solid#FFC52E;
  background-color: #6d4300;
  border-radius: 10px;
  color: #ffc52e;
}

.bg-practice-main {
  background-image: url("../../public/images/practicelist/bg-practicelist.png");
}

.bg-map {
  background-color: #d2ecff;
  background-size: contain;
}

.box-container-pracitcelist {
  max-width: 450px;
  width: 75%;
  background-color: #ffe6cf;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.box-content-practicelist {
  background-color: #9f220c;
}

.box-content-progress-practice {
  background-color: #fff;
  border: 2px solid #7b6060;
  border-radius: 20px;
  height: 15px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #e57373;
  border-radius: 5px;
}

.box-content-practice-list {
  max-height: calc(100vh - 300px);
  min-height: fit-content;
  overflow-y: scroll;
}

/* width */
.box-content-practice-list::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.box-content-practice-list::-webkit-scrollbar-track {
  background: #7b6060;
  border-radius: 20px;
}

/* Handle */
.box-content-practice-list::-webkit-scrollbar-thumb {
  background: #e57373;
  border-radius: 20px;
}

/* Handle on hover */
.box-content-practice-list::-webkit-scrollbar-thumb:hover {
  background: rgb(197, 111, 111);
}

.box-content {
  border-radius: 10px;
  overflow: hidden;
}

.content-success {
  box-shadow: 0 3px 0px #428c25;
}

.content-default {
  box-shadow: 0 3px 0px #db8200;
}

.content-current {
  box-shadow: 0 3px 0px #55aabe;
}

.text-success {
  color: #428c25;
}

.bg-success {
  background-color: #64a74a;
}
.bg-default {
  background-color: #ffaa2e;
}
.bg-current {
  background-color: #4adcfe;
}

.box-content-menu {
  height: 90%;
  overflow-y: auto;
}

.bg-r-img {
  background-image: url("../../public/images/practicelist/bg-map-theme-1.png");
  background-repeat: no-repeat;
  background-position: center;
}

/* width */
.box-content-menu::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.box-content-menu::-webkit-scrollbar-track {
  background: #7b6060;
  border-radius: 20px;
}

/* Handle */
.box-content-menu::-webkit-scrollbar-thumb {
  background: #e57373;
  border-radius: 20px;
}

/* Handle on hover */
.box-content-menu::-webkit-scrollbar-thumb:hover {
  background: rgb(197, 111, 111);
}
</style>
