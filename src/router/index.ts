import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      redirect: '/miniVueVBarrage'
    },
    {
      path: '/miniVueVBarrage',
      component: () => import('@p/components/minivueBarrage/src/demo/index.vue')
    }
  ]
})

export default router
