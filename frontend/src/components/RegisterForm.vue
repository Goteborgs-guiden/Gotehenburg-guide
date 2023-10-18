<script setup>
import { ref } from 'vue'
let username = ref('')
let password = ref('')
let first_name = ref('')
let surname = ref('')
let img = ref('')
let district = ref('')
let date_of_birth = ref('')
function register() {
  const data = {
    username: username.value,
    password: password.value,
    first_name: first_name.value,
    surname: surname.value,
    img: img.value,
    district: district.value,
    date_of_birth: date_of_birth.value
  }
  console.log(data)
  fetch('http://127.0.0.1:3000/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('response from server:', data)
    })
}
</script>
<template>
  <header>
    <div class="wrapper">
      <form>
        <label class="register">Registrera dig:</label>
        <label>Username</label>
        <input class="input" type="text" v-model="username" placeholder="username" />
        <label>Password</label>
        <input class="input" type="password" v-model="password" placeholder="password" />
        <label>First Name</label>
        <input class="input" type="text" v-model="first_name" placeholder="first_name" />
        <label>Surname</label>
        <input class="input" type="text" v-model="surname" placeholder="surname" />
        <label>District</label>
        <input class="input" type="text" v-model="district" placeholder="district" />
        <label>Date of Birth</label>
        <input class="input" type="date" v-model="date_of_birth" placeholder="date_of_birth" />
        <input class="button" type="submit" value="Register" @click.prevent="register()" />
      </form>
    </div>
  </header>
</template>
<style scoped>
.wrapper {
  border: 5px solid #fff;
  background: #214f75;
}

form {
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: Permanent Marker;
}

.register {
  color: #fff;
  font-family: Permanent Marker;
  font-size: 42px;
  text-decoration: underline;
}

.input {
  border-radius: 61px;
  border: 2px solid #214f75;
  background: #e8f3fd;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4) inset;
  color: rgba(33, 79, 117, 0.3);
  font-family: Permanent Marker;
}

.button {
  border-radius: 17px;
  border: 2px solid #214f75;
  background: #fff;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4);
  color: #214f75;
}
</style>
