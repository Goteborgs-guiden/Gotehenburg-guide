<script setup>
import {RouterLink} from "vue-router";
import {onMounted, ref} from 'vue';
import {useDialogStore} from '../stores/dialog';

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
      <div id="profile-info-desktop">
        <table id="shorts-desktop">
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
          <button id="edit-button">redigera</button>
        </a>
      </div>
      <div id="profile-info-mobile">

        <table id="shorts-mobile">
          <tr>
            <td class="info">Namn:</td>
            <td class="answer">{{ userInfo.first_name }} {{ userInfo.surname }}</td>
          </tr>
          <tr>
            <td class="info">Födelsedag:</td>
            <td class="answer">{{ userInfo.date_of_birth }}</td>
          </tr>
          <tr>
            <td class="info">Område:</td>
            <td class="answer">{{ userInfo.district }}</td>
          </tr>
        </table>
      </div>
      <div id="AboutMe-mobile">
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


        <div class="item4 highscore">
          <div class="FriendsBackground">
          <h1 class="FriendsHigh">Vänners highscore</h1>
          </div>
          <table class="highscoreTable" v-if="selected === 'abc'">
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
        <form class="chooseHighscoreBox">
          <select class="selectForForm" v-model="selected">
            <option class="optionForForm" value="abc">Tjöt</option>
            <option class="optionForForm" value="fillblank">Ordvitsknök</option>
            <option class="optionForForm" value="map">Geografikäck</option>
          </select>
        </form>
    </div>
  </div>
</template>
<style scoped>

@media only screen and (min-height: 500px) {

  .test{
    padding-bottom: 10em;
    margin-bottom: 10em;
  }


  .FriendsBackground{
    border: 0.3em solid #214F75;
    border-radius: 25px;
  }

  .FriendsHigh{
    width: 30em;
    margin-left: 6.5em;
    margin-top: 0.5em;
  }

  .user {
    border-radius: 17px;
    background: rgba(64, 108, 144, 0.73);
    text-align: center;
    color: #fff;
    border: 2.22rem;
    font-family: 'Newsreader';
    width: 100%;
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
    width: 40.5rem;

    padding: 2%;
    margin-top: 2rem;
    border-radius: 0.75rem;
    border: 4px solid #214f75;
    background: rgba(232, 243, 253, 0.9);
    box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.3);
  }

  .highscoreTable {
    padding-top: 5em;
  }

  .HighscoreFillBlank{
    margin-top: 5em;
  }

  .HighscoreMap{
    margin-top: 5em;
  }


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

  #profile-info-desktop {
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

  #shorts-desktop {
    border-radius: 25px;
    border: 3px solid #406C90;
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 15px;
    width: 25rem;
    height: 2rem;
  }

  #profile-info-mobile {
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    margin: 1rem;
    margin-left: 10em;
    width: 24%;
    position: relative;
    height: 10rem;
    display: none;

  }

  #AboutMe-mobile{
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
    display: none;

  }

  #shorts-mobile {
    border-radius: 25px;
    border: 3px solid #406C90;
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 15px;
    width: 25rem;
    height: 2rem;
    display: none;

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

  #edit-button:hover{
    background: #214F75;
    border-color: white;
  }

  #edit-button:active{
    transform: scale(.96);
  }

  #quiz-friends {
    display: flex;
    flex-direction: row;
    width: 100vw;
    align-items: center;
    padding-top: 0em;
    margin-left: 5.6em;
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
    margin: 1em 1em;
    margin-bottom: 65em;
    height: 30%;
    margin-right: 12em;
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
    width: 6em;
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
    margin-bottom: -0.2em;
  }

  .quiz-extra {
    font-size: 1.9rem;
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

  .selectForForm {
    border: 4px solid #214F75;
    border-radius: 25px;
    margin: -41.5em -42em;
    position: absolute;
    background: rgba(232, 243, 253, 0.9);
    padding: 0.5em 0.5em;
    text-align: center;
    font-weight: bold;
  }

  .selectForForm:hover {
    background: #406C90;
    color: white;
    border-color: rgba(232, 243, 253, 0.9);

  }

  .item4 {
    margin: -29em 1em;
    margin-bottom: 0em;
    padding-bottom: 1em;
    margin-right: 9em;
    height: 50em;
  }

}


@media only screen and (max-width: 500px) {

  .FriendsHigh{
    width: 30em;
    margin-left: 2em;
    margin-top: 0.5em;
  }

  .user {
    border-radius: 17px;
    background: rgba(64, 108, 144, 0.73);
    text-align: center;
    color: #fff;
    border: 2.22rem;
    font-family: 'Newsreader';
    width: 100%;
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
    width: 23.5em;
    padding: 2%;
    margin-top: 2rem;
    border-radius: 0.75rem;
    border: 4px solid #214f75;
    background: rgba(232, 243, 253, 0.9);
    box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.3);
  }

  .highscoreTable {
    margin-top: -0.7em;
  }

  .HighscoreFillBlank{
    margin-top: 4.3em;
  }

  .HighscoreMap{
    margin-top: 4.3em;
  }


  #profile-page {
    display: flex;
    flex-direction: column;
  }

  #top-section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0.5rem;
    width: 100%;
    height: fit-content;
  }

  #profile-img {
    border-radius: 490px;
    border: 5px solid #214F75;
    background: url(<path-to-image>), lightgray 50%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    height: 13em;
    width: 13rem;
    margin: 1em;
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

  #profile-info-desktop {
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
    display: none;

  }

  #shorts-desktop {
    border-radius: 25px;
    border: 3px solid #406C90;
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 15px;
    width: 25rem;
    height: 2rem;
    display: none;
  }

  #profile-info-mobile {
    border-radius: 25px;
    display: flex;
    flex-direction: row;
    margin: 1rem;
    width: 70%;
    position: relative;
    height: 10rem;
    display: unset;
  }

  #AboutMe-mobile{
    border-radius: 25px;
    border: 4px solid rgba(33, 79, 117, 0.61);
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    margin: 1rem;
    width: 21.85em;
    position: relative;
    height: 10rem;
    margin-right: 2.3em;
    display: unset;
  }

  #shorts-mobile {
    border-radius: 25px;
    border: 4px solid rgba(33, 79, 117, 0.61);
    background: #E8F3FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 1em -2.9em;
    width: 1em;
    height: 9em;
    padding-bottom: 9em;
    padding-left: 0.5em;
    padding-top: 0.5em;
    padding-right: 21.40em;
    display: block;

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

  #edit-button:active{
    transform: scale(.96);
  }


  #quiz-friends {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    padding-top: 1rem;
    margin-left: 0em;
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
    width: 95%;
    margin-left: 1rem;
    margin-right: 0.9em;
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
    width: 24%;
    height: 8.4em;
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
    margin: 0.2em;
    display: flex;
    justify-content: center;
  }

  .quiz-extra {
    font-size: -1.1em;
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
    width: 87%;
    margin: 1em 1em;
    height: 30%;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 20em;
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

  .selectForForm {
    border: 4px solid #214F75;
    border-radius: 22px;
    margin: -61.7em 11em;
    background: rgba(232, 243, 253, 0.9);
    text-align: center;
    font-weight: bold;

  }

  .selectForForm:hover {
    background: #406C90;
    color: white;
    border-color: rgba(232, 243, 253, 0.9);

  }

  .item4 {
    margin: -60em 1em;
    margin-bottom: 5em
  }


}


</style>
