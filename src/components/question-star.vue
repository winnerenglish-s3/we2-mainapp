<template>
  <svg
    style="width:100%;height:100%;"
    width="236"
    height="50"
    viewBox="0 0 236 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="current-question-star">
      <g id="box-current-question" filter="url(#filter0_d)">
        <rect
          id="shadow"
          x="10"
          y="10"
          width="67"
          height="32"
          rx="16"
          fill="#4C2F02"
        />
        <g id="box-show-text">
          <rect
            id="Rectangle 2589"
            x="10"
            y="7"
            width="67"
            height="32"
            rx="16"
            fill="#6D4300"
          />
          <foreignObject x="10" y="7" width="67" height="32">
            <span class="absolute-center text-white">
              {{ `${currentQuestion + 1}/${totalQuestion}` }}
            </span>
          </foreignObject>
        </g>
      </g>
      <g id="box-star" filter="url(#filter1_d)">
        <rect
          id="Rectangle 2590"
          x="92"
          y="9.91663"
          width="134"
          height="32.0833"
          rx="16.0417"
          fill="#4D2F02"
        />
        <rect
          id="Rectangle 2590_2"
          x="92"
          y="7"
          width="134"
          height="32.0833"
          rx="16.0417"
          fill="#6D4300"
        />
        <g id="Star1" filter="url(#filter2_i)">
          <path
            d="M129.713 13.6112L126.783 19.393L120.229 20.3231C119.054 20.489 118.583 21.8995 119.435 22.7074L124.177 27.2053L123.055 33.5591C122.853 34.7076 124.096 35.5678 125.137 35.0307L131 32.0307L136.863 35.0307C137.904 35.5635 139.147 34.7076 138.945 33.5591L137.823 27.2053L142.565 22.7074C143.417 21.8995 142.946 20.489 141.771 20.3231L135.217 19.393L132.287 13.6112C131.763 12.5806 130.242 12.5675 129.713 13.6112Z"
            :fill="totalStar >= 1 ? '#FFC01C' : '#4C2F02'"
          />
        </g>
        <g id="Star2" filter="url(#filter3_i)">
          <path
            d="M158.266 13.6112L155.459 19.393L149.178 20.3231C148.052 20.489 147.6 21.8995 148.417 22.7074L152.961 27.2053L151.886 33.5591C151.693 34.7076 152.884 35.5678 153.881 35.0307L159.5 32.0307L165.119 35.0307C166.116 35.5635 167.307 34.7076 167.114 33.5591L166.039 27.2053L170.583 22.7074C171.4 21.8995 170.948 20.489 169.822 20.3231L163.541 19.393L160.734 13.6112C160.231 12.5806 158.773 12.5675 158.266 13.6112Z"
            :fill="totalStar >= 2 ? '#FFC01C' : '#4C2F02'"
          />
        </g>
        <g id="Star3" filter="url(#filter4_i)">
          <path
            d="M186.266 13.6112L183.459 19.393L177.178 20.3231C176.052 20.489 175.6 21.8995 176.417 22.7074L180.961 27.2053L179.886 33.5591C179.693 34.7076 180.884 35.5678 181.881 35.0307L187.5 32.0307L193.119 35.0307C194.116 35.5635 195.307 34.7076 195.114 33.5591L194.039 27.2053L198.583 22.7074C199.4 21.8995 198.948 20.489 197.822 20.3231L191.541 19.393L188.734 13.6112C188.231 12.5806 186.773 12.5675 186.266 13.6112Z"
            :fill="totalStar >= 3 ? '#FFC01C' : '#4C2F02'"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="6"
        y="7"
        width="75"
        height="43"
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
      <filter
        id="filter1_d"
        x="88"
        y="7"
        width="142"
        height="43"
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
      <filter
        id="filter2_i"
        x="119"
        y="12.8334"
        width="24"
        height="26.3611"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="filter3_i"
        x="148"
        y="12.8334"
        width="23"
        height="26.3611"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="filter4_i"
        x="176"
        y="12.8334"
        width="23"
        height="26.3611"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    currentQuestion: {
      type: Number,
      default: 0
    },
    totalQuestion: {
      type: Number,
      default: 0
    },
    totalStar: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped></style>
