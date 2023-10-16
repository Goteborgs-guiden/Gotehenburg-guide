<script setup>
import MainContainer from './components/MainContainer.vue';
</script>
<template>
  <MainContainer>
  </MainContainer>
  <header>
    <div class="wrapper">
        <RouterLink class="RouterL" to="/">Home</RouterLink>
        <RouterLink class="RouterL" to="/new">New</RouterLink>
        <RouterLink to="/AbcView">Quiz</RouterLink>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>

</style>
