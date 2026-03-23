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
        :selected-semester="promoName"
        :selected-promo="semesterLabel"
        :role="role"
        :email="enseignant.email"
        :year-param="startYear"
        :promo-param="promoId"
      />

      <EnseignementsList :promo-name="promoName" :ues="ues" @ue-select="handleUeSelect" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import HistoryTopBar from '@/components/HistoryTopBar.vue'
import EnseignementsList from '@/components/EnseignementsList.vue'

const route = useRoute()
const router = useRouter()

const enseignant = reactive({
  prenom: '',
  nom: '',
  email: 'prof@univ-jfc.fr',
})

const role = ref('Espace Enseignant')

const menuItems = computed(() => [
  { key: 'home', label: 'Accueil', to: '/enseignant', active: route.path === '/enseignant' },
  { key: 'history', label: 'Historique', to: '/history', active: route.path === '/history' },
  { key: 'profile', label: 'Mon Profil' },
])

// Query params
const startYear = computed(() => {
  const param = route.query.year as string
  return param ? parseInt(param) : 2025
})
const endYear = computed(() => startYear.value + 1)

const semesterLabel = computed(() => (route.query.semester as string) || undefined)
const promoMap: Record<string, string> = {
  fie1: 'FIE 1',
  fie2: 'FIE 2',
  fie3: 'FIE 3',
  fie4: 'FIE 4',
  fie5: 'FIE 5',
  fia3: 'FIA 3',
  fia4: 'FIA 4',
  fia5: 'FIA 5',
}

const promoId = computed(() => (route.query.promo as string) || '')
const promoName = computed(() => promoMap[promoId.value] ?? promoId.value)

// Reactive list of UEs (à remplacer par appel API)
const ues = ref([
  {
    id: 1,
    code: 'UE501',
    title: 'Fondamentaux',
    subtitle: 'Mathématiques et sciences de base',
    progress: 75,
    completed: 45,
    total: 60,
    matieres: 2,
    icon: 'book' as const,
  },
  {
    id: 2,
    code: 'UE502',
    title: 'Informatique',
    subtitle: 'Développement logiciel et systèmes',
    progress: 87,
    completed: 52,
    total: 60,
    matieres: 3,
    icon: 'code' as const,
  },
  {
    id: 3,
    code: 'UE503',
    title: 'Langues & Communication',
    subtitle: 'Anglais technique et communication',
    progress: 63,
    completed: 38,
    total: 60,
    matieres: 2,
    icon: 'translate' as const,
  },
  {
    id: 4,
    code: 'UE504',
    title: 'Management & Projet',
    subtitle: 'Gestion de projet et méthodologies',
    progress: 33,
    completed: 20,
    total: 60,
    matieres: 2,
    icon: 'people' as const,
  },
])

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) return
  router.push(item.to)
}

function handleUeSelect(ue: { id: number; code: string; title: string }) {
  // Future: navigate to UE detail page
  console.log('UE selected:', ue)
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
  max-width: 900px;
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
    max-width: none;
  }
}
</style>
