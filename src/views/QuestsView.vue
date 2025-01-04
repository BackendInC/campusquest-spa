<template>
<div class="w-full h-full bg-white">
  <div
    class="px-4 pt-20 pb-4 flex gap-4 bg-emerald-500 rounded-b-3xl mb-2 justify-between items-center"
    :style="{
            backgroundImage: backgroundImage,
            backgroundBlendMode: 'luminosity',
            backgroundPosition: 'center',
            }"
    >
    <h1 class="text-2xl font-bold text-white">Quests</h1>
    <RouterLink to="/quest-create">
      <i v-if="authStore.isAdmin" class="pi pi-plus-circle text-white text-2xl"></i>
    </RouterLink>
    </div>

    <!-- Quests Upload Dialog -->
    <Dialog v-model:visible="showSubmitDialog" modal header="Post">
      <h1>Your submission looks great! Now add a caption for it:</h1>
      <InputText v-model="caption" placeholder="Caption" />
      <Button @click="async () => await postQuest()">Post</Button>
    </Dialog>

    <!-- Quest List -->
    <Suspense>
      <template #fallback>Loading...</template>
      <main class="container mx-auto px-4">
        <div class="flex mb-3">
          <Button
            @click="questsStore.display_filter = 'all'"
            :class="[
              questsStore.display_filter === 'all'
                ? 'bg-emerald-500'
                : 'bg-gray-500',
            ]"
            class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
          >
            All
          </Button>
          <Button
            @click="questsStore.display_filter = 'active'"
            :class="[
              questsStore.display_filter === 'active'
                ? 'bg-emerald-500'
                : 'bg-gray-500',
            ]"
            class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
          >
            Active
          </Button>
          <Button
            @click="questsStore.display_filter = 'completed'"
            :class="[
              questsStore.display_filter === 'completed'
                ? 'bg-emerald-500'
                : 'bg-gray-500',
            ]"
            class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
          >
            Completed
          </Button>
        </div>

        <Accordion value="null">
          <AccordionPanel
            v-for="quest in questsStore.quests_displayed"
            :key="quest.quest_id"
            :value="quest.quest_id"
          >
            <AccordionHeader>
              <img
                :style="{
                  filter: quest.is_complete
                    ? 'brightness(100%) sepia(100%) saturate(500%) hue-rotate(45deg)'
                    : '',
                }"
                class="h-6 w-6"
                src="@/assets/quest_icon.png"
              />
              <span
                :class="{ 'line-through': quest.is_complete }"
                class="text-xl font-bold"
                >{{ quest.name }}</span
              >
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-4">
                <p>{{ quest.description }}</p>
                <Button
                  class="bg-blue-400"
                  @click="send_quest(quest.quest_id)"
                  v-if="!quest.is_complete"
                  >Submit</Button
                >
                <img
                  v-if="quest.is_complete"
                  :src="`${backendURL}${quest.image_url}`"
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </main>
    </Suspense>
    <MenuBar />
  </div>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { onBeforeMount, ref } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useQuestsStore } from '@/stores/quests'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(async () => {
  await questsStore.fetchQuests(authStore.userData.jwt)
  console.log(questsStore.quests)
})

import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const questsStore = useQuestsStore()
const backendURL = ref(import.meta.env.VITE_API_URL)

// Quest post / submit
const showSubmitDialog = ref(false)
const caption = ref('')
const lastTakenImage = ref('')
const lastQuestId = ref('')

async function send_quest(quest_id) {
  console.log(quest_id)
  lastQuestId.value = quest_id
  takePicture().then(image => {
    lastTakenImage.value = 'data:image/jpeg;base64,' + image.base64String
    showSubmitDialog.value = true
  })
}

async function postQuest() {
  console.log(
    lastQuestId.value,
    caption.value,
    lastTakenImage.value.base64String,
  )
  await questsStore.submitQuest(
    authStore.userData.jwt,
    lastQuestId.value,
    lastTakenImage.value,
    caption.value,
  )
  showSubmitDialog.value = false
}

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  })

  return image
}
</script>

<style scoped>
.yellow img {
  filter: invert(85%) sepia(100%) saturate(500%) hue-rotate(45deg); /* Golden */
  scale: 1.2;
}

.purple img {
  filter: invert(85%) sepia(100%) saturate(500%) hue-rotate(270deg); /* Purple */
}
</style>
