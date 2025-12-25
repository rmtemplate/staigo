<template>
  <div class="min-h-screen bg-gray-50 pb-[200px] font-sans">
    <NavigationAppBar
      title="Detail Kamar"
      bg-class="bg-white/90 backdrop-blur-md border-b border-gray-100"
      text-class="text-slate-900"
      :showBack="true"
      :shadow="false"
      class="fixed top-0 w-full z-40"
    />

    <div class="relative w-full h-[420px] bg-gray-200">
      <Swiper
        class="h-full w-full"
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        :pagination="{ clickable: true, dynamicBullets: true }"
      >
        <SwiperSlide v-for="(photo, index) in heroPhotos" :key="index">
          <img
            :src="photo"
            class="h-full w-full object-cover"
            :alt="`${pageTitle} image ${index + 1}`"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none"
          ></div>
        </SwiperSlide>
      </Swiper>

      <button
        class="absolute bottom-12 right-6 bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-full px-4 py-2 text-xs font-semibold tracking-wide hover:bg-white/30 transition-all z-10 flex items-center gap-2"
        @click="openPhotoSheet = true"
      >
        <Map class="w-3.5 h-3.5" />
        Lihat Semua Foto
      </button>
    </div>

    <div
      class="relative -mt-8 bg-white rounded-t-[2.5rem] px-6 pt-10 pb-6 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"
    >
      <div class="mb-6">
        <div
          v-if="roomStock <= 5"
          class="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3 animate-pulse"
        >
          <AlertCircle class="w-3.5 h-3.5 text-[var(--ui-error)]" />
          <span class="text-[11px] font-bold text-[var(--ui-error)] tracking-wide uppercase">
            Sisa {{ roomStock }} Kamar Tersedia
          </span>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold text-slate-900 leading-tight font-display mb-2">
          {{ pageTitle }}
        </h1>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h6 class="text-md text-[#242B42] font-bold">Fasilitas Utama</h6>

          <button
            class="text-xs font-semibold text-[var(--ui-primary)] hover:underline"
            @click="openFasilitasSheet = true"
          >
            Lihat Semua
          </button>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div v-for="item in fasilitas.slice(0, 4)" :key="item.id" class="flex flex-col items-center gap-2 group">
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-all duration-200 group-hover:shadow-md border border-transparent group-hover:border-primary/20"
            >
              <img :src="item.icon" class="w-6 h-6 opacity-70 transition group-hover:opacity-100" />
            </div>
            <span class="text-[11px] text-slate-500 font-medium text-center leading-tight">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h6 class="text-md text-[#242B42] font-bold">Deskripsi Kamar</h6>

        <div class="relative mt-2">
          <p class="text-sm text-slate-500 leading-relaxed text-justify" :class="{ 'line-clamp-3': !isExpanded }">
            {{ fullDescription }}
          </p>
          <button
            @click="isExpanded = !isExpanded"
            class="mt-2 flex items-center gap-1 text-sm font-semibold text-[var(--ui-primary)] hover:opacity-80 transition-all"
          >
            {{ isExpanded ? "Tutup Deskripsi" : "Baca Selengkapnya" }}
            <ChevronDown class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isExpanded }" />
          </button>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between">
          <h6 class="text-md text-[#242B42] font-bold">Check-in Prosedur</h6>
        </div>

        <div class="flex justify-between items-center gap-2 mt-2">
          <div>
            <span class="text-xs text-[#7E8CA0]">Check-in</span>
            <h6 class="text-md text-[#242B42] font-semibold">14:00 - 23:59</h6>
          </div>

          <div class="flex-1 flex items-center">
            <div class="border-b border-dashed border-[#7E8CA0] w-[50%] mx-auto"></div>
          </div>

          <div class="text-right">
            <span class="text-xs text-[#7E8CA0]">Check-out</span>
            <h6 class="text-md text-[#242B42] font-semibold">12:00</h6>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h6 class="text-md text-[#242B42] font-bold">Rincian Pembayaran</h6>

        <div class="mt-2">
          <div class="space-y-3 mb-4">
            <div v-for="(item, idx) in priceBreakdown" :key="idx" class="flex justify-between items-start text-sm group">
              <div class="flex flex-col">
                <span class="text-slate-600 font-medium">{{ item.label }}</span>
                <span class="text-[10px] text-slate-400">{{ item.date }}</span>
              </div>
              <span class="text-slate-900 font-semibold tracking-tight">{{ formatCurrency(item.price) }}</span>
            </div>

            <div class="flex justify-between items-center text-sm pt-2 border-t border-dashed border-gray-200">
              <span class="text-slate-500">Biaya Layanan</span>
              <span class="text-slate-900 font-semibold">{{ formatCurrency(serviceFee) }}</span>
            </div>

            <div v-if="discountAmount > 0" class="flex justify-between items-center text-sm text-[var(--ui-success)]">
              <span class="font-medium">Potongan Diskon</span>
              <span class="font-bold">- {{ formatCurrency(discountAmount) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-slate-500 text-sm font-medium">Total ({{ totalNights }} Malam)</span>
            <span class="text-lg font-bold text-[var(--ui-primary)] font-display">{{ formatCurrency(grandTotal) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 w-full z-50">
      <div class="px-6 mb-3 flex justify-center w-full">
        <div
          class="bg-white/95 backdrop-blur-sm border border-[var(--ui-primary-light)]/30 rounded-full pl-2 pr-4 py-2 shadow-lg shadow-[var(--ui-primary)]/10 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-500"
        >
          <div class="w-8 h-8 rounded-full bg-[var(--ui-primary)]/10 flex items-center justify-center shrink-0">
            <img src="/images/icons/icon-point.svg" class="w-5 h-5" alt="Point Icon" />
          </div>
          <div class="flex flex-col text-xs leading-none gap-1">
            <span class="text-slate-500">Yuk lanjutkan pesananmu</span>
            <span class="font-bold text-[var(--ui-primary)]">Kamu bakal dapet +{{ earnedPoints }} poin</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white border-t border-gray-100 px-6 py-4 pb-8 flex items-center justify-between gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.04)]"
      >
        <div class="flex flex-col">
          <span class="text-xs text-slate-500 font-semibold mb-1">Total Harga :</span>

          <span v-if="hasDiscount" class="text-xs text-slate-400 line-through decoration-red-400 decoration-1">
            {{ formatCurrency(grandTotalBeforeDiscount) }}
          </span>

          <span class="text-xl font-bold text-slate-900 font-display">
            {{ formatCurrency(grandTotal) }}
          </span>
        </div>

        <NuxtLink
          to="/bookings/create"
          class="flex-1 h-12 bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-dark)] text-white font-bold rounded-xl shadow-lg shadow-[var(--ui-primary)]/25 active:scale-95 transition-all flex items-center justify-center gap-5"
        >
          Pesan Sekarang
          <ArrowRight class="w-4 h-4 opacity-80" />
        </NuxtLink>
      </div>
    </div>

    <!-- ===== BottomSheet: Semua Foto ===== -->
    <BaseBottomSheet v-model="openPhotoSheet" title="Semua Foto" cancelText="Tutup">
      <div class="px-4 pb-6">
        <div class="grid grid-cols-3 gap-3">
          <img
            v-for="(img, idx) in heroPhotos"
            :key="idx"
            :src="img"
            :alt="`${pageTitle} photo ${idx + 1}`"
            class="w-full h-24 rounded-lg object-cover cursor-pointer"
          />
        </div>
      </div>
    </BaseBottomSheet>

    <!-- ===== BottomSheet: Semua Fasilitas ===== -->
    <BaseBottomSheet v-model="openFasilitasSheet" title="Semua Fasilitas" cancelText="Tutup">
      <div class="grid grid-cols-4 gap-4 px-4 pb-6 pt-2">
        <div v-for="(item, i) in fasilitas" :key="i" class="flex flex-col items-center gap-2">
          <img :src="item.icon" class="w-8 h-8" :alt="item.label" />
          <span class="text-xs text-center">{{ item.label }}</span>
        </div>
      </div>
    </BaseBottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useHead, useRequestURL } from "#imports"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import BaseBottomSheet from "@/components/BaseBottomSheet.vue"

import {
  Map,
  AlertCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-vue-next"

definePageMeta({
  layout: "no-bottom",
})

/* ===== Data utama (dipakai SEO juga) ===== */
const pageTitle = "Deluxe Double with Private Pool"
const address = "Simalungun, Parapat, Sumatera Utara"

const roomStock = 3
const isExpanded = ref(false)

const fullDescription =
  "Rasakan pengalaman menginap tak terlupakan dengan pemandangan Danau Toba yang memukau. Kamar seluas 45m² ini didesain dengan interior modern kontemporer, dilengkapi private pool yang menghadap langsung ke danau, smart TV 50 inch, bathtub marmer, dan minibar gratis. Sempurna untuk liburan romantis maupun staycation keluarga kecil Anda."

const fasilitas = [
  { id: 1, icon: "/images/icons/icon-fasilitas.svg", label: "Restoran" },
  { id: 2, icon: "/images/icons/icon-fasilitas.svg", label: "Priv. Pool" },
  { id: 3, icon: "/images/icons/icon-fasilitas.svg", label: "Parkir" },
  { id: 4, icon: "/images/icons/icon-fasilitas.svg", label: "WiFi 6" },
  { id: 5, icon: "/images/icons/icon-fasilitas.svg", label: "Gym" },
]

const heroPhotos = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
]

/* ===== Bottomsheet state ===== */
const openPhotoSheet = ref(false)
const openFasilitasSheet = ref(false)

/* ===== Harga & Diskon (simulasi) ===== */
const basePricePerNight = 200000

const nights = [
  { label: "Malam ke-1", date: "20 Des 2024", price: basePricePerNight },
  { label: "Malam ke-2", date: "21 Des 2024", price: basePricePerNight },
  { label: "Malam ke-3", date: "22 Des 2024", price: basePricePerNight },
]

const serviceFee = 2000
const hasDiscount = false
const discountPercent = 0

const priceBreakdown = computed(() => nights)
const totalNights = computed(() => nights.length)

const totalBasePrice = computed(() => nights.reduce((sum, item) => sum + item.price, 0))

const discountAmount = computed(() => {
  if (!hasDiscount) return 0
  return (totalBasePrice.value * discountPercent) / 100
})

const grandTotalBeforeDiscount = computed(() => totalBasePrice.value + serviceFee)

const grandTotal = computed(() => (totalBasePrice.value - discountAmount.value) + serviceFee)

const earnedPoints = computed(() => Math.floor(grandTotal.value / 1000))

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/* ===== SEO Friendly (useHead) ===== */
const url = useRequestURL()
const canonicalUrl = computed(() => `${url.origin}${url.pathname}`)

const metaDescription = computed(() => {
  const short = fullDescription.length > 155 ? `${fullDescription.slice(0, 152)}...` : fullDescription
  return `${pageTitle} — ${short}`
})

const ogImage = computed(() => {
  // heroPhotos sudah absolute URL, jadi aman. kalau nanti jadi relative, bisa prefix url.origin
  return heroPhotos?.[0] || `${url.origin}/images/og-default.jpg`
})

useHead({
  title: `${pageTitle} | Detail Kamar`,
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  meta: [
    { name: "description", content: metaDescription.value },
    { name: "robots", content: "index,follow" },

    // Open Graph
    { property: "og:type", content: "product" },
    { property: "og:title", content: `${pageTitle} | Detail Kamar` },
    { property: "og:description", content: metaDescription.value },
    { property: "og:url", content: canonicalUrl.value },
    { property: "og:image", content: ogImage.value },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${pageTitle} | Detail Kamar` },
    { name: "twitter:description", content: metaDescription.value },
    { name: "twitter:image", content: ogImage.value },
  ],
  script: [
    {
      type: "application/ld+json",
      // children: JSON.stringify({
      //   "@context": "https://schema.org",
      //   "@type": "HotelRoom",
      //   name: pageTitle,
      //   description: fullDescription,
      //   image: heroPhotos,
      //   occupancy: {
      //     "@type": "QuantitativeValue",
      //     value: 2,
      //     unitCode: "C62",
      //   },
      //   amenityFeature: fasilitas.map((f) => ({
      //     "@type": "LocationFeatureSpecification",
      //     name: f.label,
      //     value: true,
      //   })),
      //   containedInPlace: {
      //     "@type": "Hotel",
      //     name: "Staigo Abian Klumpu Villa Bali",
      //     address: {
      //       "@type": "PostalAddress",
      //       streetAddress: address,
      //       addressRegion: "Sumatera Utara",
      //       addressCountry: "ID",
      //     },
      //   },
      //   offers: {
      //     "@type": "Offer",
      //     priceCurrency: "IDR",
      //     price: grandTotal.value,
      //     availability: roomStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      //     url: canonicalUrl.value,
      //   },
      // }),
    },
  ],
})
</script>

<style scoped>
.font-display {
  font-family: var(--font-display, sans-serif);
}

/* Bullet Pagination Swiper */
:deep(.swiper-pagination-bullet-active) {
  background-color: white !important;
  width: 20px;
  border-radius: 4px;
}
:deep(.swiper-pagination-bullet) {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
