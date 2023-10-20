<script setup>
import {RouterLink} from "vue-router";
import ImgForQuiz from "@/components/FillInBlankComponents/ImgForQuiz.vue";
import InputBar from "@/components/FillInBlankComponents/InputBar.vue";
import ButtonsForFillInBlank from "@/components/FillInBlankComponents/ButtonsForFillInBlank.vue";
import { onMounted, ref } from 'vue'
let currentQuestion = ref(0)
let correctData = ref('')
let onGoingQuiz = true
let points = ref(0)
let question = ref('')
let answer = ref('')
let allowsubmit = ref(true);
onMounted(() => {
  if (currentQuestion.value === 0) getQuestion(1), getQuestion(currentQuestion.value++)
})
function getQuestion(id) {
  if (id <= 3) {
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
  if(allowsubmit.value){
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
        console.log("correct")
      }
      else{
        console.log("wrong")
      }
      allowsubmit.value = false;
      setTimeout(function(){getQuestion(currentQuestion.value++); getQuestion(currentQuestion.value);  allowsubmit.value = true;}, 1000);
    })
  }
}
</script>
<template>
  <header class="mainHeader">
    <div>GBGuiden</div>
  </header>
  <p class="navbar">
    <RouterLink class="RouterL" to="/">Quiz</RouterLink>
    <RouterLink class="RouterL" to="/">Hitta i GBG</RouterLink>
    <RouterLink class="RouterL" to="/">GBGuide</RouterLink>
    <input placeholder="Search">
  </p>

  <main>
    <div v-if="onGoingQuiz" id="abc-quiz">
      <p>{{ question }}</p>
      <input v-model="answer" type="text">
      <button @click="sendAnswer(answer,currentQuestion)">submit</button>
      <div v-if="!allowsubmit">
        <p v-if="correctData">Rätt svar</p>
        <p v-else>Fel svar</p>
      </div>
    </div>
    <div v-else>
      <p>Quizen är slut</p>
      <p>Du fick {{ points }} poäng</p>
    </div>
    <ImgForQuiz />
    <InputBar />
    <ButtonsForFillInBlank question="{{question}}"/>
  </main>

  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>

<style scoped>
</style>