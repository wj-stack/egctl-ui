const Layout = () => import("@/layout/index.vue");

export default {
  path: "/service-center",
  meta: {
    title: "服务中心",
    icon: "informationLine"
  },
  component: Layout,
  children: [
    {
      path: "/service-center/namespace",
      name: "service-namespace",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "命名空间"
      }
    },
    {
      path: "/service-center/service",
      name: "service-list",
      component: () => import("@/views/fighting/index.vue"),
      meta: {
        title: "服务列表"
      }
    }
  ]
};
