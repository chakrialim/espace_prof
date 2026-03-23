<template>
  <div class="page-layout">
    <aside class="sidebar-zone">
      <Sidebar :items="menuItems" logout-label="Déconnexion" @select="handleMenuSelect" />
    </aside>

    <main class="dashboard-zone">
      <HistoryTopBar
        title="Bonjour, Professeur"
        subtitle="Espace enseignant"
        base-breadcrumb="Historique"
        :selected-year="`${startYear}–${endYear}`"
        :role="role"
        :email="enseignant.email"
      />

      <SemesterList :start-year="startYear" :end-year="endYear" :semesters="semesters" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import HistoryTopBar from '@/components/HistoryTopBar.vue'
import SemesterList from '@/components/SemesterList.vue'

const route = useRoute()
const router = useRouter()

const enseignant = reactive({
  email: 'prof@univ-jfc.fr',
})

const role = ref('Espace Enseignant')

const menuItems = computed(() => [
  { key: 'home', label: 'Accueil', to: '/enseignant', active: route.path === '/enseignant' },
  { key: 'history', label: 'Historique', to: '/history', active: route.path === '/history' },
  { key: 'profile', label: 'Mon Profil' },
])

// Extract year from route params or use default
const startYear = computed(() => {
  const param = route.query.year as string
  return param ? parseInt(param) : 2025
})

const endYear = computed(() => startYear.value + 1)

// Reactive semesters data
const semesters = ref([
  { id: 1, label: 'S1', title: 'Semestre 1', completed: 52, total: 60, progress: 87 },
  { id: 2, label: 'S2', title: 'Semestre 2', completed: 30, total: 60, progress: 50 },
  { id: 3, label: 'S3', title: 'Semestre 3', completed: 54, total: 60, progress: 90 },
  { id: 4, label: 'S4', title: 'Semestre 4', completed: 36, total: 60, progress: 60 },
  { id: 5, label: 'S5', title: 'Semestre 5', completed: 58, total: 60, progress: 97 },
  { id: 6, label: 'S6', title: 'Semestre 6', completed: 22, total: 60, progress: 37 },
  { id: 7, label: 'S7', title: 'Semestre 7', completed: 22, total: 60, progress: 37 },
  { id: 8, label: 'S8', title: 'Semestre 8', completed: 54, total: 60, progress: 90 },
  { id: 9, label: 'S9', title: 'Semestre 9', completed: 57, total: 60, progress: 95 },
  { id: 10, label: 'S10', title: 'Semestre 10', completed: 24, total: 60, progress: 40 },
])

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) {
    return
  }

  router.push(item.to)
}
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 215px 1fr;
  background: #f4f3f8;
}

.sidebar-zone {
  border-right: 1px solid #eceaf5;
  background: #f8f7fc;
}

.dashboard-zone {
  padding: 20px 28px;
}

@media (max-width: 980px) {
  .page-layout {
    grid-template-columns: 1fr;
  }

  .sidebar-zone {
    display: none;
  }

  .dashboard-zone {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .dashboard-zone {
    padding: 12px;
  }
}
</style>
