import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const userData = ref({
    id: 1,
    name: 'Susan Clay',
    userName: 'susan.clay',
    email: '',
    profilePhoto: '',
  })

  const isLoggedIn = ref(false)

  async function fetchUserData() {
    // TODO: Fetch user data from the server
  }

  function register(name, email, password) {
    // TODO: Implement register
    // Simulate a registration request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === '' || email === '' || password === '') {
          reject(new Error('Please fill in all fields'))
        } else {
          userData.value.email = email
          isLoggedIn.value = true
          resolve({ name, email })
        }
      }, 1000)
    })
  }

  function validateEmail(email) {
    // TODO: Implement email validation
  }

  function login(email, password) {
    // TODO: Implement login
    // Simulate a login request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === '' || password === '') {
          reject(new Error('Please fill in all fields'))
        } else {
          userData.value.email = email
          isLoggedIn.value = true
          resolve({ email })
        }
      }, 1000)
    })
  }

  function logout() {
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
