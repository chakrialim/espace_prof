<template>
  <section>
    <h2 class="title">Sélectionnez un semestre – {{ startYear }}–{{ endYear }}</h2>

    <div class="grid">
      <SemesterCard v-for="semester in semesters" :key="semester.id" :semester="semester" />
    </div>
  </section>
</template>

<script setup lang="ts">
import SemesterCard from '@/components/SemesterCard.vue'

defineProps<{
  startYear: number
  endYear: number
  semesters: Array<{
    id: number
    label: string
    title: string
    completed: number
    total: number
    progress: number
  }>
}>()
</script>

<style scoped>
.title {
  margin: 18px 0 24px;
  color: #20174f;
  font-size: 32px;
  line-height: 1.15;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

@media (max-width: 1400px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .title {
    font-size: 28px;
  }
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .title {
    font-size: 24px;
    margin: 16px 0 18px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 20px;
  }
}
</style>
