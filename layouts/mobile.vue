<script setup lang="ts">
import BottomBarVue from '~/components/navigation/BottomBar.vue';

const route = useRoute()

// halaman yang pakai bottom bar
const bottomBarPages = ['/', '/orders', '/profile']

const showBottomBar = computed(() =>
  bottomBarPages.includes(route.path)
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 pb-16">
      <slot />
    </main>

    <!-- BOTTOM BAR -->
    <BottomBarVue v-if="showBottomBar" />
  </div>
</template>
