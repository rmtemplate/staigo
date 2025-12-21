<template>
  <div>
    <!-- Mobile -->
    <div>
      <HomeMobile />
    </div>

    <!-- <div class="hidden md:block">
      <HomeDesktop />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import HomeDesktop from '~/components/home/HomeDesktop.vue';
import HomeMobile from '~/components/home/HomeMobile.vue';

definePageMeta({
  showBottomBar: true
})
</script>
