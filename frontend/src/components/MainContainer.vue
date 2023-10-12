<script setup>
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
</script>
<template>
  <main>
    <SiteHeader/>
    <slot></slot>
    <SiteFooter/>
</main>
</template>
<style scoped>
</style>
