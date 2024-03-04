import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      redirect: '/payGround'
    },
    {
      path: '/payGround',
      component: () => import('../views/payGround/index.vue')
    }
  ]
})

export default router