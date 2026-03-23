<template>
  <div class="page-layout">
    <aside class="sidebar-zone">
      <Sidebar :items="menuItems" logout-label="Déconnexion" @select="handleMenuSelect" />
    </aside>

    <main class="dashboard-zone">
      <HistoryTopBar
        title="Bonjour, Professeur 👋"
        subtitle="Espace enseignant"
        base-breadcrumb="Accueil"
        :selected-year="`${startYear}–${endYear}`"
        :selected-semester="promoLabel"
        :role="role"
        :email="enseignant.email"
        :year-param="startYear"
      />

      <SemesterList
        :start-year="startYear"
        :end-year="endYear"
        :semesters="semesters"
        :columns="gridColumns"
        :title-suffix="titleSuffix"
        :promo-id="promoId"
      />
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

// Year from query
const startYear = computed(() => {
  const param = route.query.year as string
  return param ? parseInt(param) : 2025
})
const endYear = computed(() => startYear.value + 1)

// Full list of semesters
const allSemesters = ref([
  { id: 1,  label: 'S1',  title: 'Semestre 1',  completed: 52, total: 60, progress: 87 },
  { id: 2,  label: 'S2',  title: 'Semestre 2',  completed: 30, total: 60, progress: 50 },
  { id: 3,  label: 'S3',  title: 'Semestre 3',  completed: 54, total: 60, progress: 90 },
  { id: 4,  label: 'S4',  title: 'Semestre 4',  completed: 36, total: 60, progress: 60 },
  { id: 5,  label: 'S5',  title: 'Semestre 5',  completed: 58, total: 60, progress: 97 },
  { id: 6,  label: 'S6',  title: 'Semestre 6',  completed: 22, total: 60, progress: 37 },
  { id: 7,  label: 'S7',  title: 'Semestre 7',  completed: 22, total: 60, progress: 37 },
  { id: 8,  label: 'S8',  title: 'Semestre 8',  completed: 54, total: 60, progress: 90 },
  { id: 9,  label: 'S9',  title: 'Semestre 9',  completed: 57, total: 60, progress: 95 },
  { id: 10, label: 'S10', title: 'Semestre 10', completed: 24, total: 60, progress: 40 },
])

// Mapping promo id → semester ids + display name
const promoMap: Record<string, { ids: number[]; name: string }> = {
  fie1: { ids: [1, 2],  name: 'FIE 1' },
  fie2: { ids: [3, 4],  name: 'FIE 2' },
  fie3: { ids: [5, 6],  name: 'FIE 3' },
  fie4: { ids: [7, 8],  name: 'FIE 4' },
  fie5: { ids: [9, 10], name: 'FIE 5' },
  fia3: { ids: [5, 6],  name: 'FIA 3' },
  fia4: { ids: [7, 8],  name: 'FIA 4' },
  fia5: { ids: [9, 10], name: 'FIA 5' },
}

const promoId = computed(() => (route.query.promo as string) ?? '')
const promoInfo = computed(() => promoMap[promoId.value] ?? null)

// Filtered semesters: 2 if promo, all 10 otherwise
const semesters = computed(() => {
  if (promoInfo.value) {
    return allSemesters.value.filter((s) => promoInfo.value!.ids.includes(s.id))
  }
  return allSemesters.value
})

// Grid columns: 2 for promo view, 5 for full view
const gridColumns = computed(() => (promoInfo.value ? 2 : 5))

// Title suffix for SemesterList
const titleSuffix = computed(() =>
  promoInfo.value ? promoInfo.value.name : `${startYear.value}–${endYear.value}`,
)

// Breadcrumb: promo name as 3rd level
const promoLabel = computed(() => promoInfo.value?.name ?? undefined)

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) return
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
