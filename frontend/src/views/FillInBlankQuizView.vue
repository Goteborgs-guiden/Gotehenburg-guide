<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let question = ref('')
let answer = ref('')
let allowsubmit = ref(true)

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function getQuestion(id) {
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
    <article class="geografikack">
      <div class="img"> <a>Place the Image here!!!</a></div>
      <div class="Question">
      <p>Vilken är världens mest musikaliska fågel?
    Truten! För det är en ____{{ question }}</p>
      
      <div class="inputform">
      <input class="Input" placeholder="Svara här" v-model="answer" type="text" />
        </div>
      <div class="buttoncss">
      <button @click="sendAnswer(answer, currentQuestion)">Skicka</button>
      </div>
      </div>
      <div v-if="!allowsubmit">
        <p v-if="correctData">Rätt svar</p>
        <p v-else>Fel svar</p>
      </div>
    </article>
    <div v-if="!onGoingQuiz">
      <div v-if="setHighscore(points)"></div>
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
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

.Question {
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
p{
  display: flex;
  justify-content: center;
  font-family: 'Newsreader';
  font-size: 1.3125rem;
  width: fit-content;
  
}
.inputform {
  height: 2rem;
  display: flex;
  justify-content: center;
  width: 96.5%;
  
}
.Input {
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
  width: 10%;
  display: flex;
  justify-content: center;
  width: 20%;
}
a{
  color: black;
}
</style>
