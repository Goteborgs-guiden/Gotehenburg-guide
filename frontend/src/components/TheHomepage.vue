<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <div class="Trams">
    <RouterLink class="RouterL" to="/tjot">
      <img class="Tramquiz1" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/ordvitsknok">
      <img class="Tramquiz2" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/geografikack">
      <img class="Tramquiz3" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
    </RouterLink>
  </div>

</template>
<style scoped>

@media only screen and (max-width: 500px) {
  .Trams{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  img{
    width: 250px;
  }
  .Tramquiz2{
    display: none;
  }
  .Tramquiz3{
    display: none;
  }
}

@media screen and (min-width: 500px) {

  .Trams{
    display: flex;
    justify-content: center;
    margin-top: 30px;


  }
  img{
    width: 250px;

  }

}

</style>