<template>
  <div
    class="w-full h-full"
    style="
      background-image: url(yellow_honeycomb.png);
      background-size: contain;
      background-color: #31556e;
      padding-top: 24px;
    "
  >
    <div class="p-5 flex flex-col gap-4">
      <div class="flex items-center justify-between pb-24">
        <h1 class="text-white text-2xl">Home</h1>
      </div>
    </div>
    <div class="bg-white rounded-t-3xl p-5 pt-5 grid grid-cols-1 gap-4">
      <div v-for="(post, index) in posts" v-bind:key="index">
        <img
          :src="post.post_image"
          class="object-cover w-full h-full rounded-2xl"
        />
      </div>
    </div>
    <MenuBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'

const posts = ref([
  {
    post_id: 1,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 2,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 3,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 4,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 5,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 6,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 7,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 8,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 9,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 10,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 11,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 12,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 13,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 14,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 15,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 16,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 17,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 18,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 19,
    post_image: '/image-fallback.jpg',
  },
  {
    post_id: 20,
    post_image: '/image-fallback.jpg',
  },
])
</script>
