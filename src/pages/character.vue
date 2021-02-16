<template>
  <div class="bg-character">
    <div>
      <q-toolbar class="bg-grey-6">
        <q-space></q-space>
        <q-btn round class="bg-warning" push dense>
          <q-icon name="logout" />
        </q-btn>
      </q-toolbar>
    </div>
    <div class="box-container-main q-pa-md">
      <div class="q-my-md" align="center" style="">
        <q-img
          style="max-width: 320px; width: 70%"
          src="../../public/images/character/create_character.png"
        ></q-img>
      </div>
      <div class="" align="center">
        <div class="row justify-center">
          <div
            class="col-2 relative-position self-center"
            align="center"
            style="width: 500px"
          >
            <div align="center">
              <first-character
                :bodycolor="color"
                :equipment="equipment"
              ></first-character>
            </div>
          </div>
          <!-- <div class="col-1" v-if="$q.platform.is.desktop"></div> -->
          <div class="col-2" style="width: 400px">
            <div class="q-pa-md" align="center">
              <div>
                <span class="stroke text-white f18">ตั้งชื่อ</span>
                <div class="q-mt-sm" style="width: 220px">
                  <q-input
                    dense
                    outlined
                    rounded
                    bg-color="white"
                    input-style="text-align: center;"
                  ></q-input>
                </div>
              </div>
              <div class="q-mt-lg">
                <span class="stroke text-white f18">แต่งตัว</span>

                <!-- Header -->
                <div class="row q-pb-md q-mb-lg q-mt-md" v-for="i in 3">
                  <div class="col" align="left">
                    <q-img
                      @click="changeEquipment(i, 'decrease')"
                      class="cursor-pointer btn-active"
                      width="25px"
                      src="../../public/images/character/selected-left.png"
                    ></q-img>
                  </div>
                  <div class="col-6 self-center" align="center">
                    <q-chip style="width: 90%" class="bg-equipment shadow-1 q-py-md">
                      <div align="center" class="full-width">
                        <span class="f16">
                          {{
                            ` ${i == 1 ? "หมวก " + (equipment.head + 1) : ""}
                              ${i == 2 ? "เสื้อ " + (equipment.body + 1) : ""}
                              ${i == 3 ? "กางเกง " + (equipment.footer + 1) : ""}
                            `
                          }}</span
                        >
                      </div>
                    </q-chip>
                  </div>
                  <div class="col" align="right">
                    <q-img
                      @click="changeEquipment(i, 'increase')"
                      class="cursor-pointer btn-active"
                      width="25px"
                      src="../../public/images/character/selected-right.png"
                    ></q-img>
                  </div>
                </div>
              </div>
              <div class="q-mt-lg">
                <span class="stroke text-white f18">สีผิว</span>
                <div class="q-mt-md">
                  <q-btn filled push round class="bg-equipment">
                    <q-icon name="colorize" class="cursor-pointer fit">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="color" />
                      </q-popup-proxy>
                    </q-icon>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="q-py-lg" align="center">
        <q-img
          @click="$router.push('/lobby')"
          class="cursor-pointer btn-active"
          width="180px"
          src="../../public/images/character/create_character_btn.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import firstCharacter from "../components/character";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import game from "../hooks/gameHooks.js";
import { ref, onMounted, reactive } from "vue";
import { ts, db } from "src/router";
export default {
  props: ["text"],
  components: {
    firstCharacter,
  },
  setup() {
    // ********************** Use quasar **********************
    const $q = useQuasar();
    //**********************  Router **********************
    const router = useRouter();
    const route = useRoute();

    // ********************** uid **********************
    const uid = $q.sessionStorage.getItem("uid");

    // ******************* Create Character *******************

    const createCharacter = () => {
      db.collection("student")
        .doc(uid)
        .update({
          character: {
            hat: currentHat,
            top: currentTop,
            bottom: currentBottom,
            color: selectColor,
            name: characterName.value,
            star: 0,
            level: 1,
          },
        })
        .then(() => {
          // router.push("/lobby");
          console.log("added");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // **************** test color *******************
    const color = ref("#FFB690");
    const equipment = reactive({
      head: 0,
      body: 0,
      footer: 0,
    });

    const changeEquipment = (type, set) => {
      console.log(type, set);
      if (type == 1) {
        if (set == "decrease") {
          if (equipment.head != 0) {
            equipment.head--;
          }
        } else {
          if (equipment.head == 1) {
            equipment.head = 0;
          } else {
            equipment.head++;
          }
        }
      } else if (type == 2) {
        if (set == "decrease") {
          if (equipment.body != 0) {
            equipment.body--;
          }
        } else {
          if (equipment.body == 1) {
            equipment.body = 0;
          } else {
            equipment.body++;
          }
        }
      } else if (type == 3) {
        if (set == "decrease") {
          if (equipment.footer != 0) {
            equipment.footer--;
          }
        } else {
          if (equipment.footer == 1) {
            equipment.footer = 0;
          } else {
            equipment.footer++;
          }
        }
      }
    };

    onMounted(() => {
      // checkCharacter();
    });

    return {
      color,
      equipment,
      changeEquipment,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-equipment {
  background-color: #ffe4ce;
}
.stroke {
  text-shadow: rgb(81, 42, 8) 2px 0px 0px, rgb(81, 42, 8) 1.75517px 0.958851px 0px,
    rgb(81, 42, 8) 1.0806px 1.68294px 0px, rgb(81, 42, 8) 0.141474px 1.99499px 0px,
    rgb(81, 42, 8) -0.832294px 1.81859px 0px, rgb(81, 42, 8) -1.60229px 1.19694px 0px,
    rgb(81, 42, 8) -1.97998px 0.28224px 0px, rgb(81, 42, 8) -1.87291px -0.701566px 0px,
    rgb(81, 42, 8) -1.30729px -1.5136px 0px, rgb(81, 42, 8) -0.421592px -1.95506px 0px,
    rgb(81, 42, 8) 0.567324px -1.91785px 0px, rgb(81, 42, 8) 1.41734px -1.41108px 0px,
    rgb(81, 42, 8) 1.92034px -0.558831px 0px;
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
}
</style>
