<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useEventListener, useScrollLock } from "@vueuse/core"

type Props = {
  modelValue: boolean
  title?: string
  showCancel?: boolean
  cancelText?: string

  closeOnOverlay?: boolean
  closeOnEsc?: boolean

  // drag to close (handle only)
  draggable?: boolean
  dragCloseThreshold?: number // px

  teleportTo?: string
  overlayClass?: string
  sheetClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  showCancel: true,
  cancelText: "Cancel",
  closeOnOverlay: true,
  closeOnEsc: true,

  draggable: true,
  dragCloseThreshold: 140,

  teleportTo: "body",
})

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void
  (e: "close"): void
  (e: "open"): void
}>()

const mounted = ref(false)

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
})

let lock: ReturnType<typeof useScrollLock> | null = null

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit("close")
}

const open = () => {
  if (isOpen.value) return
  isOpen.value = true
  emit("open")
}

/** ===== Drag-to-close (HANDLE ONLY) ===== */
const dragging = ref(false)
const dragOffsetY = ref(0)
let startY = 0

const resetDrag = () => {
  dragOffsetY.value = 0
  dragging.value = false
}

const onHandlePointerDown = (e: PointerEvent) => {
  if (!props.draggable) return
  if (!props.modelValue) return

  dragging.value = true
  startY = e.clientY

  // capture pointer so move/up still tracked
  ;(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId)
}

const onPointerMoveWindow = (e: PointerEvent) => {
  if (!dragging.value) return
  const delta = e.clientY - startY
  dragOffsetY.value = Math.max(0, delta)
}

const onPointerUpWindow = () => {
  if (!dragging.value) return

  const shouldClose = dragOffsetY.value >= props.dragCloseThreshold
  dragging.value = false

  if (shouldClose) {
    resetDrag()
    close()
  } else {
    // animate back
    dragOffsetY.value = 0
  }
}

onMounted(() => {
  mounted.value = true

  // lock scroll (client only)
  lock = useScrollLock(document.body)
  watch(
    () => props.modelValue,
    (v) => {
      if (lock) lock.value = v
      if (v) resetDrag()
    },
    { immediate: true }
  )

  // close on ESC
  useEventListener(window, "keydown", (e: KeyboardEvent) => {
    if (!props.closeOnEsc) return
    if (!props.modelValue) return
    if (e.key === "Escape") close()
  })

  // drag listeners (window)
  useEventListener(window, "pointermove", onPointerMoveWindow)
  useEventListener(window, "pointerup", onPointerUpWindow)
  useEventListener(window, "pointercancel", onPointerUpWindow)
})

defineExpose({ open, close })
</script>

<template>
  <Teleport v-if="mounted" :to="teleportTo">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40 bg-black/40 max-w-md mx-auto"
        :class="overlayClass"
        @click.self="closeOnOverlay ? close() : undefined"
      />
    </Transition>

    <!-- Sheet -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div v-if="modelValue" class="fixed inset-x-0 bottom-0 z-50">
        <div
          class="bg-white rounded-t-[28px] overflow-hidden flex flex-col max-h-[95vh] max-w-md mx-auto"
          :class="sheetClass"
          :style="{
            transform: `translateY(${dragOffsetY}px)`,
            transition: dragging ? 'none' : 'transform 250ms ease',
          }"
        >
          <!-- Drag handle (ONLY place to drag) -->
          <div
            v-if="draggable"
            class="h-6 flex items-center justify-center"
            @pointerdown="onHandlePointerDown"
          >
            <div class="w-12 h-1.5 rounded-full bg-gray-200"></div>
          </div>

          <!-- Header -->
          <div class="relative px-6 pt-4 pb-3" :class="headerClass">
            <div class="text-center text-lg font-extrabold text-[#1F2433]">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <button
              v-if="showCancel"
              type="button"
              class="absolute right-6 top-4 text-sm font-semibold text-[#4F79FF]"
              @click="close"
            >
              <slot name="cancel">
                {{ cancelText }}
              </slot>
            </button>
          </div>

          <div class="h-px bg-[#E6E9ED]" />

          <!-- Body -->
          <div class="flex-1 overflow-auto" :class="bodyClass">
            <slot />
          </div>

          <!-- Footer -->
          <div class="px-5 pt-4 pb-5" :class="footerClass">
            <slot name="footer" />
          </div>

          <div class="h-3" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
