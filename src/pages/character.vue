<template>
  <div>
    <character-pc class="desktop-only"></character-pc>
    <character-mobile class="mobile-only"></character-mobile>
  </div>
</template>

<script>
import characterPc from "../components/characterPc.vue";
import characterMobile from "../components/characterMobile.vue";
export default {
  components: {
    characterPc,
    characterMobile
  }
};
</script>

<style lang="scss" scoped></style>
