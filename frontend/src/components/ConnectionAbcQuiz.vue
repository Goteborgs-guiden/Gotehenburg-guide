<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
//const apiUrl = "http://127.0.0.1:3000/";
let abcdata = ref('')
let alternatives = ref([''])
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let allowsubmit = true;
import { useTokensStore } from '../stores/tokens';
const tokens = useTokensStore();

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
  if(allowsubmit){
  console.log(input)
  fetch('http://127.0.0.1:3000/quiz/abcanswer/' + id, {
    method: 'POST',
    body: JSON.stringify({ answer: input }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('response from server:', data)
      correctData.value = data
      if (data) {
        console.log("answerid=",answerid)
        document.getElementById('btn' + answerid).style.border = '2px solid green'
        points.value++
      }
      else{
        console.log("answerid=",answerid)
        document.getElementById('btn' + answerid).style.border = '2px solid red'
      }
      allowsubmit = false;
      setTimeout(function(){getQuestion(currentQuestion.value++); getQuestion(currentQuestion.value); document.getElementById('btn' + answerid).style.border = ''; allowsubmit=true}, 1000);
    
    })
  }
}
function getQuestion(id) {
  if (id <= 3) {
    correctData.value = ''
    fetch('http://127.0.0.1:3000/quiz/abcquestion/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        abcdata.value = data.question
        alternatives.value = data.alternatives.split(',')
      })
  } else onGoingQuiz = false
}
function setHighscore(points) {
    fetch('http://127.0.0.1:3000/highscore', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + tokens.accessToken
      },
      body: JSON.stringify({ score: points }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(tokens.accessToken)
        console.log('response from server:', data)
      })
    }
</script>

<template>
  <div id="question-image">
    <img src="#" />
  </div>

  <div v-if="onGoingQuiz" id="abc-quiz">
    <p>{{ abcdata }}</p>
    <from>
      <button id="btn0" @click="sendAnswer(alternatives[0], currentQuestion, 0)">
        {{ alternatives[0] }}
      </button>
      <button id="btn1" @click="sendAnswer(alternatives[1], currentQuestion, 1)">
        {{ alternatives[1] }}
      </button>
      <button id="btn2" @click="sendAnswer(alternatives[2], currentQuestion, 2)">
        {{ alternatives[2] }}
      </button>
      <button id="btn3" @click="sendAnswer(alternatives[3], currentQuestion, 3)">
        {{ alternatives[3] }}
      </button>
    </from>
  </div>
  <button id="visible-from-second-question">Tillbaka</button>
  <button id="visible-from-first-to-second-to-last-question">Nästa</button>
  <div>
    <from> </from>
  </div>
  <div v-if="onGoingQuiz">
    <p v-if="correctData">Rätt svar!</p>
    <p v-if="correctData === false">FEL SVAR!</p>
  </div>
  <div v-if="currentQuestion >= 4">
    <p v-if="points > 2">Snyggt byggt, fräsig kärra!</p>
    <p v-else>Rackarns rabarber det där gick inte så bra!</p>
    <p>{{ points }} Poäng</p>
    <div v-if="setHighscore(points)">

    </div>
  </div>
</template>
<style scoped>
#btn0 {
  border: 2px solid none;
}
#btn1 {
  border: 2px solid none;
}
#btn2 {
  border: 2px solid none;
}
#btn3 {
  border: 2px solid none;
}
</style>
