<template>
  <q-page class="bg-roleplay">
    <!-- APP BAR -->
    <app-bar
      :isShowPause="true"
      :themeSync="themeSync"
      :instructionData="instructionData"
    ></app-bar>
    <!-- CONTENT -->

    <div align="center" class="q-pt-md" style="max-width: 1000px; margin: auto">
      <!-- Video -->

      <!-- <div class="text-h5">
        {{ errorText }}
      </div> -->

      <video
        style="width: 100%; border: 5px solid #0063be"
        id="videoPlayer"
        class="relative-position"
      >
        <source :src="vdoURL" type="video/mp4" />
      </video>
      <!-- Sentence -->
      <q-card class="bg-white q-pa-md q-mt-md shadow-8">
        <q-card-section class="text-h5">
          <div class="row justify-center" align="left">
            {{ rolePlayList[current].sentenceEng }}
          </div>
          <div class="q-pt-md row justify-center" align="left">
            {{ rolePlayList[current].sentenceTh }}
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <!-- <q-btn
            @click="current--"
            icon="fas fa-arrow-left"
            color="amber"
            class="text-black"
          >
          </q-btn> -->

          <q-btn
            @click="playVideo()"
            :icon="isPlaying ? 'fas fa-pause' : 'fas fa-play'"
            color="amber"
            class="text-black"
            :class="{
              'animate__animated animate__flash animate__infinite  no-pointer-events': isPlaying,
              'no-pointer-events': isRecording,
            }"
            style="animation-duration: 2s"
          >
          </q-btn>
          <q-btn
            @click="recordAudio()"
            icon="fas fa-microphone-alt"
            color="amber"
            class="text-black"
            :class="{
              'animate__animated animate__flash animate__infinite  no-pointer-events': isRecording,
              'no-pointer-events': isPlaying,
            }"
            style="animation-duration: 2s"
          >
          </q-btn>

          <q-btn
            @click="current++"
            icon="fas fa-arrow-right"
            color="amber"
            class="text-black"
          >
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-dialog v-model="isShowResult" persistent maximized position="bottom">
        <q-card class="shadow-0 transparent">
          <q-card-section
            class="fit"
            :class="{
              'bg-correct': rolePlayList[current].score >= 0.5,
              'bg-incorrect': rolePlayList[current].score < 0.5,
            }"
          >
            <div class="flex flex-center fit">
              <q-img
                class="animate__animated animate__tada animate__infinite"
                style="width: 200px; animation-duration: 2s"
                src="../../public/images/listening/shell.png"
              ></q-img>

              <div
                style="letter-spacing: 2px"
                class="text-h5 text-weight-bolder q-pa-md rounded-borders"
              >
                <span class="text-teal" v-if="rolePlayList[current].score > 0.7"
                  >PERFECT!! เยี่ยมไปเลย
                  <span class="desktop-only"> ลองฟังเสียงตัวเองดูนะ </span></span
                >
                <span class="text-teal" v-else-if="rolePlayList[current].score > 0.5"
                  >GREAT!! ทำได้ดีมาก
                  <span class="desktop-only"> ลองฟังเสียงตัวเองดูนะ </span>
                </span>
                <div
                  class="text-red"
                  align="center"
                  v-else-if="rolePlayList[current].score < 0.5"
                >
                  TRY AGAIN<br /><br />ลองใหม่อีกครั้งนะ
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  components: {
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const vdoURL = ref(
      "https://firebasestorage.googleapis.com/v0/b/winneradventure-ed4a1.appspot.com/o/vdo%2Fconversation%2FvSOtZKxBeaX9QNIJl2eT.mp4?alt=media&amp;token=d95c0200-6007-4109-b9a4-4f4c62fb04d0"
    );

    const current = ref(0);
    const rolePlayList = ref([
      {
        start: "00:00.000",
        end: "00:01.515",
        sentenceEng: "Oh no",
        sentenceTh: "โอ้ไม่นะ",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:02.515",
        end: "00:03.800",
        sentenceEng: "What's wrong mom?",
        sentenceTh: "เกิดอะไรขึ้นคะแม่",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:04.099",
        end: "00:08",
        sentenceEng: "We don't have any bread. But we have cornflakes and oatmeal.",
        sentenceTh: "เราไม่มีขนมปังเหลือแล้ว แต่เรามีคอนเฟล็ก และ ข้าวโอ็ต",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:08.592",
        end: "00:10.3",
        sentenceEng: "Which do you want Jane?",
        sentenceTh: "จะเอาอะไรจ๊ะ เจน",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:10.864",
        end: "00:13.398",
        sentenceEng: "Oh, I can't decide.",
        sentenceTh: "โอ้ หนูตัดสินใจไม่ได้ค่ะ",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:13.531",
        end: "00:16.776",
        sentenceEng: "Well, please hurry, you’re late.",
        sentenceTh: "เร็วๆหน่อยนะจ๊ะ สายแล้ว",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:16.878",
        end: "00:20.249",
        sentenceEng: "Alright, I’ll have some corn flakes.",
        sentenceTh: "ตกลงค่ะ หนูจะกินคอนเฟล็กซ์ค่ะ",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:20.346",
        end: "00:21.616",
        sentenceEng: "Here you are.",
        sentenceTh: "นี่จ๊ะ",
        isRecord: false,
        score: 0,
      },
      {
        start: "00:21.615",
        end: "00:23.400",
        sentenceEng: "The milk is in the fridge.",
        sentenceTh: "นมอยู่ในตู้เย็นนะจ๊ะ",
        isRecord: false,
        score: 0,
      },
    ]);

    const isAddListener = ref(false);
    let setTimeOut;

    const isPlaying = ref(false);
    const playVideo = () => {
      const video = document.getElementById("videoPlayer");
      isPlaying.value = true;

      let splitTimeStart = rolePlayList.value[current.value].start.split(":");
      let splitTimeEnd = rolePlayList.value[current.value].end.split(":");

      let startTime = Number(splitTimeStart[0]) * 60 + Number(splitTimeStart[1]);
      let endTime = Number(splitTimeEnd[0]) * 60 + Number(splitTimeEnd[1]);
      video.currentTime = startTime;

      var pausing_function = function () {
        console.log(this.currentTime);
        if (this.currentTime >= endTime) {
          this.pause();

          // remove the event listener after you paused the playback
          this.removeEventListener("timeupdate", pausing_function);
          isPlaying.value = false;
          this.currentTime = endTime;
        }
      };

      video.addEventListener("timeupdate", pausing_function);
      video.play();
    };

    const errorText = ref("");
    const speechText = ref("");
    const isShowResult = ref(false);

    let closeTimeout;

    const speechToText = () => {
      let result = "";
      try {
        var SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.start();

        isRecording.value = true;

        recognition.onerror = function (event) {
          if (event.error == "no-speech") {
            isShowResult.value = false;
            isRecording.value = false;
          }
        };

        recognition.onresult = async function (event) {
          var currentScript = event.resultIndex;
          // Get a transcript of what was said.
          var transcript = event.results[currentScript][0].transcript;
          // Add the current transcript to the contents of our Note.
          result += transcript;
          speechText.value = transcript;
          let compareText = rolePlayList.value[current.value].sentenceEng;
          isShowResult.value = true;
          isRecording.value = false;
          rolePlayList.value[current.value].isRecord = true;
          rolePlayList.value[current.value].score = similarity(transcript, compareText);

          clearTimeout(setTimeOut);
          setTimeOut = setTimeout(() => {
            isRecording.value = false;
          }, 3000);

          if ($q.platform.is.mobile) {
            clearTimeout(closeTimeout);
            closeTimeout = setTimeout(() => {
              isShowResult.value = false;
            }, 2000);
          }
        };
      } catch (error2) {
        speechText.value = error2;
      }
    };

    const isRecording = ref(false);

    const audioRecord = () => {
      try {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.start();
          isRecording.value = true;

          const audioChunks = [];
          mediaRecorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
          });

          mediaRecorder.addEventListener("stop", async () => {
            const audioBlob = new Blob(audioChunks, {
              type: "audio/mp3",
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();

            audio.onended = () => {
              isShowResult.value = false;
            };
          });

          setTimeout(() => {
            mediaRecorder.stop();
            isRecording.value = false;
          }, 5000);
        });
      } catch (e) {
        console.error(e);
      }
    };

    const similarity = (s1, s2) => {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    };

    const editDistance = (s1, s2) => {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    };

    const recordAudio = () => {
      speechToText();
      if ($q.platform.is.desktop) {
        audioRecord();
      }
    };

    onMounted(() => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          errorText.value = "can use mic";
          console.log("You let me use your mic!");
        })
        .catch(function (err) {
          errorText.value = "cannot use mic";
          console.log("No mic for you!");
        });
    });

    return {
      vdoURL,
      rolePlayList,
      current,
      isPlaying,
      playVideo,
      recordAudio,
      isAddListener,
      errorText,
      speechText,
      isRecording,
      isShowResult,
      // comparasionScore,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-roleplay {
  background-image: url("../../public/images/listening/bg-listening.jpg");
  background-position: bottom;
  background-size: cover;
}

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}

.bg-correct {
  background-color: #d7ffb8;
}

.bg-incorrect {
  background-color: #ffdfe0;
}
</style>
