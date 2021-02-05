<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- <div style="font-size: 30vh">
        404
      </div> -->

      <div class="text-h2" style="opacity:.4">
        <div class="q-pa-sm">
          {{ `Platform : ${this.$q.platform.is.platform}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Webkit : ${this.$q.platform.is.webkit || false}` }}
        </div>
        <div class="q-pa-sm">
          {{ `Version : ${this.$q.platform.is.versionNumber}` }}
        </div>
      </div>

      <!-- <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  mounted() {
    console.log(this.$q.platform.is);
  }
};
</script>
