<template>
  <q-page class="row full-height">
    <div class="col-12 self-start">
      <app-bar></app-bar>
    </div>

    <div
      class="col-12 row bg-practice-main"
      style="max-height: fit-content; min-height: calc(100vh - 50px)"
    >
      <!-- รายการแบบฝึกหัด -->
      <div class="col self-center" align="center">
        <div class="row relative-position">
          <!-- ปุ่มกดย้อนกลับ -->
          <div class="col self-center">
            <q-img
              class="cursor-pointer"
              width="40px"
              src="../../public/images/practicelist/previous-list-btn.png"
            ></q-img>
          </div>
          <!-- รายละเอียด Unit ทั้งหมด -->
          <div class="col-6 box-container-pracitcelist">
            <div class="row box-content-practicelist q-py-sm q-px-md">
              <div class="col-3 self-center" style="width: 100px" algin="center"></div>
              <div class="col self-center" algin="center">
                <span class="f20 text-amber-5">{{ selectSkill }}</span>
              </div>
              <div class="col-3 self-center" style="width: 100px" algin="center">
                <q-select
                  v-model="selectLevel"
                  :options="levelList"
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
                  <span class="f16">5/20</span>
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
                        `0/${showPracticeListName(i).totalPractice}`
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
              class="transparent absolute-center row box-content-menu justify-center items-start"
              style="max-width: 800px; width: 50%"
            >
              <div
                class="col-6 self-start"
                align="center"
                v-for="(item, index) in practiceListShow"
                :key="index"
              >
                <div class="">
                  <q-img
                    contain=""
                    style="max-width: 150px"
                    class="cursor-pointer"
                    :src="showIconPractice(item.practicetype)"
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
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import studentHooks from "../hooks/studentHooks.js";
import practiceHooks from "../hooks/practiceHooks";
import { db } from "src/router/index.js";
import { useQuasar } from "quasar";
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
  setup(props, context) {
    // Router
    const $q = useQuasar();
    const router = useRouter();

    // Course Data
    const selectLevel = ref("");
    const totalUnit = ref(0);

    const getCourse = async () => {
      let course = await studentHooks.student().course();

      selectLevel.value = course.level;

      let getUnit = await db.collection("level").where("level", "==", course.level).get();

      totalUnit.value = Number(getUnit.docs[0].data().unit);
    };

    // Practice Data
    const practiceList = ref([]);
    const practiceName = ref([]);
    const selectSkill = ref("Vocabulary");

    const getPractice = async () => {
      practiceList.value = await practiceHooks.practice(selectLevel.value).practiceList();

      practiceName.value = await practiceHooks.practice(selectLevel.value).practiceName();
    };

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
    };

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

    const gotoPractice = (data) => {
      let routerName = "";

      if (data.practicetype == "flashcard") {
        routerName = "/flashcard/";
      } else if (data.practicetype == "matching") {
        routerName = "/matching/";
      }

      router.push(routerName + data.practiceListId);
    };

    onMounted(async () => {
      await getCourse();
      await getPractice();
    });

    // --------------------------------------------

    const activeUnit = ref(null);

    const levelList = ref([]);

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

      //
      levelList,
      unitCompleteList,
      activeUnit,
    };
  },
};
</script>

<style lang="scss" scoped>
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
