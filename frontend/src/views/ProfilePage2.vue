<script setup>
import {RouterLink} from "vue-router";
import {onMounted, ref} from 'vue';
import {useDialogStore} from '../stores/dialog';

const dialogs = useDialogStore()
const userInfo = ref('');
const friends = ref('');
const mobile = ref()
const windowWidth = ref()
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
window.addEventListener("resize", checkScreen);
checkScreen();
function checkScreen() {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 768) {
        mobile.value = true;
        return;
      }
      mobile.value = false;
      return;
    }

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
        <div id="top-section" v-if="!mobile">
            <div id="username">{{ userInfo.username}}</div>
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
                <div id="about">
                        <div class="longinfo">Om mig:</div>
                        <p class="longanswer">{{ userInfo.about }}</p>
                </div>
                <a href="#editPage?">
                    <button @click="dialogs.toggleEdit" id="edit-button">redigera</button>
                </a>
                </div>
            </div>
        </div>
        <div id="top-section" v-if="mobile">
            <div id="username">{{ userInfo.username}}</div>
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
                <div id="profile-info">
                
                <div id="about">
                        <div class="longinfo">Om mig:</div>
                        <div class="longanswer">{{ userInfo.about }}</div>
                </div>
                <a href="#editPage?">
                    <button @click="dialogs.toggleEdit" id="edit-button">redigera</button>
                </a>
                </div>
            </div>
        <div id="quiz-friends">
            <div id="quiz-scores">
                <ul class="quiz">
                <li>
                    <RouterLink class="RouterL" to="/tjot">
                    <img class="tram" src="/trams/lefttramquiz.svg" alt="tramquiz1">
                    </RouterLink>
                </li>
                <li class="quiz-info quiz-extra">Tjöt</li>
                <li class="quiz-info">Personligt bästa:</li>
                <li class="quiz-info quiz-extra">{{ userInfo.ABCHS }}/5</li>
                </ul>
                <ul class="quiz">
                <li>
                    <RouterLink class="RouterL" to="/ordvitsknok">
                    <img class="tram" src="/trams/middletramquiz.svg" alt="tramquiz2">
                    </RouterLink>
                </li>
                <li class="quiz-info quiz-extra">Ordvitsknök</li>
                <li class="quiz-info">Personligt bästa:</li>
                <li class="quiz-info quiz-extra">{{ userInfo.BlankHS }}/5</li>
                </ul>
                <ul class="quiz">
                <li>
                    <RouterLink class="RouterL" to="/geografikack">
                    <img class="tram" src="/trams/righttramquiz.svg" alt="tramquiz3">
                    </RouterLink>
                </li>
                <li class="quiz-info quiz-extra">Geografikäck</li>
                <li class="quiz-info">Personligt bästa:</li>
                <li class="quiz-info quiz-extra">{{ userInfo.LocationHS }}/5</li>
                </ul>
            </div>
            <div class="highscore">
                
                    <div class="FriendsHigh">Vänners highscore</div>
                    <form class="chooseHighscoreBox">
                        <select class="selectForForm" v-model="selected">
                            <option class="optionForForm" value="abc">Tjöt</option>
                            <option class="optionForForm" value="fillblank">Ordvitsknök</option>
                            <option class="optionForForm" value="map">Geografikäck</option>
                        </select>
                    </form>
                <table v-if="selected === 'abc'">
                    <tr v-for="(highscore, index) in highscoreABC" :key="index">
                    <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
                    <td class="user">{{ highscore.username }} med {{ highscore.ABCHS }} poäng</td>
                    </tr>
                </table>
                <table class="HighscoreFillBlank" v-if="selected === 'fillblank'">
                    <tr v-for="(highscore, index) in highscoreBlank" :key="index">
                    <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
                    <td class="user">{{ highscore.username }} med {{ highscore.BlankHS }} poäng</td>
                    </tr>
                </table>
                <table class="HighscoreMap" v-if="selected === 'map'">
                    <tr v-for="(highscore, index) in highscoreLocation" :key="index">
                    <td :class="'position pos-' + (index + 1)">{{ index + 1 }}</td>
                    <td class="user">{{ highscore.username }} med {{ highscore.LocationHS }} poäng</td>
                    </tr>
                </table>
            </div>
           
    </div>
</template>
<style scoped>
  #profile-page {
    display: flex;
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
    #username {
    background: rgba(232, 243, 253, 0.9);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color:rgba(64, 108, 144, 0.91);
    font-family: Permanent Marker;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0.5rem;
    text-align: center;
    text-transform: uppercase;
    width: 3.5em;
    height: 3.5em;
    line-height: 3.5em;
    border-radius: 50%;
    font-size: 3em;
    border: 4px solid rgba(33, 79, 117, 0.61);
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
    align-items: center;
    padding: 0.5em;
  }
  #shorts {
    border-radius: 25px;
    border: 3px solid #406C90;
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 0.5em;
    width: 40%;
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
    width: 20%;
    height: 2rem;
  }
  .answer {
    color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    width: 50%;
  }
  .longinfo {
    color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    display: flex;
    flex-direction: row;
    width: 85%;
    height: 1rem;
    margin-top: 0.5em;
  }
  .longanswer {
    color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    width: 85%;
    margin-top: 0.5em;
    height: fit-content;
  }
  #about {
    display: flex;
    width: 50%;
    height: 10rem;
    flex-direction: column;
  }
  #edit-button {
    border-radius: 17px;
    border: 2px solid #214F75;
    background: rgba(64, 108, 144, 0.73);
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
  #edit-button:hover{
    background: #214F75;
    border-color: white;
  }
  #edit-button:active{
    transform: scale(.96);
  }
#quiz-friends{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
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
    align-items: center;
    width: 50%;
    margin: 1em 1em 2em 1em;
    height: 24em;
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
    justify-content: space-evenly;
    width: 6em;
    height: 20rem;
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
    display: flex;
    justify-content: center;
  }

  .quiz-extra {
    font-size: 1.9rem;
  }



  .highscore {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 1.5em 0.5em 1.5em 0.5em;
    margin: 1em 1em 2em 0em;
    border-radius: 0.75rem;
    border: 4px solid #214f75;
    background: rgba(232, 243, 253, 0.9);
  }


  .HighscoreFillBlank{
  }

  .HighscoreMap{
  }

  .selectForForm {
    border: 2px solid #214f75;
    border-radius: 25px;
    position: absolute;
    background: rgba(64, 108, 144, 0.73);
    color: #FFF;
    padding: 0.1em 0.1em;
    text-align: center;
    font-weight: bold;
    width: 100%;
    font-family: Newsreader;
    font-size: 20px;
    height: 2.5em;
  }

  .chooseHighscoreBox {
    position: relative;
    font-family: 'Newsreader';
    height: 3em;
    width: 50%;
    border-radius: 1.90625rem;
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

  .selectForForm:hover {
    background: #406C90;
    color: white;
    border-color: rgba(232, 243, 253, 0.9);

  }
  .FriendsHigh {
    text-align: center;
    font-family: Permanent Marker;
    color:#FFF;
    font-size: 3em;
    border-radius: 25px;
    padding: 0 0.5em 0 0.5em;
    background-color: rgba(64, 108, 144, 0.91);;
  }

  .user {
    border-radius: 17px;
    background: rgba(64, 108, 144, 0.73);
    text-align: center;
    color: #fff;
    border: 2.22rem;
    font-family: 'Newsreader';
    width: 85%;
    border: 2px solid #214f75;
    font-size: 1.5em;
  }
  .position {
    border-radius: 6px;
    border: 1px solid #000;
    background: #fff;
    text-align: center;
    color: #000;
    font-family: 'Noto Sans Osmanya';
    font-size: xx-large;
    border: 2px solid #214f75;
  }

  .pos-1 {
    background: #fff;
    color: #000;
    padding: 10px 20px;
  }

  .pos-2 {
    background: #ffcd37;
    color: #599bd6;
    padding: 10px 20px;
  }

  .pos-3 {
    background: #1a09e7;
    color: #fff;
    padding: 10px 20px;

  }

  .pos-4 {
    background: #12a621;
    color: #fff;
    padding: 10px 20px;
  }

  .pos-5 {
    background: #de0101;
    color: #fff;
    padding: 10px 20px;
  }

  .pos-6 {
    background: #dd5f04;
    color: #09068d;
    padding: 10px 20px;
  }

  .pos-7 {
    background: rgba(112, 57, 33, 0.92);
    padding: 10px 20px;
  }

  .pos-8 {
    background: #6d0370;
    color: #fff;
    padding: 10px 20px;
  }

  .pos-9 {
    background: #7cc9f4;
    color: #214f75;
    padding: 10px 20px;
  }

  .pos-10 {
    background: #7bcf8e;
    color: #177b82;
    padding: 10px 20px;
  }

  .pos-11 {
    background: #151515;
    color: #d4d3d3;
    padding: 10px 20px;
  }


 

  @media screen and (max-width: 768px) {
    #top-section {
        display: flex;
        flex-direction: column;
        height: 37em;
    }
    #shorts {
    margin: 0.5em;
    width: 80%;
    height: 2rem;
    }
    .answer{
        width: 70%;
    }
    #profile-info {
        border-radius: 25px;
    border: 4px solid#406C90;
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    margin: 0.5em;
    width: 80%;
    position: relative;
    height: 10rem;
    align-items: center;
    padding: 0;
    }
    .longinfo {
        color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    display: flex;
    flex-direction: row;
    width: 40%;
    height: 2rem;
    margin: 0.5em;
}
#about {
    display: flex;
    width: 85%;
    height: 10rem;
    flex-direction: column;
  }
  .longanswer {
    color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    width: 85%;
    margin-top: 0;
    margin-left: 0.5em;
    height: fit-content;
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
    width: 20%;
    height: 2rem;
  }
  .answer {
    color: #000;
    font-family: Newsreader;
    font-size: 20px;
    font-style: normal;
    line-height: normal;
    width: 85%;
  }
  #quiz-friends {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #quiz-scores {
    width: 80%;
  }
  .highscore {
    width: 80%;
  }
  .FriendsHigh {
    margin-bottom: 0.5em;
  }
  .chooseHighscoreBox {
    margin-bottom: 1em;
  }
  #quiz-scores {
    border: 0;
    background: none;
    box-shadow: none;
  }
}
</style>