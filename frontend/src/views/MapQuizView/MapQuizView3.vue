<script setup>
import {RouterLink} from "vue-router";
import TheMap from "@/components/MapQuizComponents/TheMap.vue";
import TheQuestionThree from "@/components/MapQuizComponents/TheQuestionThree.vue";
import TheButtonsTwo from "@/components/MapQuizComponents/TheButtonsThree.vue";
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
    <TheQuestionThree />
    <TheButtonsTwo />
  </main>

  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>

<style scoped>
</style>