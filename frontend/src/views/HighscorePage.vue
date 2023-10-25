<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
let highscoreABC = ref([])
let highscoreBlank = ref([])
let selected = ref('abc');
onMounted(() => {
  getABCHighscore()
  getBlankHighscore()
})

function getABCHighscore() {
  fetch('http://127.0.0.1:3000/highscore/abc', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreABC.value = data

      console.log(data)
      console.log(highscoreABC.value[0].username)
      console.log('response from server:', data)
    })
}
function getBlankHighscore() {
  fetch('http://127.0.0.1:3000/highscore/blank', {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreBlank.value = data
      console.log(data)
      console.log(highscoreBlank.value[0].username)
      console.log('response from server:', data)
    })
}
</script>
<template>
  <form>
        <select v-model="selected">
          <option value="abc">ABC</option>
          <option value="fillblank">Blank highscore</option>
          <option value="map">Map highscore</option>
        </select>
      </form>
  <div class="grid-container">
    
    <div class="item1 scoreboard">
      <h1>X/X</h1>
    </div>
    <div class="item2">
      <button class="redo">Försök igen</button>
    </div>

    <div class="item3 quiz-link">
      <RouterLink class="RouterL" to="/tjot">
        <img class="tramBack" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1" />
      </RouterLink>
      <RouterLink class="RouterL" to="/ordvitsknok">
        <img class="tramBack" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2" />
      </RouterLink>
      <RouterLink class="RouterL" to="/geografikack">
        <img class="tramBack" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3" />
      </RouterLink>
    </div>
    
    <div class="item4 highscore">
      
      <table v-if ="selected==='abc'">
        <tr v-for="(highscore, index) in highscoreABC" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.ABCHS }} poäng</td>
        </tr>
      </table>
      <table v-if ="selected==='fillblank'">
        <tr v-for="(highscore, index) in highscoreBlank" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>


          <td class="user">{{ highscore.username }} med {{ highscore.BlankHS }} poäng</td>

        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.item1 {
  grid-area: score;
}
.item2 {
  grid-area: tryAgain;
}
.item3 {
  grid-area: links;
}
.item4 {
  grid-area: highs;
}
.grid-container {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 30% 10% 10% 50%;
  grid-template-areas:
    'score score highs highs highs'
    'tryAgain tryAgain highs highs highs'
    'links links highs highs highs'
    'links links highs highs highs';
  justify-items: center;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  border: 3px solid #f1f2f1;
  background: #214f75;
  box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.3);
  width: 60%;
  text-align: center;
  padding-top: 2rem;
  color: #fff;
  font-family: 'Newsreader';
  font-size: xx-large;
  margin-top: 10%;
}

.redo {
  width: 15rem;
  height: 3.0625rem;
  border-radius: 0.75rem;
  border: 3px solid #f1f2f1;
  background: #406c90;
  box-shadow: 0px 4px 4px 5px rgba(64, 108, 144, 0.5);
  color: #fff;
  font-family: 'Newsreader';
  font-size: 1.8125rem;
  margin-top: 1.5rem;
}

.tramBack {
  background: linear-gradient(180deg, #214F75 48.96%, #FFF 100%);
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
}

.img2 {
  width: 25%;
  margin-left: 5rem;
}

.highscore {
  width: 57.5rem;
  height: 55.0625rem;
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

table {
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
</style>
