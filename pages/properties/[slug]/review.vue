<template>
  <div class="min-h-screen bg-gray-50/50 pb-24 font-sans">

    <NavigationAppBar
      title="Ulasan Properti"
      bg-class="bg-white/80 backdrop-blur-md"
      text-class="text-gray-900"
      :showBack="true"
      :shadow="false"
      class="sticky top-0 z-40 border-b border-gray-100"
    />

    <section    class="bg-white px-5 pt-6 pb-8 rounded-b-[2rem] shadow-sm relative z-10">
        <div class="flex flex-row items-center justify-start gap-4 text-left">
            
            <div class="relative">
                <h1 class="font-display font-bold text-[3.5rem] text-[var(--ui-primary)] leading-none tracking-tight">
                4.8
                </h1>

                <div class="absolute -right-6 top-2 rotate-12 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-yellow-200">
                TOP
                </div>
            </div>

            <div class="flex flex-col">
                <p class="text-gray-900 font-semibold text-lg">Luar Biasa</p>
                
                <div class="flex gap-1 mt-1 mb-2">
                <StarRating :rating="4.8" :size="20" />
                </div>

                <p class="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full w-fit">
                Berdasarkan 214 ulasan terverifikasi
                </p>
            </div>

        </div>


      <div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
        <div
          v-for="item in categoryList"
          :key="item.title"
          class="flex flex-col gap-1"
        >
          <div class="flex items-center justify-between text-xs text-gray-600 mb-0.5">
            <div class="flex items-center gap-1.5">
              <component :is="item.icon" class="w-3.5 h-3.5 text-[var(--ui-primary)]" />
              <span class="font-medium truncate max-w-[80px]">{{ item.title }}</span>
            </div>
            <span class="font-bold text-gray-900">{{ item.score }}</span>
          </div>

          <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-[var(--ui-primary)] rounded-full transition-all duration-500 ease-out"
              :style="{ width : (item.score/5*100) + '%' }"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="sticky top-[60px] z-30 bg-gray-50/95 backdrop-blur-sm py-3 border-b border-gray-200/60">
      <div class="w-full overflow-x-auto no-scrollbar px-5">
        <div class="flex items-center gap-2 w-max">
          <button
            v-for="filter in mainFilters"
            :key="filter.label"
            @click="applyFilter(filter)"
            class="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 border"
            :class="filter.active
              ? 'bg-[var(--ui-primary)] text-white border-[var(--ui-primary)] shadow-md shadow-blue-900/10'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            "
          >
            <component :is="filter.icon" class="w-3.5 h-3.5" :class="filter.active ? 'text-white' : 'text-gray-400'"/>
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="px-5 py-6 space-y-5">
      
      <div v-if="filteredReviews.length === 0" class="text-center py-10">
        <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Filter class="w-6 h-6 text-gray-400" />
        </div>
        <p class="text-gray-500 text-sm">Tidak ada ulasan dengan filter ini.</p>
        <button @click="resetFilter" class="text-[var(--ui-primary)] text-sm font-medium mt-2">Reset Filter</button>
      </div>

      <article
        v-for="item in filteredReviews"
        :key="item.id"
        class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <img
              :src="item.avatar"
              :alt="item.name"
              class="w-10 h-10 rounded-full object-cover border border-gray-100"
              loading="lazy"
            />
            <div>
              <h3 class="font-display font-bold text-gray-900 text-[15px] leading-tight">
                {{ item.name }}
              </h3>
              <p class="text-[11px] text-gray-400 font-medium mt-0.5">{{ item.date }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star class="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span class="text-xs font-bold text-yellow-700">{{ item.rating }}</span>
          </div>
        </div>

        <p class="text-[14px] text-gray-600 leading-relaxed">
          {{ item.comment }}
        </p>

        <div v-if="item.photos.length" class="mt-4">
            <Swiper
                :slides-per-view="3"
                :space-between="5"
                :centered-slides="false"
                :center-insufficient-slides="false"
                :slides-offset-after="20"
                class="rounded-xl"
            >
                <SwiperSlide
                v-for="(img, idx) in item.photos"
                :key="idx"
                class="rounded-xl overflow-hidden border border-gray-100 cursor-zoom-in"
                @click="openPhoto(img)"
                >
                <img
                    :src="img"
                    class="w-full h-32 object-cover"
                    loading="lazy"
                />
                </SwiperSlide>
            </Swiper>
            </div>

      </article>

    </section>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="photoView"
        class="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 backdrop-blur-sm"
        @click="photoView=null"
      >
        <img
          :src="photoView"
          class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
        <button
          class="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
          @click="photoView=null"
        >
          <X class="w-6 h-6 text-white"/>
        </button>
      </div>
    </Transition>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import {
  MapPin, BadgePercent, House, Sparkles, Shield, Wifi, Droplet,
  HeartHandshake, Filter, Image as ImgIcon, Star, Lightbulb, X
} from "lucide-vue-next"

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

// --- SEO CONFIGURATION ---
useHead({
  title: 'Review Properti - Staigo',
  meta: [
    { name: 'description', content: 'Lihat ulasan jujur, rating kebersihan, dan foto dari penyewa sebelumnya untuk properti ini di Staigo.' },
    { name: 'robots', content: 'noindex, nofollow' } // Hapus ini jika page sudah live public
  ]
})

definePageMeta({
  layout: 'no-bottom'
})

// --- DATA: CATEGORIES ---
const categoryList = [
  { title: "Lokasi", icon: MapPin, score: 4.9 },
  { title: "Harga", icon: BadgePercent, score: 4.7 },
  { title: "Kebersihan", icon: Sparkles, score: 4.8 },
  { title: "Fasilitas", icon: House, score: 4.6 },
  { title: "Keamanan", icon: Shield, score: 4.8 },
  { title: "Wifi", icon: Wifi, score: 4.9 },
  { title: "Air", icon: Droplet, score: 4.5 },
  { title: "Pelayanan", icon: HeartHandshake, score: 4.8 },
]

// --- STATE: FILTERS ---
const ratingSelected = ref(0)
const photoFilter = ref("all")
const sortMode = ref("default")
const photoView = ref<string | null>(null)

const mainFilters = ref([
  {
    label: "Semua",
    icon: Filter,
    active: true,
    apply: () => resetFilter()
  },
  {
    label: "Ada Foto",
    icon: ImgIcon,
    active: false,
    apply: () => {
      photoFilter.value = "withPhoto"
      // Jika rating sudah dipilih, biarkan. Jika belum, reset logic lain jika perlu
    }
  },
  {
    label: "Bintang 5",
    icon: Star,
    active: false,
    apply: () => ratingSelected.value = 5
  },
  {
    label: "Terbaru",
    icon: Lightbulb,
    active: false,
    apply: () => sortMode.value = "newest"
  },
])

function applyFilter(filter: any){
  // Reset visual active state
  mainFilters.value.forEach(f => f.active = false)
  
  // Set current active
  filter.active = true
  
  // Reset logic state partials if 'Semua' selected, otherwise stack logic appropriately
  if(filter.label === "Semua") {
    resetFilter()
    return
  }
  
  // Jalankan logic filter
  filter.apply()
}

function resetFilter(){
  photoFilter.value = "all"
  ratingSelected.value = 0
  sortMode.value = "default"
  
  // Ensure visual state follows
  mainFilters.value.forEach(f => f.active = (f.label === "Semua"))
}

// --- DATA: REVIEWS ---
const reviews = ref([
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    name: "Dian Kusuma",
    date: "28 Jan 2025",
    rating: 4.5,
    comment: "Properti sangat nyaman, view bagus, staff ramah! Wifi kencang buat kerja remote.",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    name: "Bima Aryo",
    date: "27 Jan 2025",
    rating: 3,
    comment: "Lumayan untuk harga segini, tapi perabot ada yang sedikit berdebu saat check-in.",
    photos: []
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    name: "Yolanda Putri",
    date: "24 Jan 2025",
    rating: 5,
    comment: "Super rekomendasi! Lokasi strategis dekat stasiun MRT. Pasti bakal balik lagi.",
    photos: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop",
    ]
  }
])

// --- COMPUTED: FILTER LOGIC ---
const filteredReviews = computed(() => {
  let output = [...reviews.value]

  // Filter by Photo
  if(photoFilter.value === "withPhoto")
    output = output.filter(r => r.photos.length > 0)

  // Filter by Rating
  if(ratingSelected.value > 0)
    output = output.filter(r => Math.floor(r.rating) === ratingSelected.value)

  // Sort
  if(sortMode.value === "newest") {
    // Asumsi ID lebih besar = lebih baru, real world use Date objects
    output = output.sort((a,b)=> b.id - a.id)
  }

  return output
})

// --- ACTIONS ---
function openPhoto(src: string){
  photoView.value = src
}
</script>

<style scoped>
/* Utility untuk menyembunyikan scrollbar tapi tetap bisa di-scroll */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>