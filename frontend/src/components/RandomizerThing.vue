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
let takenQuestions = []
import { useRouter } from 'vue-router'
const router = useRouter();
const questionImage = ref('')
const correctAnswer = ref()
const userGuess = ref('')
let color=ref('');
let answerID=ref('');
onMounted(() => {
  randomizeQuestion()
})
function randomizeQuestion() {
  randomID.value = Math.floor(Math.random() * 5) + 1
  randomQuiz.value = Math.floor(Math.random() * 3) + 1
  let questionString = `${randomID.value}-${randomQuiz.value}`

  while (takenQuestions.includes(questionString)) {
    randomID.value = Math.floor(Math.random() * 5) + 1
    randomQuiz.value = Math.floor(Math.random() * 3) + 1
    questionString = `${randomID.value}-${randomQuiz.value}`
  }
  takenQuestions.push(questionString)
  if (randomQuiz.value === 1) {
    getBlankQuestion(randomID.value)
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
        questionImage.value = data.img
        question.value = data.question
      })
  } else onGoingQuiz = false
}
function sendBlankAnswer(input, id) {
  input = input.toLowerCase()
  console.log("input",input)
  if (allowsubmit.value) {
    fetch('http://127.0.0.1:3000/quiz/fillblankanswer/' + id, {
      method: 'GET'
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('response from server:', data)
        correctAnswer.value = data
        if (input === correctAnswer.value) {
          points.value++
          correctData.value = false
          console.log('correct')
        } else {
          correctData.value = true
          console.log('wrong')
        }
        this.answer = ''
        allowsubmit.value = false
        setTimeout(function () {
          getBlankQuestion(currentQuestion.value++)
          randomizeQuestion()
          allowsubmit.value = true
        }, 1500)
      })
  }
}
function sendMapAnswer(input, id, answerid) {
  console.log('input=', input, 'id=', id, 'answerid=', answerid)
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
          color.value='red'
        }
        allowsubmit.value = false
        setTimeout(function () {
          currentQuestion.value++
          getMapQuestion(currentQuestion.value)
          randomizeQuestion()
          color.value='214f75';
          allowsubmit.value = true
        }, 2000)
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
        question.value = data.question
        alternatives.value = data.alternatives.split(',')
        questionImage.value = data.img
      })
  } else onGoingQuiz = false
}
function sendABCAnswer(input, id, answerid) {
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
          color.value='green';
          points.value++
        } else {
          console.log('answerid=', answerid)
          color.value='red';
        }
        allowsubmit.value = false
        setTimeout(function () {
          currentQuestion.value++
          getABCQuestion(currentQuestion.value)
          randomizeQuestion()
          color.value='#214f75';
          allowsubmit.value = true
        }, 2000)
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
        question.value = data.question
        alternatives.value = data.alternatives.split(',')
      })
  } else onGoingQuiz = false
}
function changePage() {
  setTimeout(function () {
    router.push("/")
  }, 1500)
}
</script>
<template>
  <main>
    <div v-if="onGoingQuiz">
      <div v-if="randomQuiz === 1">
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
                <input
                  @keydown.enter="sendBlankAnswer(answer, randomID)"
                  class="input"
                  placeholder="Svara här"
                  v-model="answer"
                  type="text"
                  @input="handleInput"
                />
              </div>
              <div class="buttoncss">
                <button @input="handleInput" @click="sendBlankAnswer(answer, randomID)">></button>
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
          <button
            v-for="(alternative, index) in alternatives"
            :key="index"
            class="btn"
            v-bind:style="index === answerID ? {'border': '0.2rem solid', color} : {'border': '0.2rem solid #214f75'}"
            :id="'btn' + index"
            @click="sendABCAnswer(alternative, randomID, index)"
          >
            {{ alternative }}
          </button>
        </div>
      </div>
      <div v-if="randomQuiz === 2">
        <img :src="questionImage"/>
        <div class="selection">
          <from>
            <div class="question">{{ question }}</div>
            <div class="selection">
              <button
                v-for="(alternative, index) in alternatives"
                :key="index"
                class="btn"
                v-bind:style="index === answerID ? {'border': '0.2rem solid', color} : {'border': '0.2rem solid #214f75'}"
                :id="'btn' + index"
                @click="sendMapAnswer(alternative, randomID, index)"
              >
                {{ alternative }}
              </button>
            </div>
          </from>
        </div>
      </div>
      <div v-if="onGoingQuiz && randomQuiz != 1">
        <div class="feedback" v-if="!allowsubmit">
          <p id="correct" v-if="correctAnswer === userGuess">RÄTT!</p>
          <p id="wrong" v-if="correctAnswer != userGuess">FEL! rätt svar: {{ correctAnswer }}</p>
        </div>
      </div>
    </div>
    <div v-if="!onGoingQuiz">
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
      {{changePage()}}
    </div>
  </main>
</template>
<style scoped>
/* the map style*/
.feedback{
  color: #000;
font-family: Newsreader;
font-size: 2rem;
font-style: normal;
font-weight: 400;
text-align: center;


}
.feedback p{
  color: black;
}
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
  margin-top: 1em;
  margin-bottom: 1em;
}

.item2 {
  justify-self: center;
}
.selection {
  text-align: center;
  width: 59.53125rem;
  height: 16.6875rem;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
  margin-bottom: 5rem;
  box-shadow: 1px 1px 4px 0px;
}
#btn0 {
  width: 23.25rem;
  height: 3.5rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  margin-top: 0.5rem;
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

.question {
  color: white;
  padding: 0.6rem 0rem 0rem 0rem;
  border-radius: 0.8rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.5rem;
}
img {
  margin-top: 2em;
  margin-bottom: 1em;
  width: 100%;
  height: 90%;
}
/* blank style*/
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
/* abc style */
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
.feedback{
  color: #000;
font-family: Newsreader;
font-size: 2rem;
font-style: normal;
font-weight: 400;
text-align: center;


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
