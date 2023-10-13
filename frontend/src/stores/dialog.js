import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const showRegister = ref(true)  //ändras till false
  function toggleRegister() {
    showRegister.value = !showRegister.value
  }

  

  return { showRegister, toggleRegister}
})
