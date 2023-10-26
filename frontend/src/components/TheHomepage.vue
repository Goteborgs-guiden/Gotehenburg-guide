<script setup>
import {RouterLink} from "vue-router";
import {ref} from "vue";

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
    //Look at bob work in instead of console.log
    console.log("swipe right")
  }else {
    //Look at bob work in instead of console.log
    console.log("swipe left")
  }
}
</script>
<template>

  <div class="Trams" @touchstart="touchStartMethod" @touchend="touchEndMethod">
    <a class="HoldArrow"><img src="../../public/svgarrows/arrowleft.svg" class="LeftArrow"></a>
    <RouterLink class="RouterL" to="/tjot">
      <img class="Tramquiz1" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
    </RouterLink>
    <RouterLink class="RouterL" to="/ordvitsknok">
      <img class="Tramquiz2" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
    </RouterLink>
    <RouterLink class="RouterL" to="/geografikack">
      <img class="Tramquiz3" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
    </RouterLink>
    <a class="HoldArrow"><img src="../../public/svgarrows/arrowright.svg" class="RightArrow"></a>
  </div>

  <p>
    <a class="aTag"><RouterLink to="/"><button class="ToRandQuiz">Klicka mig för att generera random quizfråga</button></RouterLink> </a>
  </p>

</template>
<style scoped>

@media only screen and (max-width: 500px) {
  .Trams{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  img{
    width: 250px;
  }
  .Tramquiz2{

  }
  .Tramquiz3{

  }
  .LeftArrow{
    width: 30px;
    padding: 90px 0px;
  }
  .RightArrow{
    width: 30px;
    padding: 90px 0px;
  }
  .aTag{
    display: none;
  }

}

@media screen and (min-width: 500px) {

  .Trams {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  img {
    width: 250px;
  }

  .LeftArrow {
    display: none;
  }

  .RightArrow {
    display: none;
  }


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
</style>