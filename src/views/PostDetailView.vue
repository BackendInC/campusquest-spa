<template>
    <div class="w-full h-full bg-[#31556e]">
      <div
        class="px-4 pt-12 pb-4 flex flex-col gap-4"
        :style="{
          backgroundImage: backgroundImage,
          backgroundBlendMode: 'luminosity',
          backgroundPosition: 'center',
          backgroundColor: '#31556e',
        }"
      >
      <RouterLink
          to="/profile"
          class="pi pi-arrow-left text-white text-lg ml-2 mt-3"
      ></RouterLink>
      <p class="text-xl mb-0.5 text-white ml-2">Post</p>
      </div>

      <div
      class="bg-white w-full h-full rounded-t-[2rem] py-3"
    >
        <div class="flex items-center gap-2 m-3">
          <img :src="userProfileStore.profileData.profilePhoto" width="15%" class="rounded-full" />
          <div>
            <h1 class="font-semibold">{{ userProfileStore.profileData.name }}</h1>
            <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
          </div>
        </div>
    
        <hr class="border-gray-200 mb-3 mx-3" />
        <img :src="postImage" alt="Post Image" width="100%" class="mb-3" />
        <div class="flex flex-col ml-2">
          <div class="p-2 flex gap-3">
            <div class="flex items-center gap-1">
              <i class="pi pi-thumbs-up" style="font-size: 1.5rem" />
              <h1 class="font-bold text-lg">{{ post.post_upvotes }}</h1>
            </div>
            <div class="flex items-center gap-1">
              <i class="pi pi-thumbs-down" style="font-size: 1.5rem" />
              <h1 class="font-bold text-lg">{{ post.post_downvotes }}</h1>
            </div>
          </div>
          <div class="p-2 flex gap-3">
            <p class="font-semibold">{{ userProfileStore.profileData.name }}</p>
            <p>{{ postContent }}</p>
          </div>
        </div>
      </div>
    </div>

</template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUserProfileStore } from '@/stores/userProfile';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const userProfileStore = useUserProfileStore();
  
  const postIndex = route.params.index;
  const post = computed(() => userProfileStore.profileData.posts[postIndex] || {});
  
  import honeycomb from '@/assets/honeycomb.png'
  const backgroundImage = `url(${honeycomb})`

  const postImage = computed(() => post.value.post_image || '');
  const postContent = computed(() => post.value.content || 'No content available');
  </script>
