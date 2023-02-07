export default {
  path: "/group",
  redirect: "/group/easegress",
  meta: {
    icon: "informationLine",
    title: "网关管理"
  },
  children: [
    {
      path: "/group/easegress",
      name: "easegress",
      component: () => import("@/views/group/easegress/index.vue"),
      meta: {
        icon: "card",
        title: "Easegress"
      }
    },
    {
      path: "/group/http-server",
      name: "http-server",
      component: () => import("@/views/group/http-server/index.vue"),
      meta: {
        icon: "card",
        title: "HTTP-Server"
      }
    }
  ]
} as RouteConfigsTable;
