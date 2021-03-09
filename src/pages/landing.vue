<template>
  <div class="bgCharacter">
    <div v-if="isLoadData" class="absolute-center q-pa-md" align="center">
      <q-spinner-ios thickness="1" color="primary" size="6em" />
    </div>

    <div class="absolute-center" v-else>
      <div v-if="!isPlacementStatus">
        <!-- For School -->
        <div class="q-mt-xl" align="center" v-if="setDataType == 'forSchool'">
          <div>
            <span class="text-stroke">สอบวัดระดับ</span>
          </div>
          <div class="q-mb-xl q-mt-md font-brown">
            <span
              >คุณต้องเข้าสอบวัดระดับก่อน <br />
              <div class="q-mt-sm">จึงจะสามารถเข้าเรียนได้</div>
            </span>
          </div>
          <div
            @click="goToPlacement()"
            align="center"
            class="btn-create cursor-pointer"
          ></div>
        </div>

        <!-- For Online -->
        <div class="q-mt-xl" align="center" v-if="setDataType == 'forOnline'">
          <div>
            <div>
              <span class="text-stroke">ระดับการเรียนที่เหมาะกับคุณ</span>
            </div>
            <div class="relative-position" style="margin: 30px 0px">
              <q-img
                src="../../public/images/online/label-level.png"
                style="width: 120px"
              >
                <div class="font-level absolute-center">LV.7</div>
                <div class="font-level-shadow absolute-center bg-transparent">LV.7</div>
              </q-img>
            </div>
            <div class="row">
              <div class="col-12">
                <div
                  @click="gotoLobby()"
                  align="center"
                  class="btn-choose-level cursor-pointer"
                ></div>
              </div>
              <div class="col-12 q-py-md">
                <span class="font-brown text-bold">หรือ</span>
              </div>
              <div class="col-12">
                <div
                  @click="goToPlacement()"
                  align="center"
                  class="btn-create cursor-pointer"
                ></div>
              </div>
            </div>

            <div class="q-mt-xl">
              <span class="font-brown">
                ไม่ต้องกังวล
                <br />
                คุณสามารถเปลี่ยนระดับการเรียนที่เหมาะสมกับคุณได้อีกครั้งภายในเวลา 7 วัน
                <br />
                และทำแบบฝึกหัดยังไม่เกิน 10 แบบฝึกหัด
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else align="center">
        <div>
          <div class="q-my-lg">
            <span class="text-stroke">คุณสอบวัดระดับเรียบร้อยแล้ว</span>
          </div>
          <div class="q-my-lg">
            <span class="font-brown">
              กรุณารอการตั้งค่าระดับการเรียนที่เหมาะสมสำหรับคุณก่อน
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "src/router";
export default {
  data() {
    return {
      setDataType: "",

      isPlacementStatus: false,
      isLoadData: true,
    };
  },
  methods: {
    goToPlacement() {
      window.open("http://localhost:8082", "__blank", "width = 1024,height = 700");
    },
    gotoLobby() {
      this.$router.push("/lobby");
    },
  },
  created() {
    let config = this.$q.sessionStorage.getItem("config");

    this.setDataType = config.filter((x) => x.includes("for"))[0];

    db.collection("testsnap")
      .doc("test")
      .onSnapshot((doc) => {
        if (doc.data().success) {
          this.isPlacementStatus = true;
        } else {
          this.isPlacementStatus = false;
        }

        this.isLoadData = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.btn-create {
  background-image: url("../../public/images/start-placement.png");
  width: 220px;
  height: 52px;
  background-size: cover;
  transition: 0.2s;
}

.btn-create:hover {
  background-image: url("../../public/images/start-placement-h.png");
  width: 220px;
  height: 52px;
  background-size: cover;
  transform: scale(0.95);
}

.btn-choose-level {
  background-image: url("../../public/images/online/choose-level.png");
  width: 220px;
  height: 52px;
  background-size: cover;
  transition: 0.2s;
}

.btn-choose-level:hover {
  background-image: url("../../public/images/online/choose-level-h.png");
  width: 220px;
  height: 52px;
  background-size: cover;
  transform: scale(0.95);
}

.font-brown {
  color: rgb(81, 42, 8);
  font-size: 16px;
}

.font-level {
  font-family: Mali-Bold;
  font-size: 48px;
  background: -webkit-linear-gradient(#fff17b, #fcc21d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 3;
}

.font-level-shadow {
  font-family: Mali-Bold;
  font-size: 48px;
  text-shadow: rgba(81, 42, 8, 0.7) -1px 1px 0px;
  background: -webkit-linear-gradient(#fff17b, #fcc21d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-stroke {
  color: #fff;
  font-size: 26px;
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px;
}
</style>
