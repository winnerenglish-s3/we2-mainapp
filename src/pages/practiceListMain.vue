<template>
  <q-page
    :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'"
    :class="{ 'bg-practice-img': $q.platform.is.mobile }"
  >
    <app-bar :isShowHome="true"></app-bar>

    <!-- DESKTOP Will Show BACKGROUND IMAGE -->
    <div class="fit" v-if="$q.platform.is.desktop">
      <lobby-day class="absolute-top fit" v-if="mode"></lobby-day>
      <lobby-night class="absolute-top fit" v-else> </lobby-night>
      <div
        v-if="isLoad"
        class="absolute-center"
        style="width: 90%; height: 70%; min-height: fit-content; max-width: 1200px"
      >
        <div
          class="bg-practice-img row animate__animated animate__bounceInDown"
          style="
            animation-duration: 2s;
            border-radius: 40px;
            border: 10px solid #f68a14;
            background-color: #fff1d6;
            overflow: hidden;
          "
        >
          <div class="col-6 q-py-md q-px-xl" style="box-shadow: 1px 1px 5px">
            <div class="row" style="width: 100%; margin: auto">
              <!-- Level Dropdown -->
              <div style="width: 85px">
                <q-select
                  outlined
                  dense
                  borderless
                  v-model="levelSelected"
                  :options="levelOptions"
                  bg-color="amber"
                ></q-select>
              </div>
              <!-- unit Dropdown -->
              <div class="q-pl-md col">
                <q-select
                  style="width: 100%; border: 1px solid #4e1617; border-radius: 5px"
                  borderless
                  outlined
                  dense
                  bg-color="white"
                  v-model="unitSelected"
                  :options="unitOptions"
                ></q-select>
              </div>
            </div>

            <!-- Vocabulary -->
            <div class="q-pt-lg">
              <div class="text-weight-bold text-brown">คำศัพท์</div>
              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Vocabulary").nameEng }})
              </div>
              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in vocabPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
            </div>

            <div class="q-py-md">
              <hr style="border-top: 3px dashed #eeae5c" />
            </div>

            <!-- Grammar -->
            <div>
              <div class="text-weight-bold text-brown">ไวยากรณ์</div>
              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Grammar").nameEng }})
              </div>
              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in grammarPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
            </div>

            <div class="q-py-md">
              <hr style="border-top: 3px dashed #eeae5c" />
            </div>

            <!-- Reading -->
            <div>
              <div class="text-weight-bold text-brown">การอ่าน</div>
              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Reading").nameEng }})
              </div>
              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in readingPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
              <div class="q-py-md">
                <hr style="border-top: 3px dashed #eeae5c" />
              </div>
            </div>
          </div>
          <div class="col-6 q-py-md q-px-xl">
            <!-- Writing -->
            <div>
              <div class="text-weight-bold text-brown">การเขียน</div>
              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Writing").nameEng }})
              </div>
              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in writingPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
            </div>
            <div class="q-py-md">
              <hr style="border-top: 3px dashed #eeae5c" />
            </div>

            <!-- Phonics -->
            <div>
              <div class="text-weight-bold text-brown">การออกเสียง</div>
              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Phonics").nameEng }})
              </div>
              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in phonicsPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
            </div>
            <div class="q-py-md">
              <hr style="border-top: 3px dashed #eeae5c" />
            </div>

            <!-- Listening & Speaking -->
            <div>
              <div class="text-weight-bold text-brown">การฟังและการพูด</div>

              <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
                ({{ showPracticeName("Listening & Speaking").nameEng }})
              </div>

              <div class="flex q-gutter-md">
                <div
                  v-for="(item, index) in listeningPracticeList"
                  :key="index"
                  class="practice-btn"
                >
                  <q-img
                    @click="gotoPractice(item)"
                    style="width: 90px"
                    :src="showPracticeIcon(item)"
                  ></q-img>
                </div>
              </div>
            </div>
            <div class="q-py-md">
              <hr style="border-top: 3px dashed #eeae5c" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ************************************** Mobile ************************************** -->
    <div
      class="mobile-only q-pa-md animate__animated animate__bounceInDown"
      style="animation-duration: 2s"
      v-if="isLoad"
    >
      <div class="row" style="max-width: 400px; margin: auto">
        <!-- Level Dropdown -->
        <div style="width: 85px">
          <q-select
            outlined
            dense
            borderless
            v-model="levelSelected"
            :options="levelOptions"
            bg-color="amber"
          ></q-select>
        </div>
        <!-- unit Dropdown -->
        <div class="q-pl-md col">
          <q-select
            style="width: 100%; border: 1px solid #4e1617; border-radius: 5px"
            borderless
            outlined
            dense
            bg-color="white"
            v-model="unitSelected"
            :options="unitOptions"
          ></q-select>
        </div>
      </div>

      <!-- Vocabulary List -->
      <div class="q-pt-lg">
        <div class="text-weight-bold text-brown">คำศัพท์</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Vocabulary").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in vocabPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- Grammar List -->
      <div>
        <div class="text-weight-bold text-brown">ไวยากรณ์</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Grammar").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in grammarPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- Reading List -->
      <div>
        <div class="text-weight-bold text-brown">การอ่าน</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Reading").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in readingPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Writing" List -->
      <div>
        <div class="text-weight-bold text-brown">การเขียน</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Writing").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in writingPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Phonics" List -->
      <div>
        <div class="text-weight-bold text-brown">การฟัง</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Phonics").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in phonicsPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Listening" List -->
      <div>
        <div class="text-weight-bold text-brown">การพูด</div>
        <div style="color: #a95d00" class="text-weight-bolder q-pb-sm">
          ({{ showPracticeName("Listening & Speaking").nameEng }})
        </div>
        <div class="flex q-gutter-md">
          <div
            v-for="(item, index) in listeningPracticeList"
            :key="index"
            @click="gotoPractice(item)"
          >
            <q-img style="width: 70px" :src="showPracticeIcon(item)"></q-img>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>
    </div>

    <!-- Mobile  -->
  </q-page>
</template>

<script>
import lobbyDay from "../components/lobby/lobbyDayPc";
import lobbyNight from "../components/lobby/lobbyNightPc";
import appBar from "../components/app-bar";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import studentHooks from "../hooks/studentHooks.js";
import practiceHooks from "../hooks/practiceHooks";
export default {
  components: {
    lobbyDay,
    lobbyNight,
    appBar,
  },
  setup() {
    // background mode
    const mode = ref(false);
    // Router
    const router = useRouter();
    const route = useRoute();
    // Quasar
    const $q = useQuasar();
    // Level Selected
    const levelOptions = ref([]);
    const levelSelected = ref("");
    // unit Selected
    const unitOptions = ref([]);
    const unitSelected = ref("");

    // Load Practice
    const practiceLog = ref([]);
    const practiceList = ref([]);
    const practiceName = ref([]);
    const isLoad = ref(false);

    const vocabPracticeList = ref([]);
    const grammarPracticeList = ref([]);
    const readingPracticeList = ref([]);
    const writingPracticeList = ref([]);
    const phonicsPracticeList = ref([]);
    const listeningPracticeList = ref([]);
    const filterPracticeList = () => {
      // Vocab Practice List
      vocabPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Vocabulary" && x.unit == unitSelected.value.value
      );
      vocabPracticeList.value.sort((a, b) => a.order - b.order);

      // Grammar Practice List
      grammarPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Grammar" && x.unit == unitSelected.value.value
      );
      grammarPracticeList.value.sort((a, b) => a.order - b.order);

      // Reading Practice List
      readingPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Reading" && x.unit == unitSelected.value.value
      );
      readingPracticeList.value.sort((a, b) => a.order - b.order);

      // Writing Practice List
      writingPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Writing" && x.unit == unitSelected.value.value
      );
      writingPracticeList.value.sort((a, b) => a.order - b.order);

      // Phonics Practice List
      phonicsPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Phonics" && x.unit == unitSelected.value.value
      );
      phonicsPracticeList.value.sort((a, b) => a.order - b.order);

      // Listening Practice List
      listeningPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Listening & Speaking" && x.unit == unitSelected.value.value
      );
      listeningPracticeList.value.sort((a, b) => a.order - b.order);
    };

    watch(unitSelected, async (newValue, oldValue) => {
      getPractice();
    });
    watch(levelSelected, async (newValue, oldValue) => {
      getPractice();
    });

    const getPractice = async () => {
      try {
        $q.loading.show({
          delay: 0,
        });

        // Get Practice List
        practiceList.value = await practiceHooks
          .practice(levelSelected.value.value)
          .practiceList();
        filterPracticeList();

        // Get Practice Name
        practiceName.value = await practiceHooks
          .practice(levelSelected.value.value)
          .practiceName();

        // Get PracticeLog
        practiceLog.value = await practiceHooks.practice(levelSelected.value.value).log();
        // if ($q.platform.is.desktop) {
        //   activeUnit.value = 1;
        //   showPracticeList(activeUnit.value);
        // }

        $q.loading.hide();
      } catch (error) {
        console.error(error);
      }
    };

    // Level List
    // Get Course
    const getCourse = async (uid) => {
      try {
        let course = await studentHooks.student(uid).course();
        let allLevel = await practiceHooks.level();
        course.forEach(async (element) => {
          levelOptions.value.push({
            label: "ระดับ" + allLevel.filter((x) => x.level == element.level)[0].level,
            value: allLevel.filter((x) => x.level == element.level)[0].level,
            unit: Number(allLevel.filter((x) => x.level == element.level)[0].unit),
            courseId: element.courseId,
          });
        });

        levelSelected.value = levelOptions.value[0];
        const totalUnit = levelOptions.value[0].unit;

        let tempUnit = [];
        for (let unit = 0; unit < totalUnit; unit++) {
          tempUnit.push({
            label: "บทที่" + (unit + 1),
            value: unit + 1,
          });
        }
        unitOptions.value = tempUnit;
        unitSelected.value = tempUnit[0];
      } catch (error) {
        console.error(error);
      }
    };

    const showPracticeIcon = (item) => {
      let type = item.practiceType;

      let star = 0;

      let findStar = practiceLog.value.filter(
        (x) => x.practiceListId == item.practiceListId
      );

      let learningImg = require("../../public/images/practicelist/learning.png");

      if (findStar.length) {
        star = findStar[0].star;
        learningImg = require("../../public/images/practicelist/learning-1.png");
      }

      let nameImage;
      if (
        type == "flashcard" ||
        type == "grammarlesson" ||
        type == "phonicslesson" ||
        type == "languagetips" ||
        type == "conversationlesson"
      ) {
        nameImage = learningImg;
      } else if (type == "matching") {
        nameImage = require(`../../public/images/practicelist/matching-btn-${star}.png`);
      } else if (type.includes("multi")) {
        nameImage = require(`../../public/images/practicelist/multi-btn-${star}.png`);
      } else if (type == "clozetest" || type == "translation") {
        nameImage = require(`../../public/images/practicelist/writing-btn-${star}.png`);
      } else if (type == "spellingbee") {
        nameImage = require(`../../public/images/practicelist/spell-btn-${star}.png`);
      } else if (type == "grammaraction") {
        nameImage = require(`../../public/images/practicelist/action-btn-${star}.png`);
      } else {
        // audio record and evaluation
        nameImage = require(`../../public/images/practicelist/action-btn-${star}.png`);
      }
      let random = Math.random();

      return `${nameImage}`;
    };

    const showPracticeName = (skill) => {
      let res = practiceName.value.filter(
        (x) => x.skill == skill && x.unit == unitSelected.value.value.toString()
      );

      return res ? res[0] : "";
    };

    const gotoPractice = (data) => {
      // let checkCounter = showPassedPracticeCounter(data.practiceListId);

      // if (data.practiceType != "flashcard") {
      //   if (checkCounter >= 2) {
      //     return;
      //   }
      // }

      let routerName = "";

      if (data.practiceType == "flashcard") {
        routerName = "/flashcard/";
      } else if (data.practiceType == "matching") {
        routerName = "/matching/";
      } else if (data.practiceType.includes("multiplechoices")) {
        if (data.skill == "Vocabulary") {
          routerName = "/multiplevocab/";
        } else if (data.skill == "Grammar") {
          routerName = "/grammarmultiple/";
        } else if (data.skill == "Phonics") {
          routerName = "/phonicsMultiple/";
        } else if (data.skill == "Reading") {
          routerName = "/readingmultiple/";
        } else if (data.skill == "Listening & Speaking") {
          if (data.practiceType == "multiplechoices(answersound)") {
            routerName = "/conversationmultiple/";
          } else {
            routerName = "/languagetipmultiple/";
          }
        }
      } else if (data.practiceType == "spellingbee") {
        routerName = "/spellingbee/";
      } else if (
        data.practiceType == "grammarlesson" ||
        data.practiceType == "phonicslesson" ||
        data.practiceType == "languagetips"
      ) {
        routerName = "/vdoLesson/";
      } else if (data.practiceType == "grammaraction") {
        routerName = "/grammarAction/";
      } else if (data.practiceType == "translation") {
        routerName = "/translation/";
      } else if (data.practiceType == "clozetest") {
        routerName = "/clozeTest/";
      } else if (data.practiceType == "conversationlesson") {
        routerName = "/conversationLesson/";
      } else if (data.practiceType == "roleplay") {
        routerName = "/roleplay/";
      }
      router.push(routerName + data.practiceListId);
    };

    onMounted(() => {
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          // User is signed in.
          await getCourse(user.uid);
          await getPractice();
          isLoad.value = true;
        } else {
          // User is signed out.
          router.push("/");
        }
      });
    });

    return {
      mode,
      levelOptions,
      levelSelected,
      unitOptions,
      unitSelected,
      practiceList,
      practiceName,
      practiceLog,
      vocabPracticeList,
      grammarPracticeList,
      readingPracticeList,
      writingPracticeList,
      phonicsPracticeList,
      listeningPracticeList,
      showPracticeIcon,
      gotoPractice,
      isLoad,
      showPracticeName,
    };
  },
};
</script>

<style lang="scss" scoped>
.level-select-color {
  background-image: linear-gradient(#ffcb54, #f2a81e);
}
.bg-practice-img {
  background-image: url("../../public/images/practicelist/bg-practice.png");
  background-repeat: repeat-x;
  background-size: cover;
  background-position: center;
}
.practice-btn:hover {
  transform: scale(0.95);
  cursor: pointer;
}
</style>
