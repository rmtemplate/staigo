<script setup lang="ts">
const device = useDevice()
</script>

<template>
  <!-- <NuxtLayout :name="device.isMobile ? 'mobile' : 'desktop'"> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
