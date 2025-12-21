<script setup>
import { computed } from 'vue'
import { useRoute } from '#imports'

import IconHome from '~/assets/images/icons/home.svg'
import IconBookings from '~/assets/images/icons/bookings.svg'
import IconPromo from '~/assets/images/icons/promos.svg'
import IconProfile from '~/assets/images/icons/profile.svg'

const route = useRoute()

const menus = [
  { text: 'Beranda',   to: '/',         icon: IconHome },
  { text: 'Pemesanan', to: '/bookings', icon: IconBookings },
  { text: 'Promo',     to: '/promo',    icon: IconPromo },
  { text: 'Profile',   to: '/profile',  icon: IconProfile }
]

const isActive = (to) => (to === '/' ? route.path === '/' : route.path === to)
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white max-w-md mx-auto"
    style="padding-bottom: env(safe-area-inset-bottom);"
    role="navigation"
    aria-label="Bottom navigation"
  >
    <div class="mx-auto flex h-16 max-w-md items-stretch">
      <NuxtLink
        v-for="item in menus"
        :key="item.to"
        :to="item.to"
        class="flex w-full flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
        :class="isActive(item.to) ? 'text-primary' : 'text-gray-400 hover:text-primary/70'"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <component
          :is="item.icon"
          class="icon-svg h-6 w-6"
          :font-controlled="false"
        />
        <span class="text-xs leading-none font-medium">
          {{ item.text }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
/* bikin SVG ngikutin warna teks parent (text-primary / text-gray-400) */
.icon-svg :deep(svg) {
  width: 100%;
  height: 100%;
}
.icon-svg :deep(svg *[fill]) { fill: currentColor; }
.icon-svg :deep(svg *[stroke]) { stroke: currentColor; }

/* fallback kalau SVG-nya gak punya attribute fill/stroke tapi pakai path default */
.icon-svg :deep(path) { fill: currentColor; }
.icon-svg :deep(g) { fill: currentColor; }
</style>
