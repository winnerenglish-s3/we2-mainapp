<template>
  <div>
    <div class="bgAdventure flex flex-center">
      <span data-cy="test"> </span>
      <transition
        appear
        enter-active-class="animated animate__bounceInDown"
        leave-active-class="animated animate__flipOutY"
      >
        <div class="container-login">
          <div>
            <q-img src="../../public/images/title-adventure.png"></q-img>
          </div>
          <div class="q-mt-lg relative-position">
            <!-- box-adventure -->
            <img src="../../public/images/box-adventure.png" />
            <span style="width: 270px" class="absolute-center">
              <!-- username -->
              <div>
                <q-input
                  autofocus
                  dense
                  class="userPwd q-px-sm"
                  borderless
                  label-color="dark"
                  v-model="username"
                  label="รหัสผู้ใช้งาน"
                  data-cy="username"
                />
              </div>
              <div class="q-mt-md">
                <!-- password -->
                <q-input
                  @keyup.enter="toAdventure()"
                  dense
                  borderless
                  label-color="dark"
                  label="รหัสผ่าน"
                  class="userPwd q-px-sm"
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  data-cy="password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                      data-cy="togglePassword"
                    />
                  </template>
                </q-input>
              </div>
              <!-- ปุ่มเข้าสู่ระบบ -->
              <div class="q-mt-md">
                <div
                  id="loginBtn"
                  @click="toAdventure()"
                  class="text-dark btn-login relative-position"
                >
                  <span class="absolute-center">เข้าสู่ระบบ</span>
                </div>
              </div>

              <!-- ข้อความลืมรหัส -->
              <div class="q-pt-md text-dark" data-cy="forgotPassword">
                <div align="center">ลืมรหัสผู้ใช้งานหรือรหัสผ่าน</div>
                <div align="center">กรุณาติดต่อครูผู้สอน</div>
              </div>
            </span>
          </div>
        </div>
      </transition>
    </div>

    <!-- <div id="loginBtn" @click="toAdventure()"></div> -->

    <!-- dialog -->
    <q-dialog persistent v-model="isShowErrorDialog" data-cy="errorDialog">
      <q-card flat class="bg-transparent" style="width: 320px; height: 312px">
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
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div @click="confirm()" class="cursor-pointer btn-Alert z-top">
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
import axios from "axios";
export default {
  data() {
    return {
      isShowErrorDialog: false, //เรียก dialog Error
      username: "", // รหัสผู้ใช้งาน
      password: "", // รหัสผ่าน
      isPwd: true, // เปิด-ปิด ดวงตา password
    };
  },
  methods: {
    //เข้าสู่ระบบ
    async toAdventure() {
      let url =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/adventuresLogin";
      let postData = {
        username: this.username,
        password: this.password,
      };

      try {
        this.$q.loading.show({
          delay: 0,
        });
        let response = await axios.post(url, postData);
        let uid = response.data;

        this.$q.loading.hide();
        if (response.data != "user not found") {
          this.$router.push("/splash/" + uid);
        } else {
          alert("user not found");
        }
      } catch (error) {
        alert(error);
      }
    },
    //ตกลง
    confirm() {
      this.isShowErrorDialog = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
//ปุ่ม login เมื่อเอาเม้าส์ชี้
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
