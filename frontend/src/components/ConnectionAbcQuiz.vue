<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
//const apiUrl = "http://127.0.0.1:3000/";
let question = ref('')
let alternatives = ref([''])
let onGoingQuiz = true
let points = ref(0)

let allowsubmit = ref(true)
import { useHighscore } from '../stores/highscore'
const highscore = useHighscore()
const correctAnswer = ref()
const userGuess = ref('')
let color = ref('')
let answerID = ref('')


import { useRouter } from 'vue-router'
const router = useRouter();

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
  if (allowsubmit.value) {
    userGuess.value = input
    answerID.value = answerid
    fetch('http://127.0.0.1:3000/quiz/abcanswer/' + id, {
      method: 'GET'
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('response from server:', data)

        correctAnswer.value = data
        console.log(correctAnswer.value)
        if (input === correctAnswer.value) {
          console.log('answerid=', answerid)
          color.value = 'green'
          points.value++
        } else {
          console.log('answerid=', answerid)
          color.value = 'red'
        }
        allowsubmit.value = false
        setTimeout(function () {
          currentQuestion.value++
          getQuestion(currentQuestion.value)
          color.value='#214f75';
          allowsubmit.value = true
        }, 2000)
      })
  }
}
function getQuestion(id) {
  if (id <= 5) {
    fetch('http://127.0.0.1:3000/quiz/abcquestion/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        question.value = data.question
        alternatives.value = data.alternatives.split(',')
      })
  } else onGoingQuiz = false
}
function setHighscore(points) {
  fetch('http://127.0.0.1:3000/highscore/abc', {
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
  <div class="quiz-container">
    <div v-if="onGoingQuiz" id="abc-quiz">
      <div id="question">
        {{ question }}
      </div>
      <div v-if="onGoingQuiz" class="feedback">
      <div class="feedback" v-if="!allowsubmit">
        <p id="correct" v-if="correctAnswer === userGuess">RÄTT!</p>
        <p id="wrong" v-if="correctAnswer != userGuess">FEL! Rätt svar: {{ correctAnswer }}</p>
      </div>
    </div>
      <div class="selection">
        <button
          v-for="(alternative, index) in alternatives"
          :key="index"
          class="button"
          v-bind:style="index === answerID ? {'border': '0.2rem solid', color} : {'border': '0.2rem solid #214f75'}"
          @click="sendAnswer(alternative, currentQuestion, index)"
        >
          {{ alternative }}
        </button>
      </div>
    </div>
    <div v-if="currentQuestion >= 6">
    {{ setHighscore(points) }}
    {{ highscore.setScore(points) }}
    {{ highscore.setLastQuiz('abc') }}
    {{ router.push("/highscore") }}
    </div>
  </div>
</template>
<style scoped>
.feedback {
  color: #ffffff;
  font-family: 'Newsreader';
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  height:27px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
}
.feedback p{
  margin:0;
  color:#ffffff
}

.quiz-container {
  height: 100vh;
  width: 100vw;
}

#abc-quiz {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#question {
  border-radius: 25px;
  border: 4px solid #406c90;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 40%;
  height: 7rem;
  flex-shrink: 0;
  color: #000;
  font-family: Newsreader;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.feedback {
  color: #000;
  font-family: Newsreader;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  text-align: center;
}
.feedback p{
  margin:0;
  color:black
}
.selection {
  text-align: center;
  width: 40%;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}
.button {
  width: 70%;
  height: 3.5rem;
  border-radius: 1.90625rem;
  background: #e8f3fd;
  color: #214f75;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}
@media screen and (max-width: 768px) {
  #question {
    width: 80%;
  }
  .quiz-container {
    height: 100vh;
    width: 100%;
  }
  #abc-quiz {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .question {
    display: flex;
    flex-direction: column;
  }
  .selection {
    width: 90%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
  .button {
    width: 70%;
    margin: 0.8rem;
  }
}
</style>
