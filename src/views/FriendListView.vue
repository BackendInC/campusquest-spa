<template>
  <div class="min-h-screen bg-gray-100 p-4 relative">
    <div class="overflow-hidden absolute top-0 left-0 right-0 z-0 max-w-full">
      <img
        :src="honeycomb"
        class="object-cover -translate-y-40 opacity-35 scale-150"
      />
    </div>

    <div class="flex items-center mb-4 mt-16 relative z-10">
      <RouterLink
        to="/profile"
        class="pi pi-arrow-left text-black text-lg mr-8"
      ></RouterLink>
      <h1 class="text-black text-2xl">Friends</h1>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
    >
      <div
        v-for="friend in friendStore.friends"
        :key="friend.id"
        class="flex items-center bg-white p-3 rounded-lg shadow justify-between"
      >
        <div class="flex items-center">
          <RouterLink :to="`/profile-${friend.name}`">
          <!-- Uncomment these lines once the backend provides "profile_picture" and "name" fields -->
          <!-- 
          <img
            :src="friend.profile_picture"
            alt="Profile Picture"
            class="w-12 h-12 rounded-full object-cover"
          />
          <p class="ml-4 text-black">{{ friend.name }}</p>
          -->
          <p class="ml-4 text-black">Friend ID: {{ friend.id }}</p>
        </RouterLink>
        </div>
        <button
          @click="friendStore.removeFriend(friend.id)"
          class="bg-gray-100 text-black px-3 py-1 rounded hover:bg-gray-300"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import honeycomb from '@/assets/bw-honeycomb.png'

import { useFriendsStore } from '@/stores/friends'

const friendStore = useFriendsStore()
</script>
