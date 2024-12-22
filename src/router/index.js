import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash-screen',
      component: () => import('../views/SplashScreen.vue'),
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
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/FriendListView.vue'),
    },
    {
      path: '/badges',
      name: 'badges',
      component: () => import('../views/BadgesView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/quests',
      name: 'quests',
      component: () => import('../views/QuestsView.vue'),
    },
    {
      path: '/customize-bee',
      name: 'customize-bee',
      component: () => import('../views/CustomizationView.vue'),
    },
    {
      path: '/quest_create',
      name: 'quest_create',
      component: () => import('../views/QuestCreate.vue'),
    },
  ],
})

export default router
