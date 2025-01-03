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
        <button @click="router.back" class="pi pi-arrow-left text-white text-lg mr-8"></button>
  
        <!-- Name -->
        <div class="flex items-center justify-between">
          <h1 class="text-white text-2xl">
            {{ profile?.username || 'Loading...' }}
          </h1>
        </div>
  
        <!-- Profile Photo and Stats -->
        <div class="flex items-center justify-between">
          <img
            class="w-24 aspect-square object-cover rounded-xl"
            :src="profile?.profilePhoto || imageFallback"
            alt="Profile Photo"
          />
          <div class="w-full flex items-center justify-evenly">
            <div class="flex flex-col items-center">
              <p class="text-white text-xl font-semibold">
                {{ profile?.numPosts || 0 }}
              </p>
              <p class="text-white text-s">Posts</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-white text-xl font-semibold">
                {{ profile?.numFriends || 0 }}
              </p>
              <p class="text-white text-s">Friends</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-white text-xl font-semibold">
                {{ profile?.numAchievements || 0 }}
              </p>
              <p class="text-white text-s">Achievements</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- POSTS SECTION -->
      <div
        class="bg-white w-full rounded-t-[2rem] px-4 pt-6 grid grid-cols-3 h-full gap-1"
      >
        <p v-if="!profile?.posts?.length" class="col-span-3 text-center">
          No posts available
        </p>
        <div
          v-for="post in profile?.posts || []"
          :key="post.post_id"
          class="flex justify-center items-center"
        >
            <RouterLink :to="`/post-${post.post_id}`">
            <img
              class="w-full h-24 bg-gray-300 object-cover rounded-md"
              :src="post.post_image || imageFallback"  
              alt="Post Image"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useProfilesStore } from '@/stores/profile'
  import { useRoute, useRouter } from 'vue-router'
  import imageFallback from '@/assets/image-fallback.jpg'
  import honeycomb from '@/assets/honeycomb.png'

  
  const backgroundImage = `url(${honeycomb})`
  
  const router = useRouter()
  
  const profilesStore = useProfilesStore()
  
  const route = useRoute();
  const currentPagePath = computed(() => route.fullPath); // Ensure the full path is computed
  
  // Log the computed value
  console.log("aaaaqqq");
  console.log(currentPagePath.value); // Accessing the computed value with .value
  
  const username = route.params.index // Fetch the username passed via the route
  const profile = computed(() => profilesStore.profiles[username]);

  console.log(profile);
  console.log(profilesStore.profiles);
  
  onMounted(async () => {
    profile.value = await profilesStore.fetchProfile(username)
  })
  </script>
  