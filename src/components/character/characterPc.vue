<template>
  <div class="box-container-main row justify-center" style="height: 100vh">
    <div class="col-5 self-end q-pb-lg" align="center">
      <character :bodycolor="color" :equipment="equipment"></character>
    </div>
    <div class="col-5 self-center" align="center">
      <div class="q-pa-md">
        <q-img
          style="max-width: 320px; width: 60%"
          src="../../../public/images/character/label-create-character-pc.png"
        ></q-img>
      </div>
      <div class="box-create-main q-py-sm">
        <div class="box-create-content q-pa-md q-px-lg">
          <span class="text-white stroke f20">ตั้งชื่อ</span>
          <div class="q-my-md">
            <q-input
              dense
              outlined
              rounded
              bg-color="white"
              input-style="text-align: center;"
              v-model="characterName"
              ref="refsCharactername"
              :rules="[(val) => !!val || '']"
            ></q-input>
          </div>

          <div class="row q-my-md" v-for="i in 3">
            <div class="col" align="left">
              <q-img
                @click="funcChangeEquipment(i, 'decrease')"
                class="cursor-pointer btn-active"
                width="30px"
                src="../../../public/images/character/selected-left.png"
              ></q-img>
            </div>
            <div class="col-6 self-center" align="center">
              <q-chip
                style="width: 100%; padding: 17px 0px"
                class="bg-equipment shadow-1 q-py-md"
              >
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
                @click="funcChangeEquipment(i, 'increase')"
                class="cursor-pointer btn-active"
                width="30px"
                src="../../../public/images/character/selected-right.png"
              ></q-img>
            </div>
          </div>

          <div class="row justify-around">
            <div class="self-center q-mx-sm">
              <q-btn
                class="no-pointer-events"
                filled
                push
                round
                :style="`background-color:${color}`"
              >
              </q-btn>
            </div>
            <div class="self-center q-pt-sm">
              <q-img
                class="cursor-pointer"
                width="200px"
                src="../../../public/images/character/color-btn.png"
              >
                <div class="transparent fit">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="color" />
                  </q-popup-proxy>
                </div>
              </q-img>
            </div>
          </div>

          <div class="q-py-xs q-mt-xl" align="center">
            <q-img
              @click="funcCreateCharacter()"
              class="cursor-pointer btn-active"
              width="180px"
              src="../../../public/images/character/create_character_btn.png"
            ></q-img>
          </div>
        </div>
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
  props: ["equipment", "color"],
  setup(props, { emit }) {
    // **************** Initial Data *******************
    const characterName = ref("");
    const refsCharactername = ref(null); // Validate name

    const funcChangeEquipment = (type, set) => {
      emit("changeEquipment", { type: type, set: set });
    };

    const funcCreateCharacter = () => {
      console.clear();

      if (!refsCharactername.value.validate()) {
        console.log("ยังไม่กรอกข้อมูลแล้ว");
        return;
      }

      let newData = {
        head: props.equipment.head,
        body: props.equipment.body,
        footer: props.equipment.footer,
        level: 1,
        name: characterName.value,
        star: 0,
        color: props.color,
      };

      emit("createCharacter", newData);
    };

    return {
      characterName,
      refsCharactername,
      funcChangeEquipment,
      funcCreateCharacter,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-equipment {
  background-color: #291b18;
  color: #fff;
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

.box-create-main {
  max-width: 350px;
  width: 100%;
  background-color: #894403;
  border: 1px solid #894403;
  border-radius: 10px;
  overflow: hidden;
}

.box-create-content {
  background-color: #3c2724;
}
</style>
