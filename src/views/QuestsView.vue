<template>
  <div class="w-full h-full bg-white">
    <div
      class="px-4 pt-20 pb-4 flex flex-col gap-4 bg-emerald-500 rounded-3xl mb-2"
      :style="{
        backgroundImage: backgroundImage,
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
      }"
    >
      <h1 class="text-2xl font-bold text-white">Quests</h1>
    </div>

    <!-- Quest List -->
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
          @click="questsStore.display_filter = 'pending'"
          :class="[
            questsStore.display_filter === 'pending'
              ? 'bg-emerald-500'
              : 'bg-gray-500',
          ]"
          class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
        >
          Pending
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
          :key="quest.id"
          :value="quest.id"
        >
          <AccordionHeader>
            <img
              :style="{
                filter:
                  quest.status === 'completed'
                    ? 'brightness(100%) sepia(100%) saturate(500%) hue-rotate(45deg)'
                    : quest.status === 'pending'
                      ? 'brightness(100%) sepia(100%) saturate(500%) hue-rotate(240deg)'
                      : '',
              }"
              class="h-6 w-6"
              src="@/assets/quest_icon.png"
            />
            <span
              :class="{ 'line-through': quest.status === 'completed' }"
              class="text-xl font-bold"
              >{{ quest.title }}</span
            >
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-col gap-4">
              <p>{{ quest.details }}</p>
              <Button
                class="bg-blue-400"
                @click="send_quest(quest.id)"
                v-if="!quest.completed"
                >Submit</Button
              >
              <img v-if="quest.completed" :src="quest.image" />
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </main>

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
import { Camera, CameraResultType } from '@capacitor/camera'
import { useQuestsStore } from '@/stores/quests'

import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const questsStore = useQuestsStore()

function send_quest(quest_id) {
  takePicture().then(image => {
    questsStore.submitQuest(quest_id, image)
  })
}

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
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
