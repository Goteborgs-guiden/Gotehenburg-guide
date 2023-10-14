import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const showRegister = ref(false)
  const showLogin = ref(true)
  function toggleRegister() {
    showRegister.value = !showRegister.value
  }
  function toggleLogin() {
    showLogin.value = !showLogin.value
  } 

  

  return { showRegister, toggleRegister, toggleLogin, showLogin}
})
