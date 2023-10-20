<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main>
    <div>
      <RouterLink class="RouterL" to="/"><button class="Back">Tillbaka</button></RouterLink>
      <RouterLink class="RouterL" to="/"><button class="Next">Nästa</button></RouterLink>
    </div>
  </main>
</template>
<style scoped>

button {
  padding: 0.8rem 1.4rem;
  border-radius: 0.8rem;
  border: 5px solid #91b6d8;
  background: #fff;
  color: #214f75;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}


.Back {
  margin-left: 14rem;
  margin-top: 1.55rem;
}
.Next {
  margin-left: 68rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

</style>
