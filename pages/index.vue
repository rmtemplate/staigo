<template>
  <div>
    <!-- Mobile -->
    <div class="md:hidden">
      <HomeMobile />
    </div>

    <!-- Desktop -->
    <div class="hidden md:block">
      <HomeDesktop />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeDesktop from '~/components/home/HomeDesktop.vue';
import HomeMobile from '~/components/home/HomeMobile.vue';

definePageMeta({
  showBottomBar: true
})
</script>
