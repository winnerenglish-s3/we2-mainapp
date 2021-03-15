<template>
  <q-page
    class="relative-position"
    :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'"
  >
    <!-- Platform Device -->
    <lobby-pc
      :characterData="characterData"
      :equipment="equipment"
      :bodycolor="color"
      class=""
      :mode="mode"
      @callback-dialog="callbackFunction"
      v-if="$q.platform.is.desktop && isShowCharacter"
    ></lobby-pc>

    <lobby-mobile
      :characterData="characterData"
      :equipment="equipment"
      :bodycolor="color"
      class=""
      :mode="mode"
      @callback-dialog="callbackFunction"
      v-if="$q.platform.is.mobile && isShowCharacter"
    ></lobby-mobile>

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

    <!-- dialog Notification -->
    <q-dialog maximized v-model="isShowNotification" data-cy="dialog-notification">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <div class="box-container-notification q-pa-md relative-position">
              <div class="icon-notification q-px-md q-pt-md">
                <q-img
                  class="q-mb-md"
                  width="70px"
                  src="../../public/images/lobby/icon-notification.png"
                ></q-img>
              </div>
              <div class="q-mt-md q-pa-md q-px-sm">
                <transition
                  appear
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutRight"
                  v-if="isActiveNotification == null"
                >
                  <div class="q-px-sm box-notification-list">
                    <div class="q-mb-sm" v-for="i in 3">
                      <q-img
                        @click="isActiveNotification = i"
                        fit="contain"
                        class="cursor-pointer btn-active"
                        :src="
                          require(`../../public/images/lobby/test-notification${i}.png`)
                        "
                      ></q-img>
                    </div>
                  </div>
                </transition>
                <transition
                  appear
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutRight"
                  v-if="isActiveNotification == 1"
                >
                  <div class="box-notification-details" align="center">
                    <q-img src="../../public/images/lobby/test-content.png"></q-img>
                  </div>
                </transition>
              </div>

              <div align="center" class="q-pt-md">
                <q-btn
                  style="width: 200px; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  @click="isActiveNotification = null"
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
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
import { ref, onMounted, reactive, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Initial Data
    const $q = useQuasar();
    const platPc = $q.platform.is.desktop;

    // Set Equipment Character
    const equipment = reactive({
      head: ref(1),
      body: ref(1),
      footer: ref(1),
    });

    // Set Color Character
    const color = ref("#FFB690");

    const mode = ref(false);
    const activeMenu = ref(null);
    const isNewNotify = ref(false);
    const isShowPopupPretest = ref(false);
    const isShowPopupPosttest = ref(false);
    const isShowPopupExam = ref(false);
    const isShowPopupQuestionnaire = ref(false);
    const isShowCharacter = ref(false);

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

    // Character Data
    const characterData = ref({});
    const getCharacterData = async (uid) => {
      loadingShow();
      try {
        characterData.value = await game.characterInfomation(uid);
        isShowCharacter.value = true;
      } catch (error) {
        router.push("/");
      }

      loadingHide();
    };

    const checkCharacter = async (uid) => {
      $q.loading.show();
      let response = await game.characterInfomation(uid);
      if (response) {
        equipment.head = response.head;
        equipment.body = response.body;
        equipment.footer = response.footer;
        color.value = response.color;
      }
      $q.loading.hide();
    };

    // Dialog Show
    const isShowNotification = ref(false);
    const isActiveNotification = ref(null);

    const callbackFunction = (type) => {
      if (type == "notification") {
        isShowNotification.value = true;
      }
    };

    var authListen;

    onMounted(() => {
      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          const uid = user.uid;
          getCharacterData(user.uid);
          checkCharacter(user.uid);
        } else {
          // User is signed out.
          router.push("/");
        }
      });
    });

    onBeforeUnmount(() => {
      authListen();
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
      // equipment
      isShowCharacter,
      equipment,
      color,

      callbackFunction,
      isShowNotification,
      isActiveNotification,
    };
  },
  components: {
    lobbyPc,
    lobbyMobile,
    character,
  },
};
</script>

<style lang="scss" scoped>
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

.box-container-notification {
  width: 320px;
  background-color: #f6f3d3;
  border-radius: 10px;
}

.icon-notification {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #f6f3d3;
  border-radius: 50%;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.box-notification-list {
  height: 300px;
  overflow-y: auto;
}

/* width */
.box-notification-list::-webkit-scrollbar {
  width: 4px;
}

/* Track */
.box-notification-list::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 20px;
}

/* Handle */
.box-notification-list::-webkit-scrollbar-thumb {
  background: #f7a006;
  border-radius: 20px;
}

/* Handle on hover */
.box-notification-list::-webkit-scrollbar-thumb:hover {
  background: #e69305;
}

.btn-active {
  transition: 0.1s;
  transform: scale(1);
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
}
</style>
