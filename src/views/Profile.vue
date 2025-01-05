<template>
    <div class="w-full h-full bg-[#31556e]">
      <!-- PROFILE SECTION -->
      <div
        class="px-4 pt-12 pb-4 flex flex-col items-start gap-4"
        :style="{
          backgroundImage: backgroundImage,
          backgroundBlendMode: 'luminosity',
          backgroundPosition: 'center',
          backgroundColor: '#31556e',
        }"
      >
        <button @click="router.back" class="pi pi-arrow-left text-white text-lg mr-8"></button>
  
        <!-- Name -->
        <div class="flex items-center justify-between items-center">
          <h1 class="text-white text-2xl">
            {{ profile?.username || 'Loading...' }}
          </h1>
          <i @click="ban_visible = true" v-if="authStore.isAdmin" class="ml-2 mt-1 pi pi-ban text-white text-2xl"></i>
         </div>
        <Dialog v-model:visible="ban_visible" modal header="Ban user" :style="{ width: '25rem' }" :draggable="false">
          <div class="flex flex-col">
            <span class="text-surface-500 dark:text-surface-400 block mb-2">Enter the reason for banning {{profile?.username}}:</span>
            <Form v-slot="$form" @submit="onBanUser" class="flex flex-col gap-4 w-full">
           
          <InputText v-model="ban_reason" name="username" type="text" class="mb-2" required/>
          <div class="flex justify-center ">
          <Button class="mx-1" type="button" label="Cancel" severity="secondary" @click="ban_visible = false"></Button>
          <Button class="mx-1" type="submit" severity="danger" label="Ban"></Button>
          </div>
          </Form>
          </div>
        </Dialog>
      
        <!-- Profile Photo and Stats -->
        <div class="flex items-center justify-between self-stretch">
          <img
            class="w-24 aspect-square object-cover rounded-xl"
            :src="profileImageSrc"
            @error="(e) => e.target.src = imageFallback"
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
              <p class="text-white text-s">Badges</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- POSTS SECTION -->
      <div
      class="bg-white w-full rounded-t-[2rem] px-4 pt-6 grid grid-cols-3 h-full gap-1 content-start"
      >
        <p v-if="!profile?.posts?.length" class="col-span-3 text-center">
          No posts available
        </p>
        <div
          v-for="post in profile?.posts || []"
          :key="post.id"
          class="w-full aspect-square object-cover overflow-hidden"
        >
            <RouterLink :to="`/post-${post.id}`" class="w-full h-full">
            <img
              class="w-full h-full rounded-md"
              :src="`${backendBaseurl}${post.image_url}`"  
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
  import { useAuthStore } from '@/stores/auth'
  const authStore = useAuthStore()
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast'
  import { Form } from '@primevue/forms';
  
  const backgroundImage = `url(${honeycomb})`
  
  const router = useRouter()
  
  const profilesStore = useProfilesStore()

  const backendBaseurl = computed(() => import.meta.env.VITE_API_URL);
  
  const route = useRoute();
  
  const id = +route.params.index 
  const profile = computed(() => profilesStore.profiles[id]);

  console.log(profile);
  console.log(profilesStore.profiles);

  const profileImageSrc = computed(() => `${backendBaseurl.value}/users/profile_picture/${profile.value?.username}`);

  const ban_visible = ref(false)
  const ban_reason = ref('')
  
  onMounted(async () => {
    profilesStore.fetchProfile(id)
  })

  const toast = useToast()
  const onBanUser = ({ valid }) => {
  ban_visible.value = false
  if (valid) {
  profilesStore.banUser(id)
  toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
  }

  </script>
  
