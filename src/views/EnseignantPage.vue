<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\views\EnseignantPage.vue -->
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import AnneeAcademique from '../components/AnneeAcademique.vue'
import UeListe from '../components/UeListe.vue'

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

const ues = ref([
  {
    id: 1,
    code: 'M501',
    title: 'Fondamentaux',
    subtitle: 'Mathématiques et sciences de base',
    progress: 75,
  },
  {
    id: 2,
    code: 'I550',
    title: 'Informatique',
    subtitle: 'Développement logiciel et systèmes',
    progress: 45,
  },
  { id: 3, code: 'G601', title: 'Gestion de projet', subtitle: 'Agile', progress: 80 },
])

function handleMenuSelect(item: { to?: string }) {
  if (!item.to || item.to === route.path) {
    return
  }

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

      <section class="year-section">
        <AnneeAcademique :start-year="academicYear.start" :end-year="academicYear.end" />
      </section>

      <section class="ue-section">
        <UeListe :ues="ues" />
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

.year-section {
  display: flex;
  justify-content: center;
  margin: 12px 0 14px;
}

.ue-section {
  margin: 8px auto 0;
  max-width: 760px;
  width: 100%;
}

.year-section :deep(.academic-year-card) {
  width: min(100%, 360px);
}

.ue-section :deep(.ue-list) {
  width: 100%;
}

.ue-section :deep(.ue-card) {
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
