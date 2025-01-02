<template>
  <div
    class="w-full h-full]"
    :style="{
      backgroundColor: bgColor,
    }"
  >
    <div
      class="px-4 pt-20 pb-4 flex gap-4 items-center"
      :style="{
        backgroundImage: backgroundImage,
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundColor: bgColor,
      }"
      >
      <RouterLink v-if="backroute != null" :to="backroute" class="pi pi-arrow-left text-white text-lg"></RouterLink>
      <h1
        :class="{
          'text-white': titleColor == 'white',
          'text-black': titleColor == 'black',
        }"
        class="text-2xl font-bold"
      >
        {{ title }}
      </h1>
    </div>

    <div
      class="bg-white w-full h-full rounded-t-[3rem] pt-2 px-3 flex flex-col gap-2"
    >
      <slot>Placeholder</slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const props = defineProps(['title', 'bgColor', 'titleColor', 'backroute'])
</script>

<style lang="scss" scoped></style>
