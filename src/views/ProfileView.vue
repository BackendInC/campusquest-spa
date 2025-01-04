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
        {{ profile?.username }}
      </h1>
      <div class="justify-end flex space-x-4">
      <RouterLink to="/qr" class="flex">
        <i class="pi-qrcode pi text-2xl text-white"></i>
      </RouterLink>
      <RouterLink to="/settings" class="flex items-center ">
        <i class="pi-cog pi text-2xl text-white"></i>
      </RouterLink>
      </div>
    </div>
      <!-- Profile Photo and Stats -->
      <div class="flex items-center justify-between">
        <img
          class="w-24 aspect-square object-cover rounded-xl"
          :src="profileImageSrc"
        />
        <div class="w-full flex items-center justify-evenly">
          <div class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profile?.numPosts }}
            </p>
            <p class="text-white text-s">Posts</p>
          </div>
          <RouterLink :to="`/friends`" class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profile?.numFriends }}
            </p>
            <p class="text-white text-s">Friends</p>
          </RouterLink>
          <RouterLink :to="`/badges`" class="flex flex-col items-center">
            <p class="text-white text-xl font-semibold">
              {{ profile?.numAchievements }}
            </p>
            <p class="text-white text-s">Badges</p>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- POSTS SECTION -->
    <div
      class="bg-white w-full rounded-t-[2rem] px-4 pt-6 grid grid-cols-3 h-full gap-1 content-start"
    >
      <div v-for="(post) in profile?.posts" :key="post.id" class="w-full aspect-square object-cover overflow-hidden">
        <RouterLink :to="`/post-${post.id}`" class="w-full h-full">
          <img :src="`${backendBaseurl}${post.image_url}`" alt="Post Image" class="w-full h-full rounded-md"/>
        </RouterLink>
      </div>
    </div>
    
  </div>
  <MenuBar />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProfilesStore } from '@/stores/profile'
import { RouterLink } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();

import honeycomb from '@/assets/honeycomb.png'
import fallbackImageUrl from '@/assets/image-fallback.jpg'
const backgroundImage = `url(${honeycomb})`

const userProfileStore = useProfilesStore()

const profile = computed(() => userProfileStore.profiles[authStore.userData.user_id]);

const backendBaseurl = computed(() => import.meta.env.VITE_API_URL);

const profileImageSrc = computed(() => `${backendBaseurl.value}/users/profile_picture/${authStore.userData.username}`);

onMounted(() => {
  console.log(authStore.userData.user_id)
  userProfileStore.fetchProfile(authStore.userData.user_id)

})
</script>

