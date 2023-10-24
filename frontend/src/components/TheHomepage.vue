<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <div>
    <RouterLink class="RouterL" to="/AbcView">
      <img src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/FillInBlankQuizView">
      <img src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/MapQuizView">
      <img src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
    </RouterLink>
  </div>
  <p>
    <a><textarea placeholder="fun fact of the day"></textarea></a>
  </p>

</template>
<style scoped>

textarea{
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 100px;
  padding-right: 100px;

}
img{
  margin-top: 20px;
  margin-left:30px;
  width: 10%;
}
</style>