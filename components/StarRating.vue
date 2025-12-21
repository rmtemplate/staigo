<template>
  <div class="flex items-center leading-none select-none">
    <div
      v-for="i in 5"
      :key="i"
      class="relative mr-[2px] w-[1em] h-[1em]"
    >
      <!-- background star -->
      <svg
        viewBox="0 0 24 24"
        class="absolute inset-0 text-gray-300"
        :fill="emptyColor"
      >
        <path :d="STAR_D" />
      </svg>

      <!-- clipped filled star -->
      <svg
        v-if="clipWidth(i) > 0"
        viewBox="0 0 24 24"
        class="absolute inset-0 overflow-hidden"
        :style="{ clipPath: `inset(0 ${100 - clipWidth(i)}% 0 0)` }"
        :fill="fullColor"
      >
        <path :d="STAR_D" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rating: { type: Number, required: true },
  fullColor: { type: String, default: "#FEBA00" },
  emptyColor: { type: String, default: "#E6E9ED" },
})

// IMPORTANT: 1 BARIS (tanpa newline)
const STAR_D =
  "M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596 0 9.748l8.332-1.593z"

function clipWidth(index: number) {
  const diff = props.rating - (index - 1)
  if (diff >= 1) return 100
  if (diff <= 0) return 0
  return diff * 100
}
</script>
