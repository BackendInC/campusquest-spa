import { defineStore } from 'pinia'
import imageFallback from '@/assets/image-fallback.jpg'
import { ref } from 'vue'

export const useFriendsStore = defineStore('friends', () => {
  const friends = [
    { id: 1, name: 'Michael Scott', profile_picture: imageFallback },
    { id: 2, name: 'Jim Halpert', profile_picture: imageFallback },
    { id: 3, name: 'Pam Beesly', profile_picture: imageFallback },
    { id: 4, name: 'Dwight Schrute', profile_picture: imageFallback },
    { id: 5, name: 'Angela Martin', profile_picture: imageFallback },
    { id: 6, name: 'Kevin Malone', profile_picture: imageFallback },
  ]

  async function fetchFriends(username) {
    /*
        Fetch friends of the user with the ${username}
         */
    // TODO: Fetch friends from the server
  }

  async function removeFriend(userName) {
    // TODO: Implement this
  }

  async function addFriend(userName) {
    // TODO: implement this
  }

  return {
    friends,
    fetchFriends,
    addFriend,
    removeFriend,
  }
})
