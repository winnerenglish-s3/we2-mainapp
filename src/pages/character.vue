<template>
  <!-- <div>
    <character-pc @create="createCharacter"></character-pc>
    <character-mobile class="mobile-only"></character-mobile>
  </div> -->

  <div>
    <div class="bgCharacter">
      <div align="center" class="q-py-md">
        <!-- ชื่อตัวละคร -->
        <q-img style="width: 320px" src="../../public/images/characterName.png">
          <div class="absolute bg-transparent" style="bottom: 0px; left: 8px">
            <q-input
              autofocus=""
              class="userPwd q-px-sm"
              borderless
              dense
              data-cy="name"
              style="width: 270px; margin-top: 45px"
              placeholder="ชื่อตัวละคร"
              v-model="characterName"
            >
            </q-input>
          </div>
        </q-img>
      </div>
      <div
        class="row justify-center"
        style="max-width: 1000;px;min-width:360px margin: auto"
      >
        <div class="row col-md-12 justify-center col-sm-12" style="width: 360px">
          <!-- ลูกศรซ้าย -->
          <div class="row" style="width: 50px">
            <div class="col row items-end">
              <div class="col-12" align="left">
                <q-img
                  @click="changeHat(0)"
                  data-cy="arrowHeadLeft"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/L-button.png"
                ></q-img>
              </div>
              <div class="col-12" align="left">
                <q-img
                  @click="changeTop(0)"
                  data-cy="arrowBodyLeft"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/L-button.png"
                ></q-img>
              </div>
              <div class="col-12" align="left">
                <q-img
                  @click="changeBottom(0)"
                  data-cy="arrowFootLeft"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/L-button.png"
                ></q-img>
              </div>
            </div>
          </div>

          <!-- ตัวละคร -->
          <div class="relative-position col">
            <!-- ตัว -->
            <div style="margin: auto; max-width: 240px">
              <img
                style="width: 100%; z-index: 1; position: relative"
                class=""
                :src="characterImg"
              />
            </div>

            <!-- หมวก -->
            <div class="absolute-top" style="margin: auto; max-width: 240px">
              <span style="display: block; height: 93px" class="relative-position">
                <q-img style="width: 100%; max-width: 240px; z-index: 1" :src="hatImg" />
              </span>
              <!-- เสื้อ -->
              <span style="display: block; height: 93px" class="relative-position">
                <!-- เสื้อด้านหน้า -->
                <span>
                  <q-img
                    style="width: 100%; max-width: 240px; z-index: 2"
                    :src="topImg"
                  ></q-img>
                </span>
                <!-- เสื้อด้านหลัง -->
                <span>
                  <q-img
                    style="width: 100%; max-width: 240px; z-index: -1"
                    :src="bodyBackImg"
                    class="absolute-top"
                  ></q-img>
                </span>
              </span>
              <!-- กางเกง -->
              <span style="display: block; height: 93px" class="relative-position">
                <q-img
                  class=""
                  style="width: 100%; max-width: 240px; z-index: 2"
                  :src="shoesImg"
                ></q-img>
              </span>
            </div>
          </div>

          <!-- ลูกศรขวา -->
          <div class="row" style="width: 50px">
            <div class="col row items-end">
              <div class="col-12" align="right">
                <q-img
                  @click="changeHat(1)"
                  data-cy="arrowHeadRight"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/R-button.png"
                ></q-img>
              </div>
              <div class="col-12" align="right">
                <q-img
                  @click="changeTop(1)"
                  data-cy="arrowBodyRight"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/R-button.png"
                ></q-img>
              </div>
              <div class="col-12" align="right">
                <q-img
                  @click="changeBottom(1)"
                  data-cy="arrowFootRight"
                  style="width: 25px"
                  class="cursor-pointer"
                  src="../../public/images/R-button.png"
                ></q-img>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------------เลือกสี--------------------------------- -->
        <div class="col-md-12 col-sm-12">
          <!-- สี -->
          <div class="q-mt-xl">
            <!-- แถว1 -->
            <div class="row justify-center">
              <div
                :data-cy="index + 1"
                v-for="(color, index) in colorList1"
                :key="index"
                @click="changeColor(index + 1)"
                style="width: 50px; height: 50px"
                class="cursor-pointer border-color q-mx-sm"
                :class="
                  selectColor == index + 1 ? `border-color-active ${color}` : `${color}`
                "
              ></div>
            </div>
            <!-- แถว2 -->
            <div class="row q-mt-md justify-center">
              <div
                :data-cy="colorList1.length + (index + 1)"
                v-for="(color, index) in colorList2"
                :key="index"
                @click="changeColor(colorList1.length + (index + 1))"
                style="width: 50px; height: 50px"
                class="cursor-pointer border-color q-mx-sm"
                :class="
                  selectColor == colorList1.length + (index + 1)
                    ? `border-color-active ${color}`
                    : `${color}`
                "
              ></div>
            </div>
          </div>
          <!-- ปุ่มสร้างตัวละคร -->
          <div align="center" class="q-mt-xl">
            <div
              @click.prevent.once="createCharacter()"
              align="center"
              data-cy="createBtn"
              class="btn-create"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import characterPc from "../components/characterPc.vue";
import characterMobile from "../components/characterMobile.vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import game from "../hooks/gameHooks.js";
import { ref, onMounted } from "vue";
import { ts, db } from "src/router";
export default {
  props: ["text"],
  components: {
    characterPc,
    characterMobile,
  },
  setup() {
    // ********************** Use quasar **********************
    const $q = useQuasar();
    //**********************  Router **********************
    const router = useRouter();
    const route = useRoute();
    // ********************** uid **********************
    const uid = $q.sessionStorage.getItem("uid");
    // **********************  character data **********************
    let characterData = ref();
    // check exists character
    const checkCharacter = async () => {
      $q.loading.show({
        delay: 0,
      });
      let response = await game.characterInfomation(uid);
      if (response) {
        // ป้องกัน หากมีตัวละครเเล้ว ให้ไป lobby เลย
        router.push("/lobby");
      }
      $q.loading.hide();
    };

    // character name
    const characterName = ref(""); // name

    // ******************* hat *******************
    const hatImg = ref(require("../../public/images/character/head/hat1.png"));
    let currentHat = 1; // head
    let totalHat = 2;
    const changeHat = (event) => {
      if (event) {
        if (currentHat < totalHat) currentHat++;
      } else {
        if (currentHat > 1) currentHat--;
      }

      hatImg.value = require(`../../public/images/character/head/hat${currentHat}.png`);
    };

    // ******************* top *******************
    const bodyBackImg = ref(
      require("../../public/images/character/body-back/cover1.png")
    );
    const topImg = ref(require("../../public/images/character/body-font/cloth1.png"));
    let currentTop = 1; // body
    let totalTop = 2;
    const changeTop = (event) => {
      if (event) {
        if (currentTop < totalTop) currentTop++;
      } else {
        if (currentTop > 1) currentTop--;
      }
      topImg.value = require(`../../public/images/character/body-font/cloth${currentTop}.png`);
    };

    // ******************* shoes *******************
    const shoesImg = ref(require("../../public/images/character/footer/pants1.png"));
    let currentBottom = 1; // foot
    let totalBottom = 2; // total bottom
    const changeBottom = (event) => {
      if (event) {
        if (currentBottom < totalBottom) currentBottom++;
      } else {
        if (currentBottom > 1) currentBottom--;
      }

      shoesImg.value = require(`../../public/images/character/footer/pants${currentBottom}.png`);
    };

    // ******************* color *******************
    const colorList1 = ref([
      "bg-color-1",
      "bg-color-2",
      "bg-color-3",
      "bg-color-4",
      "bg-color-5",
    ]);
    const colorList2 = ref([
      "bg-color-6",
      "bg-color-7",
      "bg-color-8",
      "bg-color-9",
      "bg-color-10",
    ]);

    let selectColor = 1; //color
    const characterImg = ref(
      require("../../public/images/character/skin/character-1.png")
    );
    const changeColor = (color) => {
      selectColor = color;
      characterImg.value = require(`../../public/images/character/skin/character-${color}.png`);
    };

    // ******************* Create Character *******************
    // button
    const createCharacter = () => {
      db.collection("character")
        .add({
          userId: $q.sessionStorage.getItem("uid"),
          hat: currentHat,
          top: currentTop,
          bottom: currentBottom,
          color: selectColor,
          timestamp: ts,
        })
        .then(() => {
          $router.push("/lobby");
          console.log("added");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(() => {
      checkCharacter();
    });
    return {
      characterData: characterData,
      createCharacter: createCharacter,
      selectColor: selectColor,
      characterName: characterName,
      characterImg: characterImg,
      hatImg: hatImg,
      topImg: topImg,
      bodyBackImg: bodyBackImg,
      shoesImg: shoesImg,
      colorList1: colorList1,
      colorList2: colorList2,
      changeHat: changeHat,
      changeTop: changeTop,
      changeBottom: changeBottom,
      changeColor: changeColor,
    };
  },
};
</script>

<style lang="scss" scoped>
//ปุ่ม สร้างตัวละคร
.btn-create {
  background-image: url("../../public/images/Create.png");
  width: 180px;
  height: 52px;
  background-size: cover;
  cursor: pointer;
}
//ปุ่ม สร้างตัวละคร เมื่อคลิก
.btn-create:active {
  transform: scale(0.95);
}

.bg-color-1 {
  background-color: white;
}

.bg-color-2 {
  background-color: #fef0e9;
}

.bg-color-3 {
  background-color: #ffd4be;
}

.bg-color-4 {
  background-color: #ffb690;
}

.bg-color-5 {
  background-color: #f38951;
}

.bg-color-6 {
  background-color: black;
}

.bg-color-7 {
  background-color: #5683f8;
}

.bg-color-8 {
  background-color: #ffe925;
}

.bg-color-9 {
  background-color: #00be35;
}

.bg-color-10 {
  background-color: #ff4848;
}

.border-color {
  border: 2px solid #512a08;
  border-radius: 10px;
  transform: scale(1);
  transition: 0.2s;
}

.border-color:hover {
  border: 2px solid red;
  transform: scale(1.13);
}

.border-color:active {
  transform: scale(0.95);
}

.border-color-active {
  border: 2px solid red;
  transform: scale(1.13);
}
</style>
