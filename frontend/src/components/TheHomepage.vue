<script setup>
import {RouterLink} from "vue-router";
import {ref} from "vue";
import ScrollMenuTram from "@/components/HomePageFunctions/ScrollMenuTram.vue";

const touchStartPos = ref()

function touchStartMethod(touchEvent) {
  touchStartPos.value = touchEvent.changedTouches[0].clientX;
}

//posXStart
function touchEndMethod(touchEvent) {
  const posXEnd = touchEvent.changedTouches[0].clientX;

  console.log("Start pos", touchStartPos)
  console.log("End pos", posXEnd)
  console.log(posXEnd)
  if (touchStartPos.value < posXEnd) {
    //Add code here for swipe with moues
    //remove console log
    console.log("swipe right")
  } else {
    //Add code here for swipe with moues
    //remove console log
    console.log("swipe left")
  }
}

</script>
<template>
  <body class="Main">

  <div class="Trams" @touchstart="touchStartMethod" @touchend="touchEndMethod">
    <div class="tramSizes">
    <RouterLink class="RouterL" to="/tjot">
      <img class="Tramquiz" id="tram1" src="/trams/lefttramquiz.svg" alt="tramquiz1">
    </RouterLink>
    </div>
    <div class="tramSizes">
    <RouterLink class="RouterL" to="/ordvitsknok">
      <img class="Tramquiz" id="tram2" src="/trams/middletramquiz.svg" alt="tramquiz2">
    </RouterLink>
    </div>
    <div class="tramSizes"><RouterLink class="RouterL" to="/geografikack">
      <img class="Tramquiz" id="tram3" src="/trams/righttramquiz.svg" alt="tramquiz3">
    </RouterLink>
    </div>
    </div>
    <div class="flexTrams">
  <ScrollMenuTram class="MobileTrams"/>
    </div>
  <p>

    <a><RouterLink style="text-decoration: none;" to="/random"><button  class="ToRandQuiz">Blanda Quiz</button></RouterLink> </a>

  </p>
  </body>

</template>
<style scoped>




@media screen and (min-width: 450px) {

  .Trams {
    display: flex;
    justify-content: space-evenly;
    padding-top: 5rem;
    width: 100%;
  }

  .Tramquiz {
    background: linear-gradient(180deg, #214F75 36.98%, rgba(33, 79, 117, 0.00) 100%);
    border-radius: 2.59375rem;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 30rem;
    box-sizing: border-box;
  }
  .tramSizes{
    width: 20%;
    
    
  }
  #tram1 {
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
  #tram2{
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
  #tram3{
    padding: 1rem;
    width: 100%;
    height: 100%;
  }

  .MobileTrams {
    display: none;
  }

  .ToRandQuiz {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 3rem;
    border: 4px solid #214F75;
    background: rgba(232, 243, 253, 0.99);
    font-family: Permanent Marker;
    border-radius: 24px;
    font-weight: 500;
    font-style: normal;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    margin-top: 4rem;
    box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.3);
    color: #214F75;
  }
  .ToRandQuiz:hover {
    cursor: pointer;
    background-color: #406C90;
    border-color: white;
    color: white;
  }

  .ToRandQuiz:active {
    background-color: #406C90;
    transform: scale(.96);
  }

}
@media only screen and (max-width: 449px) {
  .Trams {
    display: flex;
    justify-content: space-evenly;
    margin-top: 5px;
  }

  .RouterL {
    display: none;
  }

  html {
    background-size: cover;
  }
  .flexTrams {
  
  }
  section.container.Mobiletrams {

  }


  .MobileTrams {
  
  }

  .ToRandQuiz {
    box-sizing: border-box;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 3rem;
    border: 4px solid #214F75;
    background: rgba(232, 243, 253, 0.99);
    font-family: Permanent Marker;
    border-radius: 24px;
    font-weight: 500;
    font-style: normal;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0px 2px 2px 4px rgba(0, 0, 0, 0.3);
    color: #214F75;
    text-decoration: none;
  }
  .ToRandQuiz:active {
    background-color: #406C90;
    color: white;
    border-color: white;
    transform: scale(.96);
  }
}
</style>