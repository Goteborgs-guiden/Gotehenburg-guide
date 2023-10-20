<script setup>
const props = defineProps({
  question: String
})
</script>
<template>
  <main>
    <div class="Question">
      <a class="question">Place the question here!!!</a>
      <a> <input class="Input" placeholder="Svar här" /></a>
    </div>
  </main>
</template>
<style scoped>
.Question {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1rem;
  margin-top: 3.125rem;
  margin-left: 32.5rem;
  width: 50.4rem;
  height: 9rem;
  border-radius: 0.78125rem;
  border: 4px solid #406c90;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.Input {
  width: 97%;
  height: 2rem;
  border-radius: 1.90625rem;
  border: 2px solid #214f75;
  background: #e8f3fd;
}

.question {
  color: #000;
  font-family: Newsreader;
  font-size: 1.3125rem;
}

::placeholder {
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.53);
  font-family: 'Newsreader';
  font-size: 1.3125rem;
}
</style>
