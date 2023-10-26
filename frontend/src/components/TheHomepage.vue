<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <div>
    <RouterLink class="RouterL" to="/tjot">
      <img src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/ordvitsknok">
      <img src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/geografikack">
      <img src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
    </RouterLink>
  </div>
  <p>
    <a><RouterLink to="/"><button>Klicka mig för att generera random quizfråga</button></RouterLink> </a>
  </p>

</template>
<style scoped>

button{
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 100px;
  border: 2px solid #214F75;
  background-color: #E8F3FD;
  border-radius: 5px;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
}

img{
  margin-top: 20px;
  margin-left:30px;
  width: 10%;
}
</style>

