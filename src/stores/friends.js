import { defineStore } from 'pinia'
import imageFallback from '@/assets/image-fallback.jpg'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFetch } from '@vueuse/core'
import { computedAsync } from '@vueuse/core'

const authStore = useAuthStore()

export const useFriendsStore = defineStore('friends', () => {
  let _friends = [
    { id: 1, name: 'Michael Scott', profile_picture: imageFallback },
    { id: 2, name: 'Jim Halpert', profile_picture: imageFallback },
    { id: 3, name: 'Pam Beesly', profile_picture: imageFallback },
    { id: 4, name: 'Dwight Schrute', profile_picture: imageFallback },
    { id: 5, name: 'Angela Martin', profile_picture: imageFallback },
    { id: 6, name: 'Kevin Malone', profile_picture: imageFallback },
  ]
  const forceRefresh = ref(0)
  const friends = ref([])

  watch(forceRefresh, async (newval, oldval) => {
    fetchFriends();
  }, { immediate: true })

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

  async function fillFriendsNames() {
    for (let i = 0; i < _friends.length; i++) {
      _friends[i].name = await getFriendName(_friends[i].id);
    }
  }
  
  async function fillFriendsPicture() {
    for (let i = 0; i < _friends.length; i++) {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/profile_picture/${_friends[i].name}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      if (error.value) {
        _friends[i].profile_picture = imageFallback
        console.log("Image not found", _friends[i].name)
      } else {
        _friends[i].profile_picture = data.value
      }
    }
  }
  
  async function fetchFriends() {
    _friends = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/friends`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      const response = JSON.parse(data.value)
      const result = response.map((e) => ({
        id : e,
        name : null,
        profile_picture : null
      }));
      return result
    })();
    await fillFriendsNames()
    await fillFriendsPicture()
    friends.value = _friends
    console.log(friends)
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
    forceRefresh.value++
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
