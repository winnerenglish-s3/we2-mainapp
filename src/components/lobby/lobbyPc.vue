<template>
  <div>
    <lobby-day class="absolute-top" v-if="mode" style="margin-top: -30px"></lobby-day>
    <lobby-night class="absolute-top" v-else style="margin-top: -30px"> </lobby-night>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import lobbyDay from "./lobbyDayPc";
import lobbyNight from "./lobbyNightPc";
export default {
  components: {
    lobbyDay,
    lobbyNight,
  },
  props: {
    mode: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped></style>
