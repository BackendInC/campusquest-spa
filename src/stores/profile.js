import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { useAuthStore } from '@/stores/auth'

export const useProfilesStore = defineStore('profiles', () => {
  const profiles = ref({});
  const posts = ref({});
  const authStore = useAuthStore();

  async function fetchProfile(userId) {
    const authStore = useAuthStore();

    try {
      // Fetch profile data
      const { data: profileData, error: profileError } = await useFetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`
        }
      }
    ).json()

      if (profileError.value) {
        console.error(`Error fetching profile for user ${userId}:`, profileError.value);
        return null;
      }

      // Fetch profile picture existence
      const { data: profilePictureResponse, error: profilePictureError } = await useFetch(`${import.meta.env.VITE_API_URL}/users/profile_picture/${profileData.value.username}`, {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`,
        },
      }).text();

      if (profilePictureError.value) {
        console.error(`Error fetching profile picture for user ${userId}:`, profilePictureError.value);
      }

      const hasProfilePicture = profilePictureResponse.value !== ""; // Assuming a non-empty response means a picture exists


      // Fetch posts data
      const { data: postsData, error: postsError } = await useFetch(`${import.meta.env.VITE_API_URL}/users/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`
        }
      }).json();

      if (postsError.value) {
        console.error(`Error fetching posts for user ${userId}:`, postsError.value);
        return null;
      }

      const profile = {
        username: profileData.value.username || 'Unknown',
        numPosts: profileData.value.num_posts || 0,
        numLikes: profileData.value.num_likes || 0,
        numAchievements: profileData.value.num_achievements || 0,
        numQuestsCompleted: profileData.value.num_quests_completed || 0,
        numFriends: profileData.value.num_friends || 0,
        posts: postsData.value || [], // Store posts directly
      };

      profiles.value[userId] = profile;
      return profile;
    } catch (err) {
      console.error(`An error occurred while fetching profile or posts for user ${userId}:`, err);
      return null;
    }
  }

  async function deletePost(postId, userId) {
    const authStore = useAuthStore();
    try {
      const { data, error } = await useFetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        }
      ).json();

      if (error.value) {
        console.error(`Error deleting post ${postId}:`, error.value);
        return false;
      }

      // Update the user's profile in the store by removing the deleted post
      if (profiles.value[userId]) {
        profiles.value[userId].posts = profiles.value[userId].posts.filter(
          (post) => post.id !== postId
        );
      }

      console.log(`Post ${postId} deleted successfully.`);
      return true;
    } catch (err) {
      console.error(`An error occurred while deleting post ${postId}:`, err);
      return false;
    }
  }

  async function fetchPostById(postId){
     try {
    const { data , error } = await useFetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.userData.jwt}`,
        },
      }
    ).json();

    if(error.value){
      console.error(`Error fetching post ${postId}:`, error.value);
      return;
    }

    posts.value[postId] = data.value;
  }
  catch (err) {
    console.error(`An error occurred while deleting post ${postId}:`, err);
  }
  }

  async function banUser(userId) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/ban_user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.userData.jwt}`,
        },
      },
    )
    return error.value
  }
  
  return {
    profiles,
    fetchProfile,
    deletePost,
    fetchPostById,
    posts,
    banUser
  };
});
