<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\components\AnneeAcademique.vue -->
<template>
  <div class="academic-year-card">
    <div class="icon-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>

    <div class="text-content">
      <span class="year-label">{{ startYear }}–{{ endYear }}</span>
      <span class="subtitle">Année académique</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    startYear?: number
    endYear?: number
  }>(),
  {
    startYear: 2025,
    endYear: 2026,
  },
)

const startYear = props.startYear
const endYear = props.endYear
</script>

<style scoped>
.academic-year-card {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 20px;
  box-shadow: 0 8px 28px rgba(22, 14, 63, 0.08);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #f0eefb;
  border-radius: 10px;
  color: #5b4fcf;
  flex-shrink: 0;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.year-label {
  font-size: 25px;
  font-weight: 700;
  color: #20174f;
  line-height: 1.1;
}

.subtitle {
  font-size: 12.5px;
  color: #8f8ba9;
}
</style>
