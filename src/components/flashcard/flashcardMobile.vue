<template>
  <div class="box-container-main bg-white">
    <!-- Self Learning -->
    <div v-if="!isSynchronize">
      <div
        @click="!isShowDetails ? openDialog() : null"
        v-ripple
        class="relative-position row cursor-pointer bg-white q-mb-xs"
        v-for="(item, index) in vocabDataList"
        :key="index"
      >
        <div class="col-3" style="width: 100px">
          <q-img
            src="../../../public/images/flashcard/draft-img-flashcard.png"
          ></q-img>
        </div>
        <div class="col self-center q-px-md">
          <span style="font-size: max(3vw, 24px)"> {{ item.vocab }}</span>
          <span
            class="relative-position q-mx-sm"
            style="font-size: max(2vw, 14px)"
            >(v.)</span
          >
        </div>
        <div class="col-1 self-center">
          <q-icon
            name="fas fa-chevron-right"
            class="text-grey-5"
            size="24px"
          ></q-icon>
        </div>
      </div>
    </div>

    <!-- Synchronize -->
    <div v-else>
      <div class="row">
        <div class="col-12 q-pa-md" align="center">
          <q-img
            style="max-width: 300px; width: 100%"
            src="../../../public/images/flashcard/draft-img-flashcard.png"
          ></q-img>
        </div>
        <div class="col-12 q-pa-md f18" align="center">
          <span class="f36">attack</span>
          <span class="q-mx-sm">(v.)</span>
          <br />
          <div class="q-my-md">
            <span>อะ-แทค</span>
          </div>
          <div>
            <span>โจมตี, รุกราน, บุก</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog For Self Learning -->
    <q-dialog
      maximized
      v-model="showDialog"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="shadow-0">
        <q-card-section class="no-padding">
          <div class="box-dialog q-pa-md" style="font-size: max(2.3vw, 15px)">
            <div class="row">
              <div class="col self-center">
                <span
                  ><span style="font-size: max(5vw, 24px); line-height: 0"
                    >attack</span
                  >
                  <span
                    class="relative-position q-mx-sm"
                    style="font-size: max(2vw, 12px)"
                    >(verb)</span
                  ></span
                >
              </div>
              <div class="col" align="right">
                <q-btn round class="bg-warning q-mx-sm"></q-btn>
                <q-btn class="bg-warning" round></q-btn>
              </div>
            </div>
            <div class="q-mt-sm">
              <span>อะ-แทค</span>
            </div>
            <div class="q-mt-md">
              <span>โจมตี, รุกราน, บุก </span>
            </div>
            <div align="center" class="q-pa-md q-my-md">
              <div
                class=""
                style="
                  max-width: 350px;
                  width: 50%;
                  border: 2px solid #752123;
                  background-color: #752123;
                "
              >
                <q-img
                  src="../../../public/images/flashcard/draft-img-flashcard.png"
                ></q-img>
              </div>
            </div>
            <div class="q-mt-md row q-py-sm">
              <div class="col">
                <span
                  >The terrorists <span class="text-blue-5">attacked</span> the
                  government air base in the north.
                </span>
              </div>
              <div class="col-2" align="right" style="width: 70px">
                <q-btn class="bg-warning" round></q-btn>
              </div>
            </div>
            <div class="q-mt-md">
              <span
                >พวกก่อการร้าย<span class="text-blue-5">โจมตี</span
                >ฐานทัพอากาศของรัฐบาลใน ภาคเหนือ
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["vocabDataList", "isSynchronize", "backToPage"],

  setup(props, { emit }) {
    const isShowDetails = ref(false);

    const showDialog = computed(() => {
      if (props.backToPage) {
        isShowDetails.value = false;
        return false;
      } else {
        if (isShowDetails.value) {
          return true;
        } else {
          return false;
        }
      }
    });

    const openDialog = () => {
      isShowDetails.value = true;
      emit("sendBackPopup");
    };

    return { isShowDetails, showDialog, openDialog };
  }
};
</script>

<style lang="scss" scoped>
.box-dialog {
  margin-top: 50px;
}
</style>
