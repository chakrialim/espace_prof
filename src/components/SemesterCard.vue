<template>
  <article class="semester-card" role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick">
    <div class="left-badge">{{ semester.label }}</div>

    <div class="content">
      <div class="top">
        <div>
          <h3>{{ semester.title }}</h3>
        </div>
        <span class="arrow" aria-label="Voir le détail">›</span>
      </div>

      <div class="progress-row">
        <div class="bar">
          <span class="fill" :style="{ width: `${semester.progress}%` }" />
        </div>
        <span class="pct">{{ semester.completed }}/{{ semester.total }} évaluations</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  semester: {
    id: number
    label: string
    title: string
    completed: number
    total: number
    progress: number
  }
  year?: number
  promo?: string
}>()

function handleClick() {
  router.push({
    name: 'Enseignements',
    query: {
      year: props.year ?? 2025,
      semester: props.semester.title,
      promo: props.promo ?? '',
    },
  })
}
</script>

<style scoped>
.semester-card {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(18, 14, 58, 0.08);
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease;
  cursor: pointer;
}

.semester-card:hover {
  box-shadow: 0 12px 28px rgba(18, 14, 58, 0.12);
  transform: translateY(-2px);
}

.left-badge {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #5b4fcf, #7b6ee2);
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

h3 {
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
  color: #1e1848;
}

.arrow {
  border: 0;
  background: transparent;
  color: #7b7698;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  pointer-events: none;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar {
  height: 6px;
  background: #e9e8f0;
  border-radius: 999px;
  flex: 1;
  overflow: hidden;
}

.fill {
  display: block;
  height: 100%;
  background: #5b4fcf;
  border-radius: inherit;
}

.pct {
  font-size: 13px;
  color: #7b7698;
  white-space: nowrap;
}

@media (max-width: 760px) {
  .semester-card {
    grid-template-columns: 48px 1fr;
    gap: 12px;
    padding: 12px;
  }

  .left-badge {
    width: 48px;
    height: 48px;
    font-size: 16px;
  }

  h3 {
    font-size: 18px;
  }

  .arrow {
    font-size: 20px;
  }
}
</style>
