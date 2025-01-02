import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import imageFallBack from '@/assets/image-fallback.jpg'

import { useFetch } from '@vueuse/core'
import { computedAsync } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

export const useFeedStore = defineStore('feed', () => {
  const feedSelector = ref('all') // all, friends
  const forceRefresh = ref(false)

  const posts = computedAsync(
    async () => {
      if (feedSelector.value === 'all' || forceRefresh.value) {
        forceRefresh.value = false
        return await fetchAllPosts()
      } else {
        forceRefresh.value = false
        return await fetchFriendsPosts()
      }
    },
    null,
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
    is_upvoted: true
  }

  async function fillPostDetails(rawPost) {
    const likes_count = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${p.id}/likes/count`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      return data.value
    })();

    const username = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/${p.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      return JSON.parse(data.value).username
    })();

    const is_liked = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${p.id}/like`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      return data.value === 'true'
    })();
    
    return {
      post_id: rawPost.id,
      post_image: rawPost.image,
      post_username: username,
      post_upvotes: likes_count,
      post_downvotes: 0,
      post_username: username,
      quest_name: 'Quest Name',
      post_description: rawPost.caption,
      is_upvoted: is_liked
    };
  }

  async function fetchAllPosts() {
    const posts_parsed = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + '/posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.userData.jwt}`
          }
        }
      )
      return JSON.parse(data.value)
    })();

    let allPosts = []
    
    for (rawPost of posts_parsed) {
      const cookedPost = fillPostDetails(rawPost);
      allPosts.push(cookedPost); 
    }
  })


  const somepost = {
    post_id: 1,
    post_image: imageFallBack,
    post_username: 'Basshunter',
    post_upvotes: 2,
    post_downvotes: 0,
    post_fullname: 'Basshunter',
    quest_name: 'DotA',
    post_description: 'Ni sitter i det dar Ventrilo och spelar DotA',
    is_upvoted: true
  }

  async function fillPostDetails(rawPost) {
    const likes_count = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${p.id}/likes/count`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return data.value
    })();

    const username = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/users/${p.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return JSON.parse(data.value).username
    })();

    const is_liked = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + `/posts/${p.id}/like`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return data.value === 'true'
    })();
    
    return {
      post_id: rawPost.id,
      post_image: rawPost.image,
      post_username: username,
      post_upvotes: likes_count,
      post_downvotes: 0,
      post_username: username,
      quest_name: 'Quest Name',
      post_description: rawPost.caption,
      is_upvoted: is_liked
    };
  }

  async function fetchAllPosts() {
    const posts_parsed = await (async () => {
      const { isFetching, error, data } = await useFetch(
        import.meta.env.VITE_API_URL + '/posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return JSON.parse(data.value)
    })();

    let allPosts = []
    
    for (rawPost of posts_parsed) {
      const cookedPost = fillPostDetails(rawPost);
      allPosts.push(cookedPost); 
    }
    allPosts.push(somepost);
    console.log(allPosts)
    return allPosts;
  }

  async function fetchFriendsPosts() {
    const friends = await (async () => {
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
      const result = response.map((e) => e.friend_id);
      return result
    })();
    
    let friendsPost = []
    for (friend_id of friends) {
      const posts_parsed = await (async () => {
        const { isFetching, error, data } = await useFetch(
          import.meta.env.VITE_API_URL + `users/${friend_id}/posts/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.userData.jwt}`
            }
          }
        )
        return JSON.parse(data.value)
      })();
      console.log(posts_parsed)

      for (rawPost of posts_parsed) {
        const cookedPost = fillPostDetails(rawPost)
        friendsPost.push(cookedPost)
      }
    }
    friendsPost.push(somepost)
    return friendsPost
  }

  async function upvotePost(postId) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + `/posts/${postId}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.userData.jwt}`
        }
      }
    )
    forceRefresh.value = true
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
