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
    <input>
  </p>
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
</style>