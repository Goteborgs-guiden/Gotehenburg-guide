<script setup>
import ScrollImage from './ScrollImage.vue'
import { ref } from 'vue'

const imageBaseUrl = '/gbguide/'
let arrayOfImages = [
  { imgSrc: 'lakesmall.png', caption: 'Badplatser', link: 'swimming' },
  { imgSrc: 'restaurantsmall.png', caption: 'Restauranger', link: 'restaurants' },
  { imgSrc: 'artistsmall.png', caption: 'Artister', link: 'artists' },
  { imgSrc: 'beersmall.png', caption: 'Ölhak', link: 'pubs' },
  { imgSrc: 'lisebergsmall.png', caption: 'Aktiviteter', link: 'touristattractions' },
  { imgSrc: 'museumsmall.png', caption: 'Museum', link: 'museum' },
  { imgSrc: 'gbgviewssmall.png', caption: 'Utsiktsplatser', link: 'viewspots' },
  { imgSrc: 'hikesmall.png', caption: 'Vandringsleder', link: 'hiking' }
]

const slideOffset = ref(0)
</script>
<template>
  <section class="container">
    <div class="scrollContainer">
      <div class="scrollMenu" :style="{ transform: `translateX(${slideOffset}px)` }">
        <ScrollImage
          v-for="item in arrayOfImages"
          :imgSrc="imageBaseUrl + item.imgSrc"
          :key="item.caption"
          :caption="item.caption"
          :link="imageBaseUrl + item.link"
        />
      </div>

      <button
        class="backwardButton buttonItem"
        @click="slideOffset = Math.min(slideOffset + 350, 0)"
      >
        <img src="/svgarrows/arrowleft.svg" class="buttonImage" />
      </button>
      <button
        class="forwardButton buttonItem"
        @click="slideOffset = Math.max(slideOffset - 350, -1050)"
      >
        <img src="/svgarrows/arrowright.svg" class="buttonImage" />
      </button>
    </div>
  </section>
</template>
<style>
.container {
  position: relative;
}

.scrollContainer {
  width: 94%;
  margin-left: 3%;
  overflow: hidden;
}

.scrollMenu {
  display: flex;
  max-width: 100%;
  background-color: white;
  transition: all 0.6s ease;
}

.buttonImage {
  position: absolute;
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
  top: 40%;
}

.backwardButton {
  left: 0.5%;
}

.forwardButton {
  right: 2.5%;
}
</style>
