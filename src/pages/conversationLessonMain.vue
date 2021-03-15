<template>
  <q-page class="bg-theme-1">
    <div>
      <app-bar
        :isShowPause="isSynchronize ? false : true"
        :isLoadPractice="isLoadPractice"
        @callback-showdialoghelp="isShowDialogHelp = true"
        @callback-restart="reStart"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main" v-show="isLoadPractice">
      <div v-if="nextStep == 0">
        <div align="center" class="q-py-xl">
          <q-img
            v-if="$q.platform.is.desktop"
            style="width: 800px"
            src="../../public/images/conversation/label-conversation.png"
          >
            <div class="transparent full-width" style="height: 85%">
              <div class="absolute-center">
                <span class="f20 q-pt-md">{{ practiceData.name }}</span>
              </div>
            </div>
          </q-img>
          <span class="f20" v-else>{{ practiceData.name }}</span>
        </div>
        <div class="row justify-center q-pb-xl">
          <div class="col-3 q-pa-sm" style="max-width: 350px; width: 50%" align="center">
            <q-img
              width="300px"
              height="300px"
              src="../../public/images/conversation/speaking-1.png"
            ></q-img>
          </div>
          <div class="col-3 q-pa-sm" style="max-width: 350px; width: 50%" align="center">
            <q-img
              width="300px"
              height="300px"
              src="../../public/images/conversation/speaking-2.png"
            ></q-img>
          </div>
        </div>

        <div align="center" class="q-py-md q-pt-lg">
          <q-btn
            style="width: 200px"
            class="btn bg-amber-5 f16 rounded-borders"
            label="ดูวิดีโอ"
            @click="nextStep = 1"
          ></q-btn>
        </div>
      </div>

      <div class="q-py-xl" v-show="nextStep == 1">
        <div align="center">
          <iframe
            style="max-width: 1000px; width: 95%; height: calc(100vh * 9 / 16)"
            :src="videoConversation.vdoLink"
            frameborder="0"
          ></iframe>
        </div>

        <div align="center" class="q-my-xl">
          <q-btn
            style="width: 200px"
            class="btn bg-amber-5 f16 rounded-borders"
            label="กลับหน้าแนะนำ"
            @click="nextStep = 0"
          ></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "app/node_modules/axios";
export default {
  components: {
    appBar,
  },
  props: {
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    // Initial Route
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const nextStep = ref(0);
    const videoConversation = ref({});
    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      question: "",
      choices: [],
      correctAnswer: 0,
      extraSound: [],
      name: "",
    });

    const isLoadPractice = ref(false);
    const funcLoadPractice = async () => {
      console.clear();

      try {
        let tempPractice = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
        practiceData.totalQuestion = getData.data().numOfPractice;

        console.log(getData.data());

        try {
          let getPracticeName = await db
            .collection("practiceListName")
            .where("level", "==", getData.data().level)
            .where("unit", "==", getData.data().unit)
            .where("skill", "==", "Listening & Speaking")
            .get();

          practiceData.name = getPracticeName.docs[0].data().nameTh;
        } catch (error) {
          console.log(`${error} : Get Load Practice List Name`);
        }

        // Get Api
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";
        const postData = {
          practiceListId: practiceListId,
        };
        const response = await axios.post(apiURL, postData);

        getData = await db
          .collection("practiceData")
          .doc("server")
          .collection("practice")
          .doc(response.data[0].id)
          .collection("sentence")
          .get();

        getData.forEach((res) => {});

        // เก็บข้อมูลที่ได้จาก axios
        tempPractice = response.data;

        let newVideo = tempPractice[0].vdoLink.split(".");

        newVideo = newVideo[0] + "be.com/embed/" + newVideo[1].substring(3);

        tempPractice[0].vdoLink = newVideo;

        // copy แบบฝึกหัด
        // let setPracticeList = tempPractice;

        // เก็บข้อมูลคำศัพท์เสริม
        // practiceData.extraSound = extraSound;

        // สุ่มคำตอบของแต่ละข้อ
        // setPracticeList = setPracticeList.map((x, index) => {
        //   let choices = x.choices.sort(() => Math.random() - 0.5);
        //   x.choices = choices;
        //   return x;
        // });

        // สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

        // สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
        // setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

        // เก็บข้อมูลแบบฝึกหัดทั้งหมด
        videoConversation.value = tempPractice[0];

        // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
        // funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    onMounted(funcLoadPractice);

    return { practiceData, videoConversation, isLoadPractice, nextStep };
  },
};
</script>

<style lang="scss" scoped>
.bg-theme-1 {
  background-image: url("../../public/images/flashcard/flashcard-theme-1.png");
  background-size: cover;
  background-position: center;
}
</style>
