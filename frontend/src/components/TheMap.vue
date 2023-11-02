<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let abcdata = ref('')
let alternatives = ref([''])
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let allowsubmit = true
const questionImage = ref('')
import { useHighscore } from '../stores/highscore'
const highscore = useHighscore()

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
  if (allowsubmit) {
    console.log(input)
    fetch('http://127.0.0.1:3000/quiz/locationAnswer/' + id, {
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
          console.log('answerid=', answerid)
          //document.getElementById('btn' + answerid).style.border = '2px solid green'
          points.value++
        } else {
          console.log('answerid=', answerid)
          //document.getElementById('btn' + answerid).style.border = '2px solid red'
        }
        allowsubmit = false
        setTimeout(function () {
          currentQuestion.value++
          getQuestion(currentQuestion.value)
          //document.getElementById('btn' + answerid).style.border = ''
          allowsubmit = true
        }, 1000)
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
</script>

<template>
  <div class="flexbox">
    <div v-if="onGoingQuiz" class="item1" id="questionImage">
      <img :src="questionImage" />
    </div>

    <div v-if="onGoingQuiz" id="abc-quiz" class="selection">
      <from>
        <div class="question">{{ abcdata }}</div>
        <button
          v-for="(alternative, index) in alternatives"
          :key="index"
          class="btn"
          @click="sendAnswer(alternative, currentQuestion, index)"
        >
          {{ alternative }}
        </button>
      </from>
    </div>
  </div>

  <div v-if="onGoingQuiz">
    <p v-if="correctData">Rätt svar!</p>
    <p v-if="correctData === false">FEL SVAR!</p>
  </div>
  <div v-if="currentQuestion >= 6">
    <p v-if="points > 3">Snyggt byggt, fräsig kärra!</p>
    <p v-else>Rackarns rabarber det där gick inte så bra!</p>
    <p>{{ points }} Poäng</p>
    <div v-if="setHighscore(points)"></div>
    <div v-if="highscore.setScore(points)"></div>
    <div v-if="highscore.setLastQuiz('map')"></div>
  </div>
</template>
<style scoped>
.item3 {
  grid-area: buttonOne;
}
.item4 {
  grid-area: buttonTwo;
}
.flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item1 {
  justify-self: center;
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
}

.selection {
  text-align: center;
  height: fit-content;
  width: 70%;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
  margin-bottom: 5rem;
  box-shadow: 1px 1px 4px 0px;
}
.btn {
  width: 30%;
  min-width: fit-content;
  height: 2em;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 0.5rem;
  margin-left: 5%;
  margin-bottom: 1em;
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
  width: 100%;
}
img {
  margin-top: 2em;
  margin-bottom: 1em;
  width: 50%;
  box-shadow: 1px 1px 4px 0px;
}
@media screen and (max-width: 860px) {
}
</style>
