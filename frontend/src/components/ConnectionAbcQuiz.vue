<script setup>
  import { ref } from 'vue';
  let input = ref('');
  let message = ref('');
  let id = ref('id');
  const apiUrl = "http://127.0.0.1:3000/";
  let abcdata = ref('');
  fetch(apiUrl)
  .then(response => response.text())
  .then(data => {
     
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  function saveInfo(input){
    fetch("http://127.0.0.1:3000/user", {
      method: 'POST',
      body: input,
      headers:{
        'Content-type':'text/plain',
      },
    }).then(response => response.text())
    .then(data =>{
      console.log('response from server:',data);
    })
  }
  function sendJson(input, id){
    const obj = [input,id];
    fetch("http://127.0.0.1:3000/abcanswer", {
      method: 'POST',
      body: obj,
      headers:{
        'Content-type':'text/json',
      },
    }).then(response => response.text())
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
    })
   
  }
</script>

<template>
  <div>
    <p>{{message}}</p>
    <from>
      <input v-model="input" type="text">
      <button @click="saveInfo(input)">submit</button>
      <input v-model="id" type="number">
      <button @click="sendJson(id,input)">send data</button>
      <input v-model="id" type="id">
      <button @click="getQuestion(id)">Show Question</button>
    </from>
  </div>
  <p>{{abcdata}}</p>
</template>
<style scoped>
</style> 