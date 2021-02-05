<template>
  <div>
    <div class="bgCharacter">
      <div align="center" class="q-py-lg">
        <!-- ชื่อตัวละคร -->
        <q-img style="width:320px" src="../../public/images/characterName.png">
          <span
            ><q-input
              class="userPwd q-px-sm"
              borderless
              dense
              style="width:270px;margin-top:45px"
              placeholder="ชื่อตัวละคร"
              v-model="characterName"
            ></q-input></span
        ></q-img>
      </div>
      <div class="row">
        <div class="row justify-center col-12">
          <!-- ---------------------------ตัวละคร------------------------------- -->
          <!-- ลูกศสซ้าย -->
          <div class="row items-center">
            <div class="col-12 " align="right">
              <q-img
                @click="selectHeader(-1)"
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
            <div class="col-12" align="right">
              <q-img
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
            <div class="col-12" align="right">
              <q-img
                @click="selectFooter(-1)"
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
          </div>
          <!-- ตัวละคร -->
          <div class="">
            <!-- ตัว -->
            <q-img style="width:200px;z-index:1" :src="characterImg">
              <!-- หมวก -->
              <span
                style="display:block; height:73px"
                class="relative-position"
              >
                <q-img style="width:200px;z-index:1" :src="headImg" />
              </span>
              <!-- เสื้อ -->
              <span
                style="display:block; height:73px"
                class="relative-position"
              >
                <!-- เสื้อด้านหน้า -->
                <span>
                  <q-img
                    style="width:200px;z-index:2"
                    :src="bodyFontImg"
                  ></q-img>
                </span>
                <!-- เสื้อด้านหลัง -->
                <span>
                  <q-img
                    style="width:200px;z-index:-1"
                    :src="bodyBackImg"
                    class="absolute-top "
                  ></q-img>
                </span>
              </span>
              <!-- กางเกง -->
              <span
                style="display:block; height:73px"
                class="relative-position"
              >
                <q-img
                  class=""
                  style="width:200px;z-index:2"
                  :src="footerImg"
                ></q-img>
              </span>
            </q-img>
          </div>
          <!-- ลูกศสขวา -->
          <div class="row  items-center">
            <div class="col-12">
              <q-img
                @click="selectHeader(1)"
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
            <div class="col-12">
              <q-img
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
            <div class="col-12">
              <q-img
                @click="selectFooter(1)"
                style="width:19px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
          </div>
        </div>
        <!-- ---------------------------เลือกสี--------------------------------- -->
        <div class="row justify-center col-12">
          <!-- สี -->
          <div class="q-mt-xl">
            <!-- แถว1 -->
            <div class="row">
              <!-- สีขาวโทน1 -->
              <div
                @click="selectColor(1)"
                style="width:40px;height:40px"
                class="cursor-pointer border-whiteL1"
                :class="SelectColor == '1' ? 'border-whiteL1-select' : ''"
              ></div>
              <!-- สีขาวโทน2 -->
              <div
                @click="selectColor(2)"
                style="width:40px;height:40px"
                class="cursor-pointer border-whiteL2 q-ml-md"
                :class="SelectColor == '2' ? 'border-whiteL2-select' : ''"
              ></div>
              <!-- สีขาวโทน3 -->
              <div
                @click="selectColor(3)"
                style="width:40px;height:40px"
                class="cursor-pointer border-whiteL3 q-mx-md"
                :class="SelectColor == '3' ? 'border-whiteL3-select' : ''"
              ></div>
              <!-- สีขาวโทน4 -->
              <div
                @click="selectColor(4)"
                style="width:40px;height:40px"
                class="cursor-pointer border-whiteL4 q-mr-md"
                :class="SelectColor == '4' ? 'border-whiteL4-select' : ''"
              ></div>
              <!-- สีขาวโทน5 -->
              <div
                @click="selectColor(5)"
                style="width:40px;height:40px"
                class="cursor-pointer border-whiteL5"
                :class="SelectColor == '5' ? 'border-whiteL5-select' : ''"
              ></div>
            </div>
            <!-- แถว2 -->
            <div class="row q-mt-md">
              <!-- สีดำ -->
              <div
                @click="selectColor(6)"
                style="width:40px;height:40px"
                class="cursor-pointer border-black"
                :class="SelectColor == '6' ? 'border-black-select' : ''"
              ></div>
              <!-- สีฟ้า -->
              <div
                @click="selectColor(7)"
                style="width:40px;height:40px"
                class="cursor-pointer border-blue q-ml-md"
                :class="SelectColor == '7' ? 'border-blue-select' : ''"
              ></div>
              <!-- สีเหลือง -->
              <div
                @click="selectColor(8)"
                style="width:40px;height:40px"
                class="cursor-pointer border-yellow q-mx-md"
                :class="SelectColor == '8' ? 'border-yellow-select' : ''"
              ></div>
              <!-- สีเขียว -->
              <div
                @click="selectColor(9)"
                style="width:40px;height:40px"
                class="cursor-pointer border-green q-mr-md"
                :class="SelectColor == '9' ? 'border-green-select' : ''"
              ></div>
              <!-- สีแดง -->
              <div
                @click="selectColor(10)"
                style="width:40px;height:40px"
                class="cursor-pointer border-red"
                :class="SelectColor == '10' ? 'border-red-select' : ''"
              ></div>
            </div>
            <!-- ปุ่มสร้างตัวละคร -->
            <div align="center" class="q-my-lg">
              <div @click="create()" align="center" class="btn-create"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SelectColor: "4", //เก็บค่าสีที่กำลังเลือกอยู่
      characterName: "", //ชื่อตัวละครที่ตั้ง
      orderHead: 1, //เก็บค่าหมวกที่กำลงัเลือกอยู่
      orderFooter: 1, //เก็บค่ากางเกงที่กำลังเลือกอยู่
      characterImg: require("../../public/images/character/skin/skin4.png"), //ตัวละคร
      headImg: require("../../public/images/character/head/hat1.png"), //หมวก
      bodyFontImg: require("../../public/images/character/body-font/cloth1.png"), //เสื้อ-ด้านหน้า
      bodyBackImg: require("../../public/images/character/body-back/cover1.png"), //เสื้อ-ด้านหลัง
      footerImg: require("../../public/images/character/footer/pants1.png") //กางเกง
    };
  },
  methods: {
    // ปุ่มสร้างตัวละคร
    create() {
      this.$router.push("/landing");
    },
    // เปลี่ยนหมวก
    selectHeader(typeHead) {
      if (typeHead == 1) {
        this.orderHead++;
        if (this.orderHead == 4) {
          this.orderHead = 1;
        }
      } else {
        this.orderHead--;
        if (this.orderHead == 0) {
          this.orderHead = 3;
        }
      }
      console.log(this.orderHead);
      // this.headImg = require(`../../public/images/character/head/hat${this.orderHead}.png`);
    },
    //เปลี่ยนเสื้อ
    selectBody() {},
    //เปลี่ยนกางเกง
    selectFooter(typeFoot) {
      if (typeFoot == 1) {
        this.orderFooter++;
        if (this.orderFooter == 4) {
          this.orderFooter = 1;
        }
      } else {
        this.orderFooter--;
        if (this.orderFooter == 0) {
          this.orderFooter = 3;
        }
      }
      console.log(this.orderFooter);
      // this.footerImg = require(`../../public/images/character/footer/pants${this.orderFooter}.png`);
    },
    // เลือกสี
    selectColor(typeColor) {
      this.SelectColor = typeColor;
      this.characterImg = require(`../../public/images/character/skin/skin${typeColor}.png`);
    }
  }
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
// -------------------------------
// สีขาวโทน1
.border-whiteL1 {
  background: white;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-whiteL1:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL1-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL1:active {
  transform: scale(0.95);
}
// -------------------------------
// สีขาวโทน2
.border-whiteL2 {
  background: #fef0e9;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-whiteL2:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL2-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL2:active {
  transform: scale(0.95);
}
// --------------------------------
// สีขาวโทน3
.border-whiteL3 {
  background: #ffd4be;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-whiteL3:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL3-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL3:active {
  transform: scale(0.95);
}
// --------------------------------
// สีขาวโทน4
.border-whiteL4 {
  background: #ffb690;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-whiteL4:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL4-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL4:active {
  transform: scale(0.95);
}
// --------------------------------
// สีขาวโทน5
.border-whiteL5 {
  background: #f38951;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-whiteL5:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL5-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-whiteL5:active {
  transform: scale(0.95);
}
// --------------------------------
// สีดำ
.border-black {
  background: black;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-black:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-black-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-black:active {
  transform: scale(0.95);
}
// --------------------------------
// สีฟ้า
.border-blue {
  background: #5683f8;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-blue:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-blue-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-blue:active {
  transform: scale(0.95);
}
// --------------------------------
// สีเหลือง
.border-yellow {
  background: #ffe925;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-yellow:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-yellow-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-yellow:active {
  transform: scale(0.95);
}
// --------------------------------
// สีเขียว
.border-green {
  background: #00be35;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-green:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-green-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-green:active {
  transform: scale(0.95);
}
// --------------------------------
// สีแดง
.border-red {
  background: #ff4848;
  border-radius: 10px;
  border: 2px solid #512a08;
}
.border-red:hover {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-red-select {
  border: 2px solid red;
  transform: scale(1.13);
}
.border-red:active {
  transform: scale(0.95);
}
// --------------------------------
</style>
