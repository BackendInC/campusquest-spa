import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import imageFallBack from '@/assets/image-fallback.jpg'

export const useFeedStore = defineStore('feed', () => {
  const feedSelector = ref('all') // all, friends

  const posts = computed(() => {
    if (feedSelector.value === 'all') {
      return fetchAllPosts()
    } else {
      return fetchFriendsPosts()
    }
  })

  function fetchAllPosts() {
    return [
      {
        post_id: 1,
        post_image: imageFallBack,
        post_username: 'Mert',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Mert Bozkurtlar',
        quest_name: 'Quest Name',
        post_description: 'This is a post description',
      },
      {
        post_id: 2,
        post_image: imageFallBack,
        post_username: 'Gizem',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Gizem Aydin',
        quest_name: 'Quest Name',
        post_description: 'This is a great quest',
      },
      {
        post_id: 3,
        post_image: imageFallBack,
        post_username: 'Mert',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Mert Bozkurtlar',
        quest_name: 'Quest Name',
        post_description: 'This is a post description',
      },
      {
        post_id: 4,
        post_image: imageFallBack,
        post_username: 'Gizem',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Gizem Aydin',
        quest_name: 'Quest Name',
        post_description: 'This is a great quest',
      },
    ]
  }

  function fetchFriendsPosts() {
    return [
      {
        post_id: 1,
        post_image: imageFallBack,
        post_username: 'Mert',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Mert Bozkurtlar',
        quest_name: 'Quest Name',
        post_description: 'This is a post description',
      },
      {
        post_id: 3,
        post_image: imageFallBack,
        post_username: 'Mert',
        post_upvotes: 2,
        post_downvotes: 2,
        post_fullname: 'Mert Bozkurtlar',
        quest_name: 'Quest Name',
        post_description: 'This is a post description',
      },
    ]
  }

  function upvotePost(postId) {
    // TODO: Implement upvotePost
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
