import { createRouter, createWebHistory } from 'vue-router'

// Importing views
import HomePage from '../views/HomePage.vue'
import EnseignantPage from '../views/EnseignantPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import SemesterPage from '../views/SemesterPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/enseignant', name: 'Enseignant', component: EnseignantPage },
  { path: '/history', name: 'History', component: HistoryPage },
  { path: '/semesters', name: 'Semesters', component: SemesterPage },
  // Catch-all
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = true // Replace with real auth logic
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
