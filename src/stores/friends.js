import { defineStore } from 'pinia'
import imageFallback from '@/assets/image-fallback.jpg'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFetch } from '@vueuse/core'

const authStore = useAuthStore()

export const useFriendsStore = defineStore('friends', () => {
  let friends = [
    { id: 1, name: 'Michael Scott', profile_picture: imageFallback },
    { id: 2, name: 'Jim Halpert', profile_picture: imageFallback },
    { id: 3, name: 'Pam Beesly', profile_picture: imageFallback },
    { id: 4, name: 'Dwight Schrute', profile_picture: imageFallback },
    { id: 5, name: 'Angela Martin', profile_picture: imageFallback },
    { id: 6, name: 'Kevin Malone', profile_picture: imageFallback },
  ]

  async function fillFriendsNames() {
    for (i = 0; i < friends.length(); i++) {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/${friends[i].id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const response = JSON.parse(data.value)
      friends[i].name = response.username;
    }
  }
  
  async function fillFriendsPicture() {
    for (i = 0; i < friends.length(); i++) {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/profile_picture/${friends[i].name}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      friends[i].profile_picture = data.value
    }
  }
  
  async function fetchFriends() {
    friends = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/friends`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const response = JSON.parse(data.value)
      const result = response.map((e) => {({
        id: e.friend_id,
        name: null,
        profile_picture: null
      })});
      return result
    })();
    console.log(friends);
    await fillFriendsNames();
    await fillFriendsPicture();
  }

  async function removeFriend(friend_id) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/friends/${friend_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const response = JSON.parse(data.value)
    return response
  }

  async function addFriend(friend_id) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/friends`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: authStore.userData.user_id,
          friend_id: friend_id,
          id: 0
        }),
      }
    )
    const response = JSON.parse(data.value)
    return response
  }

  return {
    friends,
    fetchFriends,
    addFriend,
    removeFriend,
  }
})
