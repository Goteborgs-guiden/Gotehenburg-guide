<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="wrapper">
        <RouterLink class="RouterL" to="/">Home</RouterLink>
        <RouterLink class="RouterL" to="/new">New</RouterLink>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>

</style>
