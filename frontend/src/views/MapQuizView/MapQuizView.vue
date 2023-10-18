<script setup>
import {RouterLink} from "vue-router";
import TheMap from "@/components/MapQuizComponents/TheMap.vue";
import TheButtons from "@/components/MapQuizComponents/PageOne/TheButtons.vue";
import TheQuestion from "@/components/MapQuizComponents/PageOne/TheQuestion.vue";
</script>
<template>
  <header class="mainHeader">
    <div>GBGuiden</div>
  </header>
  <p class="navbar">
    <RouterLink class="RouterL" to="/">Quiz</RouterLink>
    <RouterLink class="RouterL" to="/">Hitta i GBG</RouterLink>
    <RouterLink class="RouterL" to="/">GBGuide</RouterLink>
    <input placeholder="Search">
  </p>

  <main>
    <TheMap />
    <TheQuestion />
    <TheButtons />
  </main>

  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>

<style scoped>
</style>