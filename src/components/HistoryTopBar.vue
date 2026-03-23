<template>
  <header class="history-top">
    <div>
      <h1>{{ title }}</h1>
      <p class="muted">{{ subtitle }}</p>
      <p class="breadcrumb">
        ⌂ <button class="bc-btn" @click="goBase">{{ baseBreadcrumb }}</button
        ><span v-if="selectedYear" class="breadcrumb-divider"> › </span
        ><button v-if="selectedYear" class="bc-btn" @click="goYear">{{ selectedYear }}</button
        ><span v-if="selectedSemester" class="breadcrumb-divider"> › </span
        ><button
          v-if="selectedSemester && selectedPromo"
          class="bc-btn"
          @click="goSemester"
        >{{ selectedSemester }}</button
        ><span v-else-if="selectedSemester" class="bc-text">{{ selectedSemester }}</span
        ><span v-if="selectedPromo" class="breadcrumb-divider"> › </span
        ><span v-if="selectedPromo" class="bc-text">{{ selectedPromo }}</span>
      </p>
    </div>

    <div class="right">
      <span class="role">{{ role }}</span>
      <div class="chip">{{ email }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  subtitle: string
  baseBreadcrumb: string
  selectedYear?: string
  selectedSemester?: string
  selectedPromo?: string
  role: string
  email: string
  /** start year number (e.g. 2025) – used for navigation */
  yearParam?: number
  /** promo id (e.g. 'fie1') – used to go back to SemesterPage */
  promoParam?: string
  /** base route (default: '/history') */
  baseRoute?: string
}>()

const router = useRouter()

function goBase() {
  router.push(props.baseRoute ?? '/history')
}

function goYear() {
  if (!props.yearParam) return
  router.push({ name: 'Filiere', query: { year: props.yearParam } })
}

function goSemester() {
  if (!props.yearParam) return
  router.push({
    name: 'Semesters',
    query: { year: props.yearParam, promo: props.promoParam ?? '' },
  })
}
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

/* Clickable breadcrumb item */
.bc-btn {
  border: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  color: #6f6990;
  cursor: pointer;
  transition: color 0.15s ease;
}

.bc-btn:hover {
  color: #3e2fa0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Non-clickable last item */
.bc-text {
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
