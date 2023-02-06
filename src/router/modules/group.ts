export default {
  path: "/group",
  redirect: "/group/etcd",
  meta: {
    icon: "informationLine",
    title: "集群管理"
  },
  children: [
    {
      path: "/group/etcd",
      name: "etcd",
      component: () => import("@/views/group/etcd/index.vue"),
      meta: {
        icon: "card",
        title: "Etcd"
      }
    },
    {
      path: "/group/gateway",
      name: "gateway",
      component: () => import("@/views/group/gateway/index.vue"),
      meta: {
        icon: "card",
        title: "网关"
      }
    }
  ]
} as RouteConfigsTable;
