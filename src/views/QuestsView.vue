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
          @click="(display_filter = 'all')"
          :class="[display_filter === 'all' ? 'bg-emerald-500' : 'bg-gray-500']"
          class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
        >
          All
        </Button>
        <Button
          @click="(display_filter = 'active')"
          :class="[
            display_filter === 'active' ? 'bg-emerald-500' : 'bg-gray-500',
          ]"
          class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
        >
          Active
        </Button>
        <Button
          @click="(display_filter = 'pending')"
          :class="[
            display_filter === 'pending' ? 'bg-emerald-500' : 'bg-gray-500',
          ]"
          class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
        >
          Pending
        </Button>
        <Button
          @click="(display_filter = 'completed')"
          :class="[
            display_filter === 'completed' ? 'bg-emerald-500' : 'bg-gray-500',
          ]"
          class="text-white text-sm font-medium px-4 py-0 rounded-xl ml-1 h-8"
        >
          Completed
        </Button>
      </div>

      <Accordion value="null">
        <AccordionPanel
          v-for="quest in quests_displayed"
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
import { ref, computed } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'

import honeycomb from '@/assets/honeycomb.png'
const backgroundImage = `url(${honeycomb})`

const quests = ref([
  {
    id: 1,
    title: 'Find the Hidden Pond',
    details:
      "Explore the campus to discover the hidden pond near the science building. It's a peaceful spot, perfect for some quiet time.",
    status: 'active',
  },
  {
    id: 2,
    title: 'Library Challenge',
    details:
      'Visit the library and find a book on your favorite subject. Take a picture of it and show it to the librarian to complete this quest.',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Campus Fitness Walk',
    details:
      'Walk around the entire campus and snap a selfie in front of the main statue. Share the picture in the group to earn points.',
    status: 'completed',
  },
  {
    id: 4,
    title: "Professor's Secret",
    details:
      'Ask a professor about a topic they are passionate about, and write down the most interesting thing you learned. Share it with your classmates.',
    status: 'active',
  },
  {
    id: 5,
    title: 'Art Gallery Hunt',
    details:
      'Find three pieces of art on campus that you find inspiring. Take a photo with each and add them to your quest report.',
    status: 'active',
  },
  {
    id: 6,
    title: 'Community Service',
    details:
      'Volunteer at the community center for at least one hour. Snap a picture while helping out and share it with the group to complete the quest.',
    status: 'active',
  },
])

const display_filter = ref('all') // 0 - show all, 1 - show active, 2 - show completed, 3- show waiting_approval

function send_quest(quest_id) {
  takePicture().then(image => {
    quests.value = quests.value.map(e => {
      if (e.id === quest_id) {
        e.completed = true
        e.image = image.webPath
      }
      return e
    })
  })
}

const quests_displayed = computed(() => {
  if (display_filter.value === 'all') return quests.value
  return quests.value.filter(e => {
    return e.status === display_filter.value
  })
})

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
