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
        title: "Etcd",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
