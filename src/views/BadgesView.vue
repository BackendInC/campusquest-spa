<template>
  <div class="min-h-screen bg-gray-100 p-4 relative">
    <div class="-ml-4 -mr-4 -mt-4 h-[150px] bg-[#59ac6e] flex flex-col rounded-b-[2rem] relative">
      <div
        class="px-4 pt-10 pb-4 flex flex-col justify-end rounded-b-[2rem] grow"
        :style="{
          backgroundImage: backgroundImage,
          backgroundBlendMode: 'luminosity',
          backgroundPosition: 'center',
          backgroundColor: '#59ac6e',
        }"
      >
        <p class="text-2xl mb-1 text-white">Badges</p>
      </div>
      <div class="flex items-center mb-4 mt-4 absolute z-10">
      <RouterLink
        to="/profile"
        class="pi pi-arrow-left text-white text-lg ml-4 mt-8"
      ></RouterLink>
    </div>
    </div>

    <div class="relative z-10 mt-4">
      <ul class="space-y-4">
        <div>
            
        </div>
        <li
          v-for="achievement in achievements"
          :key="achievement.id"
          class="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4"
        >
          <p class="pi pi-shield text-black text-3xl"></p>

          <div>
            <h3 class="text-lg font-semibold text-gray-700">
              {{ achievement.description }}
            </h3>
            <p class="text-sm text-gray-500">
              Award Tokens: {{ achievement.award_tokens }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const achievements = ref([
  {
    id: 1,
    description: 'Description 1',
    award_tokens: 50,
  },
  {
    id: 2,
    description: 'Description 2',
    award_tokens: 100,
  },
  {
    id: 3,
    description: 'Description 3',
    award_tokens: 75,
  },
  {
    id: 4,
    description: 'Description 4',
    award_tokens: 150,
  },
])
</script>
