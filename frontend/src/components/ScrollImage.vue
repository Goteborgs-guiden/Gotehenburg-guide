<script setup>
const props = defineProps(['imgSrc', 'caption'])
</script>
<template>
  <div class="image-box">
    <img :src="props.imgSrc" />
    <h3>{{ props.caption }}</h3>
  </div>
</template>
<style>
img {
  width: 25rem;
  height: 25rem;
}

.image-box {
  display: inline-block;
  position: relative;
  background-color: white;
  margin: 1rem;
}

h3 {
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
  font-family: 'Newsreader';
  font-size: 3rem;
  color: white;
  border-radius: 2.75rem;
  background: rgba(5, 40, 64, 0.73);
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0;
}
</style>