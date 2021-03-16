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
    <q-dialog
      maximized
      v-model="isShowNotification"
      no-esc-dismiss
      data-cy="dialog-notification"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <div class="box-container-notification relative-position">
              <div class="icon-dialog q-px-md q-pt-md">
                <q-img
                  class="q-mb-md"
                  width="70px"
                  src="../../public/images/lobby/icon-notification.png"
                ></q-img>
              </div>
              <div class="q-mt-md q-pt-lg q-px-sm">
                <q-tab-panels
                  v-model="tabNotification"
                  animated
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  class="transparent"
                >
                  <q-tab-panel name="notificationList" class="transparent">
                    <div class="q-px-sm box-notification-list">
                      <div class="q-mb-sm" v-for="i in 3">
                        <q-img
                          @click="tabNotification = i"
                          fit="contain"
                          class="cursor-pointer btn-active"
                          :src="
                            require(`../../public/images/lobby/test-notification${i}.png`)
                          "
                        ></q-img>
                      </div>
                    </div>
                  </q-tab-panel>
                  <q-tab-panel :name="i" v-for="i in 3" class="transparent">
                    <div
                      class="relative-position box-notification-details"
                      align="center"
                    >
                      <div class="absolute" style="top: -15px; left: -15px; z-index: 2">
                        <q-img
                          @click="tabNotification = 'notificationList'"
                          class="cursor-pointer btn-active"
                          width="40px"
                          src="../../public/images/btn-back-list.png"
                        ></q-img>
                      </div>
                      <q-img src="../../public/images/lobby/test-content.png"></q-img>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>

              <div align="center" class="q-pb-md">
                <q-btn
                  style="width: 200px; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  @click="tabNotification = 'notificationList'"
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog Setting -->
    <q-dialog maximized v-model="isShowSetting" no-esc-dismiss data-cy="dialog-setting">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center box-container-setting">
            <div class="relative-position">
              <div class="icon-dialog q-px-md q-pt-md q-mb-md">
                <q-img
                  class="q-mb-sm"
                  width="70px"
                  src="../../public/images/lobby/icon-setting.png"
                ></q-img>
              </div>
              <div class="q-pt-xl q-pb-lg q-px-sm">
                <div class="row">
                  <div class="col-md-6 col-xs-12 q-pa-md self-center">
                    <div class="q-px-lg">
                      <div class="box-content-setting">
                        <div
                          class="q-px-md q-py-sm row"
                          style="border-bottom: 1px solid #e28701"
                        >
                          <div class="col self-center">
                            <q-icon
                              size="25px"
                              class="icon-setting q-mr-md q-ml-sm"
                              name="fas fa-volume-up"
                            ></q-icon>
                            <span class="text-bold f16">เสียงประกอบ</span>
                          </div>
                          <div class="col-3 self-center" align="center">
                            <q-toggle
                              v-model="isSoundSystem"
                              :color="isSoundSystem ? 'green' : 'grey'"
                              keep-color
                            />
                          </div>
                        </div>
                        <div class="q-px-md q-py-sm row">
                          <div class="col self-center">
                            <q-icon
                              size="25px"
                              class="icon-setting q-mr-md q-ml-sm"
                              name="fas fa-music"
                            ></q-icon>
                            <span class="text-bold f16">เพลง</span>
                          </div>
                          <div class="col-3 self-center" align="center">
                            <q-toggle
                              v-model="isSoundBackground"
                              :color="isSoundBackground ? 'green' : 'grey'"
                              keep-color
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md-6 col-xs-12 self-center q-pa-md text-bold"
                    align="center"
                    :style="
                      $q.platform.is.desktop
                        ? 'border-left: 1px dashed #e28701'
                        : 'border-top: 1px dashed #e28701;'
                    "
                  >
                    <span>ติดต่อทีมงาน</span>
                    <div class="q-py-md">
                      <div class="row q-mt-sm" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon size="25px" class="fas fa-phone-alt q-mr-sm"></q-icon>
                        </div>
                        <div class="col f16">
                          <span>โทรศัพท์</span>
                          <p>02-252-2489</p>
                        </div>
                      </div>
                      <div class="row" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon
                            size="30px"
                            class="fab fa-line q-mr-sm text-green"
                          ></q-icon>
                        </div>
                        <div class="col f16">
                          <span>Line</span>
                          <p>02-252-2489</p>
                        </div>
                      </div>
                      <div class="row" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon
                            size="30px"
                            class="fab fa-facebook-square q-mr-sm text-blue"
                          ></q-icon>
                        </div>
                        <div class="col f16">
                          <span>Facebook</span>
                          <p>www.facebook.com/WinnerEng</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div align="center" class="q-pb-lg">
                <q-btn
                  style="width: 200px; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  @click="tabNotification = 'notificationList'"
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog Ranking -->
    <q-dialog maximized v-model="isShowRanking" no-esc-dismiss data-cy="dialog-setting">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center box-container-ranking">
            <div class="relative-position">
              <div class="icon-dialog q-px-md q-pt-sm q-mb-md">
                <q-img
                  class="q-mb-md"
                  width="70px"
                  src="../../public/images/lobby/icon-ranking.png"
                ></q-img>
              </div>
              <div class="q-pt-lg q-pb-lg q-px-sm" align="center">
                <div class="row relative-position" style="max-width: 450px">
                  <div class="col-md-4 self-end" align="center">
                    <q-img
                      fit="contain"
                      src="../../public/images/lobby/ranking-two.png"
                      width="100px"
                    />
                    <div class="">
                      <span>Name Surname</span>
                      <br />
                      <span>160</span>
                    </div>
                  </div>
                  <div class="col-md-4" style="padding-bottom: 50px" align="center">
                    <q-img
                      fit="contain"
                      src="../../public/images/lobby/ranking-one.png"
                      width="100px"
                    />
                    <div class="">
                      <span>Name Surname</span>
                      <br />
                      <span>170</span>
                    </div>
                  </div>
                  <div class="col-md-4 self-end" align="center">
                    <q-img
                      fit="contain"
                      src="../../public/images/lobby/ranking-three.png"
                      width="100px"
                    />
                    <div class="">
                      <span>Name Surname</span>
                      <br />
                      <span>155</span>
                    </div>
                  </div>
                </div>

                <div class="row q-mt-sm box-ranking-list" style="width: 90%">
                  <div class="col-6 q-px-md q-py-xs" v-for="i in 10">
                    <div
                      class="fit q-pa-xs row"
                      style="border-radius: 25px; background-color: #f1d280"
                      align="left"
                    >
                      <div
                        class="bg-white relative-position"
                        style="width: 40px; height: 40px; border-radius: 50%"
                      >
                        <span class="absolute-center">
                          {{ i + 3 }}
                        </span>
                      </div>
                      <div class="col self-center q-px-md">Name Surname</div>
                      <div class="col-2 self-center" align="center" style="width: 50px">
                        999
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row q-mt-md justify-center">
                  <div
                    class="col-5 q-pa-xs row"
                    style="border-radius: 25px; background-color: #e28701"
                    align="left"
                  >
                    <div
                      class="bg-white relative-position"
                      style="width: 40px; height: 40px; border-radius: 50%"
                    >
                      <span class="absolute-center"> 17 </span>
                    </div>
                    <div class="col text-white self-center q-px-md">Name Surname</div>
                    <div
                      class="col-2 text-white self-center"
                      align="center"
                      style="width: 50px"
                    >
                      999
                    </div>
                  </div>
                </div>
              </div>

              <div align="center" class="q-pb-lg">
                <q-btn
                  style="width: 200px; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  @click="tabNotification = 'notificationList'"
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
    const tabNotification = ref("notificationList");
    const isShowNotification = ref(false);
    const isActiveNotification = ref(null);

    const isShowSetting = ref(false);
    const isSoundSystem = ref(true);
    const isSoundBackground = ref(true);

    const isShowRanking = ref(false);

    const callbackFunction = (type) => {
      if (type == "notification") {
        isShowNotification.value = true;
      } else if (type == "setting") {
        isShowSetting.value = true;
      } else if (type == "ranking") {
        isShowRanking.value = true;
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
      tabNotification,
      isShowNotification,
      isShowSetting,
      isShowRanking,
      isSoundSystem,
      isSoundBackground,
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
}

.box-container-setting,
.box-container-ranking {
  max-width: 750px;
  width: 95%;
}

.box-container-notification,
.box-container-setting,
.box-container-ranking {
  background-color: #f6f3d3;
  border-radius: 10px;
}

.icon-dialog {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #f6f3d3;
  border-radius: 50%;
}

.box-notification-list,
.box-notification-details {
  height: 300px;
}

.box-ranking-list {
  height: 200px;
}

.box-notification-list,
.box-ranking-list {
  overflow-y: auto;
}

/* width */
.box-notification-list::-webkit-scrollbar,
.box-ranking-list::-webkit-scrollbar {
  width: 4px;
}

/* Track */
.box-notification-list::-webkit-scrollbar-track,
.box-ranking-list::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 20px;
}

/* Handle */
.box-notification-list::-webkit-scrollbar-thumb,
.box-ranking-list::-webkit-scrollbar-thumb {
  background: #f7a006;
  border-radius: 20px;
}

/* Handle on hover */
.box-notification-list::-webkit-scrollbar-thumb:hover,
.box-ranking-list::-webkit-scrollbar-thumb:hover {
  background: #e69305;
}

.box-content-setting {
  background-color: #f1d280;
  border: 1px solid #e28701;
  border-radius: 10px;
}

.icon-setting {
  color: #a36112;
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
