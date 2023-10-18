<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <header class="mainHeader">
    <div>GBGuiden</div>
  </header>

  <p class="navbar">
    <RouterLink class="RouterL"  to="/">Quiz</RouterLink>
    <RouterLink class="RouterL"  to="/">Hitta i GBG</RouterLink>
    <RouterLink class="RouterL" to="/">GBGuide</RouterLink>




    <input placeholder="Search">
  </p>

  <!--<div><a href="#"><img width="10%" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1"></a></div>
  <div><a href="#"><img width="10%" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2"></a></div>
  <div><a href="#"><img width="10%" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3"></a></div>-->

  <div>
    <RouterLink class="RouterL" to="/AbcView">
      <img src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/OrdvitsarQuiz">
      <img src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/MapQuizView">
      <img src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
    </RouterLink>
  </div>
  <p>
    <a><textarea placeholder="fun fact of the day"></textarea></a>
  </p>
  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>
<style scoped>

textarea{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 400px;
  padding-left: 100px;
  padding-right: 100px;

}
img{
  margin-top: 20px;
  margin-left:30px;
  width: 10%;
}
</style>