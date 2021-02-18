<template>
  <div class="box-container-main row justify-center" >
    <div class="col-12 self-end " align="center">
      <div class="q-my-lg" align="center" style="">
        <q-img
          width="max(50vw,250px)"
          src="../../../public/images/character/label-create-character-mobile.png"
        ></q-img>
      </div>
      <div align="center" style="max-width: 360px; width: 70%;">
        <span class="text-white stroke f18">ตั้งชื่อ</span>
        <div class="q-mt-xs">
          <q-input
            dense
            :autofocus='true'
            outlined
            rounded
            bg-color="white"
            input-style="text-align: center;"
            v-model="characterName"
            ref="refsCharactername"
            :rules="[(val) => !!val || '']"
          ></q-input>
        </div>
      </div>
    </div>
    <div
      class="relative-position col-12 self-end"
      style="max-width: 800px;width:100%; overflow: hidden;"
    >
    
      <div class="relative-position"  align="center" style="margin-top:-40px;">
        <div align="center" class="relative-position">
          <div
            class="absolute-top"
            style="width: 30%; top: 15%; left: 10%; z-index: 2"
            align="left"
          >
            <q-img
              @click="funcChangeEquipment(1, 'decrease')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-left.png"
            ></q-img>
          </div>
          <div
            class="absolute-center"
            align="left"
            style="width: 30%; left: 25%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(2, 'decrease')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-left.png"
            ></q-img>
          </div>
          <div
            class="absolute-bottom"
            align="left"
            style="width: 30%; bottom: 15%; left: 10%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(3, 'decrease')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-left.png"
            ></q-img>
          </div>
          <div class="relative-position">
            <character :bodycolor="color" :equipment="equipment"></character>
          </div>
          <div
            class="absolute-top"
            align="right"
            style="width: 30%; top: 15%; left: 60%; z-index: 2"
          >
            <q-img
              @click="funcChangeEquipment(1, 'increase')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-right.png"
            ></q-img>
          </div>
          <div class="absolute-center" align="right" style="width: 30%; left: 75%">
            <q-img
              @click="funcChangeEquipment(2, 'increase')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-right.png"
            ></q-img>
          </div>
          <div
            class="absolute-bottom"
            align="right"
            style="width: 30%; bottom: 15%; left: 60%"
          >
            <q-img
              @click="funcChangeEquipment(3, 'increase')"
              class="cursor-pointer btn-active"
              width="max(7vw,30px)"
              src="../../../public/images/character/selected-right.png"
            ></q-img>
          </div>
        </div>
      </div>

      <div class="row justify-center q-pt-sm">
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
            width='max(30vw,170px)'
            src="../../../public/images/character/color-btn.png"
          >
            <div class="transparent fit">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color no-header no-footer square v-model="color" />
              </q-popup-proxy>
            </div>
          </q-img>
        </div>
      </div>

      <div
        class="q-mt-sm q-pt-md"
        
        align="center"
        >
        <q-img
        width="max(30vw,170px)"
          @click="funcCreateCharacter()"
          class="cursor-pointer btn-active"
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
