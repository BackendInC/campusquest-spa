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
      <button @click="router.back" class="pi pi-arrow-left text-white text-lg mr-8"></button>
      <p class="text-xl mb-0.5 text-white ml-2">Post</p>
      </div>

      <div
      class="bg-white w-full h-full rounded-t-[2rem] py-3"
    >
        <div class="flex items-center gap-2 mb-2 ml-2">
          <img :src="profileImageSrc" width="15%" class="rounded-full" />
          <div>
            <h1 class="font-bold">{{ profile.username }}</h1>
            <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
          </div>
        </div>
    
        <hr class="border-gray-200 mb-3 mx-3" />
        <img :src="`${backendBaseurl}${postImage}`" alt="Post Image" width="100%" class="mb-3" />
        <div class="flex flex-col gap-2 ml-2">
          <div class="p-2 flex gap-3">
            <div class="flex items-center gap-1" @click="() => likeStore.toggleLike(postIndex)">
              <i class="pi" :class="[likedByMe ? 'pi-thumbs-up-fill' : 'pi-thumbs-up']" style="font-size: 1.5rem" />
              <h1 class="font-bold text-lg">{{ likes.length }}</h1>
            </div>
          </div>
          <div class="p-2 flex gap-3">
            <p class="font-semibold">{{ profile.username }}</p>
            <p>{{ postCaption }}</p>
          </div>
        </div>
      </div>
    </div>

</template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useProfilesStore } from '@/stores/profile';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth'
  import { useLikeStore } from '@/stores/like'
  
  const route = useRoute();
  const router = useRouter();
  const userProfileStore = useProfilesStore()
  const authStore = useAuthStore();
  const likeStore = useLikeStore();

  
  const postIndex = +route.params.index;
  const profile = computed(() => userProfileStore.profiles[authStore.userData.user_id]);
  const post = computed(() => profile.value.posts[postIndex] || {});
  const likes = computed(() => likeStore.likes[postIndex] || []);
  const likedByMe = computed(() => likeStore.likedByMe[postIndex] || false);
  
  import honeycomb from '@/assets/honeycomb.png'
  const backgroundImage = `url(${honeycomb})`

  const postImage = computed(() => post.value.image_url || '');
  const postCaption = computed(() => post.value.caption || 'No content available');
  const backendBaseurl = computed(() => import.meta.env.VITE_API_URL);
  const profileImageSrc = computed(() => `${backendBaseurl.value}users/profile_picture/${authStore.userData.username}`);


  onMounted(async () => {
    userProfileStore.fetchProfile(authStore.userData.user_id);
    likeStore.fetchIsLikedByMe(postIndex);
    likeStore.fetchLikes(postIndex);
  });
  </script>
