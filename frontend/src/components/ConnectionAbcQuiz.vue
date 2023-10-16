<script setup>
  import { ref } from 'vue';
  let message = ref('');
  let id = ref(0);
  const apiUrl = "http://127.0.0.1:3000/";
  let abcdata = ref('');
  let alternatives = ref (['']);
  let correctData =  ref ('');
  

  fetch(apiUrl)
  .then(response => response.text())
  .then(data => {
     
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function sendJson(input, id){
    
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
    })
  }
  function getQuestion(id){
    if (id<4){
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
  }
</script>

<template>
<div>
   <p>{{message}}</p>
    <from>
    </from> 
  </div> 
  <p>{{abcdata}}</p>
  <from> 
    <button @click ="getQuestion(1),getQuestion(id++)">Starta quiz</button>
    <button @click="sendJson(alternatives[0],id, getQuestion(id++),getQuestion(id))">{{alternatives[0]}}</button>
    <button @click="sendJson(alternatives[1],id, getQuestion(id++),getQuestion(id))">{{alternatives[1]}}</button>
    <button @click="sendJson(alternatives[2],id, getQuestion(id++),getQuestion(id))">{{alternatives[2]}}</button>
    <button @click="sendJson(alternatives[3],id, getQuestion(id++),getQuestion(id))">{{alternatives[3]}}</button>
    
  </from>
  
  <p v-if="correctData">Rätt svar!</p>
  <p v-if="correctData === false">FEL SVAR!</p>
</template>
<style scoped>
</style> 

