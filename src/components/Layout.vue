<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\views\EnseignantPage.vue -->
<template>
  <div class="layout">
    <ProfSidebar :items="menuItems" logout-label="Déconnexion" />

    <main class="content">
      <header class="top">
        <div>
          <h1>Bonjour, Professeur 👋</h1>
          <p class="muted">Espace enseignant</p>
          <p class="breadcrumb">⌂ Accueil</p>
        </div>

        <div class="right">
          <span class="role">Espace Enseignant</span>
          <div class="chip">{{ user.email }}</div>
        </div>
      </header>

      <div class="year-wrap">
        <AnneeAcademique :start-year="academicYear.start" :end-year="academicYear.end" />
      </div>

      <UeListe :ues="ues" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AnneeAcademique from '@/components/AnneeAcademique.vue'
import UeListe from '@/components/UeListe.vue'
import ProfSidebar from '@/components/ProfSidebar.vue'

const user = reactive({
  email: 'prof@univ-jfc.fr',
})

const academicYear = reactive({
  start: 2025,
  end: 2026,
})

const menuItems = ref([
  { key: 'home', label: 'Accueil', active: true },
  { key: 'history', label: 'Historique' },
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
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 215px 1fr;
  min-height: 100vh;
  background: #f4f3f8;
}

.content {
  padding: 20px 28px;
  max-width: 980px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

h1 {
  margin: 0;
  color: #241b53;
  font-size: 38px;
}

.muted {
  margin: 2px 0 8px;
  color: #8d88a4;
  font-size: 14px;
}

.breadcrumb {
  margin: 0;
  color: #6f6990;
  font-size: 13px;
}

.right {
  text-align: right;
}

.role {
  display: block;
  color: #6f6a88;
  font-size: 12px;
  margin-bottom: 6px;
}

.chip {
  background: #fff;
  border: 1px solid #edeaf7;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  color: #3e3862;
}

.year-wrap {
  display: flex;
  justify-content: center;
  margin: 16px 0 14px;
}
</style>
