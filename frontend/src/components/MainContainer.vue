<script setup>
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import DialogPopup from './DialogPopup.vue'
</script>
<template>
  <main>
    <SiteHeader/>
    <slot></slot>
    <SiteFooter/>
    <DialogPopup/>
</main>
</template>
<style scoped>
</style>
