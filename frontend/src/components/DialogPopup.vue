<script setup>
import { useDialogStore } from '../stores/dialog';
import RegisterForm from './RegisterForm.vue';
import LoginForm from './LoginForm.vue';
import EditPage1 from './EditPage1.vue';
const dialogs = useDialogStore()
</script>
<template>

<div>
    <div v-if="dialogs.showRegister" class="popup-background popReg">
        <RegisterForm/>
    </div>
    <div v-if="dialogs.showLogin" class="popup-background popLog">
        <LoginForm/>
    </div>
    <div class="try">
    <div v-if="dialogs.showEdit" class="popup-background popEdit">
        <EditPage1/>
    </div>
    </div>
</div>
</template>
<style scoped>
.popup-background {
    position: absolute;
    background: rgba(112, 38, 38, 0.5);
    margin: auto;
    top: 2%;
    right: 1%;
}
.popup-background.popEdit {

}


@media screen and (max-width: 768px) {
    .popup-background {
    position: absolute;
    background: rgba(112, 38, 38, 0.5);
    margin: auto;
    top: 2%;
    right: 0;
    width: 100;
}
}
</style>