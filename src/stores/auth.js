import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore('auth', () => {
  const userData = useStorage("userData", {
    user_id: null,
    username: null,
    email: null,
    profilePhoto: '',
    jwt: '',
  });

  const isLoggedIn = useStorage("isLoggedIn", false)

  const isAdmin = useStorage("isAdmin", false)

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
          username: userData.value.username,
          code: verificationCode,
        }),
      },
    )
    console.log(data)

    if (!error) {
      const response = JSON.parse(data.value)
    }

    return error
  }

  async function login(username, password) {
    // Simulate a login request
    const { isFetching, error, data } = await useFetch(
      import.meta.env.VITE_API_URL + '/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    )

    console.log(error.value)
    if (error.value === null) {
      const jsonify = JSON.parse(data.value)
      console.log(jsonify)
      userData.value.jwt = jsonify.jwt_token
      userData.value.user_id = jsonify.user.id
      userData.value.username = jsonify.user.username
      isLoggedIn.value = true
    }
    if (error.value === 'Unauthorized') {
      userData.value.username = username
    }

    return error
  }

  async function logout() {
    userData.value = {
      user_id: null,
      username: null,
      email: null,
      profilePhoto: '',
      jwt: '',
    };
    isLoggedIn.value = false;
    isAdmin.value = false;
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
