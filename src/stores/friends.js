import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFetch } from '@vueuse/core'

const authStore = useAuthStore()

export const useFriendsStore = defineStore('friends', () => {
  const friends = ref([])

  async function getFriendName(friend_id) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/users/${friend_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.userData.jwt}`
        }
      }
    )
    const response = JSON.parse(data.value)
    return response.username
  }
  
  async function fetchFriends() {
    const { error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/friends`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.userData.jwt}`
        }
      }
    ).json();
    if (error.value) {
      console.error(error)
      return
    }
    friends.value = data.value;
  }

  async function removeFriend(friend_id) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/friends/${friend_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.userData.jwt}`
        }
      }
    )
    const response = JSON.parse(data.value)
    fetchFriends();
    return response
  }

  async function addFriend(friend_id) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/friends/${friend_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.userData.jwt}`
        }
      }
    )
    if (error.value) {
      return {error: true, detail: error.value}      
    } 
    const response = JSON.parse(data.value)
    return { error: false, name: await getFriendName(response.friend_id) }
  }

  return {
    friends,
    fetchFriends,
    addFriend,
    removeFriend,
  }
})
