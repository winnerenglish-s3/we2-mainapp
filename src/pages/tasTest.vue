<template>
  <div class="row">
    <q-card
      v-for="(item, index) in flashcardList"
      :key="index"
      class="q-px-md q-ma-md cursor-pointer"
      style="width: 150px"
      @click="syncFlashcard(item)"
    >
      <div align="center" class="brx q-pa-md">
        {{ item.vocab }}
      </div>
    </q-card>

    <div class="col-12">
      <q-radio label="control" val="control" v-model="mode"> </q-radio>
      <q-radio label="self learning" val="selflearning" v-model="mode"> </q-radio>
    </div>
  </div>
</template>

<script>
import { db } from "src/router";
import { ref, onMounted, watch } from "vue";
export default {
  setup() {
    const flashcardList = ref([]);
    const loadFlashcard = async () => {
      let getPracticeData = await db
        .collection("practiceData")
        .doc("server")
        .collection("practice")
        .where("practiceListId", "==", "nuytJ4l2dgr67m0ARobu")
        .get();
      let temp = [];
      getPracticeData.forEach((element) => {
        temp.push({
          ...element.data(),
          id: element.id,
        });
      });

      flashcardList.value = temp;
    };

    const mode = ref("control");

    const syncFlashcard = (item) => {
      db.collection("synchronize").doc("test").update({
        mode: mode.value,
        practiceId: item.id,
      });
    };

    const changeMode = () => {
      db.collection("synchronize").doc("test").update({
        mode: mode.value,
      });
    };

    watch(mode, (newValue, oldValue) => {
      changeMode();
    });

    onMounted(() => {
      loadFlashcard();
    });
    return { flashcardList, syncFlashcard, mode };
  },
};
</script>

<style lang="scss" scoped></style>
