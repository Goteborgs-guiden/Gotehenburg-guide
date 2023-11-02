<script setup>
import { useDialogStore } from '../stores/dialog'
import { onMounted, ref } from 'vue'

const scrollPosition = ref()
const mobile = ref()
const mobileNav = ref()
const windowWidth = ref()
const dialogs = useDialogStore()
const userInfo = ref('');
const friend = ref('');
onMounted(() => {
  getInfo()
})
window.addEventListener('resize', checkScreen)
checkScreen()
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
      })
    }
    function toggleMobileNav(){
      mobileNav.value = !mobileNav.value;
    }
  })
    .then((response) => response.json())
    .then((data) => {
      userInfo.value = data
      console.log('response from server:', data)
      if (data) {
        isLoggedin.value = true
      } else {
        isLoggedin.value = false
      }
    })
}
function toggleMobileNav() {
  mobileNav.value = !mobileNav.value
}
function checkScreen() {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 768) {
    mobile.value = true
    return
  }
  mobile.value = false
  mobileNav.value = false
  return
}
function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('time')
  location.reload()
}
function addfriend(){
  console.log("friend",friend.value)
  fetch('http://127.0.0.1:3000/user/friend', {
    method: 'POST',
    body: JSON.stringify({friend:friend.value}),
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'BEARER ' + localStorage.getItem('accessToken')
    }
  })
    .then((response) => {
    if (response.status === 200) {
        alert('Friend added')
      }
      else{
        alert('Friend not added')
      }})
    .then((data) => {
      console.log('response from server:', data)
    })
    friend.value = '';
}
function isLoggedIn(){
  if(localStorage.getItem('accessToken')){
    return true;
  }
  else{
    return false;
  }
}
</script>

<template>
  <header :class="{ 'scrolled-nav': scrollPosition }">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="headerContent">
      <RouterLink id="GBGlogo" to="/">GBGuiden</RouterLink>
          <div v-if="!isLoggedIn() && !mobile">
                <button class="button" @click="dialogs.toggleLogin">Logga in</button>
                <button class="button" @click="dialogs.toggleRegister">Registrera dig</button>
            </div>
            <div class="whenLoggedIn" v-if="isLoggedIn()">
                <RouterLink class="navitem" style="text-decoration: none;" to="/profile"><p class="user">{{userInfo.username}}</p></RouterLink>
                <button class="button" @click="logout()">Logga ut</button>
    
            </div>
        </div>
    <nav class="navbar">
      <ul v-show="!mobile" class="navigation">
      <li class="dropdown">
      <a v-show="!mobile" class="navitem">Quiz</a>
      <div v-show="mobile">
        <RouterLink class="dropdownitem" to="/tjot">Tjöt</RouterLink>
        <RouterLink class="dropdownitem" to="/ordvitsknok">Ordvitsknök</RouterLink>
        <RouterLink class="dropdownitem" to="/geografikack">Geografikäck</RouterLink>
      </div>
      <div v-else>
        <RouterLink class="navitem" style="text-decoration: none" to="/profile">{{
          userInfo.username
        }}</RouterLink>
        <button class="button" @click="logout()">logout</button>
      </div>
    </div>
    <nav class="navbar">
      <ul v-show="!mobile" class="navigation">
        <li class="dropdown">
          <a v-show="!mobile" class="navitem">Quiz</a>
          <div v-show="mobile">
            <RouterLink class="dropdownitem" to="/tjot">Tjöt</RouterLink>
            <RouterLink class="dropdownitem" to="/ordvitsknok">Ordvitsknök</RouterLink>
            <RouterLink class="dropdownitem" to="/geografikack">Geografikäck</RouterLink>
          </div>
          <div class="dropdown-content dropdownitem">
            <li><RouterLink class="dropdownitem" to="/tjot">Tjöt</RouterLink></li>
            <li><RouterLink class="dropdownitem" to="/ordvitsknok">Ordvitsknök</RouterLink></li>
            <li><RouterLink class="dropdownitem" to="/geografikack">Geografikäck</RouterLink></li>
          </div>
        </li>
        <li><RouterLink class="navitem" to="/highscore">Highscore</RouterLink></li>
        <li><RouterLink class="navitem" to="/gbguide">GBGuide</RouterLink></li>
        <li><input id="search" v-model="friend" placeholder="Lägg till vän"></li>
        <button class="button" @click="addfriend()">add</button>
      </ul>  
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <Transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <a class="navitem">Quiz</a>
        <RouterLink class="dropdownitem" to="/tjot">Tjöt</RouterLink>
        <RouterLink class="dropdownitem" to="/ordvitsknok">Ordvitsknök</RouterLink>
        <RouterLink class="dropdownitem" to="/geografikack">Geografikäck</RouterLink>
        <RouterLink class="navitem" to="/highscore">Highscore</RouterLink>
        <RouterLink class="navitem" to="/gbguide">GBGuide</RouterLink>
<div v-if="isLoggedIn()">
        <RouterLink class="navitem" to="/profile">Min Profil</RouterLink>
        <button class="button" @click="logout()">logout</button>
</div>
        <div v-if="!isLoggedIn()" class="login-and-register">
              <button class="button" @click="dialogs.toggleLogin">Logga in</button>
              <button class="button" @click="dialogs.toggleRegister">Registrera dig</button>
            </div>
        <div v-else>
          <RouterLink class="navitem" to="/profile">Min Profil</RouterLink>
        </div>
        <input id="search" v-model="friend" placeholder="Lägg till vän">
        <button class="button" @click="addfriend()">add</button>
      </ul>
      </Transition>
    </nav>
  </header>
</template>
<style scoped>
nav {
  transition: 0.5s ease all;
}

#GBGlogo {

margin: 0;
color: #FFF;
font-family: 'Permanent Marker', cursive;
font-size: 4rem;
font-style: normal;
font-weight: 400;
line-height: normal;
padding-left: 3%;
text-decoration: none;
}

#headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  background-color: #214f75;
  height: 6rem;
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

.whenLoggedIn {
  display: flex;
  font-size: 1.2rem;
}
.user:hover {
  background-color: #406C90;
  border-radius: .8rem;
  transition: .5s ease all;
}
p{
  font-family: permanent marker;
  padding-right: 1.5rem; 
  padding-left: 1.5rem;
  border-radius: .8rem;
  transition: .5s ease all;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  color: #FFF;
  margin: 0;
}
li .navitem:hover, .dropdown:hover {
  background-color: #214F75;
  border-radius: .8rem;
  transition: .5s ease all;

}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #214f75;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 8rem;
}

.dropdown-content a {
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #406c90;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.button {

background-color: #214F75;
color: #FFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 1.2rem;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
float: right;
padding-left: 1rem;
padding-right: 1rem;
margin-right: 2rem;
cursor: pointer;
}
.button:hover {
  background-color: #406c90;
  border-radius: 0.8rem;
  transition: 0.5s ease all;
}
.navitem {
  font-family: permanent marker;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  border-radius: .8rem;
  transition: .5s ease all;
  color: #fff;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
}
.dropdownitem {
  font-family: permanent marker;
  border-radius: .8rem;
  color: #fff;
  text-decoration: none;
}
.navbar {
  background-color: #406c90;
  margin: 0;
  text-align: right;
  color: #fff;
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
font-family: Newsreader;
font-size: 1.2rem;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
padding-left: 5%;
width: 80%;
height: 1.5rem;
margin-left: 1rem;
}

::placeholder {
    color: #214F75;
  font-family: 'Permanent marker';
}

@media screen and (max-width: 768px) {
  .navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }

  .icon {
    display: flex;
    position: absolute;
    align-items: center;
    padding-right: 1.5rem;
    i {
      cursor: pointer;
      font-size: 1.5rem;
      transition: 0.8s ease all;
    }
  }
  .icon-active {
    transform: rotate(180deg);
  }
  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 8.5rem;
    justify-content: space-around;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    max-width: 15rem;
    height: 50%;
    background-color: #406c90;
    padding-bottom: 1rem;
    border-radius: 0.8rem;
  }
  .dropdownitem {
    font-family: permanent marker;
    border-radius: 0.8rem;
    margin-left: 3rem;
  }
  .login-and-register {
    font-family: permanent marker;
    background-color: #406c90;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
  .button {
    background-color: #406c90;
    padding-left: 1.5rem;
  }
}
</style>
