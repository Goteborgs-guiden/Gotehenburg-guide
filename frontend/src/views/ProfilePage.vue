<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from 'vue';
import { useDialogStore } from '../stores/dialog';
const dialogs = useDialogStore()
const userInfo = ref('');
const friends = ref('');
const profileImage = ref('');
let highscoreABC = ref([])
let highscoreBlank = ref([])
let highscoreLocation = ref([])
let selected = ref('abc')
onMounted(() => {
  getInfo();
  getABCHighscore()
  getBlankHighscore()
  getLocationHighscore()
})

function getInfo() {
    fetch('http://127.0.0.1:3000/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
      },
    })
      .then((response) => response.json())
      .then((data) => {
        profileImage.value = data.img
        userInfo.value = data;
        friends.value = userInfo.value.friends.split(',')
        console.log('friends', friends.value)
      })
}
function getABCHighscore() {
  fetch('http://127.0.0.1:3000/highscore/friends/abc', {
    method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
      },
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreABC.value = data
    })
}
function getBlankHighscore() {
  fetch('http://127.0.0.1:3000/highscore/friends/blank', {
    method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
      },
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreBlank.value = data
    })
}
function getLocationHighscore() {
  fetch('http://127.0.0.1:3000/highscore/friends/location', {
    method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
      },
  })
    .then((response) => response.json())
    .then((data) => {
      highscoreLocation.value = data
    })
}
</script>
<template>
    <div id="profile-page">
        <div id="top-section">
            <div id="profile-img">
                <h1 id="username">{{ userInfo.username}}</h1>
                <img :src="profileImage"/>
            </div>
            <div id="profile-info">
                <table id="shorts">
                    <tr>
                        <td class="info">Namn:</td>
                        <td class="answer">{{ userInfo.first_name}} {{ userInfo.surname }}</td>
                    </tr>
                    <tr>
                        <td class="info">Födelsedag:</td>
                        <td class="answer">{{userInfo.date_of_birth}}</td>
                    </tr>
                    <tr>
                        <td class="info">Område:</td>
                        <td class="answer">{{ userInfo.district }}</td>
                    </tr>
                </table>
                <table id="about">
                    <tr class="info">
                        <td>Om mig:</td>
                    </tr>
                    <tr class="answer">
                        <td>{{ userInfo.about }}</td>
                    </tr>
                </table>
                <a href="#editPage?">
                    <button @click="dialogs.toggleEdit" id="edit-button">redigera</button>
                </a>
            </div>
        </div>
        <div id="quiz-friends">
            <div id="quiz-scores">
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/tjot">
                    <img class="tram" src="/trams/lefttramquiz.svg" alt="tramquiz1">
                    </RouterLink></li>
                    <li class="quiz-info quiz-extra">Tjöt</li>
                    <li class="quiz-info">Personligt bästa:</li>
                    <li class="quiz-info quiz-extra">{{userInfo.ABCHS}}/5</li>
                </ul>
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/ordvitsknok">
                    <img class="tram" src="/trams/middletramquiz.svg" alt="tramquiz2">
                    </RouterLink></li>
                    <li class="quiz-info quiz-extra">Ordvitsknök</li>
                    <li class="quiz-info">Personligt bästa:</li>
                    <li class="quiz-info quiz-extra">{{userInfo.BlankHS}}/5</li>
                </ul>
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/geografikack">
                    <img class="tram" src="/trams/righttramquiz.svg" alt="tramquiz3">
                    </RouterLink></li>
                    <li class="quiz-info quiz-extra">Geografi-käck</li>
                    <li class="quiz-info">Personligt bästa:</li>
                    <li class="quiz-info quiz-extra">{{userInfo.LocationHS}}/5</li>
                </ul>
            </div>
            <div id="friend-list">
                <h3 id="friends">Vänner</h3>
                <ul id="friends-list">
                    <li v-for="(friend, index) in friends" :key="index" class="friend">{{ friend }}</li>
                </ul>
            </div>
        </div>
        <form class="chooseHighscoreBox">
        <select class="selectForForm" v-model="selected">
          <option class="optionForForm" value="abc">ABC</option>
          <option class="optionForForm" value="fillblank">Blank highscore</option>
          <option class="optionForForm" value="map">Map highscore</option>
        </select>
      </form>
        <div class="item4 highscore">
            <h1>friends highscore</h1>
      <table class="highscoreTable" v-if="selected === 'abc'">
        <tr v-for="(highscore, index) in highscoreABC" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.ABCHS }} poäng</td>
        </tr>
      </table>
      <table v-if="selected === 'fillblank'">
        <tr v-for="(highscore, index) in highscoreBlank" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.BlankHS }} poäng</td>
        </tr>
      </table>
      <table v-if="selected === 'map'">
        <tr v-for="(highscore, index) in highscoreLocation" :key="index">
          <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
          <td class="user">{{ highscore.username }} med {{ highscore.LocationHS }} poäng</td>
        </tr>
      </table>
    </div>
</div>
</template>
<style scoped>
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
.chooseHighscoreBox {
  position: relative;
  font-family: 'Newsreader';
  height: 3em;
  width: 100%;
  margin-top: 5%;
  /*border-radius: 1.90625rem;
  border: 3px solid #214f75;
  background: #e8f3fd;*/
}
.chooseHighscoreBox select {
  
}

.chooseHighscoreBox-selected {
  background-color: #e8f3fd;
}

.chooseHighscoreBox-selected::after {
  position: absolute;
  content: '';
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
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
.highscoreTable {
  border-spacing: 1.3rem;
}
.item4 {
  grid-area: highs;
}
#profile-page {
    display:flex;
    flex-direction: column;
}

#top-section {
    display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin: 0.5rem;
width: 100%;
height: 15rem;
}

#profile-img {
border-radius: 490px;
border: 5px solid #214F75;
background: url(<path-to-image>), lightgray 50%;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
height: 15rem;
width: 15rem;
margin: 1rem, ;
display: flex;
align-items: end;
justify-content: center;
}

#username {
border-radius: 25px;
background: rgba(64, 108, 144, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding: 0.5rem;
}

#profile-info {
border-radius: 25px;
border: 4px solid rgba(33, 79, 117, 0.61);
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
display: flex;
flex-direction: row;
margin: 1rem;
width: 70%;
position: relative;
height: 10rem;
}

#shorts {
border-radius: 25px;
border: 3px solid #406C90;
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
margin: 15px;
width: 25rem;
height: 2rem;

}

.info {
color: #000;
font-family: Newsreader;
font-size: 20px;
font-style: normal;
line-height: normal;
display: flex;
flex-direction: row;
padding: 0.5rem;
}
.answer {
color: #000;
font-family: Newsreader;
font-size: 20px;
font-style: normal;
line-height: normal;    
}

#about {
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
}

#edit-button {
border-radius: 17px;
border: 2px solid #214F75;
background: #6E91AD;
box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.40);
color: #FFF;
font-family: Permanent Marker;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
position: absolute;
right: 1rem;
bottom: 1rem;
}
#quiz-friends {
    display: flex;
    flex-direction: row;
    width: 100vw;
    align-items: center;
   padding-top: 1rem;
}

.tram {
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.RouterL {
    display: flex;
    justify-content: center;
}
#quiz-scores {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
display: flex;
justify-content: space-around;
width: 50%;
margin-left: 1rem;
margin-right: 0.5rem;
height: 30%;
}

.quiz {
border-radius: 24px;
border: 1px solid #214F75;
background: linear-gradient(180deg, #406C90 16.92%, rgba(64, 108, 144, 0.00) 100%);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #000;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
list-style: none;
display: flex;
flex-direction: column;
width: 100%;
height: 15rem;
padding: 0.5rem;
margin: 0.5rem;
}
.quiz-info {
    color: #000;
font-family: Newsreader;
font-size: 1.3rem;
font-style: normal;
line-height: normal;
display: flex;
flex-direction: row;
margin: 0.5rem;
display: flex;
justify-content: center;
}
.quiz-extra {
    font-size:1.9rem;
}

#friends-list {
    padding: 0;
    margin: 0;
}

#friend-list {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
width: 50%;
margin-right: 1rem;
margin-left: 0.5rem;
height: 30%;
padding-left: 1rem;
padding-right: 1rem;
}

.friend {
border-radius: 17px;
background: rgba(64, 108, 144, 0.73);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
list-style: none;
margin: 1rem;
padding: 0.5rem;

}

#friends {
color: #000;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
display: flex;
justify-content: center;
margin: 0.5rem;
}

</style>
