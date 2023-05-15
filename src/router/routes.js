const routes = [
  {
    path: "/",
    component: () => import("src/layouts/StandardLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "blog", component: () => import("pages/BlogPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/NotFound.vue"),
  },
];

export default routes;
