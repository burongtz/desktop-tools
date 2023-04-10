import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
  path: '/',
  alias: '/home',
  name: 'home',
  component: () => import('../pages/HomePage.vue'),
}, {
  path: '/qrs/create',
  name: 'qrs.create',
  component: () => import('../pages/QrPage.vue')
}, {
  path: '/404',
  name: 'errors.not-found',
  component: () => import('../pages/errors/Error404Page.vue'),
}, {
  path: '/:pathMatch(.)',
  redirect: {name: 'errors.not-found'}
}]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
