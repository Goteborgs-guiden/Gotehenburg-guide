<script setup>
import { ref } from 'vue'
import FormInput from './FormInput.vue';

const password = ref('')
const newPassword = ref('')
const repeatPassword = ref ('')
const firstName = ref ('')
const lastName = ref ('')
const neighbourhood = ref ('')
const birthDate = ref ('')
</script>

<template>
  <section>
    <div id="profile-picture">
      <img >
      <button id="profilbild">Ändra profilbild</button>
    </div>
    <div id="edit-instructions">
      
    </div>
    <div id="edit-fields">
      <form class="edit-form">
        Nuvarande lösenord: <FormInput @value-changed="(value) => password=value" type="password"/>
        Nytt lösenord: <FormInput @value-changed="(value) => newPassword=value" type="password"/>
        <p>8-12 tecken, A-Z, 0-9, minst ett specialtecken</p>
        Upprepa lösenord: <FormInput @value-changed="(value) => repeatPassword=value" type="password"/>
        Förnamn: <FormInput @value-changed="(value) => firstName=value" type="text"/>
        Efternamn: <FormInput @value-changed="(value) => lastName=value" type="text"/>
        Område: <FormInput @value-changed="(value) => neighbourhood=value" type="text"/>
        Födelsedatum: <FormInput @value-changed="(value) => birthDate=value" type="date"/>
      </form>
    </div>
    <button id="save-edits">Spara</button>
  
  </section>
</template>



<style scoped>
</style>
