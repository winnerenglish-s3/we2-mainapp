<template>
  <q-page>
    <app-bar></app-bar>
    <div class="box-container-main">
      <div class="row row-height">
        <div
          v-if="$q.platform.is.desktop"
          class="col-md-4 col-xs-12 q-py-md q-px-lg"
          style="background-color: #fff0da"
        >
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="width: 100%; height: 100%"
          >
            <div
              v-for="(item, index) in grammarList"
              :key="index"
              :class="{ 'q-pt-md': index != 0 }"
              align="center"
            >
              <q-btn
                @click="clickGrammarList(index)"
                no-caps
                style="width: 93%; margin: auto"
                class="shadow-1"
                :class="activeGrammarList == index ? 'bg-info' : 'bg-white'"
              >
                <q-badge
                  color="orange"
                  class="q-pa-xs"
                  v-if="item.isNew"
                  text-color="black"
                  floating
                  label="NEW"
                ></q-badge>
                <div class="row fit" align="left">
                  <div class="col-12 f16">{{ item.titleEn }}</div>
                  <div class="col-12 f14 text-color">{{ item.titleTh }}</div>
                </div>

                <div
                  class="absolute-right"
                  style="top: 15px; right: 20px"
                  v-if="passedGrammarList.includes(index)"
                >
                  <q-icon color="teal" name="far fa-check-circle"></q-icon>
                </div>
              </q-btn>
            </div>
          </q-scroll-area>
        </div>

        <div
          class="q-py-md q-px-lg col-md-8 col-xs-12 right-col-bg relative-position row"
        >
          <!-- IMG -->
          <div v-if="typeSelect == 'slide'" class="col-12">
            <q-img src="../../public/grammar-test.png"></q-img>
          </div>
          <!-- VIDEO -->
          <div v-else class="col-12">
            <q-video
              :ratio="16 / 9"
              src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
              style="width: 100%; height: 100%"
            />
          </div>

          <!-- Mobile Next Button -->
          <q-page-sticky
            position="bottom-right"
            :offset="[18, 18]"
            class="mobile-only"
          >
            <q-btn
              @click="nextGrammar()"
              round
              color="amber"
              class="text-white relative-position"
              style="width: 50px; height: 50px"
              :disable="activeGrammarList == grammarList.length - 1"
            >
              <q-icon
                size="xl"
                name="fas fa-caret-right absolute"
                style="left: 6px"
              ></q-icon>
            </q-btn>
          </q-page-sticky>

          <!-- Mobile Previous Button -->
          <q-page-sticky
            position="bottom-left"
            :offset="[18, 18]"
            class="mobile-only"
          >
            <q-btn
              @click="previousGrammar()"
              round
              color="amber"
              class="text-white relative-position"
              style="width: 50px; height: 50px"
              :disable="activeGrammarList == 0"
            >
              <q-icon
                size="xl"
                name="fas fa-caret-left "
                style="right: 6px"
              ></q-icon>
            </q-btn>
          </q-page-sticky>

          <div
            class="q-pt-md col-12 row self-end"
            :class="
              $q.platform.is.desktop ? 'justify-between' : ' justify-center'
            "
          >
            <!-- left button -->
            <div v-if="$q.platform.is.desktop">
              <q-btn
                @click="previousGrammar()"
                round
                color="amber"
                class="text-white relative-position"
                style="width: 50px; height: 50px"
                :disable="activeGrammarList == 0"
              >
                <q-icon
                  size="xl"
                  name="fas fa-caret-left "
                  style="right: 6px"
                ></q-icon>
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
                @click="nextGrammar()"
                round
                color="amber"
                class="text-white relative-position"
                style="width: 50px; height: 50px"
                :disable="activeGrammarList == grammarList.length - 1"
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
import { ref } from "vue";
export default {
  components: { appBar },
  setup() {
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

    const grammarList = ref([
      {
        titleEn: "Cover",
        titleTh: "หน้าปก",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
      {
        titleEn: "Adjectives",
        titleTh: "คำคุณศัพท์",
        isNew: true,
      },
    ]);

    // Grammar List ปัจจุบันที่คลิกอยู่
    const activeGrammarList = ref(0);
    // เก็บค่า List ที่เคยกดไปแล้ว
    const passedGrammarList = ref([0]);
    // กด Grammar List
    const clickGrammarList = (index) => {
      activeGrammarList.value = index;
      if (!passedGrammarList.value.includes(index)) {
        passedGrammarList.value.push(index);
      }
    };

    // Type select between video and slide
    const typeSelect = ref("vdo");
    // next vdo / slice
    const nextGrammar = () => {
      //   if (activeGrammarList.value < grammarList.value.length - 1) {
      activeGrammarList.value++;
      //   }
      clickGrammarList(activeGrammarList.value);
    };
    const previousGrammar = () => {
      //   if (activeGrammarList.value > 0) {
      activeGrammarList.value--;
      //   }
    };

    return {
      grammarList,
      activeGrammarList,
      clickGrammarList,
      passedGrammarList,
      thumbStyle,
      barStyle,
      typeSelect,
      nextGrammar,
      previousGrammar,
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
