import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHighscore = defineStore('highscore', () => {
  const score = ref(0);
  const lastQuiz = ref("");
  function setScore(newScore) {
    score.value = newScore
  }
  function setLastQuiz(newQuiz) {
    lastQuiz.value = newQuiz
  }
  

  return { score, lastQuiz, setLastQuiz, setScore}
})
