<script setup>
import { useDialogStore } from '../stores/dialog';
import RegisterForm from './RegisterForm.vue';
import LoginForm from './LoginForm.vue';
import { useTokensStore } from '../stores/tokens';
import { ref } from 'vue';
let token = ref("");
const dialogs = useDialogStore()
</script>
<template>

<div>
    <div v-if="dialogs.showRegister" class="popup-background">
        <RegisterForm/>
    </div>
    <div v-if="dialogs.showLogin" class="popup-background">
        <LoginForm/>
    </div>
        <div class="wrapper">
            <button @click="dialogs.toggleRegister">Register</button>
            <button @click="dialogs.toggleLogin">Login</button>
        </div>
        <p>{{ token }}</p>
        <button @click="token = useTokensStore()">update</button>
</div>
</template>
<style scoped>
.popup-background {
    position: absolute;
    background: rgba(0,0,0,0.5);
    top: 0;
    right: 0;
}
</style>