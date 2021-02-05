<template>
  <div>
    <div class="bgCharacter">
      <div align="center" class="q-py-xl">
        <!-- ชื่อตัวละคร -->
        <q-img style="width:320px" src="../../public/images/characterName.png">
          <span
            ><q-input
              class="userPwd q-px-sm"
              borderless
              dense
              data-cy="name"
              style="width:270px;margin-top:45px"
              placeholder="ชื่อตัวละคร"
              v-model="characterName"
            ></q-input></span
        ></q-img>
      </div>
      <div class="row justify-center ">
        <div class="row ">
          <!-- ---------------------------ตัวละคร------------------------------- -->
          <!-- ลูกศสซ้าย -->
          <div class="row  items-center">
            <div class="col-12 " align="right">
              <q-img
                @click="selectHeader(-1)"
                data-cy="arrowHeadLeft"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
            <div class="col-12" align="right">
              <q-img
                @click="selectBody(-1)"
                data-cy="arrowBodyLeft"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
            <div class="col-12" align="right">
              <q-img
                @click="selectFooter(-1)"
                data-cy="arrowFootLeft"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/L-button.png"
              ></q-img>
            </div>
          </div>
          <!-- ตัวละคร -->
          <div class="relative-position ">
            <!-- ตัว -->
            <img style="width:300px;z-index:1" :src="characterImg" />

            <!-- หมวก -->
            <div class="absolute-top">
              <span
                style="display:block; height:110px"
                class="relative-position "
              >
                <q-img style="width:300px;z-index:1" :src="headImg" />
              </span>
              <!-- เสื้อ -->
              <span
                style="display:block; height:110px"
                class="relative-position "
              >
                <!-- เสื้อด้านหน้า -->
                <span>
                  <q-img
                    style="width:300px;z-index:2"
                    :src="bodyFontImg"
                  ></q-img>
                </span>
                <!-- เสื้อด้านหลัง -->
                <span>
                  <q-img
                    style="width:300px;z-index:-1"
                    :src="bodyBackImg"
                    class="absolute-top "
                  ></q-img>
                </span>
              </span>
              <!-- กางเกง -->
              <span
                style="display:block; height:110px"
                class="relative-position"
              >
                <q-img
                  class=""
                  style="width:300px;z-index:2"
                  :src="footerImg"
                ></q-img>
              </span>
            </div>
          </div>
          <!-- ลูกศสขวา -->
          <div class="row  items-center">
            <div class="col-12">
              <q-img
                @click="selectHeader(1)"
                data-cy="arrowHeadRight"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
            <div class="col-12">
              <q-img
                @click="selectBody(1)"
                data-cy="arrowBodyRight"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
            <div class="col-12">
              <q-img
                @click="selectFooter(1)"
                data-cy="arrowFootRight"
                style="width:25px"
                class="cursor-pointer"
                src="../../public/images/R-button.png"
              ></q-img>
            </div>
          </div>
        </div>

        <!-- ---------------------------เลือกสี--------------------------------- -->
        <div>
          <!-- สี -->
          <div class="q-mt-xl">
            <!-- แถว1 -->
            <div class="row">
              <div
                :data-cy="index + 1"
                v-for="(color, index) in colorList1"
                :key="index"
                @click="selectColor(index + 1)"
                style="width:50px;height:50px"
                class="cursor-pointer border-color q-mx-sm"
                :class="
                  SelectColor == index + 1
                    ? `border-color-active ${color}`
                    : `${color}`
                "
              ></div>
            </div>
            <!-- แถว2 -->
            <div class="row q-mt-md">
              <div
                :data-cy="colorList1.length + (index + 1)"
                v-for="(color, index) in colorList2"
                :key="index"
                @click="selectColor(colorList1.length + (index + 1))"
                style="width:50px;height:50px"
                class="cursor-pointer border-color q-mx-sm"
                :class="
                  SelectColor == colorList1.length + (index + 1)
                    ? `border-color-active ${color}`
                    : `${color}`
                "
              ></div>
            </div>
          </div>
          <!-- ปุ่มสร้างตัวละคร -->
          <div align="center" class="q-mt-xl">
            <div
              @click="create()"
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
export default {
  data() {
    return {
      SelectColor: "1", //เก็บค่าสีที่กำลังเลือกอยู่
      characterName: "", //ชื่อตัวละครที่ตั้ง
      orderHead: 1, //เก็บค่าหมวกที่กำลงัเลือกอยู่
      orderFooter: 1, //เก็บค่ากางเกงที่กำลังเลือกอยู่
      orderBody: 1, // เก็บค้าชุดที่กำลังเลือกอยู่
      characterImg: require("../../public/images/character/skin/character-1.png"), //ตัวละคร
      headImg: require("../../public/images/character/head/hat1.png"), //หมวก
      bodyFontImg: require("../../public/images/character/body-font/cloth1.png"), //เสื้อ-ด้านหน้า
      bodyBackImg: require("../../public/images/character/body-back/cover1.png"), //เสื้อ-ด้านหลัง
      footerImg: require("../../public/images/character/footer/pants1.png"), //กางเกง
      colorList1: [
        "bg-color-1",
        "bg-color-2",
        "bg-color-3",
        "bg-color-4",
        "bg-color-5"
      ],
      colorList2: [
        "bg-color-6",
        "bg-color-7",
        "bg-color-8",
        "bg-color-9",
        "bg-color-10"
      ]
    };
  },
  methods: {
    // ปุ่มสร้างตัวละคร
    create() {
      let config = this.$q.sessionStorage.getItem("config");

      if (config.includes("placement")) {
        // window.open("http://localhost:8082/welcome");
        this.$router.push("/landing");
      } else {
        this.$router.push("/lobby");
      }
    },
    // เปลี่ยนหมวก
    selectHeader(typeHead) {
      if (typeHead == 1) {
        this.orderHead++;
        if (this.orderHead == 3) {
          this.orderHead = 1;
        }
      } else {
        this.orderHead--;
        if (this.orderHead == 0) {
          this.orderHead = 2;
        }
      }
      this.headImg = require(`../../public/images/character/head/hat${this.orderHead}.png`);
    },
    //เปลี่ยนเสื้อ
    selectBody(typeBody) {
      if (typeBody == 1) {
        this.orderBody++;
        if (this.orderBody == 3) {
          this.orderBody = 1;
        }
      } else {
        this.orderBody--;
        if (this.orderBody == 0) {
          this.orderBody = 2;
        }
      }
      this.bodyFontImg = require(`../../public/images/character/body-font/cloth${this.orderBody}.png`);
    },
    //เปลี่ยนกางเกง
    selectFooter(typeFoot) {
      if (typeFoot == 1) {
        this.orderFooter++;
        if (this.orderFooter == 3) {
          this.orderFooter = 1;
        }
      } else {
        this.orderFooter--;
        if (this.orderFooter == 0) {
          this.orderFooter = 2;
        }
      }
      this.footerImg = require(`../../public/images/character/footer/pants${this.orderFooter}.png`);
    },
    // เลือกสี
    selectColor(typeColor) {
      this.SelectColor = typeColor;
      this.characterImg = require(`../../public/images/character/skin/character-${typeColor}.png`);
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
