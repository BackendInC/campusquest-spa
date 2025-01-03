import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export const useBadgeStore = defineStore('badge', () => {
  const achievements = ref([])

  async function fetchBadges() {
    try {
      const { data, error } = await useFetch(import.meta.env.VITE_API_URL + '/achievements').json()

      if (error.value) {
        console.error(error)
        return
      }

      achievements.value = data.value || []
    } catch (err) {
      console.error('An error occurred while fetching badges:', err)
    }
  }

  //  if (achievements.value.length === 0) {
  //   achievements.value.push({
  //     description: "test",
  //     award_tokens: 10,
  //     id: 1
  //   })
  // }

  return {
    achievements,
    fetchBadges,
  }
})
