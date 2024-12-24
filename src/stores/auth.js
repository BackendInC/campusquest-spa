import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const userData = ref({
    id: 1,
    name: 'Susan Clay',
    userName: 'susan.clay',
    email: '',
    profilePhoto: '',
  })

  const isLoggedIn = ref(false)

  const isAdmin = ref(false)

  async function fetchUserData() {
    // TODO: Fetch user data from the server
  }

  async function register(username, email, password) {
    // TODO: Implement register
    // Simulate a registration request

    console.log(import.meta.env.VITE_API_URL + '/users')
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          date_of_birth: '1999-12-31',
        }),
      },
    )

    if (isFetching) {
      console.log('Fetching...')
    }

    console.log('Data:', data)
  }

  function validateEmail(email) {
    // TODO: Implement email validation
  }

  async function login(email, password) {
    // TODO: Implement login
    // Simulate a login request
    console.log(import.meta.env.VITE_API_URL)
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/users/login',
      {
        method: 'POST',
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        mode: 'no-cors',
      },
    )

    if (isFetching) {
      console.log('Fetching...')
    }

    console.log('Data:', data)
  }

  async function logout() {
    // TODO: Implement logout
    // Simulate a logout request
    return new Promise(resolve => {
      setTimeout(() => {
        userData.value.email = ''
        isLoggedIn.value = false
        resolve()
      }, 500)
    })
  }

  function updateUserName(newName) {
    // TODO: Implement updateUserName
    userData.value.name = newName
  }

  function updateProfilePhoto(newPhoto) {
    // TODO: Implement updateProfilePhoto
    userData.value.profilePhoto = newPhoto
  }

  function updatePassword(newPassword) {
    // TODO: Implement updatePassword
  }

  function requestPasswordReset(email) {
    // TODO: Implement requestPasswordReset
  }

  function updateUserBee(beeID) {
    // TODO: Implement updateUserBee
  }

  return {
    userData,
    isLoggedIn,
    isAdmin,
    fetchUserData,
    register,
    login,
    logout,
    updateUserName,
    updateProfilePhoto,
    updatePassword,
    requestPasswordReset,
    validateEmail,
    updateUserBee,
  }
})
