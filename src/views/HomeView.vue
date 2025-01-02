<template>
  <Content title="Explore Feed" bgColor="#F0D269" titleColor="white">
    <div class="grid place-items-center">
      <SelectButton
        v-model="feedStore.feedSelector"
        :options="feedOptions"
        size="small"
        :optionDisabled="option => option === feedStore.feedSelector"
      />
    </div>

    <div class="grid gap-4">
      <div v-for="(post, index) in feedStore.posts" v-bind:key="index">
        <div class="flex items-center gap-2 ml-2 mb-2">
          <img :src="post.post_image" width="15%" class="rounded-full" />
          <div>
            <h1 class="font-bold">{{ post.post_username }}</h1>
            <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
          </div>
        </div>

        <img :src="post.post_image" class="aspect-square" width="100%" />

        <div class="p-2 flex gap-2">
          <div @click="feedStore.upvotePost(post.post_id)" class="flex items-center gap-1">
            <i :class="[post.is_upvoted? 'pi-thumbs-up-fill' : 'pi-thumbs-up']" class="pi" style="font-size: 1.5rem" />
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

import { useFeedStore } from '@/stores/feed'

const feedStore = useFeedStore()

const feedOptions = ref(['all', 'friends'])
</script>

<style>
.p-togglebutton:disabled {
  opacity: 1;
  background: var(--p-togglebutton-background);
  border-color: var(--p-togglebutton-border-color);
  color: var(--p-togglebutton-color);
}
</style>
