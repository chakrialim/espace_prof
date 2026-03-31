import { createRouter, createWebHistory } from 'vue-router'

// Importing views
import HomePage from '../views/HomePage.vue'
import EnseignantPage from '../views/EnseignantPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import SemesterPage from '../views/SemesterPage.vue'
import FilierePage from '../views/FilierePage.vue'
import EnseignementsPage from '../views/EnseignementsPage.vue'
import ProfilPage from '../views/ProfilPage.vue'
import PlanningPage from '../views/PlanningPage.vue'
import ResultatsEnseignementPage from '../views/ResultatsEnseignementPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/enseignant', name: 'Enseignant', component: EnseignantPage },
  { path: '/history', name: 'History', component: HistoryPage },
  { path: '/semesters', name: 'Semesters', component: SemesterPage },
  { path: '/filiere', name: 'Filiere', component: FilierePage },
  { path: '/enseignements', name: 'Enseignements', component: EnseignementsPage },
  { path: '/profil', name: 'Profil', component: ProfilPage },
  { path: '/enseignant/planning', name: 'Planning', component: PlanningPage },
  { path: '/profil/resultats/:code', name: 'ResultatsEnseignement', component: ResultatsEnseignementPage },
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
