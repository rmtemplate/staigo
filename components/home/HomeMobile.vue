<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

import { MapPin, Star } from 'lucide-vue-next'


const notifCount = 12

const formatIDR = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
    .format(value)
    .replace('Rp', 'Rp ')

// sementara semua pakai 1.jpg
const cities = [
  { name: 'Medan', img: '/images/cities/1.jpg' },
  { name: 'Jakarta', img: '/images/cities/1.jpg' },
  { name: 'Bandung', img: '/images/cities/1.jpg' },
  { name: 'Bali', img: '/images/cities/1.jpg' },
  { name: 'Surabaya', img: '/images/cities/1.jpg' },
  { name: 'Yogyakarta', img: '/images/cities/1.jpg' },
  { name: 'Makassar', img: '/images/cities/1.jpg' },
]

const promos = [
  { title: 'Promo 1', img: '/images/promos/1.png' },
  { title: 'Promo 2', img: '/images/promos/2.png' }
]



const properties = [
  {
    id: 1,
    title: 'Staigo Abian Klumpu Villa Bali',
    slug: 'staigo-abian-klumpu-villa-bali',
    location: 'Simalungun, Parapat',
    rating: 4.9,
    img: '/images/properties/1.png',
    price: 450000,
    discountPercent: 10,
    to: '/'
  },
  {
    id: 2,
    title: 'Staigo Lakeside Cabin',
    slug: 'staigo-lakeside-cabin',
    location: 'Toba, Sumatera Utara',
    rating: 4.8,
    img: '/images/properties/1.png',
    price: 450000,
    discountPercent: 15,
    to: '/'
  },
  {
    id: 3,
    title: 'Staigo City Stay',
    slug: 'staigo-city-stay',
    location: 'Medan, Sumatera Utara',
    rating: 4.7,
    img: '/images/properties/1.png',
    price: 450000,
    discountPercent: 20,
    to: '/'
  },
  {
    id: 4,
    title: 'Staigo Ubud Escape',
    slug: 'staigo-ubud-escape',
    location: 'Ubud, Bali',
    rating: 4.9,
    img: '/images/properties/1.png',
    price: 450000,
    discountPercent: 2,
    to: '/'
  }
]

</script>

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
        <NuxtLink to="/notifications"
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

    <!-- Kota (Swiper: start sejajar px-5, efek scroll lebih enak) -->
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
        <SwiperSlide v-for="city in cities" :key="city.name" class="w-auto!">
          <NuxtLink
            to="/"
            class="block w-18 text-center"
            :aria-label="`Pilih kota ${city.name}`"
          >
            <img
              :src="city.img"
              :alt="`Kota ${city.name}`"
              class="mx-auto h-16 w-16 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span class="mt-2 block text-xs font-medium text-white">
              {{ city.name }}
            </span>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
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
        <SwiperSlide
          v-for="p in properties"
          :key="p.id"
          class="w-50! sm:w-50! mb-4"
        >
          <NuxtLink
            :to="`/properties/${p.slug}`"
            class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition"
            :aria-label="p.title"
          >
            <!-- Image -->
            <div class="relative h-40 w-full overflow-hidden">
              <img
                :src="p.img"
                :alt="p.title"
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />

              <!-- Discount badge (floating) -->
              <div
                v-if="p.discountPercent && p.discountPercent > 0"
                class="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#FE6A00] px-2 py-1 text-xs font-semibold text-white"
                :aria-label="`Diskon ${p.discountPercent}%`"
              >
                Dis. {{ p.discountPercent }}%
              </div>
            </div>

            <!-- Content -->
            <div class="flex flex-1 flex-col p-3">
              <!-- Title max 2 baris + ellipsis -->
              <h3 class="line-clamp-2 h-10 text-sm font-bold text-gray-900">
                {{ p.title }}
              </h3>

              <div class="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin class="h-4 w-4 text-primary" />
                <span class="truncate">{{ p.location }}</span>
              </div>

              <div class="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <Star class="h-4 w-4 text-yellow-500" />
                <span class="font-semibold text-gray-700">{{ p.rating }}</span>
                <span class="text-gray-400">/ 5</span>
              </div>

              <!-- Harga: dipaksa paling bawah -->
              <div class="mt-auto pt-3">
                <div class="flex items-end justify-between">
                  <div class="flex flex-col">
                    <span
                      v-if="p.discountPercent && p.discountPercent > 0"
                      class="text-xs text-gray-400 line-through"
                    >
                      {{ formatIDR(p.price || 0) }}
                    </span>

                    <span class="text-sm font-bold text-primary">
                      {{
                        formatIDR(
                          p.discountPercent && p.discountPercent > 0
                            ? Math.round((p.price || 0) * (1 - p.discountPercent / 100))
                            : p.price || 0
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
      </Swiper>



    </section>
    <!-- End Properties -->
  </main>

</template>

<style scoped>
/* Hindari Tailwind typo seperti px-0! / w-auto! -> pakai CSS ini untuk memastikan */
.city-swiper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Swiper kadang bikin swipe terasa “ketahan” kalau parent punya overflow/transform.
   Ini bantu biar scrollnya mulus di mobile */
.city-swiper :deep(.swiper-wrapper) {
  will-change: transform;
}

/* Optional: bikin tap highlight lebih halus di mobile */
.city-swiper :deep(.swiper-slide) {
  -webkit-tap-highlight-color: transparent;
}
</style>
