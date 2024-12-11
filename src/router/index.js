import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from '../views/SplashScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash-screen',
      component: SplashScreen,
    },
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/Auth/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/Auth/RegisterView.vue'),
        },
        {
          path: '/email-check',
          name: 'email_check',
          component: () => import('../views/Auth/EmailCheckView.vue'),
        },
      ],
    },
  ],
})

export default router
