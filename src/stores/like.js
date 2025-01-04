import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'


export const useLikeStore = defineStore('likes', () => {
  const likes = ref({});
  const likedByMe = ref({});
  
  async function fetchLikes(post_id) {
      const authStore = useAuthStore();
    try {
      const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts/like/${post_id}`, {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`
        }
      }).json()

      if (error.value) {
        console.error(error)
        return
      }

      likes.value[post_id] = data.value || []
    } catch (err) {
      console.error('An error occurred while fetching badges:', err)
    }
  }

  async function toggleLike(post_id) {
    const authStore = useAuthStore();
    try {
        const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts/like/${post_id}`, {
            headers: {
              Authorization: `Bearer ${authStore.userData.jwt}`
            },
            method: "POST"
          }).json()
  
        if (error.value) {
          console.error(error)
          return
        }
        
        fetchLikes(post_id);
        fetchIsLikedByMe(post_id);
        return;
      } catch (err) {
        console.error('An error occurred while fetching badges:', err)
      }
  }

  async function fetchIsLikedByMe(post_id) {
    const authStore = useAuthStore();
    try {
        const { data, error } = await useFetch(`${import.meta.env.VITE_API_URL}/posts/like/${post_id}`, {
            headers: {
              Authorization: `Bearer ${authStore.userData.jwt}`
            },
          }).json()
  
        if (error.value) {
          return
        }
        likedByMe.value[post_id] = data.value;
        
        return;
        
    } catch (err) {
        console.error('An error occurred while fetching badges:', err)
      }

  }

  return {
    likes,
    likedByMe,
    fetchIsLikedByMe,
    toggleLike,
    fetchLikes
  }
})
