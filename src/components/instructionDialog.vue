<template>
  <div>
    <q-dialog maximized v-model="isShowDialogInstruction" persistent>
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
                <span>{{ en }}</span>
                <div class="q-py-xs"></div>
                <span>{{ th }}</span>
              </div>
              <div class="col-12 q-py-sm self-end" align="center">
                <div v-close-popup class="btn-start cursor-pointer"></div>
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["isShowDialogInstruction", "en", "th"],

  setup(props) {
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

    return { practiceNameList };
  },
};
</script>

<style lang="scss" scoped>
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

.btn-start {
  background-image: url("../../public/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}
</style>
