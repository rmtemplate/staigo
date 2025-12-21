<template>
  <button
    class="px-4 py-[6px] rounded-full text-sm border transition
      whitespace-nowrap
      "
    :class="active
      ? 'bg-[var(--ui-primary)] text-white border-transparent'
      : 'bg-white border-gray-300 text-gray-600'
    "
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  active: Boolean
})
</script>
