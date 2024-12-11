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
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
        },
        {
          path: '/email-check',
          name: 'email_check',
          component: () => import('../views/EmailCheckView.vue'),
        },
      ],
    },
  ],
})

export default router
