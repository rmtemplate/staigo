<template>
     <!-- Mobile -->
    <div class="md:hidden">
      <SearchPropertiesMobile />
    </div>

    <!-- Desktop -->
    <div class="hidden md:block">
      Desktop
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'no-bottom'
    })
</script>