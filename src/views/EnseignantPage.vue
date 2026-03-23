<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import AnneeAcademique from '../components/AnneeAcademique.vue'
import EnseignementsList from '../components/EnseignementsList.vue'

const enseignant = reactive({
  prenom: 'Jean',
  nom: 'Dupont',
  email: 'prof@univ-jfc.fr',
})

const academicYear = reactive({
  start: 2025,
  end: 2026,
})

const role = ref('Espace Enseignant')

const route = useRoute()
const router = useRouter()

const menuItems = computed(() => [
  { key: 'home', label: 'Accueil', to: '/enseignant', active: route.path === '/enseignant' },
  { key: 'history', label: 'Historique', to: '/history', active: route.path === '/history' },
  { key: 'profile', label: 'Mon Profil' },
])

// Enseignements groupés par promotion (réactif — à remplacer par appel API)
const promotions = ref([
  {
    id: 'fie3',
    name: 'FIE 3',
    ues: [
      { id: 1, code: 'UE501', title: 'Fondamentaux', subtitle: 'Mathématiques et sciences de base', progress: 75, completed: 45, total: 60, matieres: 2, icon: 'book' as const },
      { id: 2, code: 'UE502', title: 'Informatique', subtitle: 'Développement logiciel et systèmes', progress: 87, completed: 52, total: 60, matieres: 3, icon: 'code' as const },
    ],
  },
  {
    id: 'fie4',
    name: 'FIE 4',
    ues: [
      { id: 3, code: 'UE503', title: 'Langues & Communication', subtitle: 'Anglais technique et communication', progress: 63, completed: 38, total: 60, matieres: 2, icon: 'translate' as const },
      { id: 4, code: 'UE504', title: 'Management & Projet', subtitle: 'Gestion de projet et méthodologies', progress: 33, completed: 20, total: 60, matieres: 2, icon: 'people' as const },
    ],
  },
  {
    id: 'fia3',
    name: 'FIA 3',
    ues: [
      { id: 5, code: 'UE502', title: 'Informatique', subtitle: 'Développement logiciel et systèmes', progress: 90, completed: 54, total: 60, matieres: 3, icon: 'code' as const },
    ],
  },
])

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) return
  router.push(item.to)
}
</script>

<template>
  <div class="page-layout">
    <aside class="sidebar-zone">
      <Sidebar :items="menuItems" logout-label="Déconnexion" @select="handleMenuSelect" />
    </aside>

    <main class="dashboard-zone">
      <header class="dashboard-header">
        <div class="left">
          <h1>Bonjour, Professeur {{ enseignant.prenom }} 👋</h1>
          <p class="sub">Espace enseignant</p>
          <p class="breadcrumb">⌂ Accueil</p>
        </div>

        <div class="user-box">
          <span class="role">{{ role }}</span>
          <span class="email">{{ enseignant.email }}</span>
        </div>
      </header>

      <section class="promos-section">
        <EnseignementsList
          v-for="promo in promotions"
          :key="promo.id"
          :promo-name="promo.name"
          :ues="promo.ues"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 220px 1fr;
  background: #f4f3f8;
  width: 100%;
}

.sidebar-zone {
  border-right: 1px solid #eceaf5;
  background: #f8f7fc;
}

.dashboard-zone {
  width: 100%;
  padding: 20px 28px;
  max-width: 1100px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.left {
  min-width: 260px;
}

.left h1 {
  margin: 0;
  font-size: 36px;
  color: #241b53;
  line-height: 1.15;
}

.sub {
  margin: 4px 0 8px;
  color: #8d88a4;
  font-size: 14px;
}

.breadcrumb {
  margin: 0;
  color: #6f6990;
  font-size: 13px;
}

.user-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.role {
  color: #6f6a88;
  font-size: 12px;
}

.email {
  background: #fff;
  border: 1px solid #edeaf7;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  color: #3e3862;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.promos-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 860px;
  width: 100%;
}

@media (max-width: 1200px) {
  .dashboard-zone {
    max-width: 960px;
    padding: 20px;
  }

  .left h1 {
    font-size: 32px;
  }
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

  .left h1 {
    font-size: 28px;
  }

  .user-box {
    align-items: flex-start;
  }
}

@media (max-width: 760px) {
  .dashboard-zone {
    padding: 14px;
  }

  .dashboard-header {
    gap: 10px;
  }

  .left {
    min-width: 0;
  }

  .left h1 {
    font-size: 26px;
  }

  .sub {
    font-size: 13px;
  }

  .breadcrumb {
    font-size: 12px;
  }

  .year-section {
    justify-content: stretch;
  }

  .year-section :deep(.academic-year-card) {
    width: 100%;
  }

  .ue-section {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .left h1 {
    font-size: 22px;
  }

  .email {
    font-size: 11px;
    padding: 7px 10px;
  }

  .ue-section :deep(.ue-card) {
    grid-template-columns: 36px 1fr;
    padding: 10px 12px;
  }

  .ue-section :deep(.left-icon) {
    width: 36px;
    height: 36px;
  }

  .ue-section :deep(h3) {
    font-size: 18px;
  }
}
</style>
