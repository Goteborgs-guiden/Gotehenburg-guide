<script setup>
import { ref } from 'vue'
import FormInput from './FormInput.vue';
const email = ref('')
const username = ref('')
const repeatPassword = ref ('')
const password = ref ('')

</script>
<template>

<div>
 Registrera dig
 <form class="register">
    Mailadress: <FormInput @value-changed="(value) => email=value" type="text"/>
    Användarnamn: <FormInput @value-changed="(value) => username=value" type="text"/>
    Lösenord: <FormInput @value-changed="(value) => password=value" type="password"/>
    <p>8-12 tecken, A-Z, 0-9, minst ett specialtecken</p>
    Upprepa lösenord: <FormInput @value-changed="(value) => repeatPassword=value" type="password"/>
 </form>
 <button id="save-edits">Spara</button>
</div>
</template>
<style scoped>

</style>