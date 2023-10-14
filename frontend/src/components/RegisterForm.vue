<script setup>
import { RouterLink, RouterView} from 'vue-router'
import { ref } from 'vue'
let username = ref("");
let password = ref("");
let first_name = ref("");
let surname = ref("");
let img = ref("");
let district = ref("");
let date_of_birth = ref("");
  function register(){
    const data = {username:username.value, password:password.value, first_name:first_name.value, surname:surname.value, img:img.value, district:district.value,date_of_birth:date_of_birth.value};
    console.log(data);
    fetch("http://127.0.0.1:3000/register",{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type':'application/json',
        },
    }) 
    .then(response => response.json())
    .then(data =>{
      console.log('response from server:',data)
    })

  }
</script>
<template>
  <header>
    <div class="wrapper">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/new">New</RouterLink>
        <form>
          <label>Register</label>
          <label>Username</label>
          <input type="text" v-model="username" placeholder="username">
          <label>Password</label>
          <input type="text" v-model="password" placeholder="password">
          <label>First Name</label>
          <input type="text" v-model="first_name" placeholder="first_name">
          <label>Surname</label>
          <input type="text" v-model="surname" placeholder="surname">
          <label>Img</label>
          <input type="text" v-model="img" placeholder="img">
          <label>District</label>
          <input type="text" v-model="district" placeholder="district">
          <label>Date of Birth</label>
          <input type="text" v-model="date_of_birth" placeholder="date_of_birth">
          <input type="submit" value="Register" @click.prevent="register()">
        </form>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
</style>
