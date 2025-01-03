import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { useAuthStore } from '@/stores/auth'

export const useProfilesStore = defineStore('profiles', () => {
  const profiles = ref({});

  async function fetchProfile(userId) {
    const authStore = useAuthStore();
    if (profiles.value[userId]) {
      // Avoid redundant API calls
      return profiles.value[userId];
    }

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

      // Fetch posts data
      const { data: postsData, error: postsError } = await useFetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`, {
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

  return {
    profiles,
    fetchProfile,
  };
});
