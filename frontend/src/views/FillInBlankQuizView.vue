<script setup>
import ImgForQuiz from '@/components/FillInBlankComponents/ImgForQuiz.vue'
import InputBar from '@/components/FillInBlankComponents/InputBar.vue'
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let question = ref('')
let answer = ref('')
let allowsubmit = ref(true)
import { useHighscore } from '../stores/highscore';
const highscore = useHighscore();

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function getQuestion(id) {
  console.log("ongoing", onGoingQuiz)
  if (id <= 5) {
    correctData.value = ''
    fetch('http://127.0.0.1:3000/quiz/fillblank/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        question.value = data.question
      })
  } else onGoingQuiz = false
}
function sendAnswer(input, id) {
  if (allowsubmit.value) {
    fetch('http://127.0.0.1:3000/quiz/fillblank/' + id, {
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
          points.value++
          console.log('correct')
        } else {
          console.log('wrong')
        }
        allowsubmit.value = false
        setTimeout(function () {
          getQuestion(currentQuestion.value++)
          getQuestion(currentQuestion.value)
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function setHighscore(points) {
  console.log('test')
  fetch('http://127.0.0.1:3000/highscore/blank', {
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
  return true
}
</script>
<template>
  <main>
    <div v-if="onGoingQuiz" id="abc-quiz">
      <p>{{ question }}</p>
      <input v-model="answer" type="text" />
      <button @click="sendAnswer(answer, currentQuestion)">submit</button>
      <div v-if="!allowsubmit">
        <p v-if="correctData">Rätt svar</p>
        <p v-else>Fel svar</p>
      </div>
    </div>
    <div v-if="!onGoingQuiz">
      <div v-if="setHighscore(points)"></div>
      <div v-if="highscore.setScore(points)"></div>
      <div v-if="highscore.setLastQuiz('fillblank')"></div>
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
    </div>
    <ImgForQuiz />
    <InputBar />
  </main>
</template>
<style scoped>
/*.item1 {grid-area: image;}
.item2 {grid-area: question;}
.item3 {grid-area: buttons;}

.grid-container {
display: grid;
grid-template-columns: 25% 50% 25%;
grid-template-rows: 40% 20% 20%;
grid-template-areas: 
'. image .'
'. question .'
'buttons . .';
}*/

input {
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
}

button {
  padding: 0.6rem 1.4rem;
  border-radius: 0.8rem;
  border: 5px solid #91b6d8;
  background: #fff;
  color: #214f75;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}
</style>
