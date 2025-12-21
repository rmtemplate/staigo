<template>
  <div class="flex flex-col items-center text-center w-full scale-90">

    <!-- icon box -->
    <div
      class="border border-[#E6E9ED] rounded-lg flex items-center justify-center w-full aspect-square p-1"
    >
      <img
        :src="icon"
        alt="facility icon"
        class="w-9 h-9 object-contain filter-svg"
      />
    </div>

    <!-- label -->
    <span class="text-[#242B42] text-xs font-medium mt-1 leading-tight break-words">
      {{ label }}
    </span>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
/* apply color to all inline SVGs */
.filter-svg {
  filter: brightness(0) saturate(100%) invert(13%) sepia(6%) saturate(4323%)
    hue-rotate(192deg) brightness(93%) contrast(87%);
}
</style>
