import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const showRegister = ref(false)
  const showLogin = ref(false)
  function toggleRegister() {
    showRegister.value = !showRegister.value
    console.log('clicked')
  }
  function toggleLogin() {
    showLogin.value = !showLogin.value
  } 

  

  return { showRegister, toggleRegister, toggleLogin, showLogin}
})
