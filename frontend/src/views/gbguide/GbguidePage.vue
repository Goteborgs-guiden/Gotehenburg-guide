<script setup>
import ScrollMenu from '@/components/ScrollMenu.vue'
</script>

<template>
  <main class="grid-container">
    <div class="item1">
      <div class="img-backg">
        <img src="/gbguide/gbgcity3.jpeg" class="main-img overlay" />
      </div>
      <div class="img-text">
        <h1 class="mainTitle">GBGuide</h1>
        <h2 class="mainSecTitle">Göteborgs Topp 5</h2>
      </div>
    </div>
    <div class="item2">
      <ScrollMenu />
    </div>
  </main>
</template>
<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.item1 {
  grid-area: header;
  position: relative;
  place-self: center;
  text-align: center;
}
.item2 {
  display: flex;
  justify-content: center;
  overflow: hidden;
  grid-area: list;
}

.img-backg {
  background-color: #214f75;
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}

.main-img {
  display: block;
  width: 100%;
  max-width: 1000ch;
  opacity: 0.5;
}

.img-text {
  font-family: 'Newsreader';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mainTitle {
  font-size: 1000%;
  margin-bottom: 0;
}

.mainSecTitle {
  font-size: 4rem;
  margin-top: 0;
}



@media screen and (max-width: 600px){
  .mainTitle {
  font-size: 350%;
  margin-bottom: 0;
}

.mainSecTitle {
  font-size: 1em;
  margin-top: 0;
}

}

@media screen and (min-width: 600px) and (max-width: 1000px) {
  .mainTitle {
  font-size: 500%;
  margin-bottom: 0;
}

.mainSecTitle {
  font-size: 2em;
  margin-top: 0;
}
}

@media screen and (min-width: 1000px) and (max-width: 1600px) {
  .mainTitle {
  font-size: 700%;
  margin-bottom: 0;
}

.mainSecTitle {
  font-size: 3em;
  margin-top: 0;
}
}

@media screen and (min-width: 1600px) {
}


</style>
