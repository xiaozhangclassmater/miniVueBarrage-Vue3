import { getPageTitle } from "@/common";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/miniVueVBarrage",
    },
    {
      path: "/miniVueVBarrage",
      name: "miniVueVBarrage",
      meta: {
        title: "弹幕",
      },
      // component: () => import('@p/components/minivueBarrage/src/demo/index.vue') // packages
      component: () => import("@/views/payGround/index.vue"),
    },
    {
      path: "/pdfToCanvas",
      name: "pdfToCanvas",
      meta: {
        title: "pdf转canvas",
      },
      // component: () => import('@p/components/minivueBarrage/src/demo/index.vue') // packages
      component: () => import("@/views/vuePdfToCanvas/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = getPageTitle(String(to.meta.title));
  }
  next();
});

export default router;
