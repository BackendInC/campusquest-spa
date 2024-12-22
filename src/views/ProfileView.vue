<template>
  <div class="w-full h-full bg-[#31556e]">
    <!-- PROFILE SECTION -->
    <div
      class="px-4 pt-10 pb-4 flex flex-col gap-4"
      :style="{
        backgroundImage: backgroundImage,
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundColor: '#31556e',
      }"
    >
      <!-- Name and Settings Icons -->
      <div class="flex items-center justify-between">
        <h1 class="text-white text-2xl">{{ profileData.name }}</h1>
        <RouterLink to="/settings" class="flex items-center justify-end">
          <i class="pi-cog pi text-2xl text-white"></i>
        </RouterLink>
      </div>
      <!-- Profile Photo and Stats -->
      <div class="flex items-center justify-between">
        <img
          class="w-24 aspect-square object-cover rounded-xl"
          :src="profileData.profilePhoto"
        />
        <div class="w-full flex items-center justify-evenly">
          <div class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profileData.postCount }}
            </p>
            <p class="text-white text-s">Posts</p>
          </div>
          <RouterLink :to="`/friends`" class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profileData.friendCount }}
            </p>
            <p class="text-white text-s">Friends</p>
          </RouterLink>
          <div class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profileData.badgeCount }}
            </p>
            <p class="text-white text-s">Badges</p>
          </div>
        </div>
      </div>
    </div>
    <!-- POSTS SECTION -->
    <div
      class="bg-white w-full rounded-t-[2rem] px-4 pt-6 grid grid-cols-3 gap-1"
    >
      <img
        v-for="(post, index) in profileData.posts"
        v-bind:key="index"
        :src="post.post_image"
      />
    </div>
  </div>
  <MenuBar />
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'

import honeycomb from '@/assets/honeycomb.png'
import imageFallback from '@/assets/image-fallback.jpg'

const backgroundImage = `url(${honeycomb})`

const profileData = ref({
  name: 'Susan Clay',
  postCount: 120,
  friendCount: 120,
  badgeCount: 120,
  profilePhoto: imageFallback,
  posts: [
    {
      post_id: 1,
      post_image: imageFallback,
    },
    {
      post_id: 2,
      post_image: imageFallback,
    },
    {
      post_id: 3,
      post_image: imageFallback,
    },
    {
      post_id: 4,
      post_image: imageFallback,
    },
    {
      post_id: 5,
      post_image: imageFallback,
    },
    {
      post_id: 6,
      post_image: imageFallback,
    },
    {
      post_id: 7,
      post_image: imageFallback,
    },
    {
      post_id: 8,
      post_image: imageFallback,
    },
    {
      post_id: 9,
      post_image: imageFallback,
    },
    {
      post_id: 10,
      post_image: imageFallback,
    },
    {
      post_id: 11,
      post_image: imageFallback,
    },
    {
      post_id: 12,
      post_image: imageFallback,
    },
    {
      post_id: 13,
      post_image: imageFallback,
    },
    {
      post_id: 14,
      post_image: imageFallback,
    },
    {
      post_id: 15,
      post_image: imageFallback,
    },
    {
      post_id: 16,
      post_image: imageFallback,
    },
    {
      post_id: 17,
      post_image: imageFallback,
    },
    {
      post_id: 18,
      post_image: imageFallback,
    },
    {
      post_id: 19,
      post_image: imageFallback,
    },
    {
      post_id: 20,
      post_image: imageFallback,
    },
  ],
})
</script>
