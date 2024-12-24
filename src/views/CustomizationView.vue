<template>
  <div class="w-full h-full bg-[#7e94a2] flex flex-col">
    <div
      class="px-4 pt-10 pb-4 flex flex-col gap-4"
      :style="{
        backgroundImage: backgroundImage,
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundColor: '#7e94a2',
      }"
    >
      <div class="flex justify-center relative">
        <div class="w-10/12 aspect-square -mb-10 relative">
          <img
            :src="bees.getBeeAvatar(selectedBee).image"
            class="w-full h-full object-contain z-20 relative"
          />
          <div
            class="flex justify-center items-center top-0 left-0 absolute w-full aspect-square z-10"
          >
            <div class="bg-white/30 rounded-full w-8/12 aspect-square"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white w-full rounded-t-[2rem] px-4 py-6 grid grid-cols-2 gap-3 grow content-start"
    >
      <div class="col-span-2 flex justify-center align-start pb-1 pt-0.5">
        <hr class="border-[#b2b1b1] w-6/12 h-0.5" />
      </div>
      <div
        class="flex flex-col rounded-lg p-2 transition"
        v-for="bee in bees.beeAvatars"
        v-bind:key="bee.id"
        @click="selectedBee = bee.id"
        :class="{ 'bg-zinc-200': selectedBee === bee.id }"
      >
        <div class="relative">
          <img :src="bee.image" class="z-20 relative" />
          <div
            class="absolute h-full w-full top-0 left-0 flex justify-center items-center z-10"
          >
            <div
              class="bg-zinc-400/60 rounded-full w-11/12 aspect-square"
            ></div>
          </div>
        </div>
        <button
          class="text-white bg-[#313131] py-2 px-5 -mt-3 rounded-full text-center z-20"
          @click="authStore.updateUserBee(selectedBee)"
        >
          {{ bee.name }}
        </button>
      </div>
    </div>
  </div>
  <div
    class="absolute flex justify-between align-center w-full top-0 left-0 p-5"
  >
    <RouterLink to="/settings">
      <i class="pi-arrow-left pi text-2xl text-white"></i>
    </RouterLink>
    <p class="bg-gray-100 text-black py-1 px-3 rounded-lg">Save</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useBees } from '@/composables/useBees'
import { useAuthStore } from '@/stores/auth'

import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const selectedBee = ref(1)

const bees = useBees()
const authStore = useAuthStore()
</script>
