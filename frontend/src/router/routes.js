
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/standard.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'region', component: () => import('pages/region.vue')},
      { path: 'occupation', component: () => import('pages/occupation.vue')},
      { path: 'sector', component: () => import('pages/sector.vue')},
      { path: 'about', component: () => import('pages/about.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
