<template>
  <div class="bg-gray-50 min-h-screen pb-[100px] font-sans">

    <nav class="fixed top-0 left-0 w-full z-[50] transition-all duration-300 pointer-events-none">
      <div class="relative w-full h-16 px-4 flex items-center justify-between">
        <div class="absolute inset-0 bg-white/90 backdrop-blur-md shadow-sm transition-opacity duration-300"
          :class="isScrolled ? 'opacity-100' : 'opacity-0'"></div>
        <span
          class="absolute left-14 top-1/2 -translate-y-1/2 font-bold text-slate-800 text-sm truncate w-[60%] transition-opacity duration-300 z-10"
          :class="isScrolled ? 'opacity-100' : 'opacity-0'">
          {{ pageTitle }}
        </span>
        <button @click="$router.back()"
          class="pointer-events-auto relative z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95"
          :class="isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'">
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button @click="sharePage"
          class="pointer-events-auto relative z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95"
          :class="isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'">
          <Share2 class="w-5 h-5" />
        </button>
      </div>
    </nav>

    <div class="relative h-[320px] w-full bg-slate-200">
      <Swiper class="h-full w-full" :modules="[Autoplay, Pagination]" :loop="true" :autoplay="{ delay: 4000 }"
        :pagination="{ clickable: true }">
        <SwiperSlide v-for="(photo, index) in heroPhotos" :key="index">
          <img :src="photo" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none">
          </div>
        </SwiperSlide>
      </Swiper>
      <button
        class="absolute bottom-8 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-medium z-10 active:scale-95 transition-transform"
        @click="openSheet()">
        Lihat Semua Foto
      </button>
    </div>

    <div class="relative -mt-6 bg-gray-50 rounded-t-3xl px-5 py-6 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">

      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-800 leading-snug mb-2">{{ pageTitle }}</h1>
        <div class="flex items-center gap-2 text-slate-500 text-sm active:opacity-70 cursor-pointer">
          <MapPin class="w-4 h-4 text-primary shrink-0" />
          <span class="truncate border-b border-dashed border-slate-300 pb-0.5">{{ address }}</span>
        </div>
      </div>

      <div class="mb-8 group cursor-pointer overflow-hidden">

        <NuxtLink
          :to="`/properties/${pageTitle}/review`"
          class="w-full mb-3 flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all group">
          <div class="flex items-center gap-3">

            <div
              class="flex flex-col items-center justify-center w-11 h-11 bg-blue-50 text-primary rounded-xl shrink-0">
              <span class="text-lg font-extrabold leading-none">4.6</span>
            </div>

            <div class="text-left">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-800 text-sm leading-none">Luar Biasa</h4>
                <div
                  class="flex items-center bg-orange-50 px-1.5 py-0.5 rounded text-[10px] text-orange-600 font-bold gap-0.5">
                  <Star class="w-2.5 h-2.5 fill-current" />
                  <span>4.6</span>
                </div>
              </div>

              <p class="text-xs text-slate-400 mt-1 truncate">
                Berdasarkan <strong>128 ulasan</strong> tamu
              </p>
            </div>

          </div>

          <div class="flex items-center gap-1 text-primary/80">
            <span class="text-[10px] font-semibold">Lihat</span>
            <ChevronRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NuxtLink>


        <!-- SWIPER Zone -->
        <Swiper :slides-per-view="1.1" space-between="12" class="overflow-visible">
          <SwiperSlide v-for="(review, index) in reviews" :key="index">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">

              <!-- USER -->
              <div class="flex items-center gap-3 mb-2">
                <img :src="'https://ui-avatars.com/api/?background=random&name=' + review.name"
                  class="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p class="font-semibold text-xs text-slate-700">
                    {{ review.name }}
                  </p>
                  <StarRating :rating="review.rating" />
                </div>
              </div>

              <!-- TEXT -->
              <p class="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                {{ review.text }}
              </p>

            </div>
          </SwiperSlide>
        </Swiper>

      </div>


      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-bold text-slate-800">Fasilitas Populer</h3>
          <button class="text-xs font-semibold text-primary" @click="openFasilitasSheet = true">Lihat Semua</button>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div v-for="item in fasilitas.slice(0, 4)" :key="item.id" class="flex flex-col items-center gap-2 group">
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-all duration-200 group-hover:shadow-md border border-transparent group-hover:border-primary/20">
              <img :src="item.icon" class="w-6 h-6 opacity-70 transition group-hover:opacity-100" />
            </div>
            <span class="text-[11px] text-slate-500 font-medium text-center leading-tight">{{ item.label }}</span>
          </div>
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

      <div class="mb-8">
        <h3 class="text-base font-bold text-slate-800 mb-4">Lokasi & Sekitar</h3>
        <div class="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm mb-5 group cursor-pointer">
          <img src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg"
            class="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 active:scale-95 transition-transform">
            <Map class="w-4 h-4 text-primary" />
            <span class="text-xs font-bold text-slate-700">Buka Peta</span>
          </div>
        </div>

        <div class="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          <button v-for="tab in nearbyTabs" :key="tab" @click="activeNearbyTab = tab"
            class="px-4 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap"
            :class="activeNearbyTab === tab ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'">
            {{ tab }}
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="(place, i) in filteredNearby" :key="i" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <component :is="place.icon" class="w-4 h-4" />
              </div>
              <div>
                <h6 class="text-sm font-semibold text-slate-700">{{ place.name }}</h6>
                <p class="text-[10px] text-slate-400 uppercase tracking-wide">{{ place.category }}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-600">{{ place.distance }}</span>
          </div>
        </div>
      </div>

      <div ref="roomSectionRef" class="scroll-mt-20">
        <div class="w-full rounded-2xl bg-primary text-white px-3 py-5 shadow-lg flex justify-between items-center mb-8">

          <!-- Text Section -->
          <div>
            <p class="text-md font-semibold mb-2">Tanggal Menginap</p>

            <div class="flex items-center gap-2 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.6" stroke="currentColor" class="w-4 h-4 opacity-90">
                <path stroke-linecap="round" stroke-linejoin="round" :d="CALENDAR_D" />
              </svg>

              <span>{{ staySummary }}</span>
            </div>
          </div>

          <!-- Button -->
          <button
            @click.stop="openBookingSheet"
            class="rounded-xl px-4 py-2 text-sm font-semibold bg-linear-to-r from-orange-500 to-yellow-400 text-white shadow-md">
            Ubah
          </button>

        </div>

        <CardRoom class="mb-6" title="Deluxe Double With Private Pool" :photos="photoCategories[0].photos"
          :fasilitas="fasilitas.slice(0, 6)" price="270.000" originalPrice="459.000" />
        <CardRoom class="mb-6" title="Executive Ocean View Suite" :photos="photoCategories[0].photos"
          :fasilitas="fasilitas.slice(0, 6)" price="450.000" originalPrice="650.000" />
      </div>

    </div>

    <!-- Bottom bar (hide when roomSectionRef already touched) -->
    <div
      v-show="!hideBottomBar"
      class="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-5 py-3 pb-safe z-[40] flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.05)] gap-3">

      <!-- Left: Price Info -->
      <div class="flex flex-col">
        <span class="text-[10px] text-slate-500 font-medium">
          Harga mulai dari
        </span>

        <div class="flex items-baseline gap-1">
          <span class="text-lg font-bold text-primary">
            Rp270.000
          </span>
          <span class="text-[10px] text-slate-400">
            /malam
          </span>
        </div>
      </div>

      <!-- Right: Button + Point -->
      <div class="flex flex-col items-end gap-1">

        <button
          @click="scrollToRooms"
          class="bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl
                shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
          Lihat Kamar
        </button>

        <div class="flex items-center gap-2  mt-2">
          <img
            src="/images/icons/icon-point.svg"
            class="w-3.5 h-3.5"
            alt="Poin Icon"
          >
          <span class="text-[11px] block font-medium text-slate-600">
            Harga terbaik! Bonus 1.600 poin!
          </span>
        </div>

      </div>
    </div>


    <!-- ===== BottomSheet: Booking (Checkin/Checkout + Room&Guess) ===== -->
    <BaseBottomSheet
      v-model="isBookingOpen"
      title="Ubah Tanggal Menginap"
      bodyClass="px-0"
      footerClass="pt-4 pb-5"
      :draggable="true"
      headerClass="pt-3 pb-3"
    >
      <div class="px-5">
        <div class="bg-white my-3 overflow-hidden">
          <!-- Dates -->
          <button
            type="button"
            class="w-full text-left py-4 px-4 active:bg-gray-50"
            @click="openDateSheet"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-gray-500">Check-in</span>
              <span class="text-xs font-medium text-gray-500">Check-out</span>
            </div>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-2">
                <CalendarDaysIcon class="w-5 h-5 text-primary" />
                <span class="font-semibold text-[#242B42] text-[14px]">{{ checkIn }}</span>
              </div>

              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full border border-[#D7DDE3] flex items-center justify-center">
                  <MoonIcon class="w-3.5 h-3.5 text-[#242B42]" />
                </div>
                <span class="text-[12px] font-semibold text-[#242B42]">
                  {{ nights }} Malam
                </span>
              </div>

              <div class="flex items-center gap-2">
                <CalendarDaysIcon class="w-5 h-5 text-primary" />
                <span class="font-semibold text-[#242B42] text-[14px]">{{ checkOut }}</span>
              </div>
            </div>
          </button>

          <div class="h-px bg-[#E6E9ED] w-full"></div>

          <!-- Room & Guess -->
          <button
            type="button"
            class="w-full text-left py-4 px-4 active:bg-gray-50"
            @click="openRoomGuest"
          >
            <span class="text-xs font-medium text-gray-500">Room &amp; Guess</span>
            <div class="flex items-center gap-3 mt-2">
              <UsersIcon class="w-5 h-5 text-primary" />
              <span class="font-semibold text-[#242B42] text-[14px]">
                {{ roomGuestLabel }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <template #footer>
        <div class="px-5">
          <button
            type="button"
            class="w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
            @click="isBookingOpen = false"
          >
            Selesai
          </button>
        </div>
      </template>
    </BaseBottomSheet>

    <!-- ===== BottomSheet: Set Date ===== -->
    <BaseBottomSheet
      v-model="isDateOpen"
      title="Set Date"
      bodyClass="px-0"
      footerClass="pt-4 pb-5"
      :draggable="true"
      headerClass="pt-3 pb-3"
    >
      <RangeCalendar
        v-model="draftRange"
        :minDate="new Date()"
        :disableBeforeMin="true"
        :showTodayLabel="true"
        locale="en-US"
      />

      <template #footer>
        <div class="px-5">
          <div class="flex items-end justify-between text-[#7A869A]">
            <div class="w-[42%]">
              <div class="text-[14px]">Check-in</div>
              <div class="text-[18px] font-extrabold text-[#1F2433] mt-1">
                {{ fmtLong(draftRange.start) }}
              </div>
            </div>

            <div class="flex-1 px-3 pb-3">
              <div class="border-b border-dashed border-[#7A869A]" />
            </div>

            <div class="w-[42%] text-right">
              <div class="text-[14px]">Check-out</div>
              <div class="text-[18px] font-extrabold text-[#1F2433] mt-1">
                {{ fmtLong(draftRange.end) }}
              </div>
            </div>
          </div>

          <button
            type="button"
            class="mt-4 w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold
                   shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
            :disabled="!draftRange.start || !draftRange.end"
            :class="(!draftRange.start || !draftRange.end) ? 'opacity-50 cursor-not-allowed' : ''"
            @click="saveDate"
          >
            Simpan ( {{ nightsFromDraft }} Malam )
          </button>
        </div>
      </template>
    </BaseBottomSheet>

    <!-- ===== BottomSheet: Room & Guess ===== -->
    <BaseBottomSheet
      v-model="isRoomGuestOpen"
      title="Room &amp; Guess"
      bodyClass="px-0"
      footerClass="pt-6 pb-6"
      :draggable="true"
      headerClass="pt-3 pb-3"
    >
      <div class="px-5">
        <div class="py-5 flex items-center justify-between">
          <div class="text-[16px] font-semibold text-[#1F2433]">Kamar</div>
          <div class="flex items-center gap-4">
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="dec('rooms')"
            >
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">
              {{ draftRooms }}
            </div>
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="inc('rooms')"
            >
              <PlusIcon class="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div class="h-px bg-[#E6E9ED]" />

        <div class="py-5 flex items-center justify-between">
          <div class="text-[16px] font-semibold text-[#1F2433]">Dewasa</div>
          <div class="flex items-center gap-4">
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="dec('adults')"
            >
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">
              {{ draftAdults }}
            </div>
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="inc('adults')"
            >
              <PlusIcon class="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div class="h-px bg-[#E6E9ED]" />

        <div class="py-5 flex items-center justify-between">
          <div class="text-[13px] font-semibold text-[#1F2433] leading-snug">
            Anak ( dibawah 7 tahun )
          </div>
          <div class="flex items-center gap-4">
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="dec('kids')"
            >
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">
              {{ draftKidsU7 }}
            </div>
            <button
              class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95"
              @click="inc('kids')"
            >
              <PlusIcon class="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="px-5">
          <button
            type="button"
            class="w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
            @click="saveRoomGuest"
          >
            Simpan
          </button>
        </div>
      </template>
    </BaseBottomSheet>


    <BaseBottomSheet v-model="openPhotoSheet" title="Semua Foto" cancelText="Tutup">
      <div class="space-y-6 px-4 pb-6">
        <div v-for="(cat, i) in photoCategories" :key="i" class="space-y-3">
          <h3 class="font-bold text-lg">{{ cat.category }}</h3>
          <div class="grid grid-cols-3 gap-3 pb-1">
            <img v-for="(img, j) in cat.photos" :key="j" :src="img"
              class="w-full h-24 rounded-lg object-cover cursor-pointer" />
          </div>
        </div>
      </div>
    </BaseBottomSheet>

    <BaseBottomSheet v-model="openFasilitasSheet" title="Semua Fasilitas" cancelText="Tutup">
      <div class="grid grid-cols-4 gap-4 px-4 pb-6 pt-2">
        <div v-for="(item, i) in fasilitas" :key="i" class="flex flex-col items-center gap-2">
          <img :src="item.icon" class="w-8 h-8" />
          <span class="text-xs text-center">{{ item.label }}</span>
        </div>
      </div>
    </BaseBottomSheet>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useHead, useRequestURL } from "#imports"
import {
  ChevronLeft,
  Share2,
  MapPin,
  Star,
  Map,
  ShoppingBag,
  Plane,
  Coffee,
  ChevronRight,
  CalendarDaysIcon,
  MoonIcon,
  UsersIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-vue-next"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import BaseBottomSheet from "@/components/BaseBottomSheet.vue"
import RangeCalendar, { type DateRangeValue } from "@/components/RangeCalendar.vue"

definePageMeta({ layout: "no-bottom" })

/** Single-line SVG path (avoid hydration mismatch) */
const CALENDAR_D =
  "M6.75 3v2.25M17.25 3v2.25M3.75 18.75V7.5c0-1.243 1.007-2.25 2.25-2.25h12c1.243 0 2.25 1.007 2.25 2.25v11.25m-16.5 0A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25m-16.5 0v-7.5c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v7.5"

/* ===== DATA YANG DIPAKAI SEO: definisikan dulu sebelum useHead() ===== */
const pageTitle = "Staigo Abian Klumpu Villa Bali"
const address = "Simalungun, Parapat, Sumatera Utara"

const photoCategories = [
  { category: "Main", photos: ["/images/properties/1.png", "/images/properties/2.png"] },
]
const heroPhotos = photoCategories[0].photos

/* ===== SEO Friendly ===== */
const url = useRequestURL()
const canonicalUrl = computed(() => `${url.origin}${url.pathname}`)
const metaDescription = computed(
  () => `${pageTitle} — cek foto, fasilitas populer, review tamu, dan pilihan kamar. Lokasi: ${address}.`
)
// image absolute (kalau heroPhotos kosong -> fallback)
const ogImage = computed(() => {
  const first = heroPhotos?.[0]
  return first ? `${url.origin}${first}` : `${url.origin}/images/og-default.jpg`
})

useHead({
  title: `${pageTitle} | Detail Properti`,
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  meta: [
    { name: "description", content: metaDescription.value },
    { name: "robots", content: "index,follow" },

    { property: "og:type", content: "website" },
    { property: "og:title", content: `${pageTitle} | Detail Properti` },
    { property: "og:description", content: metaDescription.value },
    { property: "og:url", content: canonicalUrl.value },
    { property: "og:image", content: ogImage.value },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${pageTitle} | Detail Properti` },
    { name: "twitter:description", content: metaDescription.value },
    { name: "twitter:image", content: ogImage.value },
  ],
  script: [
    {
      type: "application/ld+json",
      // children: JSON.stringify({
      //   "@context": "https://schema.org",
      //   "@type": "Hotel",
      //   name: pageTitle,
      //   address: {
      //     "@type": "PostalAddress",
      //     addressLocality: "Parapat",
      //     addressRegion: "Sumatera Utara",
      //     addressCountry: "ID",
      //     streetAddress: address,
      //   },
      //   url: canonicalUrl.value,
      //   image: [ogImage.value],
      //   aggregateRating: {
      //     "@type": "AggregateRating",
      //     ratingValue: 4.6,
      //     reviewCount: 128,
      //   },
      // }),
    },
  ],
})

/* ===== STATE UI ===== */
const isScrolled = ref(false)
const openPhotoSheet = ref(false)
const openFasilitasSheet = ref(false)
const openSheet = () => (openPhotoSheet.value = true)
const sharePage = () => {}

/* ===== Hide bottom bar ketika roomSectionRef tersentuh ===== */
const roomSectionRef = ref<HTMLElement | null>(null)
const hideBottomBar = ref(false)

function scrollToRooms() {
  roomSectionRef.value?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function handleScroll() {
  isScrolled.value = window.scrollY > 200
  if (roomSectionRef.value) {
    const rect = roomSectionRef.value.getBoundingClientRect()
    hideBottomBar.value = rect.top <= window.innerHeight
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
  handleScroll()
})
onUnmounted(() => window.removeEventListener("scroll", handleScroll))

/* ===== Nearby ===== */
const activeNearbyTab = ref("Semua")
const nearbyTabs = ["Semua", "Wisata", "Belanja", "Transport", "Kuliner"]

const nearbyData = [
  { name: "Danau Toba", category: "Wisata", distance: "500 m", type: "Wisata", icon: Map },
  { name: "Parapat Point Mall", category: "Belanja", distance: "1.2 km", type: "Belanja", icon: ShoppingBag },
  { name: "Bandara Silangit", category: "Transport", distance: "45 km", type: "Transport", icon: Plane },
  { name: "Coffee Shop Toba", category: "Kuliner", distance: "200 m", type: "Wisata", icon: Coffee },
]

const filteredNearby = computed(() => {
  if (activeNearbyTab.value === "Semua") return nearbyData
  return nearbyData.filter((item) => item.type === activeNearbyTab.value)
})

/* ===== Fasilitas ===== */
const fasilitas = [
  { id: 1, icon: "/images/icons/icon-fasilitas.svg", label: "Restoran" },
  { id: 2, icon: "/images/icons/icon-fasilitas.svg", label: "Kolam Renang" },
  { id: 3, icon: "/images/icons/icon-fasilitas.svg", label: "Parkir" },
  { id: 4, icon: "/images/icons/icon-fasilitas.svg", label: "WiFi Gratis" },
  { id: 5, icon: "/images/icons/icon-fasilitas.svg", label: "Gym" },
]

/* ===== Reviews ===== */
const reviews = [
  { name: "Rina", rating: 5, avatar: "/img/user1.jpg", text: "Pelayanan sangat ramah, kamar bersih, lokasi dekat banget pusat kota!" },
  { name: "Andi", rating: 4.5, avatar: "/img/user2.jpg", text: "Staff sangat cepat respon, makanan enak, cuma AC agak berisik." },
  { name: "Maya", rating: 4, avatar: "/img/user3.jpg", text: "Harga sesuai kualitas. Recommend buat liburan sama keluarga." },
]

/* ===== Booking Sheet (Ubah) ===== */
const isBookingOpen = ref(false)
const openBookingSheet = () => (isBookingOpen.value = true)

/* Dates */
const checkIn = ref("18 Feb")
const checkOut = ref("19 Feb")
const nights = ref(1)

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

const bookingRange = ref<DateRangeValue>({
  start: startOfDay(new Date()),
  end: startOfDay(addDays(new Date(), 1)),
})
const draftRange = ref<DateRangeValue>({ start: null, end: null })

const isDateOpen = ref(false)
const openDateSheet = () => {
  draftRange.value = { ...bookingRange.value }
  isDateOpen.value = true
}

const diffDays = (a: Date, b: Date) => {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime()
  return Math.max(0, Math.round(ms / 86400000))
}

const nightsFromDraft = computed(() => {
  if (!draftRange.value.start || !draftRange.value.end) return 0
  return diffDays(draftRange.value.start, draftRange.value.end)
})

const fmtShort = (d: Date | null) => {
  if (!d) return "-"
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(d)
}
const fmtLong = (d: Date | null) => {
  if (!d) return "-"
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d)
}

const saveDate = () => {
  if (!draftRange.value.start || !draftRange.value.end) return
  bookingRange.value = { ...draftRange.value }
  checkIn.value = fmtShort(bookingRange.value.start)
  checkOut.value = fmtShort(bookingRange.value.end)
  nights.value = diffDays(bookingRange.value.start!, bookingRange.value.end!)
  isDateOpen.value = false
}

/* Room & Guess */
const rooms = ref(2)
const adults = ref(2)
const kidsU7 = ref(0)

const isRoomGuestOpen = ref(false)
const draftRooms = ref(2)
const draftAdults = ref(2)
const draftKidsU7 = ref(0)

const roomGuestLabel = computed(() => `${rooms.value} Kamar, ${adults.value} Dewasa`)

const openRoomGuest = () => {
  draftRooms.value = rooms.value
  draftAdults.value = adults.value
  draftKidsU7.value = kidsU7.value
  isRoomGuestOpen.value = true
}

const saveRoomGuest = () => {
  rooms.value = draftRooms.value
  adults.value = draftAdults.value
  kidsU7.value = draftKidsU7.value
  isRoomGuestOpen.value = false
}

const dec = (k: "rooms" | "adults" | "kids") => {
  if (k === "rooms") draftRooms.value = Math.max(1, draftRooms.value - 1)
  if (k === "adults") draftAdults.value = Math.max(1, draftAdults.value - 1)
  if (k === "kids") draftKidsU7.value = Math.max(0, draftKidsU7.value - 1)
}
const inc = (k: "rooms" | "adults" | "kids") => {
  if (k === "rooms") draftRooms.value = Math.min(9, draftRooms.value + 1)
  if (k === "adults") draftAdults.value = Math.min(20, draftAdults.value + 1)
  if (k === "kids") draftKidsU7.value = Math.min(20, draftKidsU7.value + 1)
}

const staySummary = computed(() => `${checkIn.value} - ${checkOut.value}, ${nights.value} Malam, ${rooms.value} Kamar`)
</script>


<style scoped>
/* Custom Scrollbar Hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
  width: 6px;
  height: 6px;
  transition: all 0.3s;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 16px;
  border-radius: 99px;
}
</style>
