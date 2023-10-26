<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps(['imgSrc', 'caption', 'link'])
</script>
<template>
  <RouterLink :to="props.link" class="image-box">
    <img :src="props.imgSrc" class="linkImages" />
    <h3 class="linkImageText">{{ props.caption }}</h3>
  </RouterLink>
</template>
<style>
.linkImages {
  width: 20em;
  height: 20em;
}

.image-box {
  display: inline-block;
  position: relative;
  background-color: white;
  margin: 1rem;
}

.linkImageText {
  position: absolute;
  right: 0.4em;
  bottom: 0.4em;
  font-family: 'Newsreader';
  font-size: 2.5rem;
  color: white;
  border-radius: 2.75rem;
  background: rgba(5, 40, 64, 0.73);
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0;
}
</style>
