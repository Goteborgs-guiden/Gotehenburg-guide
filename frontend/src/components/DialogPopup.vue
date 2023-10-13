<script setup>
import { useDialogStore } from '../stores/dialog';

const dialogs = useDialogStore()
</script>
<template>

<div>
    <div v-if="dialogs.showRegister" class="popup-background">
 <RegisterForm/>
    </div>
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