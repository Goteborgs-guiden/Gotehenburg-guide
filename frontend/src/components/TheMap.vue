<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let abcdata = ref('')
let alternatives = ref([''])
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let allowsubmit = ref(true)
const questionImage = ref('')
import { useHighscore } from '../stores/highscore'
import { useRouter } from 'vue-router'
const highscore = useHighscore()
const correctAnswer = ref();
const userGuess = ref('');
const router = useRouter();

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
  userGuess.value = input
  if(allowsubmit.value){
  fetch('http://127.0.0.1:3000/quiz/locationAnswer/' + id, {
    method: 'GET'
  })
    .then((response) => response.text())
    .then((data) => {
      console.log('response from server:', data)
      
      correctAnswer.value = data 
      console.log(correctAnswer.value)
      if (input === correctAnswer.value) {
        console.log('answerid=', answerid)
        document.getElementById('btn' + answerid).style.border = '0.2rem solid green'
        points.value++
      } else {
        console.log('answerid=', answerid)
        document.getElementById('btn' + answerid).style.border = '0.2rem solid red'
        
      }
      allowsubmit.value = false;
      setTimeout(function(){getQuestion(currentQuestion.value++); getQuestion(currentQuestion.value); document.getElementById('btn' + answerid).style.border = '0.2rem solid #214f75'; allowsubmit.value=true}, 2000);
    })
  }
}
function getQuestion(id) {
  if (id <= 5) {
    correctData.value = ''
    fetch('http://127.0.0.1:3000/quiz/locationQuestion/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        questionImage.value = data.img
        abcdata.value = data.question
        alternatives.value = data.alternatives.split(',')
      })
  } else onGoingQuiz = false
}
function setHighscore(points) {
  fetch('http://127.0.0.1:3000/highscore/location', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'BEARER ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({ score: points })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('response from server:', data)
    })
}
function navTest(){
  router.push("/highscore")
}
</script>

<template>
  <button @click="navTest()">navtest</button>
  <div class="grid-container">
    <div v-if="onGoingQuiz" class="item1" id="questionImage">
      <img :src="questionImage" />
    </div>

    <div v-if="onGoingQuiz" id="abc-quiz" class="item2">
      <div class="selection">
        <from>
          <div class="question">{{ abcdata }}</div>
          <div class="selection">
            <button
              v-for="(alternative, index) in alternatives"
              :key="index"
              class="btn"
              :id="'btn' + index"
              @click="sendAnswer(alternative, currentQuestion, index)"
            >
              {{ alternative }}
            </button>
          </div>
        </from>
      </div>
    </div>
  </div>
  <div>
    <from> </from>
  </div>
  <div v-if="onGoingQuiz">
    <div class="feedback" v-if="!allowsubmit">
      <p id="correct" v-if="correctAnswer === userGuess">RÄTT!</p>
      <p id="wrong" v-if="correctAnswer != userGuess">FEL! rätt svar:  {{ correctAnswer }}</p>
    </div>
  </div>
  <div v-if="currentQuestion >= 6">
    {{setHighscore(points)}}
    {{highscore.setScore(points)}}
    {{highscore.setLastQuiz('map')}}
    {{router.push("/highscore")}}
  </div>
</template>
<style scoped>
.feedback{
  color: #000;
font-family: Newsreader;
font-size: 2rem;
font-style: normal;
font-weight: 400;
text-align: center;


}
.feedback #correct {
  color:#2ce03e
}
.feedback #wrong {
  color: #f00;
}
.item1 {
  grid-area: image;
}
.item2 {
  grid-area: choices;
}
.item3 {
  grid-area: buttonOne;
}
.item4 {
  grid-area: buttonTwo;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  grid-template-rows: 1fr 1fr 20%;
  grid-template-areas:
    '. image .'
    '. choices .'
    'buttonOne . buttonTwo';
}

.item1 {
  justify-self: center;
  margin-top: 1em;
  margin-bottom: 1em;
}

.item2 {
  justify-self: center;
}
.selection {
  text-align: center;
  width: 59.53125rem;
  height: 16.6875rem;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
  margin-bottom: 5rem;
  box-shadow: 1px 1px 4px 0px;
}
#btn0 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 0.5rem;
  margin-right: 5.5rem;
}
#btn1 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
}
#btn2 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 2.5rem;
  margin-right: 5.5rem;
}
#btn3 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
}

.item3 {
  justify-self: center;
}
.item4 {
  justify-self: center;
}

.question {
  color: white;
  padding: 0.6rem 0rem 0rem 0rem;
  border-radius: 0.8rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.5rem;
}
img {
  margin-top: 2em;
  margin-bottom: 1em;
  width: 100%;
  height: 90%;
}
</style>
