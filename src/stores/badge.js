import { defineStore } from 'pinia'
import { ref , computed } from 'vue'
import { useFetch } from '@vueuse/core'


export const useBadgeStore = defineStore('badge', () => {
  const achievements = ref([]) // All achievements from the API
  const userAchievements = ref([]) // Raw user achievements with only IDs
  const userDetailedAchievements = ref([]) // Matched achievements with details

  // Fetch all achievements
  async function fetchBadges() {
    try {
      const { data, error } = await useFetch(import.meta.env.VITE_API_URL + '/achievements').json()

      if (error.value) {
        console.error('Error fetching achievements:', error.value)
        return
      }

      achievements.value = data.value || []
    } catch (err) {
      console.error('An error occurred while fetching badges:', err)
    }
  }

  // Fetch user-specific achievements
  async function fetchUserBadges(username) {
    try {
      const { data, error } = await useFetch(
        import.meta.env.VITE_API_URL + `/achievements/user/${username}`
      ).json()

      if (error.value) {
        console.error('Error fetching user achievements:', error.value)
        return
      }

      userAchievements.value = data.value || []

      // Map user achievements to detailed achievements
      userDetailedAchievements.value = userAchievements.value.reduce((acc, userAchievement) => {
        // Find the matching achievement
        const matchedAchievement = achievements.value.find(
          achievement => Number(achievement.id) === Number(userAchievement.achievement_id)
        )

        if (matchedAchievement) {
          acc.push({ ...matchedAchievement, userAchievementId: userAchievement.id })
        } else {
          console.warn(`No matching achievement found for user achievement ID: ${userAchievement.achievement_id}`)
        }

        return acc
      }, [])
    } catch (err) {
      console.error('An error occurred while fetching user badges:', err)
    }
  }

  const totalTokens = computed(() => {
    return userDetailedAchievements.value.reduce((sum, achievement) => {
      return sum + (achievement.award_tokens || 0)
    }, 0)
  })

  return {
    achievements,
    userAchievements,
    userDetailedAchievements,
    totalTokens,
    fetchBadges,
    fetchUserBadges,
  }
})
