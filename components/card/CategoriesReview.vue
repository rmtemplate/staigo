<template>
  <div
    class="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4
           flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <component :is="iconComp" class="w-5 h-5 text-[var(--ui-primary)]"/>
      <div class="text-sm font-medium text-gray-700 leading-none">
        {{ title }}
      </div>
    </div>

    <div class="font-semibold text-[17px] text-gray-900 leading-none">
      {{ score }}
    </div>
  </div>
</template>

<script setup lang="ts">
import * as icons from "lucide-vue-next";

const props = defineProps({
  title: String,
  score: String,
  icon: String,
});

const iconComp = computed(() => {
  return icons[props.icon];
});
</script>
