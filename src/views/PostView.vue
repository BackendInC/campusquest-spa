<template>
    <div class="w-full h-full bg-[#31556e]">
      <!-- Header Section -->
      <div
        class="px-4 pt-12 pb-4 flex flex-col gap-4"
        :style="{
          backgroundImage: backgroundImage,
          backgroundBlendMode: 'luminosity',
          backgroundPosition: 'center',
          backgroundColor: '#31556e',
        }"
      >
        <button @click="goBack" class="pi pi-arrow-left text-white text-lg ml-2 mt-3"></button>
        <p class="text-xl mb-0.5 text-white ml-2">Post</p>
      </div>
  
      <!-- Post Content Section -->
      <div class="bg-white w-full h-full rounded-t-[2rem] py-3">
        <div class="flex items-center gap-2 mb-2 ml-2">
          <img :src="postAuthor.profilePhoto" width="15%" class="rounded-full" />
          <div>
            <h1 class="font-bold">{{ postAuthor.username }}</h1>
            <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
          </div>
        </div>
  
        <hr class="border-gray-200 mb-3 mx-3" />
        <img :src="postImage" alt="Post Image" width="100%" class="mb-3" />
        <div class="flex flex-col gap-2 ml-2">
          <!-- Post Stats -->
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
  
          <!-- Post Content -->
          <div class="p-2">
            <p class="font-semibold">{{ postAuthor.username }}</p>
            <p>{{ postContent }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProfilesStore } from '@/stores/profile';
import { useNavigation } from '@/composables/useNavigation'

const route = useRoute();
const router = useRouter();
const profilesStore = useProfilesStore();

const backgroundImage = `url('@/assets/honeycomb.png')`;

const postId = route.params.postId;
const fromQuery = route.query.from || ''; // Capture the originating page
const source = route.query.source || ''; // Additional metadata if needed

// Reactive variables
const post = ref(null);
const postAuthor = ref({});

// Navigation function
const { goBack } = useNavigation();


onMounted(async () => {
  try {
    // Fetch post and author data
    post.value = await profilesStore.fetchPost(postId);
    if (fromQuery.includes('profile')) {
      const username = fromQuery.split('-')[1];
      postAuthor.value = await profilesStore.fetchProfile(username);
    }
  } catch (error) {
    console.error('Error fetching post or profile data:', error);
  }
});

// Computed properties for dynamic binding
const postImage = computed(() => post.value?.post_image || '');
const postContent = computed(() => post.value?.content || 'No content available');
</script>
