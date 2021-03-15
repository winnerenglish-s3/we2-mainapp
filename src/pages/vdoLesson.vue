<template>
  <q-page class="right-col-bg">
    <app-bar
      :isShowHome="learningMode == 'selfLearning' ? true : false"
      :isShowPause="true"
    ></app-bar>
    <div class="box-container-main" v-if="isLoaded">
      <div class="row row-height">
        <div
          v-if="$q.platform.is.desktop && !isSynchronizeMode"
          class="col-md-4 col-xs-12 q-py-md q-px-lg"
          style="background-color: #fff0da"
        >
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="width: 100%; height: 100%"
          >
            <div
              v-for="(item, index) in lessonList"
              :key="index"
              class="q-pt-md"
              align="center"
            >
              <q-btn
                @click="clickLessonList(index, item)"
                no-caps
                style="width: 93%; margin: auto"
                class="shadow-1 q-py-md"
                :class="activeLessonList == index ? 'bg-info' : 'bg-white'"
              >
                <q-badge
                  color="orange"
                  class="q-pa-xs"
                  v-if="item.isNewData"
                  text-color="black"
                  floating
                  label="NEW"
                ></q-badge>
                <div class="row fit" align="left">
                  <div class="col-12 f16">{{ item.name }}</div>
                </div>

                <div
                  class="absolute-right"
                  style="top: 15px; right: 20px"
                  v-if="passedlessonList.includes(index)"
                >
                  <q-icon color="teal" name="far fa-check-circle"></q-icon>
                </div>
              </q-btn>
            </div>
          </q-scroll-area>
        </div>

        <div
          class="q-py-md q-px-lg relative-position row"
          :class="isSynchronizeMode ? 'col-12' : 'col-md-8 col-xs-12'"
        >
          <!-- IMG -->
          <div v-if="typeSelect == 'slide'" class="col-12">
            <q-img :src="lessonList[activeLessonList].imageUrl">
              <div class="absolute-bottom-right bg-transparent">
                <q-btn
                  push
                  round
                  icon="fas fa-volume-up"
                  v-if="practiceSkill != 'Grammar'"
                  :class="
                    isAudioPaying
                      ? 'bg-green text-white animate__animated animate__flash animate__infinite'
                      : 'volume-btn text-black'
                  "
                  size="lg"
                  @click="playAudio()"
                >
                </q-btn>
              </div>
            </q-img>
          </div>
          <!-- VIDEO -->
          <div v-else class="col-12">
            <div v-if="lessonList[activeLessonList]">
              <iframe
                :src="lessonList[activeLessonList].vdoLink + '?rel=0'"
                frameborder="0"
                style="width: 100%; height: calc(100vh * 9 / 16)"
                allow="autoplay"
              ></iframe>
            </div>
            <div v-else>DATA NOT FOUND</div>
          </div>
          <!-- <div
            class="q-pt-md col-12 row self-end"
            v-if="!isSynchronizeMode && !isShowRadioSelect"
            :class="$q.platform.is.desktop ? 'justify-between' : ' justify-center'"
          > -->
          <!-- Radio select -->
          <!-- <div style="top: 45px" align="center" class="col">
              <div
                class="bg-white row justify-center"
                style="width: 200px; border-radius: 10px"
              >
                <div style="width: 100px">
                  <q-radio
                    v-model="typeSelect"
                    keep-color
                    val="vdo"
                    color="amber"
                    label="วีดีโอ"
                  ></q-radio>
                </div>
                <div style="width: 100px">
                  <q-radio
                    v-model="typeSelect"
                    keep-color
                    val="slide"
                    color="amber"
                    label="สไลด์"
                  ></q-radio>
                </div>
              </div>
            </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { db } from "src/router";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
export default {
  components: { appBar },
  setup() {
    // Route
    const route = useRoute();
    const router = useRouter();
    // Qusar
    const $q = useQuasar();

    // scroll style
    const thumbStyle = {
      right: "4px",
      borderRadius: "5px",
      backgroundColor: "#9f220c",
      width: "5px",
      opacity: 0.75,
    };
    const barStyle = {
      right: "2px",
      borderRadius: "9px",
      backgroundColor: "#9f220c",
      width: "9px",
      opacity: 0.2,
    };
    const lessonList = ref([]);

    // lesson List ปัจจุบันที่คลิกอยู่
    const activeLessonList = ref(0);

    // เก็บค่า List ที่เคยกดไปแล้ว
    const passedlessonList = ref([0]);

    // กด lesson List
    const clickLessonList = (index, item) => {
      isAudioPaying.value = false;
      if (tempAudio.value) {
        tempAudio.value.pause();
      }

      if (item.soundUrl) {
        // กรณีเป็นเสียง
        typeSelect.value = "slide";
      } else {
        // กรณีเป็น VDO
        typeSelect.value = "vdo";
      }
      activeLessonList.value = index;
      if (!passedlessonList.value.includes(index)) {
        passedlessonList.value.push(index);
      }
    };

    // Get Lesson List
    const isLoaded = ref(false);
    const getlessonList = async () => {
      $q.loading.show();
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

      const postData = {
        practiceListId: route.params.practiceListId,
      };
      try {
        const response = await axios.post(apiURL, postData);
        isLoaded.value = true;
        let sortData = response.data.sort((a, b) => a.order - b.order);
        lessonList.value = sortData;
      } catch (error) {
        console.log(error);
      }
      $q.loading.hide();
    };

    // Type select between video and slide
    const typeSelect = ref("vdo");

    // Synchronize
    const isSynchronizeMode = ref(false);

    const learningMode = ref("");
    const listenSynchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          isSynchronizeMode.value = true;
          typeSelect.value = data.data().mode;
          activeLessonList.value = data.data().lesson.currentLessonIndex;
          learningMode.value = "control";
        } else {
          isSynchronizeMode.value = false;
          learningMode.value = "selfLearning";
        }
      });

    const isShowRadioSelect = ref(false);
    const practiceSkill = ref("");

    // Check Practice Skill
    const checkSkill = async () => {
      let response = await db
        .collection("practiceList")
        .doc(route.params.practiceListId)
        .get();
      practiceSkill.value = response.data().skill;

      if (response.data().skill != "Grammar") {
        isShowRadioSelect.value = true;
      }
    };

    // Play Audio
    const tempAudio = ref("");
    const isAudioPaying = ref(false);
    const playAudio = () => {
      if (tempAudio.value) {
        tempAudio.value.pause();
      }
      let soundUrl = lessonList.value[activeLessonList.value].soundUrl;
      let audio = new Audio(soundUrl);
      tempAudio.value = audio;
      audio.play();
      isAudioPaying.value = true;
      // On Video End
      audio.onended = () => {
        isAudioPaying.value = false;
      };
    };

    onMounted(async () => {
      await checkSkill();
      await getlessonList();
    });

    onBeforeUnmount(() => {
      listenSynchronize();
    });

    return {
      isAudioPaying,
      lessonList,
      activeLessonList,
      clickLessonList,
      passedlessonList,
      thumbStyle,
      barStyle,
      typeSelect,
      isSynchronizeMode,
      learningMode,
      isLoaded,
      isShowRadioSelect,
      practiceSkill,
      playAudio,
    };
  },
};
</script>

<style lang="scss" scoped>
.row-height {
  height: calc((100vh - 50px));
}

.scroll-area-height {
  height: calc((100vh - 100px));
}

.text-color {
  color: #6c6c6c;
}
.right-col-bg {
  background-image: url("../../public/images/grammar/bg-theme-lesson/bg2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.volume-btn {
  background-image: linear-gradient(#ffd158, #ffbb0c);
}
</style>
