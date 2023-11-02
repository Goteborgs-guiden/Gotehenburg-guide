<script setup>
import { ref } from 'vue'
import { useDialogStore } from '../stores/dialog'
const dialogs = useDialogStore()
const f_name = ref('')
const l_name = ref('')
const district = ref('')
const DOB = ref('')
const about = ref('')
function edit() {
  const data = {
    first_name: f_name.value,
    surname: l_name.value,
    district: district.value,
    date_of_birth: DOB.value,
    about: about.value
  }
  console.log(data)
  fetch('http://127.0.0.1:3000/user', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('response from server:', data)
    })
    dialogs.toggleEdit()
    location.reload();
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
          <label class="register">Redigera dig:</label>
          <img class="close" src="/symbols/navclose.svg" @click="dialogs.toggleEdit"/>
        </div>
        <label class="inputLabel">förnamn:</label>
        <input class="inputField" type="text" v-model="f_name" placeholder="Förnamn" />
        <label class="inputLabel">efternamn:</label>
        <input class="inputField" type="text" v-model="l_name" placeholder="Efternamn" />
        <label class="inputLabel">stadsdel:</label>
        <input class="inputField" type="text" v-model="district" placeholder="Stadsdel" />
        <label class="inputLabel">födelsedatum:</label>
        <input class="inputField" type="date" v-model="DOB"/>
        <label class="inputLabel">Om mig:</label>
        <input class="inputField" type="text" v-model="about" placeholder="Om mig" />
        <div class="button-wrapper">
          <input class="button" type="submit" value="Registrera" @click.prevent="edit()" />
        </div>
      </form>
    </div>
  </header>
</template>
<style scoped>
.wrapper {
  width: 28em;
  left: 50%;
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
</style>
