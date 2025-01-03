import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import imageFallBack from '@/assets/image-fallback.jpg'

import { useFetch } from '@vueuse/core'
import { computedAsync } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

export const useFeedStore = defineStore('feed', () => {
  const feedSelector = ref('all') // all, friends
  const forceRefresh = ref(0)

  const posts = ref([])

  watch(
    [feedSelector, forceRefresh],
    async (newval, oldval) => {
      if (newval[0] === 'all') {
        fetchPosts('/feed')
      } else {
        fetchPosts('/feed/friends')
      }
    },
    { immediate: true },
  )

  const somepost = {
    post_id: 1,
    post_image: imageFallBack,
    post_username: 'Basshunter',
    post_upvotes: 2,
    post_downvotes: 0,
    post_fullname: 'Basshunter',
    quest_name: 'DotA',
    post_description: 'Ni sitter i det dar Ventrilo och spelar DotA',
    is_upvoted: true,
  }

  async function fillPostDetails(rawPost) {
    const likes_count = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${rawPost.id}/likes/count`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        },
      )
      return data.value
    })()

    const username = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/${rawPost.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        },
      )
      return JSON.parse(data.value).username
    })()

    const quest_name = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/quests/${rawPost.quest_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        },
      )
      if (error.value) {
        return 'Quest Name'
      }
      return JSON.parse(data.value).name
    })()

    const is_liked = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${rawPost.id}/like`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        },
      )
      return data.value === 'true'
    })()

    return {
      post_id: rawPost.id,
      post_image: import.meta.env.VITE_API_URL + rawPost.image_url,
      post_username: username,
      post_upvotes: likes_count,
      post_downvotes: 0,
      quest_name: quest_name,
      post_description: rawPost.caption,
      is_upvoted: is_liked,
    }
  }

  async function fetchPosts(url) {
    const posts_parsed = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.userData.jwt}`,
          },
        },
      )
      let result = JSON.parse(data.value)
      if (result.length > 0)
        result.reverse()
      return result
    })()
    
    console.log(posts_parsed)
    posts.value = []
    for (const rawPost of posts_parsed) {
      posts.value.push(await fillPostDetails(rawPost))
    }
  }

  async function upvotePost(postId) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/posts/${postId}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.userData.jwt}`,
        },
      },
    )
    for (let i = 0; i < posts.value.length; i++) {
      if (posts.value[i].post_id == postId) {
        if (posts.value[i].is_upvoted) {
          posts.value[i].is_upvoted = false
          posts.value[i].post_upvotes--
        } else {
          posts.value[i].is_upvoted = true
          posts.value[i].post_upvotes++
        }
      }
    }
  }

  function downvotePost(postId) {
    // TODO: Implement downvotePost
  }

  return {
    feedSelector,
    posts,
    upvotePost,
    downvotePost,
  }
})
