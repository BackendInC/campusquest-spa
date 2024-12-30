import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const userData = ref({
    user_id: null,
    username: null,
    email: null,
    profilePhoto: '',
    jwt: '',
  })

  const isLoggedIn = ref(false)

  const isAdmin = ref(false)

  async function fetchUserData() {
    // TODO: Fetch user data from the server
  }

  async function register(username, email, password) {
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

    if (!error.value) {
      const response = JSON.parse(data.value)
      userData.value.user_id = response.id
    }

    return error
  }

  async function validateEmail(verificationCode) {
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/users/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.value.user_id,
          code: verificationCode,
        }),
      },
    )

    if (!error) {
      const response = JSON.parse(data.value)
    }

    return error
  }

  async function login(email, password) {
    // Simulate a login request
    console.log(import.meta.env.VITE_API_URL)
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      },
    )

    if (!error) {
      userData.value.jwt = data.value
      userData.value.email = email
      isLoggedIn.value = true
    }

    return error
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
