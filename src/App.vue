<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex w-screen h-screen justify-center">
    <div
      class="max-w-[1000px] grid-cols-5 grid gap-4 w-screen h-screen overflow-hidden"
    >
      <RouterView />
    </div>
  </div>
</template>
