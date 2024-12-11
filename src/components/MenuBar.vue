<template>
  <div class="fixed bottom-[4%] h-[4rem] w-full px-[4%]">
    <div
      class="h-full w-full bg-black rounded-2xl flex items-center justify-around"
    >
      <router-link
        :to="{ name: 'quests' }"
        class="flex flex-col items-center justify-center w-[2rem] text-sm"
        :class="[activeRoute === 'quests' ? 'text-orange-400' : 'text-white']"
      >
        <i class="pi pi-question-circle" style="font-size: 1.5rem"></i>
        <h1>Quests</h1>
      </router-link>

      <router-link
        :to="{ name: 'home' }"
        class="flex flex-col items-center justify-center w-[2rem] text-sm"
        :class="[activeRoute === 'home' ? 'text-orange-400' : 'text-white']"
      >
        <i class="pi pi-home" style="font-size: 1.5rem"></i>
        <h1>Home</h1>
      </router-link>

      <router-link
        :to="{ name: 'profile' }"
        class="flex flex-col items-center justify-center w-[2rem] text-sm"
        :class="[activeRoute === 'profile' ? 'text-orange-400' : 'text-white']"
      >
        <i class="pi pi-user" style="font-size: 1.5rem"></i>
        <h1>Profile</h1>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

// Active class property of router-link got broken for some reason. This is a workaround.
const activeRoute = computed(() => useRoute().name)
console.log(activeRoute.value === 'home')
</script>

<style lang="scss" scoped></style>
