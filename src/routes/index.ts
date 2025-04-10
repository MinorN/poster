import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("@/views/Editor.vue"),
    },
    {
      path: "/template/:id",
      name: "template",
      component: () => import("@/views/TemplateDetail.vue"),
    },
  ],
})

export default router
