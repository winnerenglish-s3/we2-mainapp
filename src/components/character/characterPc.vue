<template>
  <div>
    <div class="box-container-main q-pa-md">
      <div class="q-my-md" align="center" style="">
        <q-img
          style="max-width: 320px; width: 70%"
          src="../../../public/images/character/create_character.png"
        ></q-img>
      </div>
      <div style="max-width: 1000px; width: 80%; margin: auto" align="center">
        <div class="row justify-center">
          <div
            class="col-2 relative-position self-center"
            align="center"
            style="max-width: 500px; width: 50%"
          >
            <div align="center">
              <character :bodycolor="color" :equipment="equipment"></character>
            </div>
          </div>
          <div class="col-2" style="max-width: 400px; width: 50%">
            <div class="q-pa-md" align="center">
              <div>
                <span class="stroke text-white f18">ตั้งชื่อ</span>
                <div class="q-mt-sm" style="max-width: 220px; width: 70%">
                  <q-input
                    dense
                    outlined
                    rounded
                    bg-color="white"
                    input-style="text-align: center;"
                  ></q-input>
                </div>
              </div>
              <div class="q-mt-md">
                <span class="stroke text-white f18">แต่งตัว</span>

                <!-- Header -->
                <div class="row q-pb-sm q-mb-md q-mt-md" v-for="i in 3">
                  <div class="col" align="left">
                    <q-img
                      @click="changeEquipment(i, 'decrease')"
                      class="cursor-pointer btn-active"
                      width="25px"
                      src="../../../public/images/character/selected-left.png"
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
                      src="../../../public/images/character/selected-right.png"
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
          src="../../../public/images/character/create_character_btn.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import character from "../character";
import { ref, reactive } from "vue";
export default {
  components: {
    character,
  },
  setup(props) {
    // **************** test color *******************
    const color = ref("#FFB690");
    const equipment = reactive({
      head: 0,
      body: 0,
      footer: 0,
    });

    const changeEquipment = (type, set) => {
      if (type == 1) {
        if (set == "decrease") {
          if (equipment.head != 0) {
            equipment.head--;
          } else {
            equipment.head = 1;
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
          } else {
            equipment.body = 1;
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
          } else {
            equipment.footer = 1;
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
