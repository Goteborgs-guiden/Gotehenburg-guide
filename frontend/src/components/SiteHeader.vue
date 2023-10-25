<script setup>
import { useDialogStore } from '../stores/dialog';
import { useTokensStore } from '../stores/tokens';
import { onMounted, ref } from 'vue';
const dialogs = useDialogStore()
const tokenStore = useTokensStore()
const userInfo = ref('');
onMounted(() => {
  getInfo();
})
function getInfo() {
    fetch('http://127.0.0.1:3000/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'BEARER ' + tokenStore.accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        userInfo.value = data;
        console.log('response from server:', data)
        //this log if needed for some reason otherwise it doesn't display user info
        console.log('userInfo', userInfo.value)
        console.log("a")
      })
    }
</script>

<template>
   <header class="mainHeader">

    <div id="headerContent">
        <h1>GBGuiden</h1>
            <div v-if="!tokenStore.accessToken">
                <button class="button" @click="dialogs.toggleLogin">Logga in</button>
                <button class="button" @click="dialogs.toggleRegister">Registrera dig</button>
            </div>
            <div v-else>
                <div v-if="getInfo()"></div>
                <RouterLink class="RouterL" style="text-decoration: none;" to="/profile">{{userInfo.username}}</RouterLink>
            </div>
        </div>
        <!--<p>{{ token }}</p>
        <button @click="token = useTokensStore()">update</button>-->

    <nav class="navbar">
    <RouterLink class="RouterL" style="text-decoration: none;" to="/">Quiz</RouterLink>
    <RouterLink class="RouterL" style="text-decoration: none;" to="/">Hitta i GBG</RouterLink>
    <RouterLink class="RouterL" style="text-decoration: none;" to="/">GBGuide</RouterLink>
    <RouterLink class="RouterL" style="text-decoration: none;" to="/highscore">Highscore</RouterLink>
    <input id="search" placeholder="Hitta vänner">
    </nav>
  </header>
</template>
<style scoped>

h1 {
    margin: 0;
    color: #FFF;
    font-family: 'Permanent Marker', cursive;
font-size: 70px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding-left: 50px;
}

#headerContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header{
    background-color: #214F75;
}

.button {
background-color: #214F75;;
color: #FFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
padding: 20px;
}
.navbar{
    background-color: #406C90;
    margin: 0;
    padding-top: 5px;
    padding-left:600px;
    text-align: right;
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Permanent Marker;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: space-evenly;
}

#search {
border-radius: 61px;
border: 2px solid #214F75;
background: #E8F3FD;
color: #214F75;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
padding-left: 1%;
width: 20%;
}

::placeholder {
    color: #214F75;
}
</style>
