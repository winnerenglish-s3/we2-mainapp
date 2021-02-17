<template>
  <div class="bg-character">
    <div>
      <q-toolbar class="bg-grey-6">
        <q-space></q-space>
        <q-btn round class="bg-warning" push dense>
          <q-icon name="logout" />
        </q-btn>
      </q-toolbar>
    </div>

    <character-pc v-if="$q.platform.is.desktop"></character-pc>
    <character-mobile v-if="$q.platform.is.mobile"></character-mobile>
  </div>
</template>

<script>
import characterPc from "components/character/characterPc";
import characterMobile from "components/character/characterMobile";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import game from "../hooks/gameHooks.js";
import { ref, onMounted, reactive } from "vue";
import { ts, db } from "src/router";
export default {
  props: ["text"],
  components: {
    characterPc,
    characterMobile,
  },
  setup() {
    // ********************** Use quasar **********************
    const $q = useQuasar();
    //**********************  Router **********************
    const router = useRouter();
    const route = useRoute();

    // ********************** uid **********************
    const uid = $q.sessionStorage.getItem("uid");

    // ******************* Create Character *******************
    const createCharacter = () => {
      db.collection("student")
        .doc(uid)
        .update({
          character: {
            hat: currentHat,
            top: currentTop,
            bottom: currentBottom,
            color: selectColor,
            name: characterName.value,
            star: 0,
            level: 1,
          },
        })
        .then(() => {
          // router.push("/lobby");
          console.log("added");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      // checkCharacter();
    });
  },
};
</script>

<style lang="scss" scoped></style>
