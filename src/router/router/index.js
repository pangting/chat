import { createRouter, createWebHistory } from 'vue-router'
import TalkView from '@/views/TalkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'talk',
      component: TalkView
    },
  ]
})

export default router
