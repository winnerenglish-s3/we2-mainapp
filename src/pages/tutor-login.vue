<template>
  <div style="height:100vh" class="bgTutor flex flex-center">
    <transition
      appear
      enter-active-class="animated animate__bounceInDown"
      leave-active-class="animated animate__flipOutY"
    >
      <div>
        <div class align="center">
          <div class="q-py-md">
            <img src="../../public/images/tutor-name.png" alt />
          </div>
          <div class="relative-position">
            <img src="../../public/images/box-tutor.png" alt />
            <div style="width:270px" class="absolute-center">
              <div class="q-pb-sm">
                <q-input
                  autofocus
                  label-color="brown-9"
                  class="userPwd q-px-md"
                  dense
                  borderless
                  label="รหัสผู้ใช้งาน"
                  v-model="data.user"
                />
              </div>
              <div class="q-py-sm">
                <q-input
                  label-color="brown-9"
                  class="userPwd q-px-md"
                  dense
                  borderless
                  v-model="data.password"
                  label="รหัสผ่าน"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      color="dark"
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <!-- ปุ่มเข้าสู่ระบบ -->
              <div class="q-mt-md">
                <div @click="toTutor()" class="btn-login relative-position">
                  <span class="absolute-center">เข้าสู่ระบบ</span>
                </div>
              </div>
              <!-- ลืมรหัสผู้ใช้งาน -->
              <div class="q-pt-md forgotPassword">
                <div>ลืมรหัสผู้ใช้งานหรือรหัสผ่าน</div>
                <div>กรุณาติดต่อครูผู้สอน</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- dialog -->
    <q-dialog persistent v-model="isShowErrorDialog">
      <q-card flat class="bg-transparent" style="width:320px;height:312px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="../../public/images/Alert.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                align="center"
                class="font-16 text-weight-bold text-dark relative-position q-px-md"
              >
                ไม่สามารถเข้าสู่ระบบได้
              </div>
              <div
                align="center"
                class="text-dark relative-position q-px-md q-mt-md"
              >
                รหัสผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง
                <br />กรุณาลองใหม่อีกครั้ง
              </div>
            </div>
            <div
              style="width:100%;bottom:30px; z-index:1000"
              class="bg-transparent absolute-bottom"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                @click="isShowErrorDialog = false"
                class="cursor-pointer btn-Alert z-top"
              >
                <span class="text-dark absolute-center cursor-pointer"
                  >ตกลง</span
                >
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowErrorDialog: false,
      data: { user: "", password: "" }, //เก็บรหัสผ่าน
      isPwd: true
    };
  },
  methods: {
    toTutor() {
      let config = this.$q.sessionStorage.getItem("config");
      if (this.data.user == "admin" && this.data.password == "1234") {
        if (config.includes("firstentry")) {
          this.$router.push("/character");
        } else {
          this.$router.push("/lobby");
        }
      } else {
        this.isShowErrorDialog = true;
      }
    }
  },
  created() {
    this.$q.localStorage.set("pf", "T");
  }
};
</script>
<style lang="scss" scoped>
//ปุ่ม login เทื่อเอาเม้าส์ชี้
.btn-login:hover {
  background-image: url("../../public/images/hover.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}
//ปุ่ม login
.btn-login {
  background-image: url("../../public/images/login-btn.png");
  width: 100%;
  height: 35px;
  background-size: cover;
}
// ปุ่มตกลง
.btn-Alert {
  background-image: url("../../public/images/btn-main.png");
  width: 200px;
  height: 35px;
  position: relative;
  background-size: cover;
}
//ปุ่มตกลง hover
.btn-Alert:hover {
  background-image: url("../../public/images/btn-main-hover.png");
  width: 200px;
  height: 35px;
  background-size: cover;
  cursor: pointer;
  transform: scale(0.99);
}
// active ปุ่มเข้าสู่ระบบ
.btn-login:active {
  transform: scale(0.95);
}
// active ปุ่มตกลง
.btn-Alert:active {
  transform: scale(0.95);
}
//พื้นหลัง เข้าสู่ระบบผิด
.imgError {
  background-image: url("../../public/images/Alert.png");
  background-size: cover;
  width: 320px;
  height: 312px;
  background-color: transparent;
  position: relative;
}
//กำหนดเวลา animation
.animated {
  animation-duration: 1.5s;
}
</style>
