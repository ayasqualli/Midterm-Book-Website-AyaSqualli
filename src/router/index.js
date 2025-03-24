import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetail  from '../views/BookDetail.vue'
import NotFound from '../views/NotFoundView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {path: '/details/:id',
    name: 'bookDetails',
    component : BookDetail
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
