<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps(['imgSrc', 'link'])
</script>

<template>
  <RouterLink :to="props.link" class="image-box">
    <img :src="props.imgSrc" class="linkImages" />
  </RouterLink>
</template>
<style scoped>
.linkImages {
  width: 16em;
  height: 20em;
  margin-top: 7em;
  margin-right: auto;
  margin-left: auto;
  background: linear-gradient(180deg, #406C90 48.96%, #FFF 100%), 100%;
  border-radius: 2.59375rem;

}

.image-box {
  display: inline-block;
  position: relative;
  margin-left: 4rem;
  margin-right: 4rem;
  margin-bottom: 1.8rem;
}

</style>