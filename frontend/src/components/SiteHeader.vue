<script setup>
import { useDialogStore } from '../stores/dialog';
import { useTokensStore } from '../stores/tokens';
const dialogs = useDialogStore()
const tokenStore = useTokensStore()

</script>
<template>
   <header class="mainHeader">

    <div id="headerContent">
        <h1>GBGuiden</h1>
            <div v-if="!tokenStore.accessToken">
            <button class="button" @click="dialogs.toggleRegister">Registrera dig</button>
            <button class="button" @click="dialogs.toggleLogin">Logga in</button>
            </div>
            <div v-else>Användarnamn
                Till min sida</div>
        </div>
        <!--<p>{{ token }}</p>
        <button @click="token = useTokensStore()">update</button>-->

    <nav class="navbar">
    <RouterLink class="RouterL"  to="/">Quiz</RouterLink>
    <RouterLink class="RouterL"  to="/">Hitta i GBG</RouterLink>
    <RouterLink class="RouterL" to="/">GBGuide</RouterLink>
    <input id="search" placeholder="Hitta vänner">
    </nav>
  </header>
</template>
<style scoped>
h1 {
    margin: 0;
    color: #FFF;
    font-family: 'Permanent Marker', cursive;
font-size: 100px;
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
font-size: 30px;
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
    padding-left:500px;
    text-align: right;
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Permanent Marker;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: space-around;
}

#search {
    border-radius: 61px;
border: 2px solid #214F75;
background: #E8F3FD;
color: #214F75;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Permanent Marker;
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

::placeholder {
    color: #214F75;
}
</style>
