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
        class="forwardButton buttonItem buttonQMedia1"
        @click="slideOffset = Math.max(slideOffset - 350, -1400)"
      >
        <img src="/svgarrows/arrowright.svg" class="buttonImage" />
      </button>
      <button
        class="forwardButton buttonItem buttonQMedia2"
        @click="slideOffset = Math.max(slideOffset - 350, -2100)"
      >
        <img src="/svgarrows/arrowright.svg" class="buttonImage" />
      </button>
      <button
        class="forwardButton buttonItem buttonQMedia3"
        @click="slideOffset = Math.max(slideOffset - 350, -2450)"
      >
        <img src="/svgarrows/arrowright.svg" class="buttonImage" />
      </button>
    </div>
  </section>
</template>
<style>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100em;
  background-color: white;
}

.scrollContainer {
  width: 88.5em;
  background: white;
  overflow: hidden;
  height: fit-content;
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
  right: calc(0.5% + 3em);
}

@media screen and (max-width: 600px) {
  .scrollContainer {
    width: 22.5em;
  }

  .container {
    width: 28em;
  }

  .buttonQMedia1 {
    display: none;
  }

  .buttonQMedia2 {
    display: none;
  }
}

@media screen and (min-width: 600px) and (max-width: 1000px) {
  .scrollContainer {
    width: 22.5em;
  }

  .container {
    width: 28em;
  }

  .buttonQMedia1 {
    display: none;
  }

  .buttonQMedia3 {
    display: none;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1600px) {
  .scrollContainer {
    width: 44.5em;
  }

  .container {
    width: 50em;
  }

  .buttonQMedia1 {
    display: none;
  }

  .buttonQMedia3 {
    display: none;
  }
}

@media screen and (min-width: 1600px) {
  .buttonQMedia2 {
    display: none;
  }

  .buttonQMedia3 {
    display: none;
  }
}
</style>
