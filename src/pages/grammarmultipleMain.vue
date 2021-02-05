<template>
  <q-page>
    <grammar-multiple-pc
      class="box-container-main"
      :themeSync="themeSync"
      v-if="$q.platform.is.desktop"
    ></grammar-multiple-pc>
    <grammar-multiple-mobile
      :themeSync="themeSync"
      v-if="$q.platform.is.mobile"
    ></grammar-multiple-mobile>
  </q-page>
</template>

<script>
import grammarMultiplePc from "../components/grammar/grammarMultiplePc";
import grammarMultipleMobile from "../components/grammar/grammarMultipleMobile";
export default {
  components: {
    grammarMultiplePc,
    grammarMultipleMobile
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped></style>
