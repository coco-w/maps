import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'IndexPage',
    // redirect: '/homePage',
    redirect: '/echart'
    // component: () => import('@/views/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: 'echart',
        component: () => import('@/views/echartMap/echartMap.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
