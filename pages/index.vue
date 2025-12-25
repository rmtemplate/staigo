<template>
  <!-- WRAPPER: background di belakang rounded jadi sama (bg-primary) -->
  <div class="bg-primary">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 w-full rounded-b-4xl bg-primary px-5 py-3">
      <div class="mb-3 flex items-center justify-between">
        <h1 class="sr-only">Beranda</h1>

        <NuxtLink to="/" class="inline-flex items-center" aria-label="Kembali ke Beranda">
          <img
            src="/images/logo/logo-putih.svg"
            alt="Nama Brand"
            class="h-8 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </NuxtLink>
      </div>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <NuxtLink
          to="/properties"
          class="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-4 py-3 transition hover:bg-gray-50"
          role="button"
          tabindex="0"
          aria-label="Buka pencarian"
        >
          <img src="/images/icons/search.svg" alt="" class="h-5 w-5 shrink-0" />
          <span class="truncate text-xs text-gray-700/80">Mau nginep dimana?</span>
        </NuxtLink>

        <!-- Notif -->
        <NuxtLink
          to="/notifications"
          type="button"
          class="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition hover:bg-gray-50"
          aria-label="Notifikasi"
        >
          <img src="/images/icons/notif.svg" alt="" class="h-5 w-5" />
          <span
            v-if="notifCount > 0"
            class="absolute -right-1 -top-1 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white"
            :aria-label="`Ada ${notifCount} notifikasi`"
          >
            {{ notifCount > 99 ? '99+' : notifCount }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <!-- GoPoin -->
    <section class="mb-3.5 px-5" aria-labelledby="gopoin-title">
      <div class="rounded-2xl bg-white p-4 shadow-sm">
        <article class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <div class="mb-2 flex items-center gap-2">
              <img
                src="/images/icons/icon-point.svg"
                width="14"
                height="14"
                class="h-3.5 w-3.5"
                alt="Ikon GoPoin"
                loading="lazy"
                decoding="async"
              />
              <span class="text-xs font-medium text-gray-700">GoPoin</span>
            </div>

            <h2 id="gopoin-title" class="text-base font-semibold text-gray-900">
              Bonus Daftar!
            </h2>
            <p class="mt-0.5 text-xs font-medium text-gray-500">
              Dapatkan 25.000 Poin GRATIS
            </p>
          </div>

          <div class="shrink-0">
            <button
              type="button"
              class="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Daftar untuk mendapatkan bonus GoPoin"
            >
              Daftar
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- Kota -->
    <section class="pb-9" aria-label="Pilih kota">
      <Swiper
        :modules="[FreeMode]"
        :slides-per-view="'auto'"
        :space-between="16"
        :free-mode="{ enabled: true, momentum: true, momentumRatio: 0.9, momentumBounce: true }"
        :centered-slides="false"
        :center-insufficient-slides="false"
        :slides-offset-before="20"
        :slides-offset-after="20"
        class="city-swiper"
      >
        <!-- SKELETON TOP DESTINATION -->
        <template v-if="isLoadingTopDestination">
          <SwiperSlide
            v-for="i in 8"
            :key="`dest-skel-${i}`"
            class="w-auto!"
          >
            <div class="block w-18 text-center">
              <div
                class="mx-auto h-16 w-16 animate-pulse rounded-full bg-white/20"
              />
              <div
                class="mx-auto mt-2 h-3 w-14 animate-pulse rounded-full bg-white/20"
              />
            </div>
          </SwiperSlide>
        </template>

        <!-- DATA TOP DESTINATION -->
        <template v-else>
          <SwiperSlide
            v-for="topDestination in (topDestinationData ?? [])"
            :key="topDestination?.topDestinationSid"
            class="w-auto!"
          >
            <NuxtLink
              to="/"
              class="block w-18 text-center"
              :aria-label="`Pilih kota ${topDestination.refName}`"
            >
              <img
                :src="topDestination.image"
                :alt="`Kota ${topDestination.refName}`"
                class="mx-auto h-16 w-16 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span class="mt-2 block text-xs font-medium text-white">
                {{ topDestination.refName }}
              </span>
            </NuxtLink>
          </SwiperSlide>
        </template>
      </Swiper>

      <!-- optional error -->
      <p v-if="errorTopDestination" class="mt-2 px-5 text-xs text-white/80">
        Gagal memuat destinasi.
      </p>
    </section>
  </div>

  <!-- Konten utama (putih) -->
  <main class="-mt-6 rounded-t-3xl bg-white pt-5">
    <!-- Promo -->
    <section aria-label="Promo yang wajib dicek" class="mb-8">
      <div class="flex items-center gap-2.5 px-5">
        <img src="/images/icons/icon-discount-fire.svg" class="h-5 w-5" alt="Icon diskon" />
        <h2 class="text-base font-bold">Promo yang wajib dicek!</h2>
      </div>

      <Swiper
        :modules="[FreeMode]"
        :slides-per-view="'auto'"
        :space-between="10"
        :free-mode="{ enabled: true, momentum: true, momentumRatio: 0.9, momentumBounce: true }"
        :centered-slides="false"
        :center-insufficient-slides="false"
        :slides-offset-before="20"
        :slides-offset-after="20"
        class="mt-3"
      >
        <SwiperSlide
          v-for="promo in promos"
          :key="promo.title"
          class="w-70! sm:w-80!"
        >
          <NuxtLink to="/" class="block" :aria-label="promo.title">
            <img
              :src="promo.img"
              :alt="promo.title"
              class="h-35 w-full rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </section>
    <!-- End Promo -->

    <!-- Properties -->
    <section aria-label="Stay dan Go kemana?" class="pb-6">
      <!-- Title -->
      <div class="flex items-center gap-2.5 px-5">
        <img
          src="/images/icons/icon-properties.svg"
          class="h-5 w-5"
          alt="Icon properties"
          loading="lazy"
          decoding="async"
        />
        <h2 class="text-base font-bold">Stay dan Go kemana?</h2>
      </div>

      <!-- Swiper -->
      <Swiper
        :modules="[FreeMode]"
        :slides-per-view="'auto'"
        :space-between="16"
        :free-mode="{ enabled: true, momentum: true, momentumRatio: 0.9, momentumBounce: true }"
        :centered-slides="false"
        :center-insufficient-slides="false"
        :slides-offset-before="20"
        :slides-offset-after="20"
        class="mt-3"
      >
        <!-- SKELETON TOP PROPERTIES -->
        <template v-if="isLoadingTopProperties">
          <SwiperSlide
            v-for="i in 4"
            :key="`prop-skel-${i}`"
            class="w-50! sm:w-50! mb-4"
          >
            <div class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
              <!-- image skeleton -->
              <div class="relative h-40 w-full overflow-hidden">
                <div class="h-full w-full animate-pulse bg-gray-200" />
                <div class="absolute left-3 top-3 h-6 w-18 animate-pulse rounded-full bg-gray-200" />
              </div>

              <!-- content skeleton -->
              <div class="flex flex-1 flex-col p-3">
                <div class="h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
                <div class="mt-2 h-4 w-3/5 animate-pulse rounded-full bg-gray-200" />

                <div class="mt-3 flex items-center gap-2">
                  <div class="h-4 w-4 animate-pulse rounded bg-gray-200" />
                  <div class="h-3 w-4/5 animate-pulse rounded-full bg-gray-200" />
                </div>

                <div class="mt-2 flex items-center gap-2">
                  <div class="h-4 w-4 animate-pulse rounded bg-gray-200" />
                  <div class="h-3 w-16 animate-pulse rounded-full bg-gray-200" />
                </div>

                <div class="mt-auto pt-3">
                  <div class="flex items-end justify-between">
                    <div class="flex flex-col gap-2">
                      <div class="h-3 w-20 animate-pulse rounded-full bg-gray-200" />
                      <div class="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
                    </div>
                    <div class="h-3 w-12 animate-pulse rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </template>

        <!-- DATA TOP PROPERTIES -->
        <template v-else>
          <SwiperSlide
            v-for="p in (topPropertiesData ?? [])"
            :key="p.propertiesSid"
            class="w-50! sm:w-50! mb-4"
          >
            <NuxtLink
              :to="`/properties/${p.propertiesSlug}`"
              class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition"
              :aria-label="p.propertiesName"
            >
              <!-- Image -->
              <div class="relative h-40 w-full overflow-hidden">
                <img
                  :src="p.propertiesThumbnail"
                  :alt="p.propertiesName"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <!-- Discount badge (floating) -->
                <div
                  v-if="p.discountValue && p.discountValue > 0"
                  class="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#FE6A00] px-2 py-1 text-xs font-semibold text-white"
                  :aria-label="`Diskon ${p.discountValue}%`"
                >
                  Dis. {{ p.discountValue }}%
                </div>
              </div>

              <!-- Content -->
              <div class="flex flex-1 flex-col p-3">
                <!-- Title max 2 baris + ellipsis -->
                <h3 class="line-clamp-2 h-10 text-sm font-bold text-gray-900">
                  {{ p.propertiesName }}
                </h3>

                <div class="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin class="h-4 w-4 text-primary" />
                  <span class="truncate">{{ p.subDistrictsName }}, {{ p.regenciesName }}</span>
                </div>

                <div class="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <Star class="h-4 w-4 text-yellow-500" />
                  <span class="font-semibold text-gray-700">{{ p.ratingAvg }}</span>
                  <span class="text-gray-400">/ 5</span>
                </div>

                <!-- Harga: dipaksa paling bawah -->
                <div class="mt-auto pt-3">
                  <div class="flex items-end justify-between">
                    <div class="flex flex-col">
                      <span
                        v-if="p.discountValue && p.discountValue > 0"
                        class="text-xs text-gray-400 line-through"
                      >
                        {{ formatIDR(p.minPrice || 0) }}
                      </span>

                      <span class="text-sm font-bold text-primary">
                        {{
                          formatIDR(
                            p.discountValue && p.discountValue > 0
                              ? Math.round((p.minPrice || 0) * (1 - p.discountValue / 100))
                              : p.minPrice || 0
                          )
                        }}
                      </span>
                    </div>

                    <span class="text-xs text-gray-500">/ malam</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </template>
      </Swiper>

      <!-- optional error -->
      <p v-if="errorTopProperties" class="mt-2 px-5 text-xs text-gray-500">
        Gagal memuat top properties.
      </p>
    </section>
    <!-- End Properties -->
  </main>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

import { MapPin, Star } from 'lucide-vue-next'
import type { ApiResponse } from '~/types/api'
import type { TopDestination } from '~/types/topDestination'
import type { Property } from '~/types/property'
import { formatIDR } from '~/helpers/utils.helper'

definePageMeta({
  showBottomBar: true
})

const notifCount = 12


const promos = [
  { title: 'Promo 1', img: '/images/promos/1.png' },
  { title: 'Promo 2', img: '/images/promos/2.png' }
]

const {
  data: topDestinationData,
  pending: isLoadingTopDestination,
  error: errorTopDestination
} = useApiData<ApiResponse<TopDestination[]>>('/api/v2/discover/top-destinations', { lazy: true })

const {
  data: topPropertiesData,
  pending: isLoadingTopProperties,
  error: errorTopProperties
} = useApiData<ApiResponse<Property[]>>('/api/v2/discover/top-properties', { lazy: true })
</script>

<style scoped>
/* Hindari Tailwind typo seperti px-0! / w-auto! -> pakai CSS ini untuk memastikan */
.city-swiper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.city-swiper :deep(.swiper-wrapper) {
  will-change: transform;
}

.city-swiper :deep(.swiper-slide) {
  -webkit-tap-highlight-color: transparent;
}
</style>
