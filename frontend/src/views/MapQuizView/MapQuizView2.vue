<script setup>
import {RouterLink} from "vue-router";
import TheMap from "@/components/MapQuizComponents/TheMap.vue";
import TheQuestionTwo from "@/components/MapQuizComponents/PageTwo/TheQuestionTwo.vue";
import TheButtonsTwo from "@/components/MapQuizComponents/PageTwo/TheButtonsTwo.vue";

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
    <TheQuestionTwo />
    <TheButtonsTwo />
  </main>

  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>

<style scoped>
</style>