<script setup lang="ts">
import BottomBar from '~/components/navigation/BottomBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>

    <BottomBar class="md:hidden" />
  </div>
</template>
