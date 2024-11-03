<template>
  <div class="about flex flex-col gap-4">
    <h1>Count: {{ count }}</h1>
    <Button label="Add" @click="count++" />
  </div>
</template>

<style></style>

<script setup>
import Button from 'primevue/button'
import { ref } from 'vue'

const count = ref(0)
</script>
