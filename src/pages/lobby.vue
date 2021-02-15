<template>
  <q-page
    class="relative-position"
    :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'"
  >
    <!-- Platform Device -->
    <lobby-pc
      :characterData="characterData"
      :equipment="equipment"
      class=""
      :mode="mode"
      v-if="$q.platform.is.desktop"
    ></lobby-pc>
    <lobby-mobile
      :characterData="characterData"
      :equipment="equipment"
      class=""
      :mode="mode"
      v-if="$q.platform.is.mobile"
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
  </q-page>
</template>

<script>
import lobbyPc from "../components/lobby/lobbyPc";
import lobbyMobile from "../components/lobby/lobbyMobile";
import character from "../components/character";
import game from "../hooks/gameHooks.js";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Initial Data
    const $q = useQuasar();
    const platPc = $q.platform.is.desktop;

    // Set Equipment Character
    const equipment = reactive({
      head: ref(2),
      body: ref(2),
      footer: ref(1),
    });

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

      // equipment
      equipment,
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
</style>
