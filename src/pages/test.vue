<template>
  <div class="flex flex-center bg-grey-10" style="height: 100vh" align="center">
    <div class="" style="max-width: 500px; margin: auto">
      <div align="center" class="text-h5 q-pt-md">
        <q-input v-model="text" label="input text"></q-input>
      </div>

      <div align="center" class="q-pt-md">
        <q-btn
          @click="speakIt()"
          label="speak it"
          style="width: 150px"
          class="bg-teal text-white"
        ></q-btn>
      </div>
    </div>

    <div class="brx relative-position">
      <div class="row brx" style="width: 400px">
        <div
          class="col-2 q-pa-sm brx"
          align="center"
          style="width: 20%"
          v-for="(i, index) in 25"
        >
          <q-btn
            no-caps
            class="q-px-lg"
            :label="
              showData.filter((x) => x.center == index).length
                ? showData.filter((x) => x.center == index)[0].text
                : `&nbsp;`
            "
            push
            :class="
              setArea.filter(
                (x) =>
                  x.top == index ||
                  x.left == index ||
                  x.right == index ||
                  x.bottom == index
              ).length
                ? 'bg-red'
                : 'bg-white'
            "
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "src/router";
export default {
  data() {
    return {
      text: "Hello World",
      setArea: [],
      showData: [],
    };
  },
  methods: {
    funcRandom() {
      console.clear();
      let test = [
        {
          vocab: "one",
        },
        {
          vocab: "rabbit",
        },
        {
          vocab: "school",
        },
        {
          vocab: "radit",
        },
        {
          vocab: "chocolate",
        },
      ];

      let setWord = test.map((x) => x.vocab);
      let tempSeparate = [];
      setWord.forEach((res) => {
        let separatestr = res.split("");

        tempSeparate.push(...separatestr);
      });

      tempSeparate = [...new Set(tempSeparate)];

      for (let i = 0; i < tempSeparate.length; i++) {
        let tempArea = [];

        // tempArea = [...new Set(tempArea)].sort((a, b) => a - b);

        let setTop = [
          {
            center: 0,
            left: false,
            top: false,
            right: true,
            bottom: true,
          },
          {
            center: 1,
            left: true,
            top: false,
            right: true,
            bottom: true,
          },
          {
            center: 2,
            left: true,
            top: false,
            right: true,
            bottom: true,
          },
          {
            center: 3,
            left: true,
            top: false,
            right: true,
            bottom: true,
          },
          {
            center: 4,
            left: true,
            top: false,
            right: false,
            bottom: true,
          },
        ];

        let setLetf = [
          {
            center: 0,
            left: false,
            top: false,
            right: true,
            bottom: true,
          },
          {
            center: 5,
            left: false,
            right: true,
            top: true,
            right: true,
          },
          {
            center: 10,
            left: false,
            right: true,
            top: true,
            right: true,
          },
          {
            center: 15,
            left: false,
            right: true,
            top: true,
            right: true,
          },
          {
            center: 20,
            left: false,
            right: true,
            top: true,
            right: true,
          },
        ];

        this.setArea = tempArea;

        let newData = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          center: 0,
          text: tempSeparate[i],
        };

        if (this.showData.length > 0) {
          console.log("Text 2");

          let setNewAorund = [];

          setNewAorund.push(
            this.showData[i - 1].top,
            this.showData[i - 1].left,
            this.showData[i - 1].right,
            this.showData[i - 1].bottom
          );

          setNewAorund = setNewAorund.sort(() => Math.random() - 0.5);

          console.log(setNewAorund);

          newData.center = setNewAorund[0];
          newData.left = setNewAorund[0] - 1;
          newData.right = setNewAorund[0] + 1;
          newData.top = setNewAorund[0] - 5;
          newData.bottom = setNewAorund[0] + 5;

          this.showData.push(newData);

          if (i == 1) {
            break;
          }
        } else {
          let setCenter = Math.floor(Math.random() * (0 - 25) + 25);

          newData = {
            top: setCenter - 5,
            bottom: setCenter + 5,
            left: setCenter - 1,
            right: setCenter + 1,
            center: setCenter,
            text: tempSeparate[i],
          };

          this.showData.push(newData);
        }

        // if (setCenter) {
        //   let dangArea = tempArea.filter(
        //     (x) =>
        //       x.top == setCenter ||
        //       x.bottom == setCenter ||
        //       x.left == setCenter ||
        //       x.right == setCenter
        //   );

        //   if (dangArea.length) {
        //     let area = dangArea[0];
        //     if (area.top || area.left || area.right) {
        //       let setAreaNumber = setAngleTop.filter(
        //         (x) => x == area.top || x == area.left || x == area.right
        //       );

        //       if (setAreaNumber.length) {
        //         if (setAreaNumber[0] == 0) {
        //           console.log("TOP 0");
        //         } else {
        //           console.log("TOP 4");
        //         }
        //       } else {
        //         let areaOther = null;
        //         if (area.top) {
        //           areaOther = tempArea.filter(
        //             (x) => x.top >= area.top && x.top <= area.top
        //           );

        //           if (areaOther.length) {
        //             console.log(`TOP : ${areaOther[0].top}`);
        //           } else {
        //             console.log("TOP Exit");
        //           }
        //         } else if (area.left) {
        //           areaOther = tempArea.filter(
        //             (x) => x.left >= area.left && x.left <= area.left
        //           );

        //           if (areaOther.length) {
        //             console.log(`LEFT : ${areaOther[0].left}`);
        //           } else {
        //             console.log("LEFT Exit");
        //           }

        //           console.log(`LEFT : ${area.left}`);
        //         } else if (area.right) {
        //           areaOther = tempArea.filter(
        //             (x) => x.right >= area.right && x.right <= area.right
        //           );

        //           if (areaOther.length) {
        //             console.log(`RIGHT : ${areaOther[0].right}`);
        //           } else {
        //             console.log("RIGHT Exit");
        //           }
        //         }
        //       }
        //     } else if (area.bottom) {
        //       if (setAngleBottom.filter((x) => x == area.bottom).length) {
        //         console.log("Bottom x");
        //       } else {
        //         console.log("Bottom Y");
        //       }
        //     }
        //   }
        // }
      }

      console.log(tempSeparate);
    },
    async speakIt() {
      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/wfunctions/testTTS";
      const postData = {
        text: this.text,
      };
      const response = await axios.post(url, postData);
      this.$q.notify({
        message: "File is on " + response.data,
        color: "secondary",
        position: "top",
      });
    },
  },
  mounted() {
    this.funcRandom();
  },
};
</script>

<style lang="scss" scoped></style>
