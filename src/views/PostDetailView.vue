<template>
    <div class="w-full h-full bg-[#31556e]">
      <div
        class="px-4 pt-12 pb-4 flex flex-col gap-4 items-start"
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
        <div class="flex items-center justify-between gap-2 m-3">
          <div class="flex gap-2">
            <img :src="profileImageSrc" width="15%" class="rounded-full ml-2" />
            <div class="flex flex-col">
              <h1 class="font-bold">{{ post?.username }}</h1>
              <h2 class="text-xs font-light">{{ post?.questname }}</h2>
            </div>
          </div>
          <button
            v-if="isMyPost"
            class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm mr-4 hover:gray-400"
            @click="() => removePostModalOpen = true"
          >
            Remove
          </button>
          <div v-if="!isMyPost"></div>
        </div>
    
        <hr class="border-gray-200 my-2 mx-3" />
        <img :src="`${backendBaseurl}${postImage}`" alt="Post Image" width="100%" class="mb-3" />
        <div class="flex flex-col gap-1 ml-2">
          <div class="p-1 flex gap-3">
            <div class="flex items-center gap-1" @click="() => toggleLikes()">
              <i class="pi" :class="[likedByMe ? 'pi-thumbs-up-fill' : 'pi-thumbs-up']" style="font-size: 1.5rem" />
              <h1 class="font-bold text-lg">{{ likes }}</h1>
            </div>
          </div>
          <div class="p-1 flex gap-3">
            <p class="font-semibold">{{ post?.username }}</p>
            <p>{{ postCaption }}</p>
          </div>
        </div>
      </div>
    </div>

    <Dialog class="mx-5" v-model:visible="removePostModalOpen" modal header="Do you really want to remove this post?">
    <div class="flex gap-5">
      <button class="text-red-700 text-lg" @click="() => {
        removePost(); removePostModalOpen = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'Post removed!', life: 3000 });}"> Remove </button>
      <button class="text-black text-lg" @click="removePostModalOpen = false"> Cancel </button>
    </div>
  </Dialog>

</template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useProfilesStore } from '@/stores/profile';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth'
  import { useLikeStore } from '@/stores/like'
  import Dialog from 'primevue/dialog'
  import { useToast } from 'primevue/usetoast';
  
  const toast = useToast();
  
  const route = useRoute();
  const router = useRouter();
  const userProfileStore = useProfilesStore()
  const authStore = useAuthStore();
  const likeStore = useLikeStore();
  
  const postId = +route.params.index;
  const post = computed(() => userProfileStore.posts[postId]);
  const likes = computed(() => post.value?.likes_count || 0);
  const likedByMe = computed(() => likeStore.likedByMe[postId] || false);
    
  import honeycomb from '@/assets/honeycomb.png'
  const backgroundImage = `url(${honeycomb})`

  const postImage = computed(() => post.value?.image_url || '');
  const postCaption = computed(() => post.value?.caption || 'No content available');
  const backendBaseurl = computed(() => import.meta.env.VITE_API_URL);
  const profileImageSrc = computed(() => `${backendBaseurl.value}${post.value?.profile_picture_url}`);

  const isMyPost = computed(() => authStore.userData.user_id === post.value?.user_id);

  const removePostModalOpen = ref(false);

  async function removePost() {
    const success = await userProfileStore.deletePost(post?.value.id, authStore.userData.user_id);
    if (success) {
      router.back(); // Navigate back after successful deletion
    } else {
     alert('Failed to delete the post. Please try again.');
    }
}

  async function toggleLikes(){
    await likeStore.toggleLike(post.value?.id);
    await userProfileStore.fetchPostById(postId);
    await likeStore.fetchIsLikedByMe(postId);
  }

  onMounted(async () => {
    userProfileStore.fetchPostById(postId);
    likeStore.fetchIsLikedByMe(postId);
  });
  </script>
