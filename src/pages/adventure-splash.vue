<template>
  <div class="adventureLanding">
    <div class="absolute-center" style="width: 100%; height: 500px">
      <div style="height: 50px"></div>
      <!-- เมฆ -->
      <!-- pc -->
      <div class="desktop-only" style="height: 100px">
        <transition appear enter-active-class="animated1  animate__fadeInRight">
          <q-img
            class="absolute cloud1"
            style="width: 100px"
            src="../../public/images/school/cloud1.png"
          />
        </transition>
        <transition appear enter-active-class="animated2  animate__fadeInRight">
          <q-img
            class="absolute cloud2"
            style="width: 100px"
            src="../../public/images/school/cloud3.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__fadeInRight">
          <q-img
            class="absolute cloud3"
            style="width: 95px"
            src="../../public/images/school/cloud2.png"
          />
        </transition>
        <transition appear enter-active-class="animated4  animate__fadeInRight">
          <q-img
            class="absolute cloud4"
            style="width: 62px"
            src="../../public/images/school/cloud4.png"
          />
        </transition>
      </div>
      <!-- mobile -->
      <div class="mobile-only relative-position" style="height: 100px">
        <transition appear enter-active-class="animated2  animate__fadeInRight">
          <q-img
            class="absolute"
            style="width: 100px; right: 0px"
            src="../../public/images/school/cloud3.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__fadeInRight">
          <q-img
            class="absolute"
            style="width: 62px; bottom: 0px; left: 10%"
            src="../../public/images/school/cloud2.png"
          />
        </transition>
      </div>
    </div>
    <div class="absolute-center">
      <div>
        <div class="text-center z-top">
          <!-- โหลด  -->
          <!-- โลโก้ -->
          <transition appear enter-active-class="animatedLogo animate__bounceIn">
            <q-img style="width: 144px" src="../../public/images/logo-adventures.png" />
          </transition>
          <div style="height: 40px"></div>
          <div>
            <!-- ช่องโหลด -->
            <div style="width: 320px">
              <div
                style="
                  background-color: #ffaa2e;
                  height: 20px;
                  border-radius: 50px;
                  padding: 2px;
                "
              >
                <div
                  class="fit"
                  style="background-color: #d38a14; border-radius: 50px; padding: 2px"
                >
                  <div
                    class="full-height"
                    :style="'width:' + progress"
                    style="
                      background: rgb(204, 36, 36);
                      background: linear-gradient(
                        180deg,
                        rgba(204, 36, 36, 1) 0%,
                        rgba(255, 84, 84, 1) 100%
                      );
                      border-radius: 50px;
                    "
                  ></div>
                </div>
              </div>
            </div>
            <div class="q-py-sm appendMovingDots f16 animate">Loading</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import game from "../hooks/checkGameMode.js";
import { ref, onMounted } from "vue";
import Axios from "axios";
import { auth } from "src/router/index.js";
export default {
  setup(props) {
    // ********************** Router **********************
    // const router = root.$router;
    // const route = root.$route;

    // ********************** Progress Bar Percentage **********************
    const progress = ref(0);
    const loadingProgress = () => {
      let percentage = 0;
      let interval = setInterval(async () => {
        if (percentage >= 100) {
          clearInterval(interval);
          await checkLogin();
        } else {
          percentage++;
          progress.value = percentage + "%";
        }
      });
    };

    // ********************** Check GameMode From hook **********************
    const checkGameMode = () => {
      let isEnableGameMode = game.gameInfomation().isEnable();
      if (isEnableGameMode) {
        console.log("game mode is enable");
        // router.push("/character")
      } else {
        console.log("game mode is disable");
      }
    };

    // Check Login

    const checkLogin = async () => {
      const apiUrl =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/wfunctions/mainAppLogin";
      const postData = {
        uid: route.params.uid,
      };
      const response = await Axios.post(apiUrl, postData);

      if (response.data != "user not found") {
        login(response.data.customToken);
      } else {
        console.log("user not found");
      }
    };

    const login = async (token) => {
      auth.signInWithCustomToken(token).then((user) => {
        checkGameMode();
      });
    };

    // ********************** Check Login **********************

    onMounted(() => {
      loadingProgress();
      window.sessionStorage.setItem("pdf", "A");
    });

    return { loading: loadingProgress, progress: progress };
  },
};
</script>

<style lang="scss" scoped>
.cloud1 {
  left: 18%;
}
.cloud2 {
  top: 5%;
  left: 60%;
}
.cloud3 {
  left: 32%;
  bottom: 60%;
}
.cloud4 {
  left: 80%;
  bottom: 65%;
}
.animatedLogo {
  animation-duration: 1s;
}
.animated1 {
  animation-duration: 4.5s;
}
.animated2 {
  animation-duration: 4s;
}
.animated3 {
  animation-duration: 3.5s;
}
.animated4 {
  animation-duration: 3s;
}
.appendMovingDots:after {
  content: " .";
  animation: dots 2s steps(1, end) infinite;
}
@keyframes dots {
  0%,
  12.5% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    text-shadow: 0.5em 0;
  }
  50% {
    text-shadow: 0.5em 0, 1em 0;
  }
}
</style>
