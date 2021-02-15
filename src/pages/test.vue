<template>
  <div>
    <div class="" style="max-width: 500px; margin: auto">
      <div align="center" class="text-h5 q-pt-md">
        <!-- {{ text }} -->

        <q-input v-model="text" label="input text"></q-input>
      </div>

      <div align="center" class="q-pt-md">
        <q-btn
          @click="speakIt()"
          label="speak it"
          style="width: 150px"
          class="bg-teal text-white"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      text: "Hello World",
    };
  },
  methods: {
    async speakIt() {
      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/wfunctions/testTTS";
      const postData = {
        text: this.text,
      };

      const response = await axios.post(url, postData);

      this.$q.notify({
        message: "File is on " + response.data,
        color: "secondary",
        position: "top",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
