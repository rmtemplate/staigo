<template>
  <div class="min-h-screen bg-white">
    <NavigationAppBar
      title="Detail Promo"
      bg-class="bg-white"
      text-class="text-black"
      :showBack="true"
      :shadow="true"
      class="relative z-20"
    />

    <!-- Hero Thumbnail -->
    <div class="px-5 pt-4">
      <div class="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">
        <div class="relative w-full aspect-[16/9]">
          <img
            :src="promo.thumbnail"
            :alt="promo.title"
            class="h-full w-full object-cover"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0" />

          <div class="absolute left-4 bottom-4 right-4">
            <p class="text-white text-[16px] font-semibold leading-snug">
              {{ promo.title }}
            </p>
            <p v-if="promo.period" class="mt-1 text-white/80 text-[12px]">
              {{ promo.period }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-5 py-5 space-y-4">
      <!-- Highlight -->
      <div class="rounded-2xl bg-primary-light/20 ring-1 ring-primary-light/40 p-4">
        <div class="flex items-start gap-3">
          <div class="mt-0.5 h-9 w-9 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-primary" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z"
              />
            </svg>
          </div>

          <div class="min-w-0">
            <p class="text-[14px] font-semibold text-gray-900">
              {{ promo.highlight.title }}
            </p>
            <p class="mt-1 text-[13px] text-gray-700 leading-6">
              {{ promo.highlight.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <p class="text-[14px] font-semibold text-gray-900">Deskripsi</p>
        <p class="text-[14px] leading-6 text-gray-700 whitespace-pre-line">
          {{ promo.description }}
        </p>
      </div>

      <!-- Terms -->
      <div class="space-y-2">
        <p class="text-[14px] font-semibold text-gray-900">Syarat & Ketentuan</p>
        <ul class="space-y-2">
          <li
            v-for="(t, idx) in promo.terms"
            :key="idx"
            class="flex gap-2 text-[14px] leading-6 text-gray-700"
          >
            <span class="mt-[6px] h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0"></span>
            <span>{{ t }}</span>
          </li>
        </ul>
      </div>

      <!-- Footer Info -->
      <div class="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="text-[12px] text-gray-500">Kode Promo</p>
            <p class="mt-1 text-[14px] font-semibold text-gray-900">
              {{ promo.code }}
            </p>
          </div>
          <div>
            <p class="text-[12px] text-gray-500">Berlaku</p>
            <p class="mt-1 text-[14px] font-semibold text-gray-900">
              {{ promo.validUntil }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="sticky bottom-0 bg-white/90 backdrop-blur border-t border-gray-200 px-5 py-4">
      <button
        type="button"
        class="w-full rounded-2xl bg-primary text-white font-semibold text-[15px] py-3 shadow-sm active:scale-[0.99] transition"
        @click="usePromo"
      >
        Gunakan Promo
      </button>

      <button
        type="button"
        class="mt-3 w-full rounded-2xl bg-white text-primary font-semibold text-[15px] py-3 ring-1 ring-primary/30 active:scale-[0.99] transition"
        @click="copyCode"
      >
        Salin Kode
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

definePageMeta({
  layout: "no-bottom",
});

const promo = reactive({
  id: 1,
  title: "Diskon 50% Untuk Booking Villa",
  thumbnail: "/images/promos/1.png",
  period: "Periode: 01 Jan 2025 — 31 Des 2025",
  validUntil: "31 Des 2025",
  code: "VILLA50",
  highlight: {
    title: "Potongan hingga 50%",
    desc: "Gunakan kode promo untuk mendapatkan potongan harga saat melakukan booking yang memenuhi syarat.",
  },
  description:
    "Nikmati diskon spesial untuk booking villa pilihan.\n\nPromo berlaku untuk tipe kamar tertentu dan periode terbatas.",
  terms: [
    "Berlaku untuk pengguna yang memenuhi syarat promo.",
    "Berlaku untuk transaksi booking dengan minimal pembelian tertentu (jika ada).",
    "Tidak dapat digabung dengan promo lain.",
    "Ketersediaan promo dapat berubah sewaktu-waktu.",
  ],
});

function usePromo() {
  console.log("Use promo:", promo.code);
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(promo.code);
    console.log("Copied:", promo.code);
  } catch (e) {
    console.log("Clipboard failed:", e);
  }
}
</script>
