<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="inner">
      <!-- Brand + Nav -->
      <div>
        <div class="brand">
          <div class="logo"><img src="/logo-ISIS.png" alt="Logo" /></div>
          <div class="brand-text">
            <strong>Espace Enseignant</strong>
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
            :title="collapsed ? item.label : ''"
            @click="emit('select', item)"
          >
            <!-- Icon slot -->
            <span class="item-icon">
              <!-- Home -->
              <svg
                v-if="item.key === 'home'"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <!-- History -->
              <svg
                v-else-if="item.key === 'history'"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <!-- Profile -->
              <svg
                v-else
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span class="item-label">{{ item.label }}</span>
          </button>
        </nav>
      </div>

      <!-- Bottom zone: collapse + logout -->
      <div class="bottom-zone">
        <!-- Collapse button — moved to bottom for a cleaner look -->
        <button
          class="toggle-btn"
          type="button"
          @click="collapsed = !collapsed"
          :title="collapsed ? 'Ouvrir le menu' : 'Fermer le menu'"
        >
          <span class="item-icon">
            <svg
              v-if="!collapsed"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
          <span class="item-label">Réduire</span>
        </button>

        <button class="logout" type="button">
          <span class="item-icon">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span class="item-label">{{ logoutLabel }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const collapsed = ref(false)
</script>

<style scoped>
.sidebar {
  width: 215px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: #f7f6fb;
  border-right: 1px solid #eceaf5;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.25s ease;
  /* Prevent text from wrapping during collapse */
  white-space: nowrap;
}

.sidebar.collapsed {
  width: 52px;
}

/* ── Toggle button — now in the bottom zone ── */
.toggle-btn {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #e8e5f5;
  background: #f0eef8;
  color: #5e5977;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.toggle-btn:hover {
  background: #eceaf6;
  border-color: #c2bce0;
}

/* En mode collapsed : l'icône reste visible et centrée */
.sidebar.collapsed .toggle-btn {
  justify-content: center;
  padding: 9px;
}

/* Bottom zone: collapse + logout stacked */
.bottom-zone {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid #eceaf5;
  padding-top: 10px;
}

/* Inner scroll container */
.inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding-top: 4px;
}

.logo {
  width: 32px;
  height: 32px;
  background: transparent;
  flex-shrink: 0;
  display: grid;
  place-items: center;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-text {
  overflow: hidden;
  transition:
    opacity 0.2s ease,
    max-width 0.25s ease;
  max-width: 160px;
}

.sidebar.collapsed .brand-text {
  opacity: 0;
  max-width: 0;
  pointer-events: none;
}

strong {
  display: block;
  font-size: 13px;
  color: #221b4c;
  overflow: hidden;
  text-overflow: ellipsis;
}

small {
  color: #928da9;
  font-size: 11px;
}

/* Navigation */
.menu {
  display: grid;
  gap: 4px;
}

.menu-item {
  border: 0;
  text-align: left;
  border-radius: 10px;
  padding: 9px 10px;
  background: transparent;
  color: #5e5977;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.menu-item.active {
  background: #eceaf6;
  color: #2a205a;
  font-weight: 600;
}

.menu-item:hover:not(.active) {
  background: #f0eef8;
}

.item-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 18px;
}

.item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    opacity 0.2s ease,
    max-width 0.25s ease;
  max-width: 160px;
  font-size: 14px;
}

.sidebar.collapsed .item-label {
  opacity: 0;
  max-width: 0;
  pointer-events: none;
}

/* Logout */
.logout {
  border: 0;
  background: transparent;
  color: #6a6682;
  text-align: left;
  padding: 9px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
}

.logout:hover {
  background: #f0eef8;
}
</style>
