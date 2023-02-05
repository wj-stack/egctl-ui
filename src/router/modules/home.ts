const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  meta: {
    icon: "homeFilled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: "仪表盘",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
