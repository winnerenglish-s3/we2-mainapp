<template>
  <q-page>
    <app-bar :isShowHome="learningMode == 'selfLearning' ? true : false"></app-bar>
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
                @click="clickLessonList(index)"
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
          class="q-py-md q-px-lg right-col-bg relative-position row"
          :class="isSynchronizeMode ? 'col-12' : 'col-md-8 col-xs-12'"
        >
          <!-- IMG -->
          <div v-if="typeSelect == 'slide'" class="col-12">
            <q-img :src="lessonList[activeLessonList].imageUrl"></q-img>
          </div>
          <!-- VIDEO -->
          <div v-else class="col-12">
            <iframe
              :src="lessonList[activeLessonList].vdoLink + '?rel=0'"
              frameborder="0"
              style="width: 100%; height: calc(100vh * 9 / 16)"
              allow="autoplay"
            ></iframe>
          </div>

          <!-- Mobile Next Button -->
          <q-page-sticky position="bottom-right" :offset="[18, 18]" class="mobile-only">
            <q-btn
              @click="nextlesson()"
              round
              color="amber"
              class="text-white relative-position"
              style="width: 50px; height: 50px"
              :disable="activeLessonList == lessonList.length - 1"
            >
              <q-icon
                size="xl"
                name="fas fa-caret-right absolute"
                style="left: 6px"
              ></q-icon>
            </q-btn>
          </q-page-sticky>

          <!-- Mobile Previous Button -->
          <q-page-sticky position="bottom-left" :offset="[18, 18]" class="mobile-only">
            <q-btn
              @click="previouslesson()"
              round
              color="amber"
              class="text-white relative-position"
              style="width: 50px; height: 50px"
              :disable="activeLessonList == 0"
            >
              <q-icon size="xl" name="fas fa-caret-left " style="right: 6px"></q-icon>
            </q-btn>
          </q-page-sticky>

          <div
            class="q-pt-md col-12 row self-end"
            v-if="!isSynchronizeMode"
            :class="$q.platform.is.desktop ? 'justify-between' : ' justify-center'"
          >
            <!-- left button -->
            <div v-if="$q.platform.is.desktop">
              <q-btn
                @click="previouslesson()"
                round
                color="amber"
                class="text-white relative-position"
                style="width: 50px; height: 50px"
                :disable="activeLessonList == 0"
              >
                <q-icon size="xl" name="fas fa-caret-left " style="right: 6px"></q-icon>
              </q-btn>
            </div>
            <!-- Radio select -->
            <div style="top: 45px">
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
            </div>
            <!-- Right Button -->
            <div v-if="$q.platform.is.desktop">
              <q-btn
                @click="nextlesson()"
                round
                color="amber"
                class="text-white relative-position"
                style="width: 50px; height: 50px"
                :disable="activeLessonList == lessonList.length - 1"
              >
                <q-icon
                  size="xl"
                  name="fas fa-caret-right absolute"
                  style="left: 6px"
                ></q-icon>
              </q-btn>
            </div>
          </div>
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
    const clickLessonList = (index) => {
      activeLessonList.value = index;
      if (!passedlessonList.value.includes(index)) {
        passedlessonList.value.push(index);
      }
    };

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
    // next vdo / slice
    const nextlesson = () => {
      activeLessonList.value++;
      clickLessonList(activeLessonList.value);
    };
    const previouslesson = () => {
      activeLessonList.value--;
    };

    // Synchronize
    const isSynchronizeMode = ref(false);
    // const synchronizeMode = ref("vdo"); //vdo or slide

    const learningMode = ref("");

    const listenSynchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          isSynchronizeMode.value = true;
          typeSelect.value = data.data().lesson.mode;
          activeLessonList.value = data.data().lesson.currentLessonIndex;
          learningMode.value = "control";
        } else {
          isSynchronizeMode.value = false;
          learningMode.value = "selfLearning";
        }
      });

    onMounted(() => {
      getlessonList();
    });

    onBeforeUnmount(() => {
      listenSynchronize();
    });

    return {
      lessonList,
      activeLessonList,
      clickLessonList,
      passedlessonList,
      thumbStyle,
      barStyle,
      typeSelect,
      nextlesson,
      previouslesson,
      isSynchronizeMode,
      learningMode,
      isLoaded,
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
</style>
