import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

/**
 * Store for managing quests.
 *
 * @typedef {Object} Quest
 * @property {string} name - The name of the quest.
 * @property {string} description - Description of the quest.
 * @property {string|null} image_url - URL of the image associated with the quest.
 * @property {boolean} is_complete - Indicates if the quest is completed.
 * @property {boolean} is_verified - Indicates if the quest is verified.
 * @property {number|null} post_id - The ID of the post associated with the quest.
 * @property {number} quest_id - The ID of the quest.
 *
 * @example
 * {
 *   id: 6,
 *   name: "The Famous Lake",
 *   description: "Take a tour around the Lake in the Ayazaga Campus, and post a picture of the most unique bug you encounter!",
 *   image_url: null,
 *   is_complete: false,
 *   is_verified: false,
 *   post_id: null,
 *   quest_id: 6
 * }
 **/

export const useQuestsStore = defineStore('quests', () => {
  const quests = ref([])

  async function createQuest(_name, _description, _image) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/quests',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: _name,
          description: _description,
          location_long: 0,
          location_lat: 0,
          points: 0,
          start_date: "2025-01-04",
          end_date: "2025-01-04",
          image: _image
        })
      },
    )
    return error.value
  }
  
  async function fetchQuests(jwt) {
    // TODO: Fetch quests from the server
    // and update the quests ref
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/questsuser',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    if (!error.value) {
      quests.value = JSON.parse(data.value)
    }
  }

  // A ref to filter quests by status
  const display_filter = ref('all') // 'all', 'completed', 'active'

  // Getter to display quests based on the filter
  const quests_displayed = computed(() => {
    if (display_filter.value === 'all') return quests.value
    else if (display_filter.value === 'active') {
      return quests.value.filter(e => {
        return e.is_complete == false
      })
    } else {
      return quests.value.filter(e => {
        return e.is_complete
      })
    }
  })

  async function submitQuest(jwt, quest_id, image, caption) {
    const file = DataURIToBlob(image)
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('quest_id', quest_id)
    formData.append('image', file)

    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/posts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      },
    )
    if (!error.value) {
      fetchQuests(jwt)
    }
  }

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  return { quests, display_filter, quests_displayed, fetchQuests, submitQuest, createQuest }
})
