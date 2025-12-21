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

      <div class="w-full rounded-2xl bg-primary text-white px-3 py-5 shadow-lg flex justify-between items-center mb-8">
        
        <!-- Text Section -->
        <div>
            <p class="text-md font-semibold mb-2">Tanggal Menginap</p>

            <div class="flex items-center gap-2 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.6" stroke="currentColor" class="w-4 h-4 opacity-90">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3.75 18.75V7.5c0-1.243 
                        1.007-2.25 2.25-2.25h12c1.243 0 2.25 1.007 
                        2.25 2.25v11.25m-16.5 0A2.25 2.25 0 006 
                        21h12a2.25 2.25 0 002.25-2.25m-16.5 
                        0v-7.5c0-.621.504-1.125 1.125-1.125h14.25c.621 
                        0 1.125.504 1.125 1.125v7.5" />
                </svg>

                <span>18 Feb - 19 Feb, 1 Malam, 2 Kamar</span>
            </div>
        </div>

        <!-- Button -->
        <button
            class="rounded-xl px-4 py-2 text-sm font-semibold bg-linear-to-r from-orange-500 to-yellow-400 text-white shadow-md">
            Ubah
        </button>

    </div>


      <div ref="roomSectionRef" class="scroll-mt-20">
        <CardRoom class="mb-6" title="Deluxe Double With Private Pool" :photos="photoCategories[0].photos"
          :fasilitas="fasilitas.slice(0, 6)" price="270.000" originalPrice="459.000" />
        <CardRoom class="mb-6" title="Executive Ocean View Suite" :photos="photoCategories[0].photos"
          :fasilitas="fasilitas.slice(0, 6)" price="450.000" originalPrice="650.000" />
      </div>

    </div>

    <div
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
import { 
  ChevronLeft, Share2, MapPin, Star, Calendar, 
  Map, ShoppingBag, Plane, Coffee, Utensils,
  ChevronRight
} from "lucide-vue-next"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import BaseBottomSheet from "@/components/BaseBottomSheet.vue"

definePageMeta({
  layout: 'no-bottom'
})

/* STATE & DATA */
const isScrolled = ref(false)
const pageTitle = "Staigo Abian Klumpu Villa Bali"
const address = "Simalungun, Parapat, Sumatera Utara"

// Scroll Listener
const roomSectionRef = ref<HTMLElement | null>(null) // Ref untuk section kamar


// Function Smooth Scroll ke Kamar
function scrollToRooms() {
  roomSectionRef.value?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

function handleScroll() {
  isScrolled.value = window.scrollY > 200
}
onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))

/* NEARBY LOGIC */
const activeNearbyTab = ref("Semua")
const nearbyTabs = ["Semua", "Wisata", "Belanja", "Transport", "Kuliner"]

const nearbyData = [
  { name: "Danau Toba", category: "Wisata", distance: "500 m", type: "Wisata", icon: Map },
  { name: "Parapat Point Mall", category: "Belanja", distance: "1.2 km", type: "Belanja", icon: ShoppingBag },
  { name: "Bandara Silangit", category: "Transport", distance: "45 km", type: "Transport", icon: Plane },
  { name: "Coffee Shop Toba", category: "Kuliner", distance: "200 m", type: "Wisata", icon: Coffee }, // Masuk wisata for demo
]

const filteredNearby = computed(() => {
  if (activeNearbyTab.value === "Semua") return nearbyData
  return nearbyData.filter(item => item.type === activeNearbyTab.value)
})

/* OTHER DATA */
const fasilitas = [
  { id: 1, icon: "/images/icons/icon-fasilitas.svg", label: "Restoran" },
  { id: 2, icon: "/images/icons/icon-fasilitas.svg", label: "Kolam Renang" },
  { id: 3, icon: "/images/icons/icon-fasilitas.svg", label: "Parkir" },
  { id: 4, icon: "/images/icons/icon-fasilitas.svg", label: "WiFi Gratis" },
  { id: 5, icon: "/images/icons/icon-fasilitas.svg", label: "Gym" },
]

const photoCategories = [
  { category: "Main", photos: ["/images/properties/1.png", "/images/properties/2.png"] }
]
const heroPhotos = photoCategories[0].photos
const openPhotoSheet = ref(false)
const openFasilitasSheet = ref(false)
const openSheet = () => (openPhotoSheet.value = true)
const sharePage = () => { /* Logic Share */ }

const reviews = [
  {
    name: "Rina",
    rating: 5,
    avatar: "/img/user1.jpg",
    text: "Pelayanan sangat ramah, kamar bersih, lokasi dekat banget pusat kota!"
  },
  {
    name: "Andi",
    rating: 4.5,
    avatar: "/img/user2.jpg",
    text: "Staff sangat cepat respon, makanan enak, cuma AC agak berisik."
  },
  {
    name: "Maya",
    rating: 4,
    avatar: "/img/user3.jpg",
    text: "Harga sesuai kualitas. Recommend buat liburan sama keluarga."
  }
];
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