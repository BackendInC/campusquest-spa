<template>
  <div class="w-full h-full]" :style="{
    backgroundColor: bgColor
  }">
    <div class="px-4 pt-20 pb-4 flex flex-col gap-4" :style="{
  backgroundImage: backgroundImage,
  backgroundBlendMode: 'luminosity',
  backgroundPosition: 'center',
  backgroundColor: bgColor,
}">
      <h1 :class="{ 'text-white' : (titleColor == 'white'), 'text-black' : (titleColor == 'black')}" class="text-2xl font-bold">{{ title }}</h1>
    </div>

    <div class="bg-white w-full h-full rounded-t-[3rem] pt-2 px-3 flex flex-col gap-2 ">
      <slot>Placeholder</slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const props = defineProps([
  'title', 'bgColor', 'titleColor'
])
</script>

<style lang="scss" scoped></style>
