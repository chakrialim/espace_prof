<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\components\UeProgressCard.vue -->
<template>
  <article class="ue-card">
    <div class="left-icon">
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v13.5a2.5 2.5 0 0 0-2.5-2.5H4z" />
        <path d="M4 6.5V20h13.5A2.5 2.5 0 0 0 20 17.5V4" />
      </svg>
    </div>

    <div class="content">
      <div class="top">
        <div>
          <div class="code">{{ ue.code }}</div>
          <h3>{{ ue.title }}</h3>
        </div>
        <button class="arrow" type="button" aria-label="Voir le détail">›</button>
      </div>

      <div class="progress-row">
        <div class="bar">
          <span class="fill" :style="{ width: `${ue.progress}%` }" />
        </div>
        <span class="pct">{{ ue.progress }}%</span>
      </div>

      <p class="subtitle">{{ ue.subtitle }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  ue: {
    id: number
    code: string
    title: string
    subtitle: string
    progress: number
  }
}>()
</script>

<style scoped>
.ue-card {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  background: #fff;
  border-radius: 14px;
  padding: 10px 14px;
  box-shadow: 0 10px 24px rgba(18, 14, 58, 0.08);
}

.left-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ece9f8;
  color: #4e3cb2;
  display: grid;
  place-items: center;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code {
  font-size: 11px;
  color: #6a5fc4;
}

h3 {
  margin: 0;
  font-size: 21px;
  line-height: 1.2;
  color: #1e1848;
}

.arrow {
  border: 0;
  background: transparent;
  color: #7b7698;
  font-size: 20px;
  cursor: pointer;
}

.progress-row {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
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
}

.pct {
  font-size: 12px;
  color: #282143;
  min-width: 34px;
  text-align: right;
}

.subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: #8c89a4;
}
</style>
