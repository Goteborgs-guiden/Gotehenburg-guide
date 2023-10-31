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


    <RouterLink class="RouterL" to="/tjot">
      <img class="Tramquiz1" src="/trams/lefttramquiz.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/ordvitsknok">
      <img class="Tramquiz2" src="/trams/middletramquiz.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/geografikack">
      <img class="Tramquiz3" src="/trams/righttramquiz.svg" alt="tramquiz3">
    </RouterLink>
  </div>
  <ScrollMenuTram class="MobileTrams"/>
  <p>

    <a><RouterLink to="/random"><button class="ToRandQuiz">Quiz & blandat</button></RouterLink> </a>

  </p>
  </body>

</template>
<style scoped>

@media only screen and (max-width: 500px) {
  .Trams {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  .RouterL {
    display: none;
  }

  .Tramquiz1 {
    width: 50px;
  }

  .Tramquiz2 {
    width: 50px;
  }

  .Tramquiz3 {
    width: 50px;

  }

  html {
    background-size: cover;
  }

  .Main {

  }

  .MobileTrams {

  }

  .ToRandQuiz {
    box-sizing: border-box;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4em;
    padding: 15px 60px;
    border: 4px solid #214F75;
    background: rgba(232, 243, 253, 0.99);
    border-radius: 24px;
    font-weight: 500;
    font-style: normal;
    font-size: 23px;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 0px 2px 2px 4px rgba(0, 0, 0, 0.3);
    color: #214F75;

  }



  .ToRandQuiz:active {
    background-color: #406C90;
    color: white;
    border-color: white;
    transform: scale(.96);
  }

}


@media screen and (min-width: 500px) {

  .Trams {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .Tramquiz1 {
    margin-top: 60px;
    width: 22.65625rem;
    height: 26.5rem;
    background: linear-gradient(180deg, #406C90 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-top: 0.8rem;

  }


  .Tramquiz2 {
    width: 22.65625rem;
    height: 26.5rem;
    margin: 1px 90px;
    margin-top: 60px;
    background: linear-gradient(180deg, #406C90 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-left: 22px;
    padding-top: 0.8rem;
  }

  .Tramquiz3 {
    width: 22.65625rem;
    height: 26.5rem;
    margin-top: 60px;
    background: linear-gradient(180deg, #406C90 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-top: 0.8rem;
  }

  .MobileTrams {
    display: none;
  }

  .ToRandQuiz {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 35px 200px;
    border: 4px solid #214F75;
    background: rgba(232, 243, 253, 0.99);
    border-radius: 24px;
    font-weight: 500;
    font-style: normal;
    font-size: 50px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 70px;
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
</style>