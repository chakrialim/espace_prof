<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\components\UeListe.vue -->
<template>
  <section class="ue-list">
    <UeProgressCard v-for="ue in ues" :key="ue.id" :ue="ue" />
  </section>
</template>

<script setup lang="ts">
import UeProgressCard from './UeProgressCard.vue'

defineProps<{
  ues: Array<{
    id: number
    code: string
    title: string
    subtitle: string
    progress: number
  }>
}>()
</script>

<style scoped>
.ue-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}
</style>
