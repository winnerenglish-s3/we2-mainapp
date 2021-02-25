<template>
  <div>
    <!-- Dialog Finish Practice -->
    <q-dialog maximized v-model="isFinishPractice" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <div v-if="!isNotProgress">
              <q-img
                width="350px"
                style="margin: auto"
                src="../../public/images/flower_1.png"
              ></q-img>
            </div>
            <div class="box-content-finish">
              <q-img
                v-if="!isNotProgress"
                class="absolute-center"
                fit="contain"
                width="320px"
                style="top: 24px"
                src="../../public/images/bg-success-start.png"
              >
                <div
                  class="absolute-center transparent full-width"
                  style="top: 40%"
                  align="center"
                >
                  <q-rating
                    v-model="totalStar"
                    size="4em"
                    color="warning"
                    icon-selected="star"
                    max="3"
                    readonly
                  />
                </div>
              </q-img>

              <div class="box-finish absolute-bottom">
                <div align="center" v-if="!isNotProgress">
                  <span>จบแบบฝึกหัด</span>
                  <br />
                  <span>ระดับที่ 1 - บทที่ 1</span>
                  <div class="q-mt-md">
                    <span>จำนวนครั้งในการทำ : {{ numOfPractice }}/2</span>
                  </div>
                </div>

                <div v-else align="center">
                  <span style="font-size: max(1vw, 24px)">คะแนนไม่ผ่านเกณฑ์</span>
                </div>
              </div>
            </div>
            <div align="center">
              <q-btn-group
                spread
                style="width: 292px; height: 40px; border-radius: 0px 0px 5px 5px"
              >
                <!-- ปุ่ม Reset -->
                <q-btn
                  push
                  @click="$emit('reStart')"
                  label="ทำใหม่อีกครั้ง"
                  text-color="white"
                  style="background-color: #014270"
                />
                <!-- ปุ่มจบแบบฝึกหัด -->
                <q-btn
                  v-if="!isNotProgress"
                  push
                  @click="$router.push('/practicemain')"
                  label="จบแบบฝึกหัด"
                  style="background-color: #ffbd13"
                />
                <q-btn
                  v-if="isNotProgress"
                  push
                  label="ทบทวน"
                  style="background-color: #ffbd13"
                />
              </q-btn-group>
            </div>
            <div style="" v-if="!isNotProgress">
              <q-img width="350px" src="../../public/images/flower_2.png"></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  emits: ["finish", "reStart"],
  props: {
    isFinishPractice: {
      type: Boolean,
      default: () => false,
    },
    numOfPractice: {
      type: Number,
      default: 1,
    },
    totalStar: {
      type: Number,
      default: 0,
    },
    isNotProgress: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
