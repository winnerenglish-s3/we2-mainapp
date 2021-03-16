<template>
  <div
    class="row"
    style="height: calc(100vh - 60px)"
    :class="mode ? 'bg-lobby-day ' : 'bg-lobby-night'"
  >
    <div class="col-12 self-start row" style="z-index: 2">
      <div class="col-7 self-start row q-px-xs q-pt-sm">
        <q-img
          fit="contain"
          style="max-width: 120px; width: 30%; font-size: 100%; z-index: 2"
          src="../../../public/images/lobby/box-level.png"
        >
          <div class="transparent absolute-center" style="top: 53%">
            <span class="text-grey-9" style="font-size: max(5vw, 14px)">{{
              characterData.level
            }}</span>
          </div>
        </q-img>
        <q-img
          fit="contain"
          style="max-width: 230px; width: 80%; margin-left: -25px"
          src="../../../public/images/lobby/box-name.png"
        >
          <div class="transparent full-width absolute-center no-padding" style="top: 40%">
            <div style="padding-left: 30px" class="q-px-xs">
              <div class="">
                <span class="f14" style="line-height: 0">{{ characterData.name }}</span>
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

        <!-- <div class="col-12 self-center" align="left">
          <q-img
            fit="contain"
            style="width: max(20vw, 115px)"
            src="../../../public/images/lobby/heart-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 5 }}</span>
              </div>
            </div>
          </q-img>
        </div> -->

        <div class="col-12 self-center q-mt-sm">
          <q-img
            fit="contain"
            style="width: max(20vw, 130px)"
            src="../../../public/images/lobby/coin-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 99999 }}</span>
              </div>
            </div>
          </q-img>
        </div>
      </div>

      <div align="right" class="q-pt-md col q-pr-xs">
        <q-img
          style="width: max(calc(18vw * 9 / 16), 45px)"
          @click="$emit('callback-dialog', 'notification')"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/noti-btn.png"
          v-if="!isNews"
        >
        </q-img>
        <q-img
          v-else
          @click="$emit('callback-dialog', 'notification')"
          style="width: max(calc(18vw * 9 / 16), 45px)"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/noti-have-btn.png"
        >
        </q-img>
        <q-img
          @click="$emit('callback-dialog', 'setting')"
          style="width: max(calc(18vw * 9 / 16), 45px)"
          class="cursor-pointer btn-active q-mx-xs"
          src="../../../public/images/lobby/setting-btn.png"
        ></q-img>
        <q-img
          @click="$emit('callback-dialog', 'logout')"
          style="width: max(calc(18vw * 9 / 16), 45px)"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/logout-btn.png"
        ></q-img>

        <div align="right" class="absolute-right" style="top: 8%; z-index: 2">
          <div>
            <q-img
              @click="$emit('callback-dialog', 'ranking')"
              fit="contain"
              width="max(20vw,100px)"
              class="cursor-pointer btn-active"
              src="../../../public/images/lobby/ranking-btn.png"
            ></q-img>
          </div>
          <!-- <div>
            <q-img
              width="max(20vw,100px)"
              fit="contain"
              class="cursor-pointer btn-active"
              src="../../../public/images/lobby/mission-btn.png"
            ></q-img>
          </div>
          <div>
            <q-img
              width="max(20vw,100px)"
              fit="contain"
              class="cursor-pointer btn-active"
              src="../../../public/images/lobby/achievement-btn.png"
            ></q-img>
          </div>
          <div>
            <q-img
              width="max(20vw,100px)"
              fit="contain"
              class="cursor-pointer btn-active"
              src="../../../public/images/lobby/equipment-btn.png"
            ></q-img>
          </div> -->
        </div>
      </div>
    </div>

    <div class="col-12 self-end" style="z-index: 2">
      <div class="q-pa-sm" align="center">
        <character
          :equipment="equipment"
          :bodycolor="bodycolor"
          style="z-index: 1"
        ></character>
      </div>
      <div class="row justify-center q-pa-md" align="center">
        <!-- <div class="col self-end" align="center">
          <q-img
            style="width: max(calc(45vw * 9 / 16), 130px)"
            fit="contain"
            class="cursor-pointer btn-active"
            src="../../../public/images/lobby/boss-btn.png"
          ></q-img>
        </div> -->
        <div class="col self-end" align="center">
          <q-img
            style="width: max(calc(45vw * 9 / 16), 130px)"
            fit="contain"
            class="cursor-pointer btn-active"
            src="../../../public/images/lobby/leaning-btn.png"
            @click="$router.push('/practicemain')"
          ></q-img>
        </div>
      </div>
    </div>

    <!-- <div class="col-12 self-end q-pb-md row justify-center   style="z-index:2"">
      <div class="self-end" align="center">
        <q-img
          style="width: max(calc(45vw * 9 / 16), 130px)"
          fit="contain"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/boss-btn.png"
        ></q-img>
      </div>
      <div class="self-end q-mx-lg" align="center">
        <q-img
          style="width: max(calc(45vw * 9 / 16), 130px)"
          fit="contain"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/leaning-btn.png"
          @click="$router.push('/practicemain')"
        ></q-img>
      </div>
    </div> -->
  </div>
</template>

<script>
import character from "components/character";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    character,
  },
  props: {
    mode: {
      type: Boolean,
      default: () => false,
    },
    characterData: {
      type: Object,
      default: () => {},
    },
    equipment: {
      type: Object,
      default: () => {},
    },
    bodycolor: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();

    const mode = ref(false);
    const activeMenu = ref(null);
    const isNews = ref(true);

    return { mode, activeMenu, isNews };
  },
};
</script>

<style lang="scss" scoped>
.bg-lobby-day {
  background-image: url("../../../public/images/lobby/bg-lobby-day.png");
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-lobby-night {
  background-image: url("../../../public/images/lobby/bg-lobby-night.png");
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
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

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
}
</style>
