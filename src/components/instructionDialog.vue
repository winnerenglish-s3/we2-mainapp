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
                  <span>{{ en }}</span>
                </div>
                <div>
                  <span>{{ th }}</span>
                </div>
              </div>

              <div class="col-12 self-end q-py-md" align="center">
                <q-img
                  v-close-popup
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
  </div>
</template>

<script>
export default {
  props: ["isShowDialogInstruction", "en", "th"],
};
</script>

<style lang="scss" scoped></style>
