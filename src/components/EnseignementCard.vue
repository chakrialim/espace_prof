<template>
  <article class="ue-card" @click="emit('click')">
    <!-- Icon -->
    <div class="left-icon">
      <!-- Book icon for default -->
      <svg
        v-if="ue.icon === 'book' || !ue.icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <!-- Code icon -->
      <svg
        v-else-if="ue.icon === 'code'"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <!-- Translate / language icon -->
      <svg
        v-else-if="ue.icon === 'translate'"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 8l6 6" />
        <path d="M4 14l6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="M22 22l-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
      <!-- People / management icon -->
      <svg
        v-else-if="ue.icon === 'people'"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="meta">
        <span class="code-badge">{{ ue.code }}</span>
        <span v-if="ue.matieres" class="matieres">{{ ue.matieres }} matière{{ ue.matieres > 1 ? 's' : '' }}</span>
      </div>

      <div class="top-row">
        <div>
          <h3>{{ ue.title }}</h3>
          <p class="subtitle">{{ ue.subtitle }}</p>
        </div>
        <span class="arrow">›</span>
      </div>

      <div class="progress-row">
        <div class="bar">
          <span class="fill" :style="{ width: `${ue.progress}%` }" />
        </div>
        <span class="pct">{{ ue.progress }}%</span>
      </div>

      <p v-if="ue.completed != null && ue.total" class="evals">{{ ue.completed }}/{{ ue.total }} évaluations reçues</p>
    </div>
  </article>
</template>

<script setup lang="ts">
const emit = defineEmits<{ click: [] }>()

defineProps<{
  ue: {
    id: number
    code: string
    title: string
    subtitle: string
    progress: number
    completed?: number
    total?: number
    matieres?: number
    icon?: 'book' | 'code' | 'translate' | 'people'
  }
}>()
</script>

<style scoped>
.ue-card {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 18px 20px 14px;
  box-shadow: 0 4px 20px rgba(18, 14, 58, 0.07);
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease;
  border: 1px solid #f0eef8;
}

.ue-card:hover {
  box-shadow: 0 8px 28px rgba(18, 14, 58, 0.12);
  transform: translateY(-2px);
}

.left-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #ece9f8;
  color: #4e3cb2;
  display: grid;
  place-items: center;
  align-self: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2px;
}

.code-badge {
  font-size: 11px;
  font-weight: 700;
  color: #5b4fcf;
  background: #eeebfa;
  border-radius: 6px;
  padding: 2px 7px;
  letter-spacing: 0.5px;
}

.matieres {
  font-size: 12px;
  color: #9893b0;
}

.top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #1e1848;
}

.subtitle {
  margin: 2px 0 0;
  font-size: 13px;
  color: #8c89a4;
}

.arrow {
  color: #9893b0;
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.bar {
  height: 5px;
  background: #e9e8f0;
  border-radius: 999px;
  flex: 1;
  overflow: hidden;
}

.fill {
  display: block;
  height: 100%;
  background: #40248d;
  border-radius: inherit;
  transition: width 0.4s ease;
}

.pct {
  font-size: 13px;
  font-weight: 600;
  color: #282143;
  min-width: 36px;
  text-align: right;
}

.evals {
  margin: 2px 0 0;
  font-size: 12px;
  color: #a09cb8;
}
</style>
