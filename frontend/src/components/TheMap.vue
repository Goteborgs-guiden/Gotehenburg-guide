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


let color=ref('');
let answerID=ref('');

const correctAnswer = ref();
const userGuess = ref('');
const router = useRouter();

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
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
onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
  if (allowsubmit.value) {
    userGuess.value = input
    answerID.value = answerid
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
          color.value='green';
          points.value++
        } else {
          console.log('answerid=', answerid)
          color.value='red';
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
    <div v-if="onGoingQuiz" class="item1">
      <img :src="questionImage" />
    </div>
    <div v-if="onGoingQuiz" class="selection">
      <form>
        <div class="question">{{ abcdata }}</div>
        <div v-if="onGoingQuiz">
          <div class="feedback" >
            <p id="correct" v-if="correctAnswer === userGuess && !allowsubmit">RÄTT!</p>
            <p id="wrong" v-if="correctAnswer != userGuess && !allowsubmit">FEL! Rätt svar: {{ correctAnswer }}</p>
          </div>
        </div>
        <div class="buttonContainer">
          <button
            v-for="(alternative, index) in alternatives"
            :key="index"
            class="btn"
            v-bind:style="index === answerID ? {'border': '0.2rem solid', color} : {'border': '0.2rem solid #214f75'}"
            @click.prevent="sendAnswer(alternative, currentQuestion, index)">
            {{ alternative }}
          </button>
        </div>
      </form>
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
.feedback {
  color: #ffffff;
  font-family: 'Newsreader';
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  height:27px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
}
.feedback p{
  margin:0;
  color:white
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
  width: 43%;
  min-width: fit-content;
  height: 2.5em;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 0.5rem;
  margin-bottom: 1em;
  font-family: 'Newsreader';
  font-size: large;
  color: #214f75;
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
.buttonContainer {
  display: flex;
  flex-direction: row;
  gap: 5%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
img {
  margin-top: 1em;
  margin-bottom: 1em;
  width: 50%;
  box-shadow: 1px 1px 4px 0px;
}
@media screen and (max-width: 680px) {
  .selection {
    align-items: center;
    padding: 1em;
  }
  .btn {
    width: 100%;
  }
  img {
    width: 80%;
  }
  .feedback {
    height: fit-content;
  }
}
</style>
