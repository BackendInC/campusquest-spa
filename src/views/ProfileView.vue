<template>
  <div class="w-full h-full bg-[#31556e]">
    <!-- PROFILE SECTION -->
    <div
      class="px-4 pt-12 pb-4 flex flex-col gap-4"
      :style="{
        backgroundImage: backgroundImage,
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundColor: '#31556e',
      }"
    >
      <!-- Name and Settings Icons -->
      <div class="flex items-center justify-between">
        <h1 class="text-white text-2xl">
          {{ userProfileStore.profileData.name }}
        </h1>
        <RouterLink to="/settings" class="flex items-center justify-end">
          <i class="pi-cog pi text-2xl text-white"></i>
        </RouterLink>
      </div>
      <!-- Profile Photo and Stats -->
      <div class="flex items-center justify-between">
        <img
          class="w-24 aspect-square object-cover rounded-xl"
          :src="userProfileStore.profileData.profilePhoto"
        />
        <div class="w-full flex items-center justify-evenly">
          <div class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ userProfileStore.profileData.postCount }}
            </p>
            <p class="text-white text-s">Posts</p>
          </div>
          <RouterLink :to="`/friends`" class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ userProfileStore.profileData.friendCount }}
            </p>
            <p class="text-white text-s">Friends</p>
          </RouterLink>
          <RouterLink :to="`/badges`" class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ userProfileStore.profileData.badgeCount }}
            </p>
            <p class="text-white text-s">Badges</p>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- POSTS SECTION -->
    <div
      class="bg-white w-full rounded-t-[2rem] px-4 pt-6 grid grid-cols-3 gap-1"
    >
    <div v-for="(post, index) in userProfileStore.profileData.posts">
      <RouterLink :to="`/post-${index}`">
        <img v-bind:src="post.post_image">
      </RouterLink>
    </div>
    
    </div>
  </div>
  <MenuBar />
</template>

<script setup>
import { useUserProfileStore } from '@/stores/userProfile'
import { RouterLink } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'

import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const userProfileStore = useUserProfileStore()
</script>
