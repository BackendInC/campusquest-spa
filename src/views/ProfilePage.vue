<script setup>
import { RouterLink } from 'vue-router'

const name = 'Susan Clay'
const postCount = 120
const friendCount = 120
const badgeCount = 120

const images = [
  '/image-fallback.jpg',
  '/image-fallback.jpg',
  '/image-fallback.jpg',
  '/image-fallback.jpg',
  '/image-fallback.jpg',
  '/image-fallback.jpg',
]
</script>

<template>
  <div
    class="h-full relative col-span-5 bg-[#31556E] p-5 pb-0 flex flex-col overflow-y-auto"
  >
    <div class="-m-5 p-5 mb-0 relative">
      <div
        class="flex items-center justify-between z-10 relative overflow-hidden"
      >
        <p class="text-white text-xl font-bold">Profile page</p>
        <RouterLink to="/settings" class="flex items-center justify-center">
          <span class="pi-cog pi text-2xl text-white"></span>
        </RouterLink>
      </div>
      <div class="flex items-stretch gap-5 mt-10 z-10 relative">
        <img
          class="w-24 aspect-square overflow-hidden object-cover rounded-xl"
          src="/image-fallback.jpg"
        />
        <div class="flex flex-col justify-between grow">
          <p class="text-2xl font-semibold text-amber-200">{{ name }}</p>
          <div class="flex gap-3 max-w-60">
            <div class="flex flex-col grow justify-center items-center">
              <p class="text-white text-xl font-semibold">{{ postCount }}</p>
              <p class="text-amber-200 text-xs font-light">Posts</p>
            </div>
            <div class="flex flex-col grow justify-center items-center">
              <p class="text-white text-xl font-semibold">{{ friendCount }}</p>
              <p class="text-amber-200 text-xs font-light">Friends</p>
            </div>
            <div class="flex flex-col grow justify-center items-center">
              <p class="text-white text-xl font-semibold">{{ badgeCount }}</p>
              <p class="text-amber-200 text-xs font-light">Badges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-t-3xl min-w-full -ml-5 -mr-5 p-5 pt-10 grid grid-cols-2 gap-4 z-10 relative"
    >
      <div
        v-for="(image, index) in images"
        v-bind:key="image"
        :class="[index % 4 === 0 ? 'row-span-2' : 'row-span-1']"
      >
        <img :src="image" class="object-cover w-full h-full rounded-2xl" />
      </div>
    </div>
    <div class="overflow-hidden absolute top-0 left-0 right-0 z-0 max-w-full">
      <img
      src="/honeycomb.png"
      class="object-cover -translate-y-40 opacity-35 scale-150"
    />
    </div>
  </div>
</template>
