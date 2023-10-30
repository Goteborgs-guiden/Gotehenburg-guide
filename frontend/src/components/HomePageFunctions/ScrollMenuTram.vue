<script setup>
import ScrollTram from './ScrollTram.vue'
import { ref } from 'vue'

const imageBaseUrl = '/trams/'
let arrayOfImages = [
  { imgSrc: 'lefttramquiz.svg', link: 'tjot' },
  { imgSrc: 'middletramquiz.svg', link: 'ordvitsknok' },
  { imgSrc: 'righttramquiz.svg', link: 'geografikack' }
]

const slideOffset = ref(0)
</script>

<template>
  <section class="container">
    <div class="scrollContainer">
      <div class="scrollMenu" :style="{ transform: `translateX(${slideOffset}px)` }">
        <ScrollTram
            v-for="item in arrayOfImages"
            :imgSrc="imageBaseUrl + item.imgSrc"
            :key="item.link"
            :link="item.link"
        />
      </div>

      <button
          class="backwardButton buttonItem"
          @click="slideOffset = Math.min(slideOffset + 375, 0)"
      >
        <img src="/svgarrows/arrowleft.svg" class="buttonImage" />
      </button>
      <button
          class="forwardButton buttonItem"
          @click="slideOffset = Math.max(slideOffset - 375, -750)"
      >
        <img src="/svgarrows/arrowright.svg" class="buttonImage" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
}

.scrollContainer {
  width: 94%;
  margin-left: 4%;
  overflow: hidden;
}

.scrollMenu {
  display: flex;
  max-width: 60%;
  transition: all 0.6s ease;
}

.buttonImage {
  position: absolute;
  width: 2.5em;
  cursor: pointer;
}

.buttonImage:hover {
  width: 3.5em;
}

.buttonImage:active {
  transform: translateY(0.5em);
}

.buttonItem {
  position: absolute;
  border: none;
  top: 40%;
  background-color: transparent;
}

.backwardButton {
  left: 0.5%;
}

.forwardButton {
  right: 8.5%;
}
</style>