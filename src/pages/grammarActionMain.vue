<template>
  <q-page
    :class="$q.platform.is.pc ? 'bg-grammaraction' : 'bg-mobile'"
    :theme="themeSync"
  >
    <grammar-action-pc v-if="$q.platform.is.pc"></grammar-action-pc>
    <grammar-action-mobile v-if="$q.platform.is.mobile"></grammar-action-mobile>
  </q-page>
</template>

<script>
import grammarActionPc from "../components/grammar/grammarActionPc";
import grammarActionMobile from "../components/grammar/grammarActionMobile";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  components: {
    grammarActionPc,
    grammarActionMobile
  }
};
</script>

<style lang="scss" scoped>
.bg-grammaraction {
  background-color: #b2dfff;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.bg-grammaraction[theme="1"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-1.png");
}

.bg-grammaraction[theme="2"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-2.png");
}

.bg-mobile {
  background-color: #eabd94;
}
</style>
