<template>
  <div class="min-h-screen bg-white">
    <NavigationAppBar
      title="Promo Terbaik"
      bg-class="bg-white"
      text-class="text-black"
      :showBack="false"
      :shadow="true"
      class="relative z-20"
    />

    <div class="px-5 pt-4 pb-8">
      <div class="space-y-5">
        <NuxtLink
          v-for="promo in promos"
          :key="promo.id"
          :to="`/promo/${promo.slug}`"
          class="group block"
        >
          <!-- Card -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <!-- Thumbnail (full width) -->
            <div class="relative w-full aspect-[16/9] bg-gray-100">
              <img
                :src="promo.thumbnail"
                :alt="promo.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
            </div>

            <!-- Title -->
            <div class="px-4 py-4">
              <p class="text-[15px] font-semibold text-gray-900">
                {{ promo.title }}
              </p>
              <p v-if="promo.subtitle" class="mt-1 text-[13px] text-gray-500">
                {{ promo.subtitle }}
              </p>
            </div>
          </div>
        </NuxtLink>

        <div v-if="promos.length === 0" class="py-14 text-center text-gray-500">
          Belum ada promo
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";



const promos = ref([
  {
    id: 1,
    slug: "diskon-50-untuk-booking-villa",
    title: "Diskon 50% Untuk Booking Villa",
    subtitle: "Berlaku sampai 31 Des 2025",
    thumbnail: "/images/promos/1.png",
  },
  {
    id: 2,
    slug: "cashback-poin-transaksi-pertama",
    title: "Cashback Poin untuk Transaksi Pertama",
    subtitle: "S&K berlaku",
    thumbnail: "/images/promos/2.png",
  },
  {
    id: 3,
    slug: "flash-sale-weekend",
    title: "Flash Sale Weekend",
    subtitle: "Jumat–Minggu",
    thumbnail: "/images/promos/1.png",
  },
]);
</script>
