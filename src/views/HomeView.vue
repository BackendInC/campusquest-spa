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

    <Suspense>
      <template #fallback> Loading... </template>
      <div class="grid gap-4">
        <div v-for="(post, index) in feedStore.posts" v-bind:key="index">
          <div class="flex justify-between">
            <div class="flex items-center gap-2 ml-2 mb-2">
              <img
                :src="post.post_profile_image"
                style="border-radius: 50%; height: 48px; width: 48px"
              />
              <div>
                <h1 class="font-bold">{{ post.post_username }}</h1>
                <h2 class="text-xs font-light">{{ post.quest_name }}</h2>
              </div>
            </div>
            <i
              @click="delete_visible = true"
              v-if="authStore.isAdmin"
              class="pt-2 pr-3 pi pi-trash text-black text-2xl"
            ></i>
            <Dialog
              v-model:visible="delete_visible"
              modal
              header="Delete post"
              :style="{ width: '25rem' }"
              :draggable="false"
            >
              <span
                class="text-center text-surface-500 dark:text-surface-400 block mb-4"
                >Are you sure of deleting this post?</span
              >
              <div class="flex justify-center">
                <Button
                  class="mx-1"
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="delete_visible = false"
                ></Button>
                <Button
                  class="mx-1"
                  type="button"
                  severity="danger"
                  label="Yes"
                  @click="onDeletePost(post.post_id)"
                ></Button>
              </div>
            </Dialog>
          </div>
          <RouterLink :to="'/post-' + post.post_id" class="flex">
            <img :src="post.post_image" class="aspect-square" width="100%" />
          </RouterLink>

          <div class="p-2 flex gap-2">
            <div
              @click="feedStore.upvotePost(post.post_id)"
              class="flex items-center gap-1"
            >
              <i
                :class="[
                  post.is_upvoted ? 'pi-thumbs-up-fill' : 'pi-thumbs-up',
                ]"
                class="pi"
                style="font-size: 1.5rem"
              />

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
        <div class="h-32"></div>
      </div>
    </Suspense>
  </Content>
  <MenuBar />
</template>

<script setup>
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import MenuBar from '@/components/MenuBar.vue'
import Content from '@/components/Content.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import { useFeedStore } from '@/stores/feed'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const feedStore = useFeedStore()
const feedOptions = ref(['all', 'friends'])

const delete_visible = ref(false)

const toast = useToast()
const onDeletePost = postId => {
  delete_visible.value = false
  feedStore.deletePost(postId)
  toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
}
</script>

<style>
.p-togglebutton:disabled {
  opacity: 1;
  background: var(--p-togglebutton-background);
  border-color: var(--p-togglebutton-border-color);
  color: var(--p-togglebutton-color);
}
</style>
