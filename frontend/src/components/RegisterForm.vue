<script setup>
import { ref } from 'vue'
import { useDialogStore } from '../stores/dialog'
const dialogs = useDialogStore()
let username = ref('')
let password = ref('')
let password2 = ref('')
let email = ref('')
const regexForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexForPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
function register() {
  if (regexForEmail.test(email.value) 
  && regexForPassword.test(password.value) 
  && regexForPassword.test(password2.value) 
  && password.value === password2.value
  && username.value.length > 0){
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
    dialogs.toggleRegister()
    alert("Registration completed successfully")
    return true;
  }else {
    alert("The email can't have any special character in it."+ "\n" +
        "The password needs a minimum of 8 characters and maximum 12 characters, " +
        "at least one uppercase letter, one lowercase letter and one number."+"\n"+
        "Both passwords must be the same \nThe username can't be empty")
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
        <div class="close-box">
          <label class="register">Registrera dig:</label>
          <img class="close" src="/symbols/navclose.svg" @click="dialogs.toggleRegister"/>
        </div>
        <label class="inputLabel">mailadress:</label>
        <input class="inputField" type="text" v-model="email" placeholder="mailadress" />
        <label class="inputLabel">användarnamn:</label>
        <input class="inputField" type="text" v-model="username" placeholder="användarnamn" />
        <label class="inputLabel">lösenord:</label>
        <input class="inputField" type="password" v-model="password" placeholder="lösenord" />
        <p class="password-info">(8-12 tecken, A-Z, minst ett specialtecken)</p>
        <label class="inputLabel">upprepa lösenord:</label>
        <input class="inputField" type="password" v-model="password2" placeholder="upprepa lösenord" />

        <div class="button-wrapper">
          <input class="button" type="submit" value="Registrera" @click.prevent="register()" />
        </div>
      </form>
    </div>
  </header>
</template>
<style scoped>
.wrapper {
  width: 28em;
}

form {
  display: flex;
  flex-direction: column;
  border: 5px solid #fff;
  background: #214f75;
  font-family: 'Permanent marker';
  color: #fff;
  height: 33.5em;
}

.close-box {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-areas: 'none reg cross';
  justify-items: center;
}

.close {
  grid-area: cross;
  height: 1.2em;
  margin-top: 0.6em;
  cursor: pointer;
}

.close:active {
  transform: translateY(2px);
  box-shadow: none;
}

.register {
  grid-area: reg;
  font-size: x-large;
  padding-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  box-shadow: 0 3px 0px 0px rgba(0, 0, 0, 0.3);
  width: 8em;
  align-self: center;
  padding-top: 0.5rem;
}

label {
  padding-left: 1rem;
  font-size: larger;
}

.inputLabel {
  padding-top: 1rem;
  margin-bottom: 0.2em;
}

.inputField {
  border-radius: 1.9em;
  border: 2px solid #214f75;
  background: #e8f3fd;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2) inset;
  font-size: large;
  height: 2.5rem;
  font-family: 'Newsreader';
  padding-left: 1em;
  margin-left: 1em;
  margin-right: 1em;
}

::placeholder {
  color: rgba(33, 79, 117, 0.3);
  font-family: 'Permanent marker';
}

.password-info {
  font-size: smaller;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0.1em;
}

.button {
  display: block;
  margin: auto;
  margin-top: 0.8em;
  border-radius: 0.53125rem;
  border: 2px solid #214f75;
  color: #214f75;
  background: #fff;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-family: 'Permanent marker';
  padding-bottom: 0.2em;
  height: 2em;
  width: 7.5em;
  font-size: x-large;
  cursor: pointer;
}

.button:hover {
  background-color: #214f75;
  color: #fff;
  border: 2px solid #ffffff;
}

.button:active {
  transform: translateY(2px);
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .wrapper {
    width: 100vw;
  }
  form {
    display: flex;
  flex-direction: column;
  border: 5px solid #fff;
  background: #214f75;
  font-family: 'Permanent marker';
  color: #fff;
  height: 33.5em;
  position: relative;
  z-index: 15;
}
}
</style>
