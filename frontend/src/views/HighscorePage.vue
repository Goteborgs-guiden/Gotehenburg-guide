<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
let highscoreABC = ref([])
let highscoreBlank = ref([])
let highscoreLocation = ref([])
let selected = ref('abc')
import { useHighscore } from '../stores/highscore'
const highscore = useHighscore()
onMounted(() => {
  getABCHighscore()
  getBlankHighscore()
  getLocationHighscore()

  if (highscore.lastQuiz !== '') selected.value = highscore.lastQuiz
})

function getABCHighscore() {
  fetch('http://127.0.0.1:3000/highscore/abc', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreABC.value = data
    })
}
function getBlankHighscore() {
  fetch('http://127.0.0.1:3000/highscore/blank', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreBlank.value = data
    })
}
function getLocationHighscore() {
  fetch('http://127.0.0.1:3000/highscore/location', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreLocation.value = data
    })
}
</script>
<template>
  <div class="grid-container">
    <div class="item1">
      <form class="select">
        <select class="selectForForm" v-model="selected" id="multi-select">
          <option class="optionForForm" value="abc">Tjöt</option>
          <option class="optionForForm" value="fillblank">Ordvitsknök</option>
          <option class="optionForForm" value="map">Geografikäck</option>
        </select>
      </form>
      <div class="scoreboardBox">
        <h1 class="scores">{{ highscore.score }}/5</h1>
      </div>
      <div class="infoBox">
        <p v-if="highscore.score === 5" class="info">full poäng bra jobbat</p>
        <p v-if="highscore.score > 2 && highscore.score < 5" class="info">Starkt kämpat</p>
        <p v-if="highscore.score === 0 && highscore.lastQuiz === ''" class="info">
          Du måste göra quizen först
        </p>
        <p v-if="highscore.score <= 2 && highscore.lastQuiz !== ''" class="info">
          Det där gick ju inte så bra
        </p>
      </div>

      <div class="again" v-if="highscore.lastQuiz === 'abc'">
        <router-link to="/tjot" custom v-slot="{ navigate }">
          <button @click="navigate" role="link" class="redo">Försök igen</button>
        </router-link>
      </div>
      <div class="again" v-if="highscore.lastQuiz === 'fillblank'">
        <router-link to="/ordvitsknok" custom v-slot="{ navigate }">
          <button @click="navigate" role="link" class="redo">Försök igen</button>
        </router-link>
      </div>
      <div class="again" v-if="highscore.lastQuiz === 'map'">
        <router-link to="/geografikack" custom v-slot="{ navigate }">
          <button @click="navigate" role="link" class="redo">Försök igen</button>
        </router-link>
      </div>
    </div>

    <div class="item2 quiz-link">
      <RouterLink class="RouterL" to="/tjot">
        <img class="tramBack" src="/trams/lefttramquiz.svg" alt="tramquiz1" />
      </RouterLink>
      <RouterLink class="RouterL" to="/ordvitsknok">
        <img class="tramBack" src="/trams/middletramquiz.svg" alt="tramquiz2" />
      </RouterLink>
      <RouterLink class="RouterL" to="/geografikack">
        <img class="tramBack" src="/trams/righttramquiz.svg" alt="tramquiz3" />
      </RouterLink>
    </div>

    <div class="item3 highscore">
      <table class="highscoreTable" v-if="selected === 'abc'">
        <tr v-for="(highscore, index) in highscoreABC" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.ABCHS }} poäng</td>
        </tr>
      </table>
      <table class="highscoreTable" v-if="selected === 'fillblank'">
        <tr v-for="(highscore, index) in highscoreBlank" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.BlankHS }} poäng</td>
        </tr>
      </table>
      <table class="highscoreTable" v-if="selected === 'map'">
        <tr v-for="(highscore, index) in highscoreLocation" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.LocationHS }} poäng</td>
        </tr>
      </table>
    </div>

      <router-link class="newQuiz" to="/">
        <button class="redo">Nytt Quiz</button>
        </router-link>
    
  </div>
</template>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.item1 {
  grid-area: score;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}
.item2 {
  grid-area: links;
  padding-top: 4%;
  align-self: center;
  padding-bottom: 4%;
}
.item3 {
  grid-area: highs;
  align-self: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 40% 60%;
  grid-template-areas:
    'score highs'
    'links highs';
  justify-items: center;
  align-items: center;
}

select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  color: white;
}

select::-ms-expand {
  display: none;
}
.select {
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  width: 50%;
  max-width: 50ch;
  border-radius: 24px;
  border: 5px solid #fff;
  background-color: #214f75;
  color: #fff;
  font-family: 'Newsreader';
  height: 3em;
  cursor: pointer;
  line-height: 1.1;
  box-shadow: 0px 4px 4px 2px rgba(64, 108, 144, 0.5);
}

select,
.select:after {
  grid-area: select;
  justify-self: end;
  margin-right: 1em;
}

.select::after {
  content: '';
  width: 0.8em;
  height: 0.5em;
  background-color: white;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}

.scoreboardBox {
  width: 100%;
  max-width: 100ch;
  align-items: center;
  border-radius: 24px;
  border: 3px solid #f1f2f1;
  background: #214f75;
  box-shadow: 0px 4px 4px 3px rgba(64, 108, 144, 0.5);
  text-align: center;
  color: #fff;
  font-family: 'Newsreader';
  font-size: xx-large;
  margin-top: 3%;
}

.infoBox {
  width: 100%;
  border-radius: 0.75rem;
  border: 3px solid #f1f2f1;
  background: #214f75;
  box-shadow: 0px 4px 4px 3px rgba(64, 108, 144, 0.5);
  color: #fff;
  text-align: center;
  font-family: 'Newsreader';
  font-size: 1em;
  margin-top: 5%;
}

.redo {
  width: 100%;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 10%;
  border-radius: 0.75rem;
  border: 3px solid #f1f2f1;
  background: #406c90;
  box-shadow: 0px 4px 4px 3px rgba(64, 108, 144, 0.5);
  color: #fff;
  font-family: 'Newsreader';
  font-size: 1.8rem;
}

.redo:hover {
  background-color: #214f75;
  color: #fff;
}

.redo:active {
  transform: translateY(2px);
  box-shadow: none;
}

.tramBack {
  background: linear-gradient(180deg, #406C90 48.96%, #F2F3F2 100%);
  width: 15.65625rem;
  height: 16.5rem;
  border-radius: 2.59375rem;
  padding: 0.3rem;
  padding-top: 0.8rem;
}

img {
  width: 30%;
}

.quiz-link {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  column-gap: 4em;
  row-gap: 1em;
}

.img2 {
  width: 25%;
  margin-left: 5rem;
}

.highscore {
  width: 90%;
  padding: 2%;
  margin-top: 2rem;
  border-radius: 0.75rem;
  border: 4px solid #214f75;
  background: rgba(232, 243, 253, 0.9);
  box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.3);
}

.item4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.highscoreTable {
  width: 100%;
  border-spacing: 1.3rem;
}

td {
  height: 3.7rem;
}

.user {
  border-radius: 17px;
  background: rgba(64, 108, 144, 0.73);
  text-align: center;
  color: #fff;
  border: 2.22rem;
  font-family: 'Newsreader';
}

.position {
  border-radius: 6px;
  height: 100%;
  width: 15%;
  border: 1px solid #000;
  background: #fff;
  text-align: center;
  color: #000;
  font-family: 'Noto Sans Osmanya';
  font-size: xx-large;
}

.pos-1 {
  background: #fff;
  color: #000;
}

.pos-2 {
  background: #ffcd37;
  color: #599bd6;
}

.pos-3 {
  background: #1a09e7;
  color: #fff;
}

.pos-4 {
  background: #12a621;
  color: #fff;
}

.pos-5 {
  background: #de0101;
  color: #fff;
}

.pos-6 {
  background: #dd5f04;
  color: #09068d;
}

.pos-7 {
  background: rgba(112, 57, 33, 0.92);
}

.pos-8 {
  background: #6d0370;
  color: #fff;
}

.pos-9 {
  background: #7cc9f4;
  color: #214f75;
}

.pos-10 {
  background: #7bcf8e;
  color: #177b82;
}

.pos-11 {
  background: #151515;
  color: #d4d3d3;
}

@media screen and (max-width: 600px) {
  .grid-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 2%;
  }

  .item2 {
    display: none;
  }
  .newQuiz {
    width:50%
  }
}

@media screen and (min-width: 600px) and (max-width: 1600px) {
  .item1 {
  grid-area: score;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}
.item2 {
  grid-area: links;
  padding-top: 2%;
  align-self: center;
}
.item3 {
  grid-area: highs;
  padding-top: 10%;
  align-self: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 40% 60%;
  grid-template-areas:
    'score highs'
    'links highs';
  justify-items: center;
  align-items: center;
  margin-top: 10%;
}

  .item2 {
    display: none;
  }
  .newQuiz {
    width:50%
  }
}

@media screen and (min-width: 1601px) {
  .newQuiz {
    display: none;
  }
}
</style>
