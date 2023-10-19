<script setup>
import {RouterLink} from "vue-router";
import ImgForQuiz from "@/components/FillInBlankComponents/ImgForQuiz.vue";
import InputBar from "@/components/FillInBlankComponents/InputBar.vue";
import ButtonsForFillInBlank from "@/components/FillInBlankComponents/ButtonsForFillInBlank.vue";
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
    <ImgForQuiz />
    <InputBar />
    <ButtonsForFillInBlank />
  </main>

  <footer class="footer">
    <div id="copyright">copyright @ a-laget</div>
    <div id="contact">contact: a-laget@alaget.se</div>
  </footer>
</template>

<style scoped>
</style>