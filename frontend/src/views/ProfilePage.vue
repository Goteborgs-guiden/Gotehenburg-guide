<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from 'vue';
const userInfo = ref('');
const friends = ref('');
onMounted(() => {
  getInfo();
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
        userInfo.value = data;
        friends.value = userInfo.value.friends.split(',')
        console.log('friends', friends.value)
      })
    }
</script>
<template>
    <div id="profile-page">
        <div id="top-section">
            <div id="profile-img">
                <h1 id="username">{{ userInfo.username}}</h1>
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
                    <button id="edit-button">redigera</button>
                </a>
            </div>
        </div>
        <div id="quiz-friends">
            <div id="quiz-scores">
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/AbcView">
                    <img class="tram" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
                    </RouterLink></li>
                    <li class="quiz-info quiz-extra">Tjöt</li>
                    <li class="quiz-info">Personligt bästa:</li>
                    <li class="quiz-info quiz-extra">{{userInfo.ABCHS}}/5</li>
                </ul>
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/OrdvitsarQuiz">
                    <img class="tram" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
                    </RouterLink></li>
                    <li class="quiz-info quiz-extra">Ordvitsknök</li>
                    <li class="quiz-info">Personligt bästa:</li>
                    <li class="quiz-info quiz-extra">{{userInfo.BlankHS}}/5</li>
                </ul>
                <ul class="quiz">
                    <li><RouterLink class="RouterL" to="/MapQuizView">
                    <img class="tram" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
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
</div>
</template>
<style scoped>
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
