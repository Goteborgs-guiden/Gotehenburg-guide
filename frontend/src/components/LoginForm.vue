<script setup>
import { ref } from 'vue'
import { useTokensStore } from '../stores/tokens'
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
      tokens.setTokens(data)
    })
}
</script>
<template>
  <div>
    <header>
      <div class="wrapper">
        <form>
          <label class="login">Logga in:</label>
          <label class="inputLabel">mailadress:</label>
          <input class="inputField" type="text" v-model="email" placeholder="mailadress" />
          <label class="inputLabel">lösenord:</label>
          <input class="inputField" type="password" v-model="password" placeholder="lösenord" />
          <a href="url">Glömt lösenord?</a>
          <input class="loginButton" type="submit" value="logga in" @click.prevent="login()" />
        </form>
      </div>
    </header>
  </div>
</template>
<style>
.wrapper {
  width: 23rem;
}

form {
  display: flex;
  flex-direction: column;
  border: 5px solid #fff;
  background: #214f75;
  font-family: 'Permanent marker';
  color: #fff;
  height: 20rem;
}

.login {
  font-size: x-large;
  padding-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  width: 8rem;
  align-self: center;
  padding-top: 0.5rem;
}

label {
  padding-left: 1rem;
  font-size: large;
}
.inputLabel{
    padding-top: 1rem;
}

.inputField {
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2) inset;
  font-size: large;
  height: 2.5rem;
  font-family: 'Permanent marker';
  padding-left: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

::placeholder {
  color: rgba(33, 79, 117, 0.3);
}

a {
    font-family: 'Newsreader';
    color: white;
    text-align: center;
    text-decoration: none;
    margin-top: 0;
}

.loginButton {
  display: block;
  margin: auto;
  margin-top: 1rem;
  border-radius: 0.53125rem;
  border: 2px solid #214f75;
  background: #fff;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-family: 'Permanent marker';
  height: 2.5rem;
  width: 9rem;
  font-size: larger;
}
</style>
