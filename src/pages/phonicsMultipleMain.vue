<template>
  <q-page class="bg-phonics">
    <phonics-multi-pc
      :themeSync="themeSync"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></phonics-multi-pc>
    <phonics-multi-mobile
      :themeSync="themeSync"
      v-if="$q.platform.is.mobile"
    ></phonics-multi-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0 q-pa-md">
        <q-card-section class="fit">
          <div
            class="absolute-center"
            :class="
              $q.platform.is.desktop ? 'box-help-practice-pc' : 'box-help-practice-mobile'
            "
          >
            <q-tabs
              v-model="tab"
              shrink
              dense
              class="box-header-help text-warning"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm" name="video" label="วิดีโอ" />
              <q-tab
                v-if="$q.platform.is.mobile"
                class="q-pa-sm"
                name="word"
                label="เทียบเสียง"
              />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="video">
                  <div class="row">
                    <div
                      :class="
                        $q.platform.is.mobile
                          ? 'col-12 q-pa-md'
                          : 'col-3 box-help-left q-pa-sm'
                      "
                      class=" "
                      :style="$q.platform.is.mobile ? '' : 'width: 230px'"
                    >
                      <!-- Desktop -->
                      <div
                        v-for="i in 15"
                        v-if="$q.platform.is.desktop"
                        :key="i"
                        v-ripple
                        class="relative-position cursor-pointer q-py-sm q-px-sm rounded-borders q-mb-sm box-choices"
                        :style="
                          selectHelp == i
                            ? 'background-color:#48DBFC'
                            : 'background-coor:#fff;'
                        "
                        @click="selectHelp = i"
                      >
                        {{ `การออกเสียงอักษรต้นผสม ch การ ออกเสียงอักษรต้นผสม  ch #2` }}
                      </div>

                      <div v-if="$q.platform.is.mobile" align="center">
                        <q-select
                          dense
                          filled
                          borderless=""
                          class="rounded-borders"
                          v-model="testSelect"
                          :options="[]"
                        ></q-select>
                      </div>
                    </div>
                    <div
                      :class="
                        $q.platform.is.mobile ? 'col-12 q-pt-md q-px-md q-pb-xl' : 'col'
                      "
                      class="row"
                    >
                      <div class="col-12" :class="$q.platform.is.mobile ? '' : 'q-pa-sm'">
                        <video
                          style="width: 100%; border: 1px solid #000"
                          src="../../public/video/example.mp4"
                          controls
                          controlsList="nodownload"
                        ></video>
                        <div class="row q-mt-md">
                          <div>
                            <q-img
                              class="cursor-pointer btn-hover"
                              width="50px"
                              src="../../public/images/phonicsmulti/btn-left-help-phonics.png"
                            ></q-img>
                          </div>
                          <q-space></q-space>
                          <div class="self-center">
                            <q-img
                              class="cursor-pointer btn-hover"
                              width="150px"
                              src="../../public/images/phonicsmulti/btn-play-video.png"
                            ></q-img>
                          </div>
                          <q-space></q-space>
                          <div>
                            <q-img
                              class="cursor-pointer btn-hover"
                              width="50px"
                              src="../../public/images/phonicsmulti/btn-right-help-phonics.png"
                            ></q-img>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="$q.platform.is.desktop"
                        class="col-12 self-end q-pt-sm"
                        style="border-top: 2px solid #b4b4b4"
                      >
                        <div
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
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panels> </q-tab-panels>
                <q-tab-panel class="no-padding" name="word">
                  <div class="box-help-word">
                    <div
                      class="row justify-around q-pa-sm q-px-lg"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="i in 20"
                    >
                      <div>{{ i }}</div>
                      <div>
                        <span>เทียบเสียงไทย</span>
                      </div>
                      <div>
                        {{ "ท" }}
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
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
import phonicsMultiPc from "../components/phonicsmultiple/phonicsMultiplePc";
import phonicsMultiMobile from "../components/phonicsmultiple/phonicsMultipleMobile";
export default {
  components: {
    phonicsMultiPc,
    phonicsMultiMobile,
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
      default: 0,
    },
  },
  data() {
    return {
      tab: "video",
      selectHelp: 1,

      isHasHelp: true,
      isHasInstruction: true,

      testSelect: "",
    };
  },
  methods: {
    closeHelpBtn() {
      this.$emit("closeHelp");
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
.bg-phonics {
  background-image: url("../../public/images/phonicsmulti/bg-phonics.png");
  background-size: cover;
  background-position: center;
}

.box-container-main {
  max-width: 1600px;
  width: 100%;
  height: calc(100vh - 50px);
  margin: auto;
}

.box-help-practice-pc {
  max-width: 800px;
  min-width: 290px;
  width: 100%;
}

.box-help-practice-mobile {
  max-width: 400px;
  width: 100%;
}

.box-header-help {
  background-color: #9f220c;
  color: #fff;
  border-radius: 7px 7px 0px 0px;
  font-size: 20px;
}

.box-help-left {
  background-color: #fff0da;
  height: 500px;
  overflow: auto;
}

.box-choices {
  background-color: #ffffff;
  box-shadow: 0 1px 1px #000;
}

/* width */
.box-help-left::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-help-left::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-help-left::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-help-left::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-hover {
  transition: 0.3s;
  transform: scale(1);
}

.btn-hover:hover {
  transition: 1s;
  transform: scale(0.95);
}

.box-help-word {
  height: 500px;
  overflow: auto;
}

/* width */
.box-help-word::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-help-word::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-word::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-word::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}
</style>
