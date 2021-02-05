<template>
  <q-page class="bg-conversation">
    <conversation-multi-pc
      :themeSync="themeSync"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></conversation-multi-pc>
    <conversation-multi-mobile
      :themeSync="themeSync"
      v-if="$q.platform.is.mobile"
    ></conversation-multi-mobile>

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
              indicator-color="transparent"
              align="justify"
            >
              <q-tab class="q-pa-sm no-pointer-events" name="video" label="วิดีโอ" />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="video">
                  <div class="row">
                    <div
                      :class="$q.platform.is.mobile ? 'col-12 q-pb-md' : 'col'"
                      class="row"
                    >
                      <div class="col-12 q-pa-md">
                        <span> xxxxxx </span>
                      </div>
                      <div class="col-12 q-px-md">
                        <video
                          style="width: 100%; border: 1px solid #000"
                          src="../../public/video/example.mp4"
                          controls
                          controlsList="nodownload"
                        ></video>
                      </div>
                      <div v-if="$q.platform.is.desktop" class="col-12 self-end">
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
import conversationMultiPc from "../components/conversation/conversationmultiPc";
import conversationMultiMobile from "../components/conversation/conversationmultiMobile";
export default {
  components: {
    conversationMultiPc,
    conversationMultiMobile,
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
      isHasHelp: true,
      isHasInstruction: true,
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
.bg-conversation {
  background-image: url("../../public/images/conversation/bg-conversation.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
}

.box-container-main {
  max-width: 1600px;
  width: 100%;
  height: calc(100vh - 50px);
  margin: auto;
}

.box-help-practice-pc {
  overflow: hidden;
  max-width: 600px;
  min-width: 290px;
  width: 100%;
  border-radius: 0px 0px 7px 7px;
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
</style>
