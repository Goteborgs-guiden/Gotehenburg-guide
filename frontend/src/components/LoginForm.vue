<script setup>
import { ref } from 'vue'
import { useTokensStore } from '../stores/tokens'
import { useDialogStore } from '../stores/dialog'
const dialogs = useDialogStore()
const tokens = useTokensStore()
let email = ref('')
let password = ref('')
function login() {
  const data = { email: email.value, password: password.value }
  console.log(data)
  fetch('http://127.0.0.1:3000/register/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('response from server:', data)
      if (data != null) {
        dialogs.showLogin = false
      }
      tokens.setTokens(data)
      localStorage.setItem('accessToken', data.accessToken)
      console.log(tokens.expiresIn)
      localStorage.setItem('time', tokens.expiresIn)
      location.reload()
    })
}
</script>
<template>
  <div>
    <header>
      <div class="wrapper">
        <form>
          <div class="close-box">
            <label class="login">Logga in:</label>
            <img class="close" src="/symbols/navclose.svg" @click="dialogs.toggleLogin"/>
          </div>
          <label class="inputLabel">mailadress:</label>
          <input class="inputField" type="text" v-model="email" placeholder="mailadress" />
          <label class="inputLabel">lösenord:</label>
          <input class="inputField" type="password" v-model="password" placeholder="lösenord" />
          <input class="loginButton" type="submit" value="logga in" @click.prevent="login()" />
        </form>
      </div>
    </header>
  </div>
</template>
<style scoped>
.wrapper {
  width: 25em;
}

form {
  display: flex;
  flex-direction: column;
  border: 5px solid #fff;
  background: #214f75;
  font-family: 'Permanent marker';
  color: #fff;
  height: 21em;
}
.close-box {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-areas: 'none log cross';
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

.login {
  grid-area: log;
  font-size: x-large;
  padding-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  box-shadow: 0 3px 0px 0px rgba(0, 0, 0, 0.3);

  align-self: center;
  padding-top: 0.5rem;
}

label {
  padding-left: 1rem;
  font-size: large;
}
.inputLabel {
  padding-top: 1rem;
}

.inputField {
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2) inset;
  font-size: large;
  height: 2.5rem;
  font-family: 'Newsreader';
  padding-left: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

::placeholder {
  color: rgba(33, 79, 117, 0.3);
  font-family: 'Permanent marker';
}

a:hover {
  text-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.5);
}

a:active {
  transform: translateY(2px);
}

.loginButton {
  display: block;
  margin: auto;
  margin-top: 1em;
  border-radius: 0.53125rem;
  border: 2px solid #214f75;
  color: #214f75;
  background: #fff;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-family: 'Permanent marker';
  padding-bottom: 0.2em;
  height: 2em;
  width: 9rem;
  font-size: x-large;
  cursor: pointer;
}

.loginButton:hover {
  background-color: #214f75;
  color: #fff;
  border: 2px solid #ffffff;
}

.loginButton:active {
  transform: translateY(2px);
  box-shadow: none;
}
</style>
