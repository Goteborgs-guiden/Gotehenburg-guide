<script setup>
import {RouterLink} from "vue-router";
import {ref} from "vue";
import ScrollMenuTram from "@/components/HomePageFunctions/ScrollMenuTram.vue";

const touchStartPos = ref()
function touchStartMethod(touchEvent){
  touchStartPos.value = touchEvent.changedTouches[0].clientX;
}
//posXStart
function touchEndMethod (touchEvent){
  const posXEnd = touchEvent.changedTouches[0].clientX;

  console.log("Start pos", touchStartPos)
  console.log("End pos", posXEnd)
  console.log(posXEnd)
  if (touchStartPos.value < posXEnd){
    //Add code here for swipe with moues
    //remove console log
    console.log("swipe right")
  }else {
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
    <a class="aTag"><RouterLink to="/"><button class="ToRandQuiz">Quizz & Blandat</button></RouterLink> </a>
  </p>
  </body>

</template>
<style scoped>

@media only screen and (max-width: 500px) {
  .Trams{
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

.RouterL{
  display: none;
}
  .Tramquiz1{
    width: 50px;
  }
  .Tramquiz2{
    width: 50px;
  }
  .Tramquiz3{
    width: 50px;

  }
  html{
    background-size: cover;
  }
  .Main{

  }

.MobileTrams{

}
  .ToRandQuiz{
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 15px 60px;
    border: 2px solid #214F75;
    background-color: #E8F3FD;
    border-radius: 5px;
    font-weight: 500;
    font-style: normal;
    font-size: 19px;
    text-align: center;
    text-transform: uppercase;

  }
  .ToRandQuiz:hover{
    cursor: pointer;
    background-color: #406C90;
    border-color: black;
    color: white;
  }
  .ToRandQuiz:active{
    background-color: #406C90;
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
    width: 12.65625rem;
    height: 16.5rem;
    background: linear-gradient(180deg, #214F75 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-top: 0.8rem;

  }
  .Tramquiz2{
    width: 12.65625rem;
    height: 16.5rem;
    margin: 1px 100px;
    margin-top: 60px;
    background: linear-gradient(180deg, #214F75 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-top: 0.8rem;
  }

  .Tramquiz3{
    width: 12.65625rem;
    height: 16.5rem;
    margin-top: 60px;
    background: linear-gradient(180deg, #214F75 48.96%, #FFF 100%);
    border-radius: 2.59375rem;
    padding: 0.3rem;
    padding-top: 0.8rem;
  }
  .MobileTrams{
    display: none;
  }
  .ToRandQuiz{
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 30px 100px;
    border: 2px solid #214F75;
    background-color: #E8F3FD;
    border-radius: 5px;
    font-weight: 500;
    font-style: normal;
    font-size: 19px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 70px;
  }
  .ToRandQuiz:hover{
    cursor: pointer;
    background-color: #406C90;
    border-color: black;
    color: white;
  }
  .ToRandQuiz:active{
    background-color: #406C90;
    transform: scale(.96);
  }

}
</style>