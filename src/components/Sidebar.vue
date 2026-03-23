<!-- filepath: c:\Users\chhak\Documents\ISIS\S6\ptut\espace_prof\espace_prof\src\components\ProfSidebar.vue -->
<template>
  <aside class="sidebar">
    <div>
      <div class="brand">
        <div class="logo"><img src="/isis-2.png" alt="Logo" /></div>
        <div>
          <strong>Espace Enseignant </strong>
          <small>ISIS Évaluations</small>
        </div>
      </div>

      <nav class="menu">
        <button
          v-for="item in items"
          :key="item.key"
          class="menu-item"
          :class="{ active: item.active }"
          type="button"
          @click="emit('select', item)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>

    <button class="logout" type="button">{{ logoutLabel }}</button>
  </aside>
</template>

<script setup lang="ts">
type SidebarItem = {
  key: string
  label: string
  active?: boolean
  to?: string
}

const emit = defineEmits<{
  select: [item: SidebarItem]
}>()

defineProps<{
  items: Array<SidebarItem>
  logoutLabel?: string
}>()
</script>

<style scoped>
.sidebar {
  width: 215px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: #f7f6fb;
  border-right: 1px solid #eceaf5;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.logo {
  width: 56px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  display: grid;
  place-items: center;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

strong {
  display: block;
  font-size: 15px;
  color: #221b4c;
}

small {
  color: #928da9;
  font-size: 11px;
}

.menu {
  display: grid;
  gap: 6px;
}

.menu-item {
  border: 0;
  text-align: left;
  border-radius: 10px;
  padding: 10px 12px;
  background: transparent;
  color: #5e5977;
  cursor: pointer;
}

.menu-item.active {
  background: #eceaf6;
  color: #2a205a;
  font-weight: 600;
}

.logout {
  border: 0;
  background: transparent;
  color: #6a6682;
  text-align: left;
  padding: 10px 12px;
  cursor: pointer;
}
</style>
