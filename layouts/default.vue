<script setup lang="ts">
import BottomBar from '~/components/navigation/BottomBar.vue'

const route = useRoute()

const showBottomBar = computed(() => {
  return route.meta.showBottomBar === true
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Content -->
    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>

    <BottomBar :class="showBottomBar ? 'md:hidden' : ''" />
  </div>
</template>
