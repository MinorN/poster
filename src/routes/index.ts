import { createRouter, createWebHistory } from "vue-router"
import Index from "@/views/Index.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "home",
      component: Index,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "template/:id",
          name: "template",
          component: () => import("@/views/TemplateDetail.vue"),
        },
      ],
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("@/views/Editor.vue"),
    },
  ],
})

export default router
