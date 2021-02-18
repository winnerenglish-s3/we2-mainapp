<template>
  <div style="height: 100vh" class="">
    <div class="row">
      <div class="col-6 brx">
        <div class="row">
          <div class="col-12 brx">
            <draggable
              v-model="list"
              :group="{ name: 'vocab', pull: true, put: list.length == 1 ? false : true }"
              style="width: 100%; min-height: 100px"
              class="relative-position"
            >
              <div v-for="element in list" :key="element.id">
                <q-btn style="width: 100px; height: 100px">
                  {{ element.name }}
                </q-btn>
              </div>
            </draggable>
          </div>

          <div class="col-12 brx">
            <draggable
              class=""
              style="width: 100px; min-height: 100px"
              v-model="list2"
              :group="{ name: 'vocab', pull: true, put: list2.length == 1 ? false : true }"
              :move="onMove"
            >
              <div v-for="element in list2" :key="element.id">
                <q-btn style="width: 100px; height: 100px">
                  {{ element.name }}
                </q-btn>
              </div>
            </draggable>
          </div>

          <div class="col-12 brx">
            <draggable
              class=""
              style="width: 100%; min-height: 100px"
              v-model="list3"
              :group="{ name: 'vocab', pull: true, put: list3.length == 1 ? false : true }"
              :move="onMove"
            >
              <div v-for="element in list3" :key="element.id">
                <q-btn style="width: 100px; height: 100px">
                  {{ element.name }}
                </q-btn>
              </div>
            </draggable>
          </div>
          
        </div>
      </div>
      <!-- right -->
      <div class="col-6 brx">
        <div class="row">
          <div class="col-12">
            <div class="row brx">
              <div class="col-6">
                <draggable
                  class=""
                  style="width: 100%; min-height: 100px"
                  :group="{ name: 'vocab', pull: true, put: list4.length == 1 ? false : true }"
                  v-model="list4"
                  :move="onMove"
                >
                  <div class="">
                    <div v-for="element in list4" :key="element.id">
                      <q-btn style="width: 100px; height: 100px" class="">
                        {{ element.name }}
                      </q-btn>
                    </div>
                  </div>
                </draggable>
              </div>
              <div class="col-6 text-h5 self-center">ปลา</div>
            </div>
          </div>

          <div class="col-12">
            <div class="row brx">
              <div class="col-6">
                <draggable
                  class=""
                  style="width: 100px; min-height: 100px"
                  v-model="list5"
                  :group="{ name: 'vocab', pull: true, put: list5.length == 1 ? false : true }"
                  :move="onMove"
                >
                  <div class="">
                    <div v-for="element in list5" :key="element.id">
                      <q-btn style="width: 100px; height: 100px" class="">
                        {{ element.name }}
                      </q-btn>
                    </div>
                  </div>
                </draggable>
              </div>
              <div class="col-6 text-h5 self-center">สุนัข</div>
            </div>
          </div>

          <div class="col-12">
            <div class="row brx">
              <div class="col-6">
                <draggable
                  class=""
                  style="width: 100px; min-height: 100px"
                  v-model="list6"
                  :group="{ name: 'vocab', pull: true, put: list6.length == 1 ? false : true }"
                  :move="onMove"
                >
                  <div class="">
                    <div v-for="element in list6" :key="element.id">
                      <q-btn style="width: 100px; height: 100px" class="">
                        {{ element.name }}
                      </q-btn>
                    </div>
                  </div>
                </draggable>
              </div>
              <div class="col-6 text-h5 self-center">แมว</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      list: [{ name: "Cat", id: 1 }],
      list2: [{ name: "Fish", id: 1 }],
      list3: [{ name: "Dog", id: 1 }],
      list4: [],
      list5: [],
      list6: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  methods: {
    testAtEnd() {
      //   this.isDragging = true;
    },
    testRemove() {
      console.log("removed");
    },
    testUpdate() {
      console.log("updated");
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return !relatedElement || !relatedElement.fixed;
    },
  },
  computed: {
    dragOptions() {

      let options = {
        animation: 0,
        group: "description",
        ghostClass: "ghost",
      };

      if(this.list4.length == 1){
        options.group = "x"

        return options
      }

      return  options
    },
  },
 
};
</script>

<style lang="scss" scoped>
.drop-target {
  height: 400px;
  width: 100px;
  min-width: 100px;
  background-color: gainsboro;
}

.drag-enter {
  outline-style: dashed;
}

.box {
  width: 100px;
  height: 100px;
  float: left;
  cursor: pointer;
}

.navy {
  background-color: navy;
}

.red {
  background-color: firebrick;
}

.green {
  background-color: darkgreen;
}

.orange {
  background-color: orange;
}
.box:nth-child(3) {
  clear: both;
}
.box {
  width: 50px;
  height: 50px;
  border: 1px solid;
}
</style>
