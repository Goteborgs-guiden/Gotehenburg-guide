<script setup>
import ScrollImage from './ScrollImage.vue'
import { ref } from 'vue'

const imageBaseUrl = '/gbguide/'
let arrayOfImages = [
  { imgSrc: 'lakesmall.png', caption: 'Badplatser' },
  { imgSrc: 'restaurantsmall.png', caption: 'Restauranger' },
  { imgSrc: 'artistsmall.png', caption: 'Artister' },
  { imgSrc: 'beersmall.png', caption: 'Ölhak' },
  { imgSrc: 'lisebergsmall.png', caption: 'Sevärdheter' },
  { imgSrc: 'museumsmall.png', caption: 'museum' },
  { imgSrc: 'gbgviewssmall.png', caption: 'utsiktsplatser' },
  { imgSrc: 'hikesmall.png', caption: 'vandringsleder' }
]

const slideOffset = ref(0)
</script>
<template>
  <div class="scrollMenu" :style="{ transform: `translateX(${slideOffset}px)` }">
    <ScrollImage
      v-for="item in arrayOfImages"
      :imgSrc="imageBaseUrl + item.imgSrc"
      :key="item.caption"
      :caption="item.caption"
    />
    <button class="backwardButton buttonItem" @click="slideOffset = Math.min(slideOffset + 440, 0)">
      <img src="/svgarrows/arrowleft.svg" class="buttonImage" />
    </button>
    <button
      class="forwardButton buttonItem"
      @click="slideOffset = Math.max(slideOffset - 440, -1750)"
    >
      <img src="/svgarrows/arrowright.svg" class="buttonImage" />
    </button>
  </div>
</template>
<style>
.scrollMenu {
  display: flex;
  max-width: 100%;
  background-color: white;
  transition: all 0.6s ease;
  padding-left: 4.5em;
}

.buttonImage {
  width: 3em;
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
  background-color: rgb(255, 255, 255);
  border: none;
  height: 100%;
  width: 5em;
}

.backwardButton {
  left: 0;
}

.forwardButton {
  right: 0;
}
</style>
