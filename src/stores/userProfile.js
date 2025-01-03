import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import imageFallback from '@/assets/image-fallback.jpg'
import { useAuthStore } from '@/stores/auth'


export const useUserProfileStore = defineStore('userProfile', () => {
  const profileData = ref({
    name: 'Name Surname',
    postCount: 0,
    friendCount: 0,
    badgeCount: 0,
    profilePhoto: imageFallback,
    posts: [],
  })

  async function fetchPosts() {
    const authStore = useAuthStore();

    try {
      const { data, error } = await useFetch(import.meta.env.VITE_API_URL + '/posts', {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`
        }
      }).json()

      if (error.value) {
        console.error('Error fetching posts:', error.value)
        return
      }

      profileData.value.posts = data.value.map(post => ({
        post_id: post.id,
        post_image: post.image,
        content: post.caption,
      })) || []
      profileData.value.postCount = data.value.length || 0
    } catch (err) {
      console.error('An error occurred while fetching posts:', err)
    }
  }

  async function fetchFriends() {
    try {
      const { data, error } = await useFetch(import.meta.env.VITE_API_URL + '/friends').json()

      if (error.value) {
        console.error('Error fetching friends:', error.value)
        return
      }

      profileData.value.friendCount = data.value.length || 0
    } catch (err) {
      console.error('An error occurred while fetching friends:', err)
    }
  }

  async function fetchBadges() {
    try {
      const { data, error } = await useFetch(import.meta.env.VITE_API_URL + '/achievements').json()

      if (error.value) {
        console.error('Error fetching badges:', error.value)
        return
      }

      profileData.value.badgeCount = data.value.length || 0
    } catch (err) {
      console.error('An error occurred while fetching badges:', err)
    }
  }

  async function fetchUserProfile() {
    await Promise.all([fetchPosts(), fetchFriends(), fetchBadges()])
  }

  return {
    profileData,
    fetchPosts,
    fetchFriends,
    fetchBadges,
    fetchUserProfile,
  }
})
