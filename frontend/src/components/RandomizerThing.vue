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
let randomID = ref(Math.floor(Math.random() * 5) + 1)
let randomQuiz = ref(Math.floor(Math.random() * 3) + 1)
const questionImage = ref('')

onMounted(() => {
    randomizeQuestion();
})
function randomizeQuestion() {
  randomID.value = Math.floor(Math.random() * 5) + 1
  randomQuiz.value = Math.floor(Math.random() * 3) + 1
  if (randomQuiz.value === 1) {
    getBlankQuestion(randomID.value)
    console.log(randomQuiz)
  }
  if (randomQuiz.value === 2) {
    getMapQuestion(randomID.value)
  }
  if (randomQuiz.value === 3) {
    getABCQuestion(randomID.value)
  }
}
function getBlankQuestion(id) {
  if (currentQuestion.value <= 5) {
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
            currentQuestion.value++;
            randomizeQuestion();
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function sendMapAnswer(input, id, answerid) {
    console.log(input,"input",id,"id")
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
            currentQuestion.value++;
            randomizeQuestion();
          document.getElementById('btn' + answerid).style.border = ''
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function getMapQuestion(id) {
  if (currentQuestion.value <= 5) {
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
    console.log(input,"input",id,"id",answerid,"answerid")
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
            currentQuestion.value++;
            randomizeQuestion();
          document.getElementById('btn' + answerid).style.border = '0.2rem solid #214f75'
          allowsubmit.value = true
        }, 1000)
      })
  }
}
function getABCQuestion(id) {
  if (currentQuestion.value <= 5) {
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
                {{ question }}
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
                <button @click="sendBlankAnswer(answer, randomID)">></button>
              </div>
            </div>
          </div>
        </article>
    </div>
    <div v-if="randomQuiz === 3">
        <div id="question">
        {{ question }}
          </div>
      <div class="selection">
          <button class="btn" id="btn0" @click="sendABCAnswer(alternatives[0], randomID, 0)">
            {{ alternatives[0] }}
          </button>
          <button class="btn" id="btn1" @click="sendABCAnswer(alternatives[1], randomID, 1)">
            {{ alternatives[1] }}
          </button>
          <button class="btn" id="btn2" @click="sendABCAnswer(alternatives[2], randomID, 2)">
            {{ alternatives[2] }}
          </button>
          <button class="btn" id="btn3" @click="sendABCAnswer(alternatives[3], randomID, 3)">
            {{ alternatives[3] }}
          </button>
        
      </div>
    </div>
    <div v-if="randomQuiz === 2">
        <p>{{ question }}</p>
      <div class="selection">
        <from>
          <button id="btn0" @click="sendMapAnswer(alternatives[0], randomID, 0)">
            {{ alternatives[0] }}
          </button>
          <button id="btn1" @click="sendMapAnswer(alternatives[1], randomID, 1)">
            {{ alternatives[1] }}
          </button>
          <button id="btn2" @click="sendMapAnswer(alternatives[2], randomID, 2)">
            {{ alternatives[2] }}
          </button>
          <button id="btn3" @click="sendMapAnswer(alternatives[3], randomID, 3)">
            {{ alternatives[3] }}
          </button>
        </from>
      </div>
    </div>
    </div>
    <div v-if="!onGoingQuiz">
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
    </div>
  </main>
</template>
<style scoped>

.btn {
  width: 70%;
  height: 3.5rem;
  border-radius: 1.90625rem;
  background: #e8f3fd;
}
#btn0 {
  border: 0.2rem solid #214f75;
}
#btn1 {
  border: 0.2rem solid #214f75;
}
#btn2 {
  border: 0.2rem solid #214f75;
}
#btn3 {
  border: 0.2rem solid #214f75;
}
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
