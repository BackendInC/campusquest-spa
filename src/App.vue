<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast';
</script>

<template>
  <div class="app w-screen h-screen bg-white">
    <RouterView />
    <Toast />
  </div>
</template>

<style></style>
