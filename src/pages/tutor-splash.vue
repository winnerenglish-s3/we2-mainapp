<template>
  <div class="tutorLanding">
    <div class="absolute-center" style="width:100%;height:500px">
      <div style="height:50px"></div>
      <!-- เมฆ -->
      <!-- pc -->
      <div class="desktop-only" style="height:100px">
        <transition appear enter-active-class="animated1  animate__flash">
          <q-img
            class="absolute cloud1"
            style="width:100px"
            src="../../public/images/tutor/cloud5.png"
          />
        </transition>
        <transition appear enter-active-class="animated2  animate__flash">
          <q-img
            class="absolute cloud2"
            style="width:100px"
            src="../../public/images/tutor/cloud6.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__flash">
          <q-img
            class="absolute cloud3"
            style="width:95px"
            src="../../public/images/tutor/cloud7.png"
          />
        </transition>
        <transition appear enter-active-class="animated4  animate__flash">
          <q-img
            class="absolute cloud4"
            style="width:62px"
            src="../../public/images/tutor/cloud8.png"
          />
        </transition>
      </div>
      <!-- mobile -->
      <div class="mobile-only relative-position" style="height:100px">
        <transition appear enter-active-class="animated2  animate__flash">
          <q-img
            class="absolute"
            style="width:94px;right:0px;top:-70%"
            src="../../public/images/tutor/cloud6.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__flash">
          <q-img
            class="absolute"
            style="width:62px;bottom:-50px;left:5%"
            src="../../public/images/tutor/cloud7.png"
          />
        </transition>
      </div>
    </div>
    <div class="absolute-center">
      <div>
        <div class="text-center z-top">
          <!-- โหลด -->
          <!-- โลโก้ -->
          <transition
            appear
            enter-active-class="animatedLogo    animate__bounceIn"
          >
            <q-img
              style="width:144px"
              src="../../public/images/logo-tutor.png"
            />
          </transition>
          <div style="height:40px"></div>
          <div>
            <div style="width:320px ;" class="q-pa-md">
              <!-- ช่องโหลด -->
              <div
                style="background-color:#FFAA2E;height:20px;border-radius:50px;padding:2px"
              >
                <div
                  class="fit"
                  style="background-color:#D38A14;border-radius:50px;padding:2px"
                >
                  <div
                    class="full-height"
                    :style="'width:' + progress"
                    style="
                    background: rgb(24,143,195);background: linear-gradient(180deg, rgba(24,143,195,1) 0%, rgba(0,169,243,1) 100%);
                    border-radius:50px"
                  ></div>
                </div>
              </div>
              <div class="q-py-sm appendMovingDots f16">Loading</div>
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
      progress: 0
    };
  },
  methods: {
    // คิดค่าโหลด
    loading() {
      let x = 0;
      var id = setInterval(() => {
        if (x >= 100) {
          clearInterval(id);
          this.$router.push("/tutor/login");
        } else {
          x++;
          this.progress = x + "%";
        }
      }, 24);
    }
  },
  created() {
    this.$q.localStorage.set("pf", "T");
  },
  mounted() {
    this.loading();
  }
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
  animation-duration: 3s;
}
.animated2 {
  animation-duration: 2.5s;
}
.animated3 {
  animation-duration: 2s;
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
