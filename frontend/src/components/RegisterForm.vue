<script setup>
import { ref } from 'vue'
let username = ref('')
let password = ref('')
let password2 = ref('')
let email = ref('')
const regexForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexForPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,22}$/;
function register() {
  if (regexForEmail.test(email.value) && regexForPassword.test(password.value) && regexForPassword.test(password2.value) && password.value === password2.value){
  const data = {
    username: username.value,
    password: password.value,
    pass2: password2.value,
    email: email.value
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
    alert("Registration completed successfully")
    return true;
  }else {
    alert("The email can't have any special character in it."+ "\n" +
        "The password needs a minimum of 8 characters and maximum 22 characters, " +
        "at least one uppercase letter, one lowercase letter and one number."+"\n"+
        "Both passwords must be the same")
  }
}
</script>
<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
    rel="stylesheet"
  />
  <header>
    <div class="wrapper">
      <form>
        <label class="register">Registrera dig:</label>
        <label>mailadress:</label>
        <input class="input" type="text" v-model="email" placeholder="mailadress" />
        <label>användarnamn:</label>
        <input class="input" type="text" v-model="username" placeholder="användarnamn" />
        <label>lösenord:</label>
        <input class="input" type="password" v-model="password" placeholder="lösenord" />
        <label>upprepa lösenord:</label>
        <input class="input" type="password" v-model="password2" placeholder="upprepa lösenord" />
        <div class="button-wrapper">
          <input class="button" type="submit" value="Register" @click.prevent="register()" />
        </div>
      </form>
    </div>
  </header>
</template>
<style scoped>
.wrapper {
  border: 5px solid #fff;
  background: #214f75;
  width: 21.84375rem;
  height: 29.78125rem;
  text-align: left;
  padding-left: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  color: #fff;
  font-family: 'Permanent Marker';
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.register {
  color: #fff;
  font-family: 'Permanent Marker';
  font-size: 42px;
  text-decoration: underline;
}

.input {
  width: 18.375rem;
  height: 2.65625rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4) inset;
  color: rgba(33, 79, 117, 0.30);
font-family: 'Permanent Marker';
  font-size: 1.3125rem;
}

input[type='text'] {
  padding-left: 5%;
}

input[type='password'] {
  padding-left: 5%;
}
.button {
  border-radius: 0.53125rem;
  width: 50%;
  border: 2px solid #214f75;
  background: #fff;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4);
  color: #214f75;
  font-family: 'Permanent Marker';
  text-align: center;
  width: 10.34375rem;
  height: 2.3125rem;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.button-wrapper {
  text-align: center;
}
</style>
