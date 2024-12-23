<template>
  <Content title="Explore Feed" bgColor="#F0D269" titleColor="white">
    <div class="grid place-items-center">
      <SelectButton
        v-model="feedSelector"
        :options="feedOptions"
        size="small"
        :optionDisabled="option => option === feedSelector"
      />
    </div>

    <div class="grid gap-4">
      <div v-for="(post, index) in posts" v-bind:key="index">
        <div class="flex items-center gap-2 ml-2 mb-2">
          <img :src="post.post_image" width="15%" class="rounded-full" />
          <div>
            <h1 class="font-bold">{{ post.post_username }}</h1>
            <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
          </div>
        </div>

        <img :src="post.post_image" class="aspect-square" width="100%" />

        <div class="p-2 flex gap-2">
          <div class="flex items-center gap-1">
            <i class="pi pi-thumbs-up" style="font-size: 1.5rem" />
            <h1 class="font-bold text-lg">{{ post.post_upvotes }}</h1>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-thumbs-down" style="font-size: 1.5rem" />
            <h1 class="font-bold text-lg">{{ post.post_downvotes }}</h1>
          </div>
        </div>

        <h1>
          <span class="font-bold">{{ post.post_fullname }}</span>
          {{ post.post_description }}
        </h1>
      </div>
    </div>
  </Content>
  <MenuBar />
</template>

<script setup>
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import MenuBar from '@/components/MenuBar.vue'
import Content from '@/components/Content.vue'

import honeycomb from '@/assets/honeycomb.png'
import imageFallBack from '@/assets/image-fallback.jpg'

const backgroundImage = `url(${honeycomb})`

const feedSelector = ref('All')
const feedOptions = ref(['All', 'Friends'])

const posts = ref([
  {
    post_id: 1,
    post_image: imageFallBack,
    post_username: 'Mert',
    post_upvotes: 2,
    post_downvotes: 2,
    post_fullname: 'Mert Bozkurtlar',
    quest_name: 'Quest Name',
    post_description: 'This is a post description',
  },
  {
    post_id: 2,
    post_image: imageFallBack,
    post_username: 'Gizem',
    post_upvotes: 2,
    post_downvotes: 2,
    post_fullname: 'Gizem Aydin',
    quest_name: 'Quest Name',
    post_description: 'This is a great quest',
  },
  {
    post_id: 3,
    post_image: imageFallBack,
    post_username: 'Mert',
    post_upvotes: 2,
    post_downvotes: 2,
    post_fullname: 'Mert Bozkurtlar',
    quest_name: 'Quest Name',
    post_description: 'This is a post description',
  },
  {
    post_id: 4,
    post_image: imageFallBack,
    post_username: 'Gizem',
    post_upvotes: 2,
    post_downvotes: 2,
    post_fullname: 'Gizem Aydin',
    quest_name: 'Quest Name',
    post_description: 'This is a great quest',
  },
])
</script>

<style>
.p-togglebutton:disabled {
  opacity: 1;
  background: var(--p-togglebutton-background);
  border-color: var(--p-togglebutton-border-color);
  color: var(--p-togglebutton-color);
}
</style>
