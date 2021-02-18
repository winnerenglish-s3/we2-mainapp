<template>
  <div class="relative-position row justify-center bg-content-answer">
    <div class="absolute full-width">
      <header-bar
        :totalQuestion="totalQuestion"
        :currentQuestion="currentQuestion"
      ></header-bar>
    </div>
    <div class="col-12 self-start bg-sky">
      <theme-animation
        :isCorrectAnswer="isCorrectAnswer"
        :isSendAnswer="isSendAnswer"
        :themeSync="themeSync"
        style="margin-bottom: -5px; z-index: 3"
      ></theme-animation>
    </div>
    <div class="col-12 q-px-md row justify-center" style="max-width:1200px;width:100%;z-index: 1" v-for="i in 3" v-if="dataAnswerList.length">
      <div class="col-3 q-py-xs self-center " >
        <draggable
          v-model="choiceList[i - 1]"
          :group="{ name: 'vocab', pull: isSendAnswer ? false : true, put: choiceList[i - 1].length == 1 ? false : true }"
          style="width: 100%;height:100px;"
          class="relative-position "
          :class="!isSendAnswer ? isDrop && !choiceList[i-1].length ? 'box-move' : choiceList[i-1].length ? '' : 'box-selected' : 'box-selected no-pointer-events'"
          @start="isDrop = true"
          @end="isDrop = false"
        >
          <div class="relative-position cursor-pointer" v-for="(data,index) in choiceList[i-1]" :key="index">
            <div class="relative-position" :class="!isSendAnswer ? isDrop && !choiceList[i-1].length ? 'box-move' : choiceList[i-1].length ? 'box-content-answer answer-default' : 'box-selected' : 'box-selected no-pointer-events'" style="width: 100%;height:100px;" no-caps>
              <div class="absolute-center f18 full-width" align='center'>
                 <span class=""> {{ data.vocab }}</span>
              </div>
            
            </div>
          </div>
        </draggable>
      </div>
      <div class="col-1 "></div>
      <div class="col-3 q-py-xs self-center">
        <draggable
          v-model="answerList[i - 1]"
          :group="{ name: 'vocab', pull: isSendAnswer ? false : true, put: answerList[i - 1].length == 1 ? false : true }"
          style="width: 100%;height:100px;"
          class="relative-position"
          :class="!isSendAnswer ? isDrop && !answerList[i-1].length ? 'box-move' : answerList[i-1].length ? '' : 'box-selected' : isCorrectAnswer ? ' answer-correct no-pointer-events' : ' answer-incorrect no-pointer-events'" 
          @start="isDrop = true"
          @end="isDrop = false"
        >
          <div class="relative-position cursor-pointer" v-for="(data,index) in answerList[i-1]" :key="index">
           
           <div :class="!isSendAnswer ? isDrop && !answerList[i-1].length ? 'box-move' : answerList[i-1].length ? 'box-content-answer answer-default' : 'box-selected' : showQuestionList[i-1][index].vocab == data.vocab ? 'box-content-answer answer-correct no-pointer-events' : 'box-content-answer answer-incorrect no-pointer-events'"  style="width: 100%;height:100px;" no-caps>
              <q-icon v-if="isSendAnswer" size="20px" :name="showQuestionList[i-1][index].vocab == data.vocab ? 'far fa-check-circle' : 'far fa-times-circle'" class="text-white absolute-bottom-right" style="bottom:5px;right:15px"></q-icon>
               <div class="absolute-center f18 full-width" align='center' style="width:90%;">
                  <div class="q-pb-xs">
                    <span > {{ data.vocab }}</span>
                  </div>
                  <div v-if="isSendAnswer && showQuestionList[i-1][index].vocab != data.vocab">
                      <div class="q-py-xs">
                        <span>คำตอบที่ถูกต้องคือ</span>
                      </div>
                      <div class="q-pb-xs">
                        <span class='text-white'>{{showQuestionList[i-1][index].vocab}}</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col-5 self-center">
        <q-btn v-for="(data,index) in showQuestionList[i-1]" :key="index" class=" no-pointer-events box-question" style="width: 100%; height: 100px;margin-left:-3px;" no-caps>
          <span class="f20">
            {{data.meaning}}
          </span>
        </q-btn>
      </div>
    </div>

    <div class="col-12 self-center q-py-md" align="center" v-if="dataAnswerList.length">
      <q-img
        v-show="!isSendAnswer"
        @click="checkAnswerList ? sendAnswer() : null"
        :class="checkAnswerList ? 'cursor-pointer' : null"
        width="200px"
        :src="
          require(`../../../public/images/matching/btn-matching-${checkAnswerList ? '' : 'not'}active.png`)
        "
      ></q-img>

      <q-img
        v-show="isSendAnswer && !isFinishPractice"
        @click="nextQuestion()"
        class="cursor-pointer"
        width="200px"
        src="../../../public/images/next-question-btn.png"
      ></q-img>

      <q-img
        v-show="isSendAnswer && isFinishPractice"
        class="cursor-pointer"
        width="200px"
        @click="funcFinishPractice()"
        src="../../../public/images/finish-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import themeAnimation from "../matching/theme-animation";
import headerBar from "../header-time-progress";
import { ref, reactive, onMounted, computed } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
    questionList: {
      type: Array,
      default: () => [],
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {

    const currentQuestion = ref(0);
    const dataAnswerList = ref([]);
    const dataQuestionList = ref([]);
    const isDrop = ref(false);
    const showQuestionList = ref([]);
    const isCorrectAnswer = ref(false);
    const isSendAnswer = ref(false);
    const isFinishPractice = ref(false);

    const choiceList = ref([]);

    const answerList = ref([
      [],
      [],
      [],
    ])
  
    const loadData = () => {
      let setData = props.questionList;

      setData = setData.map((x) => x);

      let tempAnswer = [];
      let tempQuestion = [];

      // แปลงโจทย์คำตอบให้เป็น อย่างละ 3 Choices
      for (let i = 0; i < props.questionList.length; i++) {
        let currentAnswer = props.questionList[i];
        let randomAnswer = [...setData];

        randomAnswer = randomAnswer.sort(() => Math.random() - 0.5);

        let findIndexCurrentAnswer = randomAnswer
          .map((x) => x.vocab)
          .indexOf(currentAnswer.vocab);

        randomAnswer.splice(findIndexCurrentAnswer, 1);

        randomAnswer = randomAnswer.slice(0, 2);

        let setNewAnswer = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        let setNewQuestion = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        for (let i = 0; i < randomAnswer.length; i++) {
          let newData = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          let setQuestion = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          setNewAnswer.push(newData);

          setNewQuestion.push(setQuestion);
        }

        setNewQuestion = setNewQuestion.sort(() => Math.random() - 0.5);

        tempAnswer.push(setNewAnswer);
        tempQuestion.push(setNewQuestion);
      }

      dataAnswerList.value = [...tempAnswer];
      dataQuestionList.value = [...tempQuestion];

      funcRandom();
    };

    const funcRandom = () => {
      dataAnswerList.value[currentQuestion.value].sort(() => Math.random() - 0.5);

      let setAnswer = [...dataAnswerList.value[currentQuestion.value]];

      let setQuestion = [...dataQuestionList.value[currentQuestion.value]];

      let tempBoolean = [];
      let setTempArray = []
      let setTempQuestion = []

      for (let i = 0; i < setAnswer.length; i++) {
        if (setAnswer[i].vocab == setQuestion[i].vocab) {
          tempBoolean.push(true);
        } else {
          tempBoolean.push(false);
        }
        setTempArray.push([setAnswer[i]])
        setTempQuestion.push([setQuestion[i]])
      }


      if (tempBoolean.every((x) => x)) {
        funcRandom();
      }

      choiceList.value = setTempArray
      showQuestionList.value = setTempQuestion
    };

    // Check AnswerList 
    const checkAnswerList = computed(() => {

      let answerAll = answerList.value.map(x => x.length ? true : false).every(x => x)

      if(answerAll){
        return true
      }

      return false

    })

    const sendAnswer = () => {

      isSendAnswer.value = true;

      let checkAnswerCorrrect = showQuestionList.value.map(x => x[0].vocab).every((x,index) => x == answerList.value[index][0].vocab)

      if(checkAnswerCorrrect){
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      if(currentQuestion.value + 1 ==  props.totalQuestion){

        isFinishPractice.value = true
      }
      
    };


    // Func Next Question
    const nextQuestion = () => {
      currentQuestion.value++;

      answerList.value = [
      [],
      [],
      [],
    ]

      funcRandom();

      
      isSendAnswer.value = false;
    };

    // Func Finish Practice
    const funcFinishPractice = () => {
      emit("finishPractice", true);
    };

    onMounted(() => {
      loadData();
    });

    return {
      choiceList,
      answerList,
      showQuestionList,
      isDrop,
      checkAnswerList,

      // practice data
      currentQuestion,
      dataAnswerList,
      dataQuestionList,
      isCorrectAnswer,
      isFinishPractice,
      isSendAnswer,
      funcFinishPractice,

      // Send Answer
      sendAnswer,

      // Next Question
      nextQuestion,
    };
  },
  components: {
    headerBar,
    themeAnimation,
    draggable: VueDraggableNext,
  },
};
</script>

<style lang="scss" scoped>
.bg-sky {
  background-image: url("../../../public/images/matching/bg-sky.png");
  background-size: cover;
  background-position: top;
}

.bg-content-answer {
  background-image: url("../../../public/images/matching/bg-content-matching.png");
  background-size: contain;
  width: 100%;
}

.box-selected{
  position: relative;
  border:3px dashed #000;
  overflow: hidden;
  box-sizing: border-box;
}

.box-move{
  position: relative;
  background-color:#5DDDFF;
  opacity: .5;
  border:3px dashed #000;
}

.box-content-answer{
 position: relative;
 border: 3px solid #512A08;
 overflow: hidden;
 box-sizing: border-box;
}

.span-circle{
  width:50px;
  height:50px;
  border-radius: 50%;
  background-color: #FFE6A2;
  z-index:2;
}

.box-question{
  position: relative;
  background-color: #FFE6A2;
  border: 3px solid #512A08;
  border-left-style: dashed;
  box-sizing: border-box;
}

.box-question::before{
  content:"";
  width:50px;
  height:50px;
  left:-25px;
  top:50%;
  transform: translate(0%,-50%) rotate(45deg);
  background-color:#FFE6A2;
  border:3px dashed;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  z-index: 0;
  box-shadow: 0px 0px transparent;
}

.answer-default{
  background: linear-gradient(180deg, #FFD362 0%, #FFB701 100%);
}

.answer-correct{
  background-color: #4CAF50;
}

.answer-incorrect{
  background-color: #FF5D5D;
}
</style>
