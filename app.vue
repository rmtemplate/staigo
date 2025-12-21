<script setup lang="ts">
const device = useDevice()
</script>

<template>
  <!-- Background area (full screen) -->
  <div class="min-h-screen w-full bg-gray-100">
    <!-- App container (mobile-first) -->
    <div class="min-h-screen w-full max-w-md mx-auto bg-white shadow-sm">
      <!-- Layout stays the same, tapi dibungkus max-w-md -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
