<template>
  <div class="min-h-screen bg-white">
    <NavigationAppBar
      title="Notifikasi"
      bg-class="bg-white"
      text-class="text-black"
      :showBack="true"
      :shadow="true"
      class="relative z-20"
    />

    <div class="pt-2 pb-6">
      <ul class="divide-y divide-gray-200">
        <li
          v-for="item in notifications"
          :key="item.id"
          class="px-5 py-4"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="h-12 w-12 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
              <!-- Megaphone SVG -->
              <img src="/images/icons/icon-megaphone.svg"/>
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <p class="text-[15px] font-semibold text-gray-900 truncate">
                {{ item.title }}
              </p>

              <p class="mt-1 text-[12px] text-gray-500">
                {{ formatDate(item.date) }}
              </p>

              <p class="mt-3 text-[14px] leading-6 text-gray-700 line-clamp-3">
                {{ item.message }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <div
        v-if="notifications.length === 0"
        class="py-14 text-center text-gray-500"
      >
        Belum ada notifikasi
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const notifications = ref([
  {
    id: 1,
    title: "🎁 Selamat Kamu Mendapatkan Poin",
    date: "2025-02-28",
    message:
      "Kamu telah mendapatkan poin +2.000 karena sudah booking Staigo Abian Klumpu Villa Bali (Deluxe Double with Private Pool)",
  },
  {
    id: 2,
    title: "🎁 Selamat Kamu Mendapatkan Poin",
    date: "2025-02-28",
    message:
      "Kamu telah mendapatkan poin +2.000 karena sudah booking Staigo Abian Klumpu Villa Bali (Deluxe Double with Private Pool)",
  },
]);

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}
</script>

<style scoped>
/* Fallback kalau Tailwind line-clamp belum aktif */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
