export default {
  path: "/list",
  redirect: "/list/card",
  meta: {
    icon: "listCheck",
    title: "列表"
  },
  children: [
    {
      path: "/list/card",
      name: "ListCard",
      component: () => import("@/views/list/card/index.vue"),
      meta: {
        icon: "card",
        title: "卡片",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
