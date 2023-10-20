<script setup>
const props = defineProps({
  question: String
})
</script>
<template>
  <main>
    <div class="Question">
      <a>Place the question here!!!</a>
      <a> <input class="Input" /></a>
    </div>
  </main>
</template>
<style scoped>
.Question {
  margin: 0 auto;
  margin-top: 3.125rem;
  padding: 3.125rem 21.875rem;
  width: 7.5rem;
  border-radius: 0.78125rem;
  border: 4px solid #406c90;
  background: rgba(232, 243, 253, 0.91);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.Input {
  float: left;
}
</style>
