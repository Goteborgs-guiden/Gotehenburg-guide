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
          <div class="questionquiz1">
            <p>{{ question }}</p>
            <div class="showAnswer" v-if="!allowsubmit">
              <p id="correctAnswer" v-if="!correctData">Rätt svar</p>
              <p id="wrongAnswer" v-else>FEL! Rätt svar: {{ correctAnswer }}</p>
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
            <!--Geografikäck-->
              <div v-if="randomQuiz === 2" class="flexbox">
              <div class="item1">
                    <img id="geoimg" :src="questionImage"/>
                  </div>
                    <div class="selectionquiz2">
                      <from>
                        <div class="questionquiz2">{{ question }}</div>
                        <div v-if="onGoingQuiz && randomQuiz != 1">
                          <div class="feedbackquiz2" >
                            <p id="correct" v-if="correctAnswer === userGuess && !allowsubmit">RÄTT!</p>
                            <p id="wrong" v-if="correctAnswer != userGuess && !allowsubmit">FEL! Rätt svar: {{ correctAnswer }}</p>
                          </div>
                  </div>
                        <div class="btnContainer">
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
      <!--Geografikäck-->
        <!--Tjöt-->
          <div v-if="randomQuiz === 3">
            <div id="abc-quiz">
          <div id="questionquiz3">
          {{ question }}
         </div>
         <div v-if="onGoingQuiz && randomQuiz != 1">
        <div class="feedback" v-if="!allowsubmit">
          <p id="correct" v-if="correctAnswer === userGuess">RÄTT!</p>
          <p id="wrong" v-if="correctAnswer != userGuess">FEL! Rätt svar: {{ correctAnswer }}</p>
        </div>
      </div>
         <div id="selection">
           <button
            v-for="(alternative, index) in alternatives"
            :key="index"
            class="button"
            v-bind:style="index === answerID ? {'border': '0.2rem solid', color} : {'border': '0.2rem solid #214f75'}"
            :id="'button' + index"
            @click="sendABCAnswer(alternative, randomID, index)"
           >
            {{ alternative }}
          </button>
          </div>
          </div>
        </div>
       <!--Tjöt-->
  
      
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
#geoimg {
  margin-top: 1em;
  margin-bottom: 1em;
  width: 50%;
  box-shadow: 1px 1px 4px 0px;
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
.feedbackquiz2{
  color: #ffffff;
  font-family: 'Newsreader';
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  height:27px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
}
.feedbackquiz2 p{
  margin:0;
  color:white
}
.selectionquiz2 {
  text-align: center;
  height: fit-content;
  width: 70%;
  background-color: rgba(64, 108, 144, 0.9);
  border-radius: 0.8rem;
  margin-bottom: 5rem;
  box-shadow: 1px 1px 4px 0px;

}
.btnContainer {
  display: flex;
  flex-direction: row;
  gap: 5%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
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
  letter-spacing: 1.5px;
}
#btn0 {
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
  letter-spacing: 1.5px;
}
#btn1 {
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
  letter-spacing: 1.5px;
}
#btn2 {
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
  letter-spacing: 1.5px;
}
#btn3 {
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
  letter-spacing: 1.5px;
}

.questionquiz2 {
  color: white;
  padding: 0.6rem 0rem 0rem 0rem;
  border-radius: 0.8rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.5rem;
}
/* blank style*/
.ordvitsknok {
  display: flex;
  align-items: center;
  flex-direction: column;
}
img {
  width: 40%;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.questionquiz1 {
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
  font-family: Newsreader;
  font-size: 1.3125rem;
  padding-left: 1rem;
}
::placeholder {
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

#questionquiz3 {
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
margin-bottom: 1rem;
}
.feedback{
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
#selection {
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
}
#button0 {
  border: 0.2rem solid #214f75;
}
#button1 {
  border: 0.2rem solid #214f75;
}
#button2 {
  border: 0.2rem solid #214f75;
}
#button3 {
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
