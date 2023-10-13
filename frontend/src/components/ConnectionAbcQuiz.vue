<script setup>
  import { ref } from 'vue';
  let message = ref('');
  let id = ref('id');
  const apiUrl = "http://127.0.0.1:3000/";
  let abcdata = ref('');
  let alternatives = ref (['']);
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
    })
  }
  function getQuestion(id){

    fetch("http://127.0.0.1:3000/quiz/abcquestion/" + id, {
        method: 'GET'
    }) 
    .then(response => response.json())
    .then(data =>{
      console.log('response from server:',data)
      abcdata.value = data;
      alternatives.value = data.alternatives.split(",");
    })
   
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
    <input v-model="id" type="">
    <button @click="getQuestion(id)">Show Question</button>
    <button @click="sendJson(alternatives[0],id)">{{alternatives[0]}}</button>
    <button @click="sendJson(alternatives[1],id)">{{alternatives[1]}}</button>
    <button @click="sendJson(alternatives[2],id)">{{alternatives[2]}}</button>
    <button @click="sendJson(alternatives[3],id)">{{alternatives[3]}}</button>
  </from>
</template>
<style scoped>
</style> 