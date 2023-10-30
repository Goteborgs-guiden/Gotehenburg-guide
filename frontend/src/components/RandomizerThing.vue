<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let question = ref('')
let answer = ref('')
let allowsubmit = ref(true)
let alternatives = ref([''])
let randomID = Math.floor(Math.random() * 5) + 1
let randomQuiz = Math.floor(Math.random() * 3) + 1
const questionImage = ref('')

onMounted(() => {
  if (currentQuestion.value === 0) getBlankQuestion(1), getBlankQuestion(currentQuestion.value++)
})
function randomizeQuestion() {
  randomID = Math.floor(Math.random() * 5) + 1
  randomQuiz = Math.floor(Math.random() * 3) + 1
  if (randomQuiz === 1) {
    getBlankQuestion(randomID)
  }
  if (randomQuiz === 2) {
    getMapQuestion(randomID)
  }
  if (randomQuiz === 3) {
    getABCQuestion(randomID)
  }
}
function getBlankQuestion(id) {
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
function sendBlankAnswer(input, id) {
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
          getBlankQuestion(currentQuestion.value++)
          getBlankQuestion(currentQuestion.value)
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function sendMapAnswer(input, id, answerid) {
  if (allowsubmit.value) {
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
          document.getElementById('btn' + answerid).style.border = '2px solid green'
          points.value++
        } else {
          console.log('answerid=', answerid)
          document.getElementById('btn' + answerid).style.border = '2px solid red'
        }
        allowsubmit.value = false
        setTimeout(function () {
          getMapQuestion(currentQuestion.value++)
          getMapQuestion(currentQuestion.value)
          document.getElementById('btn' + answerid).style.border = ''
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function getMapQuestion(id) {
  if (id <= 5) {
    correctData.value = ''
    fetch('http://127.0.0.1:3000/quiz/locationQuestion/' + id, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response from server:', data)
        questionImage.value = data.img
        question.value = data.question
        alternatives.value = data.alternatives.split(',')
      })
  } else onGoingQuiz = false
}
function sendABCAnswer(input, id, answerid) {
  if (allowsubmit.value) {
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
          console.log('answerid=', answerid)
          document.getElementById('btn' + answerid).style.border = '0.2rem solid green'
          points.value++
        } else {
          console.log('answerid=', answerid)
          document.getElementById('btn' + answerid).style.border = '0.2rem solid red'
        }
        allowsubmit.value = false
        setTimeout(function () {
          getABCQuestion(currentQuestion.value++)
          getABCQuestion(currentQuestion.value)
          document.getElementById('btn' + answerid).style.border = '0.2rem solid #214f75'
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function getABCQuestion(id) {
  if (id <= 5) {
    correctData.value = ''
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
</script>
<template>
  <main>
    <button @click="randomizeQuestion()">rando</button>
    <div v-if="onGoingQuiz">
      <div v-if="randomQuiz === 1">
        <article class="geografikack">
          <div class="img"><a>Place the Image here!!!</a></div>
          <div class="question">
            <p>
              Vilken är världens mest musikaliska fågel? Truten! För det är en ____{{ question }}
            </p>
            <div class="showAnswer" v-if="!allowsubmit">
              <p id="correctAnswer" v-if="correctData">Rätt svar</p>
              <p id="wrongAnswer" v-else>Fel svar</p>
            </div>
            <div class="hideInputAndButton" v-if="allowsubmit">
              <div class="inputform">
                <input class="input" placeholder="Svara här" v-model="answer" type="text" />
              </div>
              <div class="buttoncss">
                <button @click="sendBlankAnswer(answer, currentQuestion)">></button>
              </div>
            </div>
          </div>
        </article>
        <div v-if="!onGoingQuiz">
          <p>Quizen är slut</p>
          <p>Du fick {{ points }} poäng</p>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.geografikack {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  height: 100vh;
}
.img {
  height: 40%;
  width: 40%;
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
