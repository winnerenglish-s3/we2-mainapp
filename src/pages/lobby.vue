<template>
  <q-page
    class="relative-position row"
    :class="!platPc ? (!mode ? 'bg-lobby-night' : 'bg-lobby-day') : ''"
    :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'"
  >
    <!-- Platform Device -->
    <lobby-pc :mode="mode" v-if="$q.platform.is.desktop"></lobby-pc>
    <lobby-mobile :mode="mode" v-if="$q.platform.is.mobile"></lobby-mobile>

    <div class="col-12 self-start row z-top">
      <div class="col self-start row q-px-xs q-pt-sm">
        <q-img
          fit="contain"
          style="max-width: 120px; width: 30%; font-size: 100%; z-index: 2"
          src="../../public/images/lobby/box-level.png"
        >
          <div class="transparent absolute-center" style="top: 53%">
            <span class="text-grey-9 f32">{{ characterData.level }}</span>
          </div>
        </q-img>
        <q-img
          fit="contain"
          style="max-width: 230px; width: 80%; margin-left: -25px"
          src="../../public/images/lobby/name-bar.png"
        >
          <div class="transparent full-width absolute-center no-padding" style="top: 45%">
            <div style="padding-left: 30px" class="q-px-xs">
              <div class="">
                <span class="f16" style="line-height: 0">{{ characterData.name }}</span>
              </div>
              <div class="q-pr-md q-py-xs">
                <div class="exp-bar relative-position">
                  <div
                    class="bg-primary full-height"
                    style="margin-left: -5px; width: 80%; border-radius: 20px"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </q-img>

        <div :class="!platPc ? 'col-12' : ''" class="self-center" align="left">
          <q-img
            fit="contain"
            :style="platPc ? 'width:150px' : 'width:max(20vw,130px)'"
            src="../../public/images/lobby/heart-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 5 }}</span>
              </div>
            </div>
          </q-img>
        </div>

        <div :class="!platPc ? 'col-12' : ''" class="self-center">
          <q-img
            fit="contain"
            :style="platPc ? 'width:150px' : 'width:max(20vw,130px)'"
            src="../../public/images/lobby/coin-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 99999 }}</span>
              </div>
            </div>
          </q-img>
        </div>
      </div>

      <div
        :class="!platPc ? 'col-3 q-pr-sm ' : 'col-3 q-px-md'"
        align="right"
        class="q-pt-md"
        :style="!platPc ? 'width:160px;' : ''"
      >
        <q-img
          style="width: max(5vw, 45px)"
          class="cursor-pointer"
          src="../../public/images/lobby/noti-btn.png"
        >
          <div class="transparent fit" v-if="isNewNotify">
            <div
              class="bg-red absolute-top-right"
              style="
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid#fff;
                right: 7px;
                top: 2px;
              "
            ></div>
          </div>
        </q-img>
        <q-img
          style="width: max(5vw, 45px)"
          class="cursor-pointer q-mx-xs"
          src="../../public/images/lobby/setting-btn.png"
        ></q-img>
        <q-img
          style="width: max(5vw, 45px)"
          class="cursor-pointer"
          src="../../public/images/lobby/logout-btn.png"
        ></q-img>

        <div align="right" class="relative-position" style="z-index: 2" v-if="!platPc">
          <div>
            <q-img
              fit="contain"
              width="max(15vw,100px)"
              class="cursor-pointer"
              :class="activeMenu == 'ranking' ? 'hover-menu' : 'menu-icon'"
              @mouseenter="activeMenu = 'ranking'"
              @mouseleave="activeMenu = null"
              src="../../public/images/lobby/ranking-btn.png"
            ></q-img>
          </div>
          <div>
            <q-img
              width="max(15vw,100px)"
              fit="contain"
              class="cursor-pointer"
              :class="activeMenu == 'mission' ? 'hover-menu' : 'menu-icon'"
              @mouseenter="activeMenu = 'mission'"
              @mouseleave="activeMenu = null"
              src="../../public/images/lobby/mission-btn.png"
            ></q-img>
          </div>
          <div>
            <q-img
              width="max(15vw,100px)"
              fit="contain"
              class="cursor-pointer"
              :class="activeMenu == 'achievement' ? 'hover-menu' : 'menu-icon'"
              @mouseenter="activeMenu = 'achievement'"
              @mouseleave="activeMenu = null"
              src="../../public/images/lobby/achievement-btn.png"
            ></q-img>
          </div>
          <div>
            <q-img
              width="max(15vw,100px)"
              fit="contain"
              class="cursor-pointer"
              :class="activeMenu == 'equipment' ? 'hover-menu' : 'menu-icon'"
              @mouseenter="activeMenu = 'equipment'"
              @mouseleave="activeMenu = null"
              src="../../public/images/lobby/equipment-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 row" style="z-index: 2">
      <div class="col-6" v-if="platPc"></div>
      <div :class="platPc ? 'col-4' : 'col-12'" align="center">
        <character
          :style="!platPc ? 'top:55%;z-index:1;' : ''"
          :class="!platPc ? 'absolute-center' : ''"
        ></character>
      </div>
    </div>

    <div class="col-12 self-end q-py-lg row z-top">
      <div class="col row self-end q-px-md" v-if="platPc">
        <q-img
          fit="contain"
          width="120px"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'ranking' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'ranking'"
          @mouseleave="activeMenu = null"
          src="../../public/images/lobby/ranking-btn.png"
        ></q-img>
        <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'mission' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'mission'"
          @mouseleave="activeMenu = null"
          src="../../public/images/lobby/mission-btn.png"
        ></q-img>
        <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'achievement' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'achievement'"
          @mouseleave="activeMenu = null"
          src="../../public/images/lobby/achievement-btn.png"
        ></q-img>
        <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'equipment' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'equipment'"
          @mouseleave="activeMenu = null"
          src="../../public/images/lobby/equipment-btn.png"
        ></q-img>
      </div>
      <q-space></q-space>
      <div
        :class="platPc ? ' justify-center ' : 'col-12 justify-center'"
        class="row"
        align="center"
      >
        <div
          :style="platPc ? '' : 'width:170px;'"
          :class="platPc ? 'col q-mx-md' : 'col-3'"
          class="self-end"
        >
          <q-img
            :style="platPc ? 'width:120px' : 'width:110px'"
            fit="contain"
            class="cursor-pointer"
            :class="activeMenu == 'boss' ? 'hover-menu' : 'menu-icon'"
            @mouseenter="activeMenu = 'boss'"
            @mouseleave="activeMenu = null"
            src="../../public/images/lobby/boss-btn.png"
          ></q-img>
        </div>
        <div
          :style="platPc ? '' : 'width:170px;'"
          :class="platPc ? 'col q-mx-md q-mr-lg ' : 'col-3'"
          class="self-end"
        >
          <q-img
            :style="platPc ? 'width:130px' : 'width:min(130px,50vw)'"
            fit="contain"
            class="cursor-pointer"
            :class="activeMenu == 'leaning' ? 'hover-menu' : 'menu-icon'"
            @mouseenter="activeMenu = 'leaning'"
            @mouseleave="activeMenu = null"
            src="../../public/images/lobby/leaning-btn.png"
            @click="$router.push('/practicemain')"
          ></q-img>
        </div>
      </div>
    </div>

    <!-- dialog questionnaire -->
    <q-dialog persistent v-model="isShowPopupQuestionnaire" data-cy="dialog-question">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="../../public/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                อย่าลืม! ทำแบบสอบถาม
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าทำแบบสอบถาม
                <br />ได้ตั้งแต่วันนี้จนถึงวันที่ 16 พ.ค. 2563
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                @click="isShowPopupQuestionnaire = false"
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
              ></div>
              <!-- ปุ่มตกลง -->
              <div
                @click="toQuestionnaire(), (isShowPopupQuestionnaire = false)"
                class="cursor-pointer btn-exam z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog exam -->
    <q-dialog persistent v-model="isShowPopupExam" data-cy="dialog-exam">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="../../public/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                หัวข้อการสอบที่ครูตั้ง
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าสอบก่อนเรียน
                <br />
                ได้ตั้งแต่วันนี้จนถึงวันที่ 16 พ.ย. 2563
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                @click="toExam(), (isShowPopupExam = false)"
                class="cursor-pointer btn-exam z-top"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog pretest -->
    <q-dialog persistent v-model="isShowPopupPretest" data-cy="dialog-pretest">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="../../public/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                อย่าลืม! สอบก่อนเรียน
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าสอบก่อนเรียน
                <br class="" />
                <div class="q-my-sm">ได้ตั้งแต่วันนี้จนถึงวันที่ 16 พ.ค. 2563</div>
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                @click="isShowPopupPretest = false"
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
              ></div>
              <!-- ปุ่มตกลง -->
              <div
                @click="toPretest(), (isShowPopupPretest = false)"
                class="cursor-pointer btn-prepost z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog psottest -->
    <q-dialog persistent v-model="isShowPopupPosttest" data-cy="dialog-posttest">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="../../public/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                อย่าลืม! ทดสอบหลังเรียน
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าทำแบบทดสอบหลังเรียน
                <br />ได้ตั้งแต่วันนี้จนถึงวันที่ 16 พ.ค. 2563
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                @click="isShowPopupPosttest = false"
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
              ></div>
              <!-- ปุ่มตกลง -->
              <div
                @click="toPosttest(), (isShowPopupPosttest = false)"
                class="cursor-pointer btn-exam z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import lobbyPc from "../components/lobby/lobbyPc";
import lobbyMobile from "../components/lobby/lobbyMobile";
import character from "../components/character";
import game from "../hooks/gameHooks.js";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Initial Data
    const $q = useQuasar();
    const platPc = $q.platform.is.desktop;

    const mode = ref(false);
    const activeMenu = ref(null);
    const isNewNotify = ref(false);
    const isShowPopupPretest = ref(false);
    const isShowPopupPosttest = ref(false);
    const isShowPopupExam = ref(false);
    const isShowPopupQuestionnaire = ref(false);

    // loading
    const loadingShow = () => {
      $q.loading.show({
        delay: 0,
      });
    };
    const loadingHide = () => {
      $q.loading.hide();
    };
    // Router
    const router = useRouter();
    // uid
    const uid = $q.sessionStorage.getItem("uid");
    // Character Data
    const characterData = ref({});
    const getCharacterData = async () => {
      loadingShow();
      try {
        characterData.value = await game.characterInfomation(uid);
      } catch (error) {
        console.log(error);
        router.push("/");
      }

      loadingHide();
    };
    onMounted(() => {
      getCharacterData();
    });

    return {
      platPc,
      characterData,
      mode,
      activeMenu,
      isNewNotify,
      isShowPopupPretest,
      isShowPopupPosttest,
      isShowPopupExam,
      isShowPopupQuestionnaire,
    };
  },
  components: {
    lobbyPc,
    lobbyMobile,
    character,
  },

  // methods: {
  //   closeBtn() {
  //     this.show = false;
  //   },
  //   toPretest() {
  //     window.open(
  //       "http://localhost:8081/pretest",
  //       "__blank",
  //       "resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1200,height=700"
  //     );
  //   },
  //   toPosttest() {
  //     window.open(
  //       "http://localhost:8081/posttest",
  //       "__blank",
  //       "resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1200,height=700"
  //     );
  //   },
  //   toExam() {
  //     window.open(
  //       "http://localhost:8084/",
  //       "__blank",
  //       "resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1200,height=700"
  //     );
  //   },
  //   toQuestionnaire() {
  //     window.open(
  //       "http://localhost:8083/",
  //       "__blank",
  //       "resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1200,height=700"
  //     );
  //   },
  // },
  // created() {
  //   let config = this.$q.sessionStorage.getItem("config");

  //   if (config.includes("exam")) {
  //     this.isShowPopupExam = true;
  //   }
  //   if (config.includes("questionnaire")) {
  //     this.isShowPopupQuestionnaire = true;
  //   }

  //   if (config.includes("pretest")) {
  //     this.isShowPopupPretest = true;
  //   }
  //   if (config.includes("posttest")) {
  //     this.isShowPopupPosttest = true;
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.bg-lobby-day {
  background-image: url("../../public/images/lobby/bg-lobby-day.png");
  background-position: center;
  background-size: cover;
}

.bg-lobby-night {
  background-image: url("../../public/images/lobby/bg-lobby-night.png");
  background-position: center;
  background-size: cover;
}

//ปุ่ม login
.btn-close {
  background-image: url("../../public/images/close-btn-m.png");
  width: 100%;
  height: 35px;
  background-size: cover;
}

.btn-close:hover {
  background-image: url("../../public/images/close-btn-mh.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}

//ปุ่ม login
.btn-exam {
  background-image: url("../../public/images/a.png");
  width: 100%;
  height: 35px;
  background-size: cover;
}

.btn-exam:hover {
  background-image: url("../../public/images/a-h.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}

.btn-prepost {
  background-image: url("../../public/images/prepost-start.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.btn-prepost:hover {
  background-image: url("../../public/images/prepost-start-h.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.hover-menu {
  transition: 0.3s;
  transform: translateY(-10px);
}

.menu-icon {
  transition: 0.3s;
}

.box-container-level {
  width: 85px;
  min-height: 85px;
  background-color: #fff;
  border: 5px solid#FFC42E;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 7px rgba(65, 65, 65, 0.7);
  z-index: 2;
}

.level-bar {
  width: 110px;
  background-color: #ffc42e;
  top: 60%;
}

.exp-bar {
  background-color: #fff;
  border-radius: 70px;
  height: 6px;
  overflow: hidden;
}
</style>
