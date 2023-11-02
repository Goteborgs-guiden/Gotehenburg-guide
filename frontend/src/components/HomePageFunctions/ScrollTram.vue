<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps(['imgSrc', 'link'])
</script>

<template>
  <RouterLink :to="props.link" class="image-box">
    <img :src="props.imgSrc" class="linkImages"/>
  </RouterLink>
</template>
<style scoped>
.linkImages {
  width: 20em;
  height: 20em;
  padding-top: 5%;
  margin-top: 20%;
  margin-right: auto;
  background: linear-gradient(180deg, #406C90 48.96%, #FFF 100%), 100%;
  border-radius: 2.59375rem;
}
.image-box {
  display: inline-block;
  position: relative;
  margin-left: 8%;;
  margin-bottom: 1.8rem;
}

@media screen and (max-width: 450px){

}
</style>