<script setup>
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
//const apiUrl = "http://127.0.0.1:3000/";
let question = ref('')
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
        console.log('answerid=', answerid)
        document.getElementById('btn' + answerid).style.border = '0.2rem solid green'
        points.value++
      } else {
        console.log('answerid=', answerid)
        document.getElementById('btn' + answerid).style.border = '0.2rem solid red'
      }
      allowsubmit = false;
      setTimeout(function(){getQuestion(currentQuestion.value++); getQuestion(currentQuestion.value); document.getElementById('btn' + answerid).style.border = '0.2rem solid #214f75'; allowsubmit=true}, 1000);
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
  <div class="quiz-container">
    <div v-if="onGoingQuiz" id="abc-quiz">
      <div id="question">
        {{ question }}
          </div>
      <div class="selection">
          <button class="btn" id="btn0" @click="sendAnswer(alternatives[0], currentQuestion, 0)">
            {{ alternatives[0] }}
          </button>
          <button class="btn" id="btn1" @click="sendAnswer(alternatives[1], currentQuestion, 1)">
            {{ alternatives[1] }}
          </button>
          <button class="btn" id="btn2" @click="sendAnswer(alternatives[2], currentQuestion, 2)">
            {{ alternatives[2] }}
          </button>
          <button class="btn" id="btn3" @click="sendAnswer(alternatives[3], currentQuestion, 3)">
            {{ alternatives[3] }}
          </button>
        
      </div>
    </div>
   
  <div>
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
  </div>
</template>
<style scoped>

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
border: 4px solid #406C90;
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
margin-bottom: 2rem;
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
  .btn {
    width: 70%;
    margin: 0.8rem;
  }
 
}
</style>
