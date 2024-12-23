import { defineStore } from 'pinia'
import { ref } from 'vue'
import imageFallback from '@/assets/image-fallback.jpg'

// IMPORTANT: This is a store to hold data for the user profile page
// The purpose is not to current user data, but to display the profile of any user
// If you are looking for a store to manage the current user data, check the auth.js store
export const useUserProfileStore = defineStore('userProfile', () => {
  const profileData = ref({
    name: 'Susan Clay',
    postCount: 120,
    friendCount: 120,
    badgeCount: 120,
    profilePhoto: imageFallback,
    posts: [
      {
        post_id: 1,
        post_image: imageFallback,
      },
      {
        post_id: 2,
        post_image: imageFallback,
      },
      {
        post_id: 3,
        post_image: imageFallback,
      },
      {
        post_id: 4,
        post_image: imageFallback,
      },
      {
        post_id: 5,
        post_image: imageFallback,
      },
      {
        post_id: 6,
        post_image: imageFallback,
      },
      {
        post_id: 7,
        post_image: imageFallback,
      },
      {
        post_id: 8,
        post_image: imageFallback,
      },
      {
        post_id: 9,
        post_image: imageFallback,
      },
      {
        post_id: 10,
        post_image: imageFallback,
      },
      {
        post_id: 11,
        post_image: imageFallback,
      },
      {
        post_id: 12,
        post_image: imageFallback,
      },
      {
        post_id: 13,
        post_image: imageFallback,
      },
      {
        post_id: 14,
        post_image: imageFallback,
      },
      {
        post_id: 15,
        post_image: imageFallback,
      },
      {
        post_id: 16,
        post_image: imageFallback,
      },
      {
        post_id: 17,
        post_image: imageFallback,
      },
      {
        post_id: 18,
        post_image: imageFallback,
      },
      {
        post_id: 19,
        post_image: imageFallback,
      },
      {
        post_id: 20,
        post_image: imageFallback,
      },
    ],
  })

  function fetchUserProfile(userName) {
    // TODO: Implement this function
    // Fetch user profile data from the server
    // and update the profileData ref
    return userName
  }

  return { profileData, fetchUserProfile }
})
