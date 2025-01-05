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
        
        <RouterLink :to="`/profile-${friend.friend_id}`">
          <!-- Uncomment these lines once the backend provides "profile_picture" and "name" fields -->
          <div class="flex items-center">
            <img
              :src="`${backendBaseurl}${friend.profile_picture_url}`"
              @error="(e) => e.target.src = imageFallBack"
              alt="Profile Picture"
              class="w-12 h-12 rounded-full object-cover"
              />
            <p class="ml-4 text-black">{{ friend.username }}</p>
          </div>          
        </RouterLink>
        
        <button
            @click="() => friendToRemove = friend"
            class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm mr-2 hover:gray-400"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <Dialog class="mx-5" v-model:visible="friendToRemove" modal header="Do you really want to remove this friend?">
    <div class="flex gap-5">
      <button class="text-red-700 text-lg" @click="() => {
        friendStore.removeFriend(friendToRemove.friend_id); friendToRemove = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'Friend removed!', life: 3000 });
        }"> Remove </button>
      <button class="text-black text-lg" @click="friendToRemove = false"> Cancel </button>
    </div>
  </Dialog>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  import {computed, onMounted, ref} from 'vue'
  import honeycomb from '@/assets/bw-honeycomb.png'
  import Dialog from 'primevue/dialog'
  import { useToast } from 'primevue/usetoast';
  import imageFallBack from '@/assets/image-fallback.jpg'

  const toast = useToast();

  
  const backendBaseurl = computed(() => import.meta.env.VITE_API_URL);
  import { useFriendsStore } from '@/stores/friends';
  const friendToRemove = ref();
  
  const friendStore = useFriendsStore()

  onMounted(async () => {
    friendStore.fetchFriends();
  });
  </script>