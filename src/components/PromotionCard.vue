<template>
  <button class="promo-card" type="button" @click="emit('click')">
    <div class="badge" :class="variant">{{ number }}</div>
    <div class="text">
      <span class="name">{{ name }}</span>
      <span class="desc">{{ description }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  number: number
  name: string
  description: string
  variant?: 'fie' | 'fia'
}>()

const emit = defineEmits<{ click: [] }>()
</script>

<style scoped>
.promo-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #edeaf7;
  border-radius: 14px;
  padding: 14px 18px;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 4px 16px rgba(18, 14, 58, 0.06);
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease;
  width: 100%;
}

.promo-card:hover {
  box-shadow: 0 8px 24px rgba(18, 14, 58, 0.12);
  transform: translateY(-2px);
}

.promo-card:active {
  transform: translateY(0);
}

.badge {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.badge.fie {
  background: #2e2569;
  color: #fff;
}

.badge.fia {
  background: #f5b8a0;
  color: #7a2c10;
}

.badge:not(.fie):not(.fia) {
  background: #2e2569;
  color: #fff;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-size: 15px;
  font-weight: 700;
  color: #1e1848;
  line-height: 1.2;
}

.desc {
  font-size: 12px;
  color: #8f8ba9;
}
</style>
