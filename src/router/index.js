import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'PostsList',
    component: () => import('../views/courses/CoursesList.vue')
  },
  {
    path: '/posts/{:id}',
    name: 'PostDetalls',
    component: () => import('../views/courses/CourseDetalls.vue')
  },
  {
    path: '/posts/{:id}/edit',
    name: 'PostEdit',
    component: () => import('../views/courses/CourseEdit.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
