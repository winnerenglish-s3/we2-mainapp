<template>
  <svg
    style="width:100%"
    width="1240"
    height="400"
    viewBox="0 0 1240 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g id="box-answer">
        <rect width="1240" height="400" fill="#FFDBA3" />
        <rect y="75" width="1238.85" height="4" fill="#FFD188" />
        <rect y="34" width="1238.85" height="4" fill="#FFD188" />
        <rect y="126" width="1238.85" height="4" fill="#FFD188" />
        <rect y="177" width="1238.85" height="4" fill="#FFD188" />
        <rect y="228" width="1238.85" height="4" fill="#FFD188" />
        <rect y="279" width="1238.85" height="4" fill="#FFD188" />
        <rect y="320" width="1238.85" height="4" fill="#FFD188" />
        <rect y="361" width="1238.85" height="4" fill="#FFD188" />
        <foreignObject width="1240" height="400" class="relative-position brx">
          <div class="row full-height justify-center items-center q-px-md brx">
            <div
              class="relative-position brx"
              v-for="(item, index) in dataChoices"
              :key="index"
            >
              <!-- <img
                style="width:100%"
                src="../../../public/images/multivocab/choice-default.png"
              /> -->
              <span class="font-content" align="center">
                {{ item }}
              </span>
            </div>
          </div>
        </foreignObject>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: ["dataChoices"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.font-content {
  font-size: 24px;
}
</style>
