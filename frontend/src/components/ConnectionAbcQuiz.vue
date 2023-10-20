<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
//const apiUrl = "http://127.0.0.1:3000/";
let abcdata = ref('')
let alternatives = ref([''])
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)

onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function sendAnswer(input, id, answerid) {
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
        document.getElementById('btn' + answerid).style.border = '2px solid green'
        points.value++
      } else {
        console.log('answerid=', answerid)
        document.getElementById('btn' + answerid).style.border = '2px solid red'
      }
      setTimeout(function () {
        getQuestion(currentQuestion.value++)
        getQuestion(currentQuestion.value)
        document.getElementById('btn' + answerid).style.border = ''
      }, 1000)
    })
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
</script>

<template>
  <div class="grid-container">
    <div class="item1" id="question-image">
      <img src="#" />
    </div>

    <div v-if="onGoingQuiz" id="abc-quiz" class="item2">
      <p>{{ abcdata }}</p>
      <div class="selection">
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
    </div>
    <div class="item3">
      <button id="visible-from-second-question" class="one">Tillbaka</button>
    </div>
    <div class="item4">
      <button id="visible-from-first-to-second-to-last-question" class="one two">Nästa</button>
    </div>
  </div>
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
  </div>
</template>
<style scoped>
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
}

.item2 {
  justify-self: center;
}
.selection {
  text-align: center;
  width: 59.53125rem;
  height: 13.6875rem;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
}
#btn0 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 2rem;
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
.one {
  padding: 0.6rem 1.4rem;
  border-radius: 0.8rem;
  border: 5px solid #91b6d8;
  background: #fff;
  color: #214f75;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}

.two {
  padding: 0.6rem 2rem;
}
</style>
