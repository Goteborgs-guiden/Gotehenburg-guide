<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <main>
    <div>
      <RouterLink class="RouterL" to="/"><button class="Back">Tillbaka</button></RouterLink>
      <RouterLink class="RouterL" to="/"><button class="Next">Skicka in</button></RouterLink>
    </div>
  </main>
</template>
<style scoped>
button{
  padding: 20px 20px;
}
.Back{
  margin-left: 360px;
  margin-top: 25px;
}
.Next{
  margin-left: 916px;
}
</style>