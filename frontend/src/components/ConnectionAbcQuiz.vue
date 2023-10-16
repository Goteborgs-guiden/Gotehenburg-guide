<script setup>
  import { onMounted, ref } from 'vue';
  let message = ref('');
  let id = ref(0);
  //const apiUrl = "http://127.0.0.1:3000/";
  let abcdata = ref('');
  let alternatives = ref (['']);
  let correctData =  ref ('');
  let onGoingQuiz = true;
  let points = ref(0);
  
  onMounted(() => {
     if(id.value===0)  
    getQuestion(1),getQuestion(id.value++)

  })
  function sendAnswer(input, id){
    console.log(input);
    fetch("http://127.0.0.1:3000/quiz/abcanswer/" + id, {
      method: 'POST',
      body: JSON.stringify({answer:input}),
      headers:{
        'Content-type':'application/json',
      },
    }).then(response => response.json())
    .then(data =>{
      console.log('response from server:',data);
      correctData.value = data;
      if(data) {
      points.value++
    }
    })
    
  }
  function getQuestion(id){
    if (id<=3){
    correctData.value = '';
    fetch("http://127.0.0.1:3000/quiz/abcquestion/" + id, {
        method: 'GET'
    }) 
    .then(response => response.json())
    .then(data =>{
      console.log('response from server:',data)
      abcdata.value = data.question;
      alternatives.value = data.alternatives.split(",");
    })
  }
  else onGoingQuiz = false;
  }
</script>

<template>
<div>
   <p>{{message}}</p>
    <from>
    </from> 
  </div> 
  <div v-if="onGoingQuiz">
  <p>{{abcdata}}</p>
  <from> 
    <button @click="sendAnswer(alternatives[0],id, getQuestion(id++),getQuestion(id))">{{alternatives[0]}}</button>
    <button @click="sendAnswer(alternatives[1],id, getQuestion(id++),getQuestion(id))">{{alternatives[1]}}</button>
    <button @click="sendAnswer(alternatives[2],id, getQuestion(id++),getQuestion(id))">{{alternatives[2]}}</button>
    <button @click="sendAnswer(alternatives[3],id, getQuestion(id++),getQuestion(id))">{{alternatives[3]}}</button>
    
  </from>
  <p v-if="correctData">Rätt svar!</p>
  <p v-if="correctData === false">FEL SVAR!</p>
  
  </div>
<div v-if="id>=4">

  <p v-if="points >2 ">GOOD JOB!</p>
  <p v-else >NOT SO GOOD JOB!</p>
  <p>{{ points }} POINTS</p>
</div>
</template>
<style scoped>
</style> 

