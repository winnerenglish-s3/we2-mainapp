<template>
  <q-page class="bg-practice-main row">
    <div class="col q-pa-xl" align="center">
      <div class="box-container-pracitcelist">
        <div class="row box-content-practicelist q-py-md q-px-md">
          <div class="col-3 self-center" style="width: 100px" algin="center"></div>
          <div class="col self-center" algin="center">
            <span class="f20 text-amber-5">คำศัพท์</span>
          </div>
          <div class="col-3 self-center" style="width: 100px" algin="center">
            <q-select
              v-model="selectLevel"
              :options="levelList"
              dense=""
              bg-color="amber-5"
              round=""
              outlined=""
            />
          </div>
        </div>
        <div class="q-pa-md">
          <div class="row">
            <div class="col self-center">
              <div class="box-content-progress-practice" align="left">
                <div class="progress-bar" style="width: 80%"></div>
              </div>
            </div>
            <div class="col-2" style="width: 50px">
              <span class="f16">5/20</span>
            </div>
          </div>
          <div class="q-mt-md box-content-practice-list">
            <div
              class="row q-mr-sm q-mb-md bg-white box-content"
              v-for="i in 15"
              :key="i"
            >
              <div class="col-2 q-pa-md">{{ i }}</div>
              <div class="col self-center brx">
                <span>
                  {{ i + 1 }}
                </span>
              </div>
              <div class="col-2 self-center">
                <span class="f16">3/4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col row q-pa-md bg-map">
      <div class="self-center col-12">
        <q-img
          style="width: 100%"
          src="../../public/images/practicelist/bg-map-theme-1.png"
        >
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props) {
    const levelList = ref([]);
    const selectLevel = ref("ระดับ7");

    const unitCompleteList = ref([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);

    return { selectLevel, levelList, unitCompleteList };
  },
};
</script>

<style lang="scss" scoped>
.bg-practice-main {
  background-image: url("../../public/images/practicelist/bg-practicelist.png");
}

.bg-map {
  background-color: #81caff;
  background-size: contain;
}

.box-container-pracitcelist {
  max-width: 450px;
  width: 100%;
  background-color: #ffe6cf;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.box-content-practicelist {
  background-color: #9f220c;
}

.box-content-progress-practice {
  background-color: #fff;
  border: 2px solid #7b6060;
  border-radius: 20px;
  height: 15px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #e57373;
  border-radius: 5px;
}

.box-content-practice-list {
  max-height: calc(100vh - 300px);
  min-height: fit-content;
  overflow-y: scroll;
}

/* width */
.box-content-practice-list::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.box-content-practice-list::-webkit-scrollbar-track {
  background: #7b6060;
  border-radius: 20px;
}

/* Handle */
.box-content-practice-list::-webkit-scrollbar-thumb {
  background: #e57373;
  border-radius: 20px;
}

/* Handle on hover */
.box-content-practice-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.box-content {
  border-radius: 10px;
  overflow: hidden;
}
</style>
