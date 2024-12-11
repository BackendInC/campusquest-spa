<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full h-screen bg-[#E55733] relative flex flex-col justify-end">
    <div class="absolute w-full h-full flex justify-center items-center z-10">
      <img src="../assets/avatar.svg" class="aspect-square mt-4 mb-40" />
    </div>
    <div class="flex flex-col gap-12 text-white pb-12 px-3 z-20">
      <div class="flex flex-col gap-1 text-white">
        <h1 class="text-2xl font-bold">Connect with the Campus</h1>
        <p class="text-base">
          Complete quests, explore ITU and make new friends.
        </p>
      </div>
      <div class="flex justify-end">
        <RouterLink :to="{ name: 'login' }">
          <div
            class="h-14 w-14 rounded-full bg-white flex justify-center items-center"
          >
            <span class="pi pi-arrow-right text-black text-lg"></span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
