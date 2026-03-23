<template>
  <header class="history-top">
    <div>
      <h1>{{ title }}</h1>
      <p class="muted">{{ subtitle }}</p>
      <p class="breadcrumb">
        ⌂ <span class="breadcrumb-item">{{ baseBreadcrumb }}</span
        ><span v-if="selectedYear" class="breadcrumb-divider"> > </span
        ><span v-if="selectedYear" class="breadcrumb-item">{{ selectedYear }}</span>
      </p>
    </div>

    <div class="right">
      <span class="role">{{ role }}</span>
      <div class="chip">{{ email }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  baseBreadcrumb: string
  selectedYear?: string
  role: string
  email: string
}>()
</script>

<style scoped>
.history-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
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

.breadcrumb-item {
  color: #6f6990;
}

.breadcrumb-divider {
  color: #b8b4cc;
  margin: 0 4px;
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

@media (max-width: 760px) {
  h1 {
    font-size: 30px;
  }

  .right {
    text-align: left;
  }
}
</style>
