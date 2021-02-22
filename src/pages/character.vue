<template>
  <div
    :class="$q.platform.is.desktop ? 'bg-character-pc' : 'bg-character-mobile'"
  >
    <div class="absolute-right q-pa-md">
      <q-btn size="17px" round class="bg-warning" push dense>
        <q-icon name="logout" />
      </q-btn>
    </div>

    <character-pc
      v-if="$q.platform.is.desktop"
      :equipment="equipment"
      :color="color"
      @createCharacter="funcCreate"
      @changeEquipment="funcChangeEquipment"
    ></character-pc>
    <character-mobile
      v-if="$q.platform.is.mobile"
      :equipment="equipment"
      :color="color"
      @createCharacter="funcCreate"
      @changeEquipment="funcChangeEquipment"
    ></character-mobile>
  </div>
</template>

<script>
import characterPc from "components/character/characterPc";
import characterMobile from "components/character/characterMobile";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
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

    // Initial Data
    const equipment = reactive({
      head: 0,
      body: 0,
      footer: 0,
    });
    const color = ref("#FFD4BE");

    const checkCharacter = async () => {
      $q.loading.show();

      let response = await game.characterInfomation(uid);
      if (response) {
        equipment.head = response.head;
        equipment.body = response.body;
        equipment.footer = response.footer;
        color.value = response.color;
        router.push("/lobby");
      }

      $q.loading.hide();
    };

    const funcChangeEquipment = (data) => {
      if (data.type == 1) {
        if (data.set == "decrease") {
          if (equipment.head != 0) {
            equipment.head--;
          } else {
            equipment.head = 1;
          }
        } else {
          if (equipment.head == 1) {
            equipment.head = 0;
          } else {
            equipment.head++;
          }
        }
      } else if (data.type == 2) {
        if (data.set == "decrease") {
          if (equipment.body != 0) {
            equipment.body--;
          } else {
            equipment.body = 1;
          }
        } else {
          if (equipment.body == 1) {
            equipment.body = 0;
          } else {
            equipment.body++;
          }
        }
      } else if (data.type == 3) {
        if (data.set == "decrease") {
          if (equipment.footer != 0) {
            equipment.footer--;
          } else {
            equipment.footer = 1;
          }
        } else {
          if (equipment.footer == 1) {
            equipment.footer = 0;
          } else {
            equipment.footer++;
          }
        }
      }
    };

    const funcCreate = (data) => {
      console.log(data);
      db.collection("student")
        .doc(uid)
        .update({
          character: data,
        })
        .then(function (doc) {
          router.push("/lobby");
        })
        .catch(function (error) {
          console.log(`${error} : Create Character`);
        });
    };

    onMounted(() => {
      checkCharacter();
    });

    return {
      // Initial Data
      equipment,
      color,

      // Function
      funcCreate,
      funcChangeEquipment,
    };
  },
};
</script>

<style lang="scss" scoped></style>
