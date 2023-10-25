<script setup>
import ScrollMenu from "@/components/ScrollMenu.vue";

</script>

<template>
  <main class="grid-container">
    <div class="item1">
      <div class="img-backg">
        <img src="/gbguide/gbgcity3.jpeg" class="main-img overlay" />
      </div>
      <div class="img-text">
        <h1>GBGuide</h1>
        <h2>Göteborgs topp 5</h2>
      </div>
    </div>
    <div class="item2">
      <ScrollMenu />
    </div>
  </main>
</template>
<style>
/*
.grid-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'header'
    'list';
    gap: 1rem;
}*/

.item1 {
  grid-area: header;
  place-self: center;
  text-align: center;
}
.item2 {
  grid-area: list;
}

.img-backg {
  background-color: #214f75;
  width: 98%;
  margin-left: auto;
  margin-right: auto ;
  margin-top: 1%;
}

.main-img {
  display: block;
  width: 100%;
  opacity: 0.5;
}

.img-text {
  font-family: 'Newsreader';
  color: white;
  position: absolute;
  top: 16%;
  left: 33%;
}

h1 {
  font-size: 10rem;
  margin-bottom: 0;
}

h2 {
  font-size: 4rem;
  margin-top: 0;
}
</style>
