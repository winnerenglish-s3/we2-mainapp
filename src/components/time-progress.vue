<template>
  <svg
    style="width:100%;height:100%;"
    width="215"
    height="50"
    viewBox="0 0 215 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Progress-time">
      <g id="progress-time">
        <g id="progress-bar">
          <rect
            id="Rectangle 3364"
            opacity="0.1"
            x="7"
            y="14"
            width="200"
            height="20"
            rx="10"
            fill="#6D4300"
          />
          <rect
            id="background-bar"
            x="9.5"
            y="16.5"
            width="189"
            height="15"
            rx="7.5"
            fill="#B2DFFF"
            stroke="#6D4300"
            stroke-width="5"
          />
          <rect
            id="show-progress-bar"
            x="48"
            y="19"
            width="153"
            height="10"
            rx="5"
            fill="#5974FF"
          />
        </g>
        <g id="time">
          <circle id="red-time" cx="190.5" cy="24.5" r="16.5" fill="#E20418" />
          <circle
            id="white-time"
            cx="190.499"
            cy="24.4994"
            r="12.375"
            fill="white"
          />
          <path
            id="center-time"
            d="M194 25C194 26.6569 192.657 28 191 28C189.343 28 188 26.6569 188 25C188 23.3431 189.343 22 191 22C192.657 22 194 23.3431 194 25Z"
            fill="black"
          />
          <path
            id="long-time"
            d="M191 16L191 24.8125"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            id="short-time"
            d="M186 25L191 25"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="3"
        y="8"
        width="208"
        height="41"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  props: ["practiceTime", "isPracticeTimeout"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background-color: #5974ff;
  width: 100%;
  border-radius: 10px;
}

.progress {
  animation-name: progressBar;
  animation-timing-function: linear;
}

@keyframes progressBar {
  to {
    width: 0%;
  }
}

.time {
  animation-name: timeMove;
  animation-timing-function: linear;
  transform-origin: bottom;
  transform-box: fill-box;
}

@keyframes timeMove {
  to {
    transform: rotate(360deg);
  }
}
</style>
