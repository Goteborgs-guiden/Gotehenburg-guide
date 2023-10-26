<script setup>
import { useDialogStore } from '../stores/dialog';
import { onMounted, ref } from 'vue';
const dialogs = useDialogStore()
const userInfo = ref('');
const isLoggedin = ref(false);
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
        console.log('response from server:', data)
        if(data){
          isLoggedin.value = true;
        }
        else{
          isLoggedin.value = false;
        }
      })
    }
function reload(){
  const time = Date.parse(localStorage.getItem('time'));
  const currentTime = new Date(Date.now());
  const timeLeft = time - currentTime;
  console.log("time",time)
  console.log("currentTime",currentTime);
  console.log("time left",timeLeft)
  setTimeout(function(){location.reload();}, timeLeft)
}
</script>

<template>
   <header class="mainHeader">

    <div id="headerContent">

        <RouterLink id="GBGlogo" style="text-decoration: none;" to="/">GBGuiden</RouterLink>
          <div v-if="!isLoggedin" class="ButtonsForLoggAndRegis">
                <button class="button" @click="dialogs.toggleLogin">Logga in</button>
                <button class="button" @click="dialogs.toggleRegister">Registrera dig</button>
            </div>
            <div v-else>
                <RouterLink class="RouterL" style="text-decoration: none;" to="/profile">{{userInfo.username}}</RouterLink>
                <div v-if="reload()"></div>
            </div>
        </div>
    <nav class="navbar">
    <ul>
    <li class="dropdown ">
      <a class="navitem">Quiz</a>
      <div class="dropdown-content dropdownitem">
        <li><RouterLink class="dropdownitem" to="/tjot">Tjöt</RouterLink></li>
        <li><RouterLink class="dropdownitem" to="/ordvitsknok">Ordvitsknök</RouterLink></li>
        <li><RouterLink class="dropdownitem" to="/geografikack">Geografikäck</RouterLink></li>
      </div>
    </li>
    <li><RouterLink class="navitem" to="/gbguide">GBGuide</RouterLink></li>
    <li><RouterLink class="navitem" to="/highscore">Highscore</RouterLink></li>
    <li><input id="search"  placeholder="Hitta vänner"></li>
  </ul>  
  </nav>
  </header>
</template>
<style scoped>

#GBGlogo {
margin: 0;
color: #FFF;
font-family: 'Permanent Marker', cursive;
font-size: 4rem;
font-style: normal;
font-weight: 400;
line-height: normal;
padding-left: 3rem;
}

#headerContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header{
    background-color: #214F75;
}
ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  float: right;
  padding: 0;
  height: 2.5rem;
}
li .navitem:hover, .dropdown:hover {
  background-color: #214F75;
  border-radius: .8rem;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #214F75;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: #FFF;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {background-color: #406C90;}

.dropdown:hover .dropdown-content {
  display: block;
}

.button {
background-color: #214F75;;
color: #FFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 1.2rem;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
padding: 1.5rem;
}
.navitem {
  font-family: permanent marker;
  padding-right: 1.5rem; 
  padding-left: 1.5rem;
  border-radius: .8rem;
}
.dropdownitem {
  font-family: permanent marker;
  border-radius: .8rem;
}
.navbar{
    background-color: #406C90;
    margin: 0;
    text-align: right;
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Permanent Marker;
    font-size: 1.2rem;
    display: flex;
    justify-content: end;
    align-items: center;
    height: 2.5rem;
    width: 100%;
}

#search {
border-radius: 1rem;
border: 0.2rem solid #214F75;
background: #E8F3FD;
color: #214F75;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 1.2rem;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
padding-left: 5%;
width: 90%;
height: 1.5rem;
}

::placeholder {
    color: #214F75;
}

@media screen and (max-width: 500px) {
  .navbar {
    display: none;
    margin: auto;
  }

  .ButtonsForLoggAndRegis {
    display: none;
    margin: auto;
  }

  #GBGlogo{
    font-size: 63px;
    display: flex;
  }

  header{
    margin: 0;
  }

  .ToMyPage{
    display: none;
  }
  .mainHeader{

  }
}
</style>
