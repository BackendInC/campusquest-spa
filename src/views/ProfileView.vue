<template>
  <div
    class="w-full h-full"
    style="
      background-image: url(blue_honeycomb.png);
      background-size: contain;
      background-color: #31556e;
      padding-top: 24px;
    "
  >
    <div class="">
      <!-- PROFILE SECTION -->
      <div class="p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between z-10 relative">
          <h1 class="text-white text-2xl">{{ profileData.name }}</h1>
          <RouterLink to="/settings" class="flex items-center justify-end">
            <i class="pi-cog pi text-2xl text-white"></i>
          </RouterLink>
        </div>
        <div class="flex items-center gap-5 z-10 relative">
          <img
            class="w-24 aspect-square object-cover rounded-xl"
            :src="profileData.profilePhoto"
          />
          <div class="flex flex-col justify-between grow">
            <div class="flex gap-3 max-w-60">
              <div class="flex flex-col grow justify-center items-center">
                <p class="text-white text-xl font-semibold">
                  {{ profileData.postCount }}
                </p>
                <p class="text-white text-s">Posts</p>
              </div>
              <div class="flex flex-col grow justify-center items-center">
                <p class="text-white text-xl font-semibold">
                  {{ profileData.friendCount }}
                </p>
                <p class="text-white text-s">Friends</p>
              </div>
              <div class="flex flex-col grow justify-center items-center">
                <p class="text-white text-xl font-semibold">
                  {{ profileData.badgeCount }}
                </p>
                <p class="text-white text-s">Badges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- POSTS SECTION -->
      <div class="bg-white rounded-t-3xl p-5 pt-5 grid grid-cols-2 gap-4">
        <div v-for="(post, index) in profileData.posts" v-bind:key="index">
          <img
            :src="post.post_image"
            class="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
    <MenuBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MenuBar from '@/components/MenuBar.vue'

const profileData = ref({
  name: 'Susan Clay',
  postCount: 120,
  friendCount: 120,
  badgeCount: 120,
  profilePhoto: '/image-fallback.jpg',
  posts: [
    {
      post_id: 1,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 2,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 3,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 4,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 5,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 6,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 7,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 8,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 9,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 10,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 11,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 12,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 13,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 14,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 15,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 16,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 17,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 18,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 19,
      post_image: '/image-fallback.jpg',
    },
    {
      post_id: 20,
      post_image: '/image-fallback.jpg',
    },
  ],
})
</script>
