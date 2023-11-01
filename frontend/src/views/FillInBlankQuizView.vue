<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let correctData = ref(true)
let onGoingQuiz = true
let points = ref(0)
let question = ref('')
let answer = ref('')
let allowsubmit = ref(true)
let correctAnswer = ref('')


import { useHighscore } from '../stores/highscore'
const highscore = useHighscore()

const questionImage = ref('')

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function getQuestion(id) {
  console.log('ongoing', onGoingQuiz)
  if (id <= 5) {
    correctData.value = ''
    fetch('http://127.0.0.1:3000/quiz/fillblank/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        questionImage.value = data.img
        question.value = data.question
      
      })
  } else onGoingQuiz = false
}

function sendAnswer(input, id) {
  input = input.toLowerCase();
  if (allowsubmit.value) {
    fetch('http://127.0.0.1:3000/quiz/fillblankanswer/' + id, {
      method: 'GET'
    })
    .then((response) => response.text())
      .then((data) => {
        console.log('response from server:', data)
  
        if (input === correctAnswer.value) {
          points.value++
          correctData.value = false;
          console.log('correct')
        } else {
          correctData.value = true;
          console.log('wrong')
        }
        this.answer = ""
        allowsubmit.value = false
        setTimeout(function () {
          getQuestion(currentQuestion.value++)
          getQuestion(currentQuestion.value)
          allowsubmit.value = true
        }, 2000)
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
      <article class="ordvitsknok">
        <img :src="questionImage" />
        <div class="question">
          <p>{{ question }}</p>
        <div class="showAnswer" v-if="!allowsubmit">
          <p id="correctAnswer" v-if="!correctData">Rätt svar</p>
          <p id="wrongAnswer" v-else>Fel svar, rätt svar är: {{ correctAnswer }}</p>
        </div>
        <div class="hideInputAndButton" v-if="allowsubmit">
          <div class="inputform">
            <input @keydown.enter="sendAnswer(answer, currentQuestion)"  class="input" placeholder="Svara här" v-model="answer" type="text" @input="handleInput" />
          </div>
          <div class="buttoncss">
            <button @input="handleInput" @click="sendAnswer(answer, currentQuestion)">></button>
          </div>
        </div>
      </div>
      </article>
    </div>
    <div v-if="!onGoingQuiz">
      <div v-if="setHighscore(points)"></div>
      <div v-if="highscore.setScore(points)"></div>
      <div v-if="highscore.setLastQuiz('fillblank')"></div>
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
    </div>
  </main>
</template>
<style scoped>
.ordvitsknok {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}
img {
  width: 40%;
  margin-top: 1.5rem;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.question {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  width: 38.5%;
  height: fit-content;
  border-radius: 0.78125rem;
  border: 0.2rem solid #406c90;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
}
p {
  display: flex;
  justify-content: center;
  font-family: 'Newsreader';
  font-size: 2rem;
  width: fit-content;
}
#correctAnswer {
  color: #2ce03e;
}
#wrongAnswer {
  color: #f00;
}
.inputform {
  height: 2rem;
  display: flex;
  justify-content: center;
  width: 96.5%;
}
.input {
  width: 100%;
  height: 2rem;
  border-radius: 1.90625rem;
  border: 0.1rem solid #214f75;
  background: #e8f3fd;
  display: flex;
  justify-content: center;
}
::placeholder {
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.53);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}
.buttoncss {
  display: flex;
  justify-content: flex-end;
  margin: 1em;
}

button {
  padding: 0.6rem 1.4rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #91b6d8;
  background: #fff;
  color: #214f75;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
  display: flex;
  justify-content: center;
  width: 20%;
}
a {
  color: black;
}
</style>
