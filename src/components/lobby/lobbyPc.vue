<template>
  <div class="row relative-position box-container-main" style="height: 100vh">
    <lobby-day class="absolute-top fit" v-if="mode"></lobby-day>
    <lobby-night class="absolute-top fit" v-else> </lobby-night>

    <div class="col-12 self-start row z-top">
      <div class="col self-start row q-px-xs q-pt-md">
        <q-img
          fit="contain"
          style="max-width: 100px; width: 100%; font-size: 100%; z-index: 2"
          src="../../../public/images/lobby/box-level.png"
        >
          <div class="transparent absolute-center" style="top: 53%">
            <span class="text-grey-9 f32">{{ characterData.level }}</span>
          </div>
        </q-img>
        <q-img
          fit="contain"
          style="max-width: 220px; width: 100%; margin-left: -25px"
          src="../../../public/images/lobby/box-name.png"
        >
          <div class="transparent full-width absolute-center no-padding" style="top: 45%">
            <div style="padding-left: 30px" class="q-px-xs">
              <div class="">
                <span class="f16" style="line-height: 0">{{ characterData.name }}</span>
              </div>
              <div class="q-pr-md q-py-sm">
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

        <!-- <div class="self-center q-ml-lg" align="left">
          <q-img
            fit="contain"
            style="width: 150px"
            src="../../../public/images/lobby/heart-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 5 }}</span>
              </div>
            </div>
          </q-img>
        </div> -->

        <div class="self-center q-ml-md">
          <q-img
            fit="contain"
            style="width: 150px"
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

      <div align="right" class="col-3 q-pa-lg">
        <q-img
          style="width: max(3.2vw, 45px)"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/noti-btn.png"
          v-if="!isNews"
        >
        </q-img>
        <q-img
          v-else
          style="width: max(3.2vw, 45px)"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/noti-have-btn.png"
        ></q-img>
        <q-img
          style="width: max(3.2vw, 45px)"
          class="cursor-pointer btn-active q-mx-xs"
          src="../../../public/images/lobby/setting-btn.png"
        ></q-img>
        <q-img
          style="width: max(3.2vw, 45px)"
          class="cursor-pointer btn-active"
          src="../../../public/images/lobby/logout-btn.png"
        ></q-img>
      </div>
    </div>

    <div class="col-12 self-end row" style="z-index: 2">
      <div class="col-6"></div>
      <div class="col-4" align="center">
        <character :equipment="equipment" :bodycolor="bodycolor"></character>
      </div>
    </div>

    <div class="col-12 self-end q-py-lg row z-top">
      <div class="col row self-end q-px-md">
        <q-img
          fit="contain"
          width="120px"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'ranking' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'ranking'"
          @mouseleave="activeMenu = null"
          src="../../../public/images/lobby/ranking-btn.png"
        ></q-img>
        <!-- <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'mission' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'mission'"
          @mouseleave="activeMenu = null"
          src="../../../public/images/lobby/mission-btn.png"
        ></q-img>
        <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'achievement' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'achievement'"
          @mouseleave="activeMenu = null"
          src="../../../public/images/lobby/achievement-btn.png"
        ></q-img>
        <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'equipment' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'equipment'"
          @mouseleave="activeMenu = null"
          src="../../../public/images/lobby/equipment-btn.png"
        ></q-img> -->
      </div>
      <q-space></q-space>
      <div class="row justify-center" align="center">
        <!-- <div class="self-end col q-mx-md">
          <q-img
            style="width: 140px"
            fit="contain"
            class="cursor-pointer"
            :class="activeMenu == 'boss' ? 'hover-menu' : 'menu-icon'"
            @mouseenter="activeMenu = 'boss'"
            @mouseleave="activeMenu = null"
            src="../../../public/images/lobby/boss-btn.png"
          ></q-img>
        </div> -->
        <div class="self-end col q-mx-md">
          <q-img
            style="width: 140px"
            fit="contain"
            class="cursor-pointer"
            :class="activeMenu == 'leaning' ? 'hover-menu' : 'menu-icon'"
            @mouseenter="activeMenu = 'leaning'"
            @mouseleave="activeMenu = null"
            src="../../../public/images/lobby/leaning-btn.png"
            @click="$router.push('/practicemain')"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lobbyDay from "./lobbyDayPc";
import lobbyNight from "./lobbyNightPc";
import character from "components/character";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  components: {
    lobbyDay,
    lobbyNight,
    character,
  },
  props: {
    mode: {
      type: Boolean,
      default: () => true,
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

    const activeMenu = ref(null);

    const isNews = ref(false);

    return { activeMenu, isNews };
  },
};
</script>

<style lang="scss" scoped>
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

.btn-active {
  transition: 0.1s;
  transform: scale(1);
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.95);
}
</style>
