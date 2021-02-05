<template>
  <div>
    <div style="max-width: 750px; width: 100%" class="fixed-center q-px-md">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="white"
        style="background: #009688"
        class="text-grey-3 shadow-2"
        align="justify"
      >
        <div class="relative-position" style="width: 100%">
          <q-tab name="school" label="โรงเรียน" @click="setType('forSchool')" />
          <div
            v-if="tab == 'school'"
            style="width: 100%; height: 5px"
            class="absolute-bottom bg-white"
          >
            2
          </div>
        </div>
        <div class="relative-position" style="width: 100%">
          <q-tab name="online" label="ออนไลน์" @click="setType('forOnline')" />
          <div
            v-if="tab == 'online'"
            style="width: 100%; height: 5px"
            class="absolute-bottom bg-white"
          >
            3
          </div>
        </div>
        <div class="relative-position" style="width: 100%">
          <q-tab name="tutor" label="ติวเตอร์" @click="setType('forTutor')" />
          <div
            v-if="tab == 'tutor'"
            style="width: 100%; height: 5px"
            class="absolute-bottom bg-white"
          >
            4
          </div>
        </div>
      </q-tabs>
      <q-separator />
      <q-tab-panels style="height: 400px" class="shadow-2" v-model="tab" animated>
        <!-- school -->
        <q-tab-panel name="school">
          <div>
            <q-checkbox
              keep-color
              v-model="schoolBox"
              val="firstentry"
              label="เข้าโปรแกรมครั้งแรก"
              color="teal"
            />
          </div>
          <div>
            <q-checkbox
              keep-color
              v-model="schoolBox"
              val="placement"
              label="สอบวัดระดับ"
              color="teal"
            />
          </div>

          <q-radio
            color="teal"
            val="pretest"
            v-model="prePost"
            label="สอบ Pre-test"
            keep-color=""
          >
          </q-radio>
          <q-radio
            color="teal"
            val="posttest"
            v-model="prePost"
            label="สอบ Post-test"
            keep-color=""
          >
          </q-radio>
          <q-radio color="teal" val="learn" v-model="prePost" label="เรียน" keep-color="">
          </q-radio>
          <div>
            <q-checkbox
              keep-color
              v-model="schoolBox"
              val="exam"
              label="สอบ E-exam"
              color="teal"
            />
          </div>
          <div>
            <q-checkbox
              keep-color
              v-model="schoolBox"
              val="questionnaire"
              label="แบบสอบถาม"
              color="teal"
            />
          </div>
          <div>
            <q-radio
              color="teal"
              val="1"
              v-model="theme"
              label="Theme 1"
              keep-color=""
            ></q-radio>
            <q-radio
              color="teal"
              val="2"
              v-model="theme"
              label="Theme 2"
              keep-color=""
            ></q-radio>
          </div>
          <div class="text-center absolute-bottom q-pa-lg">
            <q-btn
              @click="saveBtnSchool()"
              style="width: 150px"
              label="บันทึก"
              color="teal"
            />
          </div>
        </q-tab-panel>
        <!-- online -->
        <q-tab-panel name="online">
          <div>
            <q-checkbox
              keep-color
              v-model="onlineBox"
              val="firstentry"
              label="เข้าโปรแกรมครั้งแรก"
              color="teal"
            />
          </div>
          <div>
            <q-checkbox
              keep-color
              v-model="onlineBox"
              val="placement"
              label="สอบวัดระดับ"
              color="teal"
            />
          </div>
          <div class="text-center absolute-bottom q-pa-lg">
            <q-btn
              @click="saveBtnOnline()"
              style="width: 150px"
              label="บันทึก"
              color="teal"
            />
          </div>
          <div>
            <q-radio
              color="teal"
              val="1"
              v-model="theme"
              label="Theme 1"
              keep-color=""
            ></q-radio>
            <q-radio
              color="teal"
              val="2"
              v-model="theme"
              label="Theme 2"
              keep-color=""
            ></q-radio>
          </div>
        </q-tab-panel>
        <!-- tutor -->
        <q-tab-panel name="tutor">
          <div>
            <q-checkbox
              keep-color
              v-model="tutorBox"
              val="firstentry"
              label="เข้าโปรแกรมครั้งแรก"
              color="teal"
            />
          </div>
          <div class="text-center absolute-bottom q-pa-lg">
            <q-btn
              @click="saveBtnTutor()"
              style="width: 150px"
              label="บันทึก"
              color="teal"
            />
          </div>
          <div>
            <q-radio
              color="teal"
              val="1"
              v-model="theme"
              label="Theme 1"
              keep-color=""
            ></q-radio>
            <q-radio
              color="teal"
              val="2"
              v-model="theme"
              label="Theme 2"
              keep-color=""
            ></q-radio>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- popup dialog -->
    <div>
      <q-dialog v-model="backUp" persistent>
        <q-card style="max-width: 300px; width: 100%">
          <q-card-section class="row items-center">
            <span class="q-py-md q-pb-lg"
              >คุณยังไม่บันทึกข้อมูล ต้องการออกจากหน้านี้</span
            >
          </q-card-section>
          <q-card-actions align="right">
            <q-btn style="width: 80px" flat color="teal" v-close-popup>
              <u>ออก</u>
            </q-btn>
            <q-btn
              style="width: 80px"
              label="อยู่ต่อ"
              class="bg-teal"
              color="white"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "school",
      schoolBox: [],
      onlineBox: [],
      tutorBox: [],
      backUp: false,
      prePost: "",
      theme: "1",
      stype: "forSchool",
    };
  },
  methods: {
    setType(type) {
      this.stype = type;
    },
    saveBtnSchool() {
      // if (this.schoolBox.length > 0) {
      this.$q.sessionStorage.set("config", [...this.schoolBox, this.prePost, this.stype]);
      this.$q.sessionStorage.set("theme", this.theme);
      let routeData = this.$router.resolve({ name: "adventure-splash" });
      window.open(routeData.href), "_blank";
    },
    saveBtnOnline() {
      // if (this.onlineBox.length > 0) {
      this.$q.sessionStorage.set("config", [...this.onlineBox, this.stype]);
      this.$q.sessionStorage.set("theme", this.theme);
      let routeData = this.$router.resolve({ name: "discovery-splash" });
      window.open(routeData.href), "_blank";
    },
    saveBtnTutor() {
      // if (this.tutorBox.length > 0) {
      this.$q.sessionStorage.set("config", [...this.tutorBox, this.stype]);
      this.$q.sessionStorage.set("theme", this.theme);
      let routeData = this.$router.resolve({ name: "tutor-splash" });
      window.open(routeData.href), "_blank";
    },
    showNotif() {
      this.$q.notify({
        html: true,
        position: "top",
        message: "<div align='center' style='width:300px'>บันทึกข้อมูลเรียบร้อย</div>",
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
