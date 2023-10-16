<script setup>
import {ref} from 'vue'
const props = defineProps(["type"])
const formValue = ref('')
</script>
<template>

    <input :type="props.type" v-model="formValue" @input="$emit('valueChanged', formValue)"/>
</template>
<style scoped>
</style>
