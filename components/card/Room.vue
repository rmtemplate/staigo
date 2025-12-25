<template>
  <div
    class="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100"
  >
    <div class="relative w-full aspect-video rounded-t-xl overflow-hidden bg-slate-100">
      <Swiper class="h-full w-full" :modules="[Pagination]" :pagination="{ clickable: true }">
        <SwiperSlide v-for="(photo, index) in photosSafe" :key="photo?.propertiesRoomsPhotoSid || index">
          <img :src="photo?.images" class="w-full h-full object-cover" loading="lazy" />
        </SwiperSlide>
      </Swiper>

      <div
        class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10 shadow-sm"
        v-if="discountPercent > 0"
      >
        Hemat {{ discountPercent }}%
      </div>
    </div>

    <div class="p-3">
      <!-- STOCK + AVAILABLE ROOMS (di atas nama kamar, tanpa icon, flat, friendly ala gojek) -->
      <div v-if="availabilityText" class="mb-2">
        <div
          class="w-fit max-w-full rounded-lg border px-2.5 py-1 text-[11px] font-semibold leading-snug"
          :class="availabilityStyle"
        >
          {{ availabilityText }}
        </div>
      </div>

      <h3 class="text-base font-bold text-slate-800 leading-tight mb-2">
        {{ titleText }}
      </h3>

      <div class="flex flex-wrap items-center gap-3 mb-4 pb-1">
        <div
          v-for="item in fasilitasSafe"
          :key="item?.amenitiesSid"
          class="flex items-center gap-1.5 shrink-0 bg-slate-50 px-2 py-1 rounded-md border border-slate-100"
        >
          <img :src="item?.amenitiesIcon" class="w-3.5 h-3.5 opacity-60" />
          <span class="text-[10px] text-slate-600 font-medium">{{ item?.amenitiesName }}</span>
        </div>
      </div>

      <hr class="border-slate-100 mb-4" />

      <div class="flex items-end justify-between">
        <div>
          <p class="text-[10px] text-slate-400 line-through mb-0.5" v-if="originalPriceNumber > finalPriceNumber">
            {{ formatIDRLocal(originalPriceNumber) }}
          </p>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-extrabold text-primary">{{ formatIDRLocal(finalPriceNumber) }}</span>
            <span class="text-[10px] text-slate-500">/kamar/malam</span>
          </div>
          <div class="flex gap-1.5 mt-1 w-fit px-1.5 py-0.5 rounded text-[10px] font-medium items-center">
            <img src="/images/icons/icon-point.svg" class="w-3.5 h-3.5" alt="" />
            <span class="text-xs text-[#7E8CA0]">Lebih untung—bonus 1.600 poin!</span>
          </div>
        </div>

        <NuxtLink
          :to="roomLink"
          class="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
        >
          Pilih
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import type { PropertyRooms, Amenity, Photo } from "~/types/propertyRooms"

type DiscountType = "fixed" | "percent" | null

const props = defineProps<{
  room: PropertyRooms
  propertiesSlug?: string

  // legacy (optional)
  title?: string
  photos?: Photo[]
  fasilitas?: Amenity[]
  price?: string
  originalPrice?: string
}>()

const formatIDRLocal = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })
    .format(value)
    .replace("Rp", "Rp ")

// ===== DATA SOURCE =====
const titleText = computed(() => props.room?.propertiesRoomsName || props.title || "-")
const photosSafe = computed<Photo[]>(() => props.room?.photos || props.photos || [])
const fasilitasSafe = computed<Amenity[]>(() => props.room?.amenities || props.fasilitas || [])

// ===== AVAILABILITY (numberOfRooms) =====
// cocok ditaruh di atas nama kamar karena:
// 1) user kebaca duluan (konteks stok), 2) tidak ganggu harga/button, 3) tidak “teriak” (flat)
const roomsAvailable = computed(() => {
  const n = Number(props.room?.numberOfRooms ?? 0)
  return Number.isFinite(n) ? n : 0
})

const availabilityText = computed(() => {
  const n = roomsAvailable.value
  if (n <= 0) return ""

  // versi fun-friendly ala gojek (ringan, gak maksa)
  if (n === 1) return "Wah, tinggal 1 kamar nih. Cepet pilih ya 🙂"
  if (n === 2) return "Sisa 2 kamar lagi. Biar aman, checkout sekarang 🙂"
  if (n === 3) return "Masih ada 3 kamar. Kalau cocok, langsung gas 🙂"
  if (n === 4) return "Ada 4 kamar tersisa. Lumayan, tapi jangan kelamaan 🙂"

  // untuk stok banyak, biasanya gak perlu ditampilkan (biar UI bersih)
  return ""
})

const availabilityStyle = computed(() => {
  const n = roomsAvailable.value

  // flat: bg lembut + border lembut, tanpa icon, tanpa animasi
  if (n <= 1) return "bg-rose-50 text-rose-700 border-rose-100"
  if (n === 2) return "bg-amber-50 text-amber-700 border-amber-100"
  return "bg-sky-50 text-sky-700 border-sky-100"
})

// ===== PRICE CALC =====
const basePriceNumber = computed(() => {
  const v = props.room?.basePrice
  if (typeof v === "number") return v

  const parsed = Number(String(props.price || "").replace(/[^\d]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
})

const discountType = computed<DiscountType>(() => {
  const dt = (props.room?.discountType || "").toLowerCase()
  if (dt === "fixed") return "fixed"
  if (dt === "percent") return "percent"
  return null
})

const discountValue = computed<number>(() => {
  const v = Number(props.room?.discountValue ?? 0)
  return Number.isFinite(v) ? v : 0
})

const finalPriceNumber = computed(() => {
  const base = basePriceNumber.value
  const dv = discountValue.value
  if (!dv || dv <= 0) return base

  if (discountType.value === "fixed") return Math.max(0, base - dv)
  if (discountType.value === "percent") return Math.max(0, Math.round(base * (1 - dv / 100)))

  return base
})

const originalPriceNumber = computed(() => {
  const parsedOld = Number(String(props.originalPrice || "").replace(/[^\d]/g, ""))
  const old = Number.isFinite(parsedOld) ? parsedOld : 0

  if (discountValue.value > 0) return basePriceNumber.value
  return old > 0 ? old : basePriceNumber.value
})

const discountPercent = computed(() => {
  if (discountValue.value <= 0) return 0
  if (discountType.value === "percent") return Math.max(0, Math.min(99, Math.round(discountValue.value)))

  const base = basePriceNumber.value
  if (base <= 0) return 0
  return Math.max(0, Math.min(99, Math.round((discountValue.value / base) * 100)))
})

// ===== LINK =====
const roomLink = computed(() => {
  const propertyPart = props.propertiesSlug || props.room.propertiesSid
  return `/properties/${propertyPart}/rooms/${props.room.propertiesRoomsSlug}`
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.6;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: white;
}
</style>
