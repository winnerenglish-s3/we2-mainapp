<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header :class="$q.platform.is.mobile && $route.name == 'flashcard' ? 'z-max' : ''">
      <q-toolbar class="header-bar" :style="themeColor">
        <div class="row header-container">
          <div class="col-6">
            <q-btn
              icon="fas fa-home"
              :disable="isSynchronize"
              v-if="isBackPopup && $route.name != 'flashcard'"
              class="shadow-2 btn-header q-mr-md btn-width-mobile"
              @click="$router.push('/practicemain')"
            ></q-btn>
            <q-btn
              icon="fas fa-arrow-left"
              :disable="isSynchronize"
              v-if="$q.platform.is.mobile && !isBackPopup && $route.name == 'flashcard'"
              class="shadow-2 btn-header btn-width-mobile"
              @click="returnClosePopup()"
            ></q-btn>
            <q-btn
              icon="fas fa-pause"
              :disable="isSynchronize"
              @click="isShowSetting = true"
              v-if="$route.name != 'flashcard'"
              class="shadow-2 btn-header btn-width-mobile"
            ></q-btn>
          </div>

          <div align="right" class="col-6">
            <!-- @click="isShowDialogInstruction = true" -->

            <q-btn
              @click="isOpenInstructionDialog = true"
              v-if="hasInstruction"
              icon="fas fa-info-circle"
              class="shadow-2 btn-header q-mr-md"
              :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
              :label="!$q.platform.is.mobile ? 'คำสั่ง' : ''"
            ></q-btn>
            <q-btn
              v-if="hasHelp"
              @click="isShowDialogHelp = true"
              icon="fas fa-lightbulb"
              class="shadow-2 btn-header"
              :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
              :label="!$q.platform.is.mobile ? 'ตัวช่วย' : ''"
            ></q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header> -->

    <!-- :isSynchronize="isSynchronize"
        :synchronizeData="synchronizeData"
        :themeSync="setTheme"
        :isStartPractice="isStartPractice"
        :isShowDialogHelp="isShowDialogHelp"
        :backToPage="backToPage"
        @isShowButtonHelp="(val) => (hasHelp = true)"
        @isShowButtonInstruction="(val) => (hasInstruction = true)"
        @isShowFinishPractice="(val) => (isFinishPractice = val)"
        @closeHelp="(val) => (isShowDialogHelp = false)"
        @sendBackPopup="(val) => (isBackPopup = false)"
        @numberOfPractice="(val) => (numberOfPractice = val)" -->

    <!-- Layout Page -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-container {
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.btn-header {
  border: 1px solid#FFC52E;
  background-color: #6d4300;
  border-radius: 10px;
  color: #ffc52e;
}

.btn-width-mobile {
  width: 40px;
}

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

.box-content-instruction-mobile {
  width: 100%;
  height: 95%;
}

.btn-start {
  background-image: url("../../public/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}

.text-header-practice {
  line-height: 100%;
  color: #ffc022;
}

.box-finish {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 16px;
  margin: auto;
  font-size: 16px;
  color: #000;
}

.box-content-finish {
  position: relative;
  background-image: url("../../public/images/dialog-notificate-practice.png");
  background-repeat: no-repeat;
  width: 290px;
  height: 214px;
  margin: auto;
}

.btn-header-color {
  color: #a36112;
}
</style>
