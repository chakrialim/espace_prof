<template>
  <div class="page-layout">
    <aside class="sidebar-zone">
      <Sidebar :items="menuItems" logout-label="Déconnexion" @select="handleMenuSelect" />
    </aside>

    <main class="dashboard-zone">
      <HistoryTopBar
        :title="pageTitle"
        subtitle="Espace enseignant"
        base-breadcrumb="Historique"
        :selected-year="selectedYear ? `${selectedYear}–${selectedYear + 1}` : undefined"
        :role="role"
        :email="enseignant.email"
      />

      <AcademicYearList :years="academicYears" @year-select="handleYearSelect" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import HistoryTopBar from '@/components/HistoryTopBar.vue'
import AcademicYearList from '@/components/AcademicYearList.vue'

const enseignant = reactive({
  prenom: 'Jean',
  nom: 'Dupont',
  email: 'prof@univ-jfc.fr',
})

const pageTitle = computed(() =>
  enseignant.prenom
    ? `Bonjour, ${enseignant.prenom} ${enseignant.nom} 👋`
    : `Bonjour, Professeur 👋`,
)

const route = useRoute()
const router = useRouter()

const role = ref('Espace Enseignant')
const selectedYear = ref<number | null>(null)

const menuItems = computed(() => [
  { key: 'home', label: 'Accueil', to: '/enseignant', active: route.path === '/enseignant' },
  { key: 'history', label: 'Historique', to: '/history', active: route.path === '/history' },
  { key: 'profile', label: 'Mon Profil', to: '/profil', active: route.path === '/profil' },
])

const academicYears = ref([
  { id: 1, start: 2025, end: 2026 },
  { id: 2, start: 2024, end: 2025 },
  { id: 3, start: 2023, end: 2024 },
])

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) {
    return
  }

  router.push(item.to)
}

function handleYearSelect(year: number) {
  selectedYear.value = year
}
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
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
</style>
