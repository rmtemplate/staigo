<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },

  /** Tailwind class contoh: bg-primary */
  bgClass: {
    type: String,
    default: ''
  },

  /** Inline color contoh: #ffffff */
  bgColor: {
    type: String,
    default: ''
  },

  /** Tailwind class contoh: text-white */
  textClass: {
    type: String,
    default: ''
  },

  /** Inline color */
  textColor: {
    type: String,
    default: ''
  },

  showBack: {
    type: Boolean,
    default: true
  },

  shadow: {
    type: Boolean,
    default: true
  }
})

const goBack = () => {
  router.back()
}

const headerClass = computed(() => [
  'flex items-center h-14 px-5 z-2 relative sticky top-0 max-w-md mx-auto',
  props.shadow ? 'shadow-sm' : '',
  props.bgClass
])

const headerStyle = computed(() => ({
  backgroundColor: props.bgColor || undefined
}))

const textStyle = computed(() => ({
  color: props.textColor || undefined
}))
</script>

<template>
  <header
    :class="headerClass" 
    :style="headerStyle"
  >
    <!-- Back -->
    <button
      v-if="showBack"
      @click="goBack"
      class="mr-3 flex items-center justify-center"
      :class="textClass"
      :style="textStyle"
    >
      <ChevronLeft :size="24" />
    </button>

    <!-- Title -->
    <h1
      class="text-base font-semibold truncate"
      :class="textClass"
      :style="textStyle"
    >
      {{ title }}
    </h1>
  </header>
</template>
