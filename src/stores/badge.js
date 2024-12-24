import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBadgeStore = defineStore('badge', () => {
  const achievements = ref([
    {
      id: 1,
      description: 'Description 1',
      award_tokens: 50,
    },
    {
      id: 2,
      description: 'Description 2',
      award_tokens: 100,
    },
    {
      id: 3,
      description: 'Description 3',
      award_tokens: 75,
    },
    {
      id: 4,
      description: 'Description 4',
      award_tokens: 150,
    },
  ])

  async function fetchAchievements() {
    // TODO: Fetch achievements from the server
  }

  return {
    achievements,
    fetchAchievements,
  }
})
