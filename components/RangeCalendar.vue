<script setup lang="ts">
import { computed, ref, watch } from "vue"

export type DateRangeValue = {
  start: Date | null
  end: Date | null
}

type Props = {
  modelValue: DateRangeValue
  minDate?: Date | null
  disableBeforeMin?: boolean
  showTodayLabel?: boolean
  locale?: string

  compact?: boolean

  /** swipe */
  swipeEnabled?: boolean
  swipeThreshold?: number
  swipeStartThreshold?: number

  /** show prev/next month days in empty cells */
  showOutsideDays?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  minDate: null,
  disableBeforeMin: true,
  showTodayLabel: true,
  locale: "en-US",
  compact: true,

  swipeEnabled: true,
  swipeThreshold: 40,
  swipeStartThreshold: 10,

  showOutsideDays: true,
})

const emit = defineEmits<{
  (e: "update:modelValue", v: DateRangeValue): void
  (e: "monthChange", v: Date): void
}>()

const isValidDate = (d: any): d is Date => d instanceof Date && !Number.isNaN(d.getTime())
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

const today = startOfDay(new Date())

const minDateDay = computed(() => {
  if (props.minDate && isValidDate(props.minDate)) return startOfDay(props.minDate)
  return today
})

/** init month */
const initBase = computed(() => {
  const s = props.modelValue?.start
  return s && isValidDate(s) ? startOfDay(s) : today
})
const viewMonth = ref(new Date(initBase.value.getFullYear(), initBase.value.getMonth(), 1))

/**
 * ✅ FIX penting:
 * watch pakai timestamp (bukan object ref Date),
 * jadi kalau parent bikin Date baru tapi hari sama, viewMonth gak ke-reset.
 */
watch(
  () => (props.modelValue.start && isValidDate(props.modelValue.start) ? startOfDay(props.modelValue.start).getTime() : null),
  (t) => {
    if (!t) return
    const d = new Date(t)
    const target = new Date(d.getFullYear(), d.getMonth(), 1)
    if (!isSameMonth(viewMonth.value, target)) {
      viewMonth.value = target
    }
  }
)

const monthTitle = computed(() => {
  if (!isValidDate(viewMonth.value)) return ""
  return new Intl.DateTimeFormat(props.locale, { month: "long", year: "numeric" }).format(viewMonth.value)
})

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"]

const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()

type Cell = { date: Date; inMonth: boolean }

const calendarCells = computed<Cell[]>(() => {
  const vm = viewMonth.value
  if (!isValidDate(vm)) return []

  const y = vm.getFullYear()
  const m = vm.getMonth()
  const first = new Date(y, m, 1)
  const firstWeekday = first.getDay()
  const totalDays = daysInMonth(y, m)

  const cells: Cell[] = []

  // leading cells
  if (firstWeekday > 0) {
    const prevMonthLast = new Date(y, m, 0) // last day prev month
    const prevTotal = prevMonthLast.getDate()
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const day = prevTotal - i
      const d = new Date(y, m - 1, day)
      cells.push({ date: d, inMonth: false })
    }
  }

  // current month
  for (let d = 1; d <= totalDays; d++) cells.push({ date: new Date(y, m, d), inMonth: true })

  // trailing cells to 42
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date
    const next = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1)
    cells.push({ date: next, inMonth: false })
  }

  // if outside days disabled, blank out those not inMonth
  if (!props.showOutsideDays) {
    return cells.map((c) => (c.inMonth ? c : ({ date: new Date(NaN), inMonth: false } as any))).filter((c) => c.inMonth || isValidDate(c.date))
  }

  return cells
})

const isDisabled = (d: Date) => {
  if (!props.disableBeforeMin) return false
  return startOfDay(d).getTime() < minDateDay.value.getTime()
}

const range = computed(() => props.modelValue)
const hasStart = computed(() => !!range.value.start)
const hasEnd = computed(() => !!range.value.end)

const isStart = (d: Date) =>
  !!range.value.start && isValidDate(range.value.start) && isSameDay(startOfDay(d), startOfDay(range.value.start))

const isEnd = (d: Date) =>
  !!range.value.end && isValidDate(range.value.end) && isSameDay(startOfDay(d), startOfDay(range.value.end))

const isToday = (d: Date) => isSameDay(startOfDay(d), today)

const isInRange = (d: Date) => {
  if (!range.value.start || !isValidDate(range.value.start)) return false
  const s = startOfDay(range.value.start)
  const e = range.value.end && isValidDate(range.value.end) ? startOfDay(range.value.end) : null
  const x = startOfDay(d)

  if (!e) return isSameDay(x, s)
  const [a, b] = s.getTime() <= e.getTime() ? [s, e] : [e, s]
  return x.getTime() >= a.getTime() && x.getTime() <= b.getTime()
}

const isMiddle = (d: Date) => hasStart.value && hasEnd.value && isInRange(d) && !isStart(d) && !isEnd(d)

const addMonths = (base: Date, delta: number) => new Date(base.getFullYear(), base.getMonth() + delta, 1)

const prevMonth = () => {
  viewMonth.value = addMonths(viewMonth.value, -1)
  emit("monthChange", viewMonth.value)
}
const nextMonth = () => {
  viewMonth.value = addMonths(viewMonth.value, 1)
  emit("monthChange", viewMonth.value)
}
const goToday = () => {
  viewMonth.value = new Date(today.getFullYear(), today.getMonth(), 1)
  emit("monthChange", viewMonth.value)
}

const gestureLocked = ref(false)
const pointerDown = ref(false)
const startX = ref(0)
const startY = ref(0)
const activePointerId = ref<number | null>(null)

const onPointerDown = (e: PointerEvent) => {
  if (!props.swipeEnabled) return
  pointerDown.value = true
  gestureLocked.value = false
  startX.value = e.clientX
  startY.value = e.clientY
  activePointerId.value = e.pointerId
}

const onPointerMove = (e: PointerEvent) => {
  if (!pointerDown.value) return
  if (activePointerId.value !== e.pointerId) return

  const dx = e.clientX - startX.value
  const dy = e.clientY - startY.value

  if (!gestureLocked.value) {
    if (Math.abs(dx) >= props.swipeStartThreshold && Math.abs(dx) > Math.abs(dy)) {
      gestureLocked.value = true
      ;(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId)
    } else return
  }
}

const endSwipe = () => {
  pointerDown.value = false
  activePointerId.value = null
  gestureLocked.value = false
}

const onPointerUp = (e: PointerEvent) => {
  if (!pointerDown.value) return
  if (activePointerId.value !== e.pointerId) return

  const dx = e.clientX - startX.value
  const dy = e.clientY - startY.value

  if (!gestureLocked.value) {
    endSwipe()
    return
  }
  if (Math.abs(dy) > Math.abs(dx)) {
    endSwipe()
    return
  }

  if (dx <= -props.swipeThreshold) nextMonth()
  else if (dx >= props.swipeThreshold) prevMonth()

  endSwipe()
}
const onPointerCancel = () => endSwipe()

const pickDate = (d: Date) => {
  if (gestureLocked.value) return
  if (isDisabled(d)) return

  // kalau klik outside-day, auto pindah bulan dulu (biar UX enak)
  const targetMonth = new Date(d.getFullYear(), d.getMonth(), 1)
  if (!isSameMonth(viewMonth.value, targetMonth)) {
    viewMonth.value = targetMonth
    emit("monthChange", viewMonth.value)
  }

  const current = props.modelValue
  if (!current.start || !isValidDate(current.start) || (current.start && current.end)) {
    emit("update:modelValue", { start: d, end: null })
    return
  }

  const s = startOfDay(current.start)
  const x = startOfDay(d)

  if (x.getTime() < s.getTime()) emit("update:modelValue", { start: d, end: null })
  else emit("update:modelValue", { start: current.start, end: d })
}
</script>

<template>
  <div
    class="select-none touch-pan-y"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
  >
    <!-- Weekdays -->
    <div class="px-5 pt-2">
      <div class="grid grid-cols-7 text-center text-[12px] font-semibold">
        <div
          v-for="(w, i) in weekdayLabels"
          :key="w + i"
          :class="i === 0 ? 'text-red-500' : 'text-[#1F2433]'"
        >
          {{ w }}
        </div>
      </div>
    </div>

    <div class="h-px bg-[#E6E9ED] mt-2" />

    <!-- Month header -->
    <div class="px-5 pt-4 pb-2 flex items-center justify-between">
      <button type="button" class="text-[20px] font-extrabold text-black text-left" @click.stop="goToday">
        {{ monthTitle }}
      </button>

      <div class="flex items-center gap-2">
        <button class="w-8 h-8 rounded-full border border-[#E6E9ED] text-primary font-bold" @click.stop="prevMonth">
          ‹
        </button>
        <button class="w-8 h-8 rounded-full border border-[#E6E9ED] text-primary font-bold" @click.stop="nextMonth">
          ›
        </button>
      </div>
    </div>

    <!-- Grid (range nyambung) -->
    <div class="px-5 pb-4">
      <div class="grid grid-cols-7 gap-y-2 gap-x-0">
        <div v-for="(cell, idx) in calendarCells" :key="idx" class="h-10">
          <div class="relative w-full h-10 flex items-center justify-center" v-if="cell?.date && isValidDate(cell.date)">
            <!-- Range background full nyambung -->
            <template v-if="hasStart && isInRange(cell.date)">
              <div
                v-if="hasEnd && isMiddle(cell.date)"
                class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-9 bg-primary/10"
              />
              <div
                v-else-if="hasEnd && isStart(cell.date) && !isEnd(cell.date)"
                class="absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-9 bg-primary/10"
              />
              <div
                v-else-if="hasEnd && isEnd(cell.date) && !isStart(cell.date)"
                class="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-9 bg-primary/10"
              />
            </template>

            <div
              v-if="showTodayLabel && isToday(cell.date)"
              class="absolute -top-3 text-[10px] font-semibold text-primary"
            >
              Today
            </div>

            <button
              type="button"
              class="relative w-9 h-9 flex items-center justify-center font-semibold text-[13px]"
              :class="[
                isDisabled(cell.date) ? 'text-gray-300 cursor-not-allowed' : (cell.inMonth ? 'text-[#1F2433]' : 'text-[#9AA4B2]'),
                (isStart(cell.date) || isEnd(cell.date)) ? 'bg-primary text-white rounded-full' : 'rounded-none',
                cell.date.getDay() === 0 && !(isStart(cell.date) || isEnd(cell.date)) ? 'text-red-500' : '',
              ]"
              @click.stop="pickDate(cell.date)"
            >
              {{ cell.date.getDate() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
