import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestsStore = defineStore('quests', () => {
  const quests = ref([
    {
      id: 1,
      title: 'Find the Hidden Pond',
      details:
        "Explore the campus to discover the hidden pond near the science building. It's a peaceful spot, perfect for some quiet time.",
      status: 'active',
    },
    {
      id: 2,
      title: 'Library Challenge',
      details:
        'Visit the library and find a book on your favorite subject. Take a picture of it and show it to the librarian to complete this quest.',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Campus Fitness Walk',
      details:
        'Walk around the entire campus and snap a selfie in front of the main statue. Share the picture in the group to earn points.',
      status: 'completed',
    },
    {
      id: 4,
      title: "Professor's Secret",
      details:
        'Ask a professor about a topic they are passionate about, and write down the most interesting thing you learned. Share it with your classmates.',
      status: 'active',
    },
    {
      id: 5,
      title: 'Art Gallery Hunt',
      details:
        'Find three pieces of art on campus that you find inspiring. Take a photo with each and add them to your quest report.',
      status: 'active',
    },
    {
      id: 6,
      title: 'Community Service',
      details:
        'Volunteer at the community center for at least one hour. Snap a picture while helping out and share it with the group to complete the quest.',
      status: 'active',
    },
  ])

  async function fetchQuests() {
    // TODO: Fetch quests from the server
    // and update the quests ref
    isLoading.value = true
    isLoading.value = false
  }

  // A ref to track if the data is loading
  const isLoading = ref(false)

  // A ref to filter quests by status
  const display_filter = ref('all')

  // Getter to display quests based on the filter
  const quests_displayed = computed(() => {
    if (display_filter.value === 'all') return quests.value
    return quests.value.filter(e => {
      return e.status === display_filter.value
    })
  })

  function submitQuest(quest_id, image) {
    quests.value = quests.value.map(e => {
      if (e.id === quest_id) {
        e.completed = true
        e.image = image.webPath
      }
      return e
    })
  }

  return { quests, display_filter, quests_displayed, submitQuest }
})
