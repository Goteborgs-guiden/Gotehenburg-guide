<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="wrapper">
        <button> <RouterLink to="/">Home</RouterLink> </button>
        <button> <RouterLink to="/new">New</RouterLink> </button>
        <button> <RouterLink to="/AbcView">Quiz</RouterLink> </button>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
</style>
