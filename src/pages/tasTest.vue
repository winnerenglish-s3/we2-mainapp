<template>
  <div class="row">
    <q-expansion-item
      group="skill"
      label="Vocabulary"
      class="col-12 brx q-pa-md"
    >
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
      </div>
    </q-expansion-item>

    <q-expansion-item group="skill" label="Grammar" class="col-12 brx q-pa-md">
      <q-radio val="video" label="video mode" v-model="grammarMode"></q-radio>
      <q-radio val="slide" label="slide mode" v-model="grammarMode"></q-radio>

      <div class="row">
        <div>
          <q-btn
            icon="fas fa-caret-left"
            @click="changeGrammarLesson('p')"
            label="previous"
            class="bg-amber"
          ></q-btn>
        </div>

        <div class="q-pl-md">
          <q-btn
            icon="fas fa-caret-right"
            @click="changeGrammarLesson('n')"
            label="next"
            class="bg-teal"
          ></q-btn>
        </div>
      </div>
    </q-expansion-item>

    <div class="col-12 q-py-md text-h5" align="center">
      <q-radio label="control" val="control" v-model="mode"> </q-radio>
      <q-radio label="self learning" val="selflearning" v-model="mode">
      </q-radio>
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

    const grammarMode = ref("video");

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

    const changeGrammarMode = () => {
      db.collection("synchronize")
        .doc("test")
        .update({
          grammar: {
            mode: grammarMode.value,
            currentLessonIndex: 0,
          },
        });
    };

    watch(mode, (newValue, oldValue) => {
      changeMode();
    });

    watch(grammarMode, (newValue, oldValue) => {
      changeGrammarMode();
    });

    const currentLessonIndex = ref(0);

    const changeGrammarLesson = (mode) => {
      if (mode == "n") {
        currentLessonIndex.value++;
      } else {
        currentLessonIndex.value--;
      }
      db.collection("synchronize")
        .doc("test")
        .update({
          grammar: {
            mode: grammarMode.value,
            currentLessonIndex: currentLessonIndex.value,
          },
        });
    };

    onMounted(() => {
      loadFlashcard();
    });
    return {
      flashcardList,
      syncFlashcard,
      mode,
      grammarMode,
      changeGrammarLesson,
    };
  },
};
</script>

<style lang="scss" scoped></style>
