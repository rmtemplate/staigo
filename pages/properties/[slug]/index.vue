<template>
  <div class="bg-gray-50 min-h-screen pb-25 font-sans">
    <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none">
      <div class="relative w-full h-16 px-4 flex items-center justify-between">
        <div
          class="absolute inset-0 bg-white/90 backdrop-blur-md shadow-sm transition-opacity duration-300"
          :class="isScrolled ? 'opacity-100' : 'opacity-0'"
        ></div>

        <span
          class="absolute left-14 top-1/2 -translate-y-1/2 font-bold text-slate-800 text-sm truncate w-[60%] transition-opacity duration-300 z-10"
          :class="isScrolled ? 'opacity-100' : 'opacity-0'"
        >
          {{ propertiesData?.propertiesName }}
        </span>

        <button
          @click="$router.back()"
          class="pointer-events-auto relative z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95"
          :class="isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>

        <button
          @click="sharePage"
          class="pointer-events-auto relative z-20 w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95"
          :class="isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'"
        >
          <Share2 class="w-5 h-5" />
        </button>
      </div>
    </nav>

    <div class="relative h-80 w-full bg-slate-200">
      <Swiper
        class="h-full w-full"
        :modules="[Autoplay, Pagination]"
        :loop="true"
        :autoplay="{ delay: 4000 }"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="(photo, index) in (propertiesData?.photos || [])" :key="photo?.propertiesPhotoSid || index">
          <img :src="photo?.images" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
        </SwiperSlide>
      </Swiper>

      <button
        class="absolute bottom-8 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-medium z-10 active:scale-95 transition-transform"
        @click="openSheet()"
      >
        Lihat Semua Foto
      </button>
    </div>

    <div class="relative -mt-6 bg-gray-50 rounded-t-3xl px-5 py-6 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-800 leading-snug mb-2">
          {{ propertiesData?.propertiesName }}
        </h1>

        <div class="flex items-star gap-2 text-slate-500 text-sm active:opacity-70 cursor-pointer">
          <MapPin class="w-4 h-4 text-primary shrink-0" />
          <span class="border-b border-dashed border-slate-300 pb-0.5">
            {{ propertiesData?.subDistrictsName }}, {{ propertiesData?.regenciesName }}, {{ propertiesData?.provincesName }}
          </span>
        </div>
      </div>

      <div class="mb-8 group cursor-pointer overflow-hidden">
        <NuxtLink
          :to="`/properties/${route.params.slug}/review`"
          class="w-full mb-3 flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all group"
        >
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-center justify-center w-11 h-11 bg-blue-50 text-primary rounded-xl shrink-0">
              <span class="text-lg font-extrabold leading-none">4.6</span>
            </div>

            <div class="text-left">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-800 text-sm leading-none">Luar Biasa</h4>
                <div class="flex items-center bg-orange-50 px-1.5 py-0.5 rounded text-[10px] text-orange-600 font-bold gap-0.5">
                  <Star class="w-2.5 h-2.5 fill-current" />
                  <span>{{ propertiesData?.ratingAvg }}</span>
                </div>
              </div>

              <p class="text-xs text-slate-400 mt-1 truncate">
                Berdasarkan <strong>{{ propertiesData?.ratingCount }} ulasan</strong> tamu
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1 text-primary/80">
            <span class="text-[10px] font-semibold">Lihat</span>
            <ChevronRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </NuxtLink>

        <Swiper :slides-per-view="1.1" space-between="12" class="overflow-visible">
          <SwiperSlide v-for="(review, index) in reviews" :key="index">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div class="flex items-center gap-3 mb-2">
                <img
                  :src="'https://ui-avatars.com/api/?background=random&name=' + review.name"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p class="font-semibold text-xs text-slate-700">
                    {{ review.name }}
                  </p>
                  <StarRating :rating="review.rating" />
                </div>
              </div>

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
          <button class="text-xs font-semibold text-primary" @click="openFasilitasSheet = true">
            Lihat Semua
          </button>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="item in (propertiesData?.amenities || []).slice(0, 4)"
            :key="item.amenitiesSid"
            class="flex flex-col items-center gap-2 group"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center transition-all duration-200 group-hover:shadow-md border border-transparent group-hover:border-primary/20"
            >
              <img :src="item.amenitiesIcon" class="w-8 h-8 opacity-70 transition group-hover:opacity-100" />
            </div>
            <span class="text-[11px] text-slate-500 font-medium text-center leading-tight">
              {{ item.amenitiesName }}
            </span>
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

        <!-- MAP WRAPPER -->
        <div class="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm mb-5">
          <!-- fallback image saat map belum siap -->
          <img
            v-if="!isMapReady"
            src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg"
            class="w-full h-full object-cover grayscale-20"
            alt=""
          />

          <!-- Leaflet map (tetap pointer-events-none biar diam) -->
          <div ref="mapEl" class="absolute inset-0 z-[1] pointer-events-none"></div>
        </div>

        <!-- TABS pakai Swiper -->
        <Swiper
          :modules="[FreeMode]"
          :slides-per-view="'auto'"
          :space-between="8"
          :free-mode="{ enabled: true, momentum: true, momentumRatio: 0.9, momentumBounce: true }"
          class="mb-4"
        >
          <SwiperSlide v-for="tab in nearbyTabs" :key="tab.key" class="!w-auto">
            <button
              @click="activeNearbyTab = tab.key"
              class="px-4 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap"
              :class="activeNearbyTab === tab.key ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'"
            >
              {{ tab.label }}
            </button>
          </SwiperSlide>
        </Swiper>

        <!-- LIST: max-height + scroll -->
        <div class="space-y-4 max-h-64 overflow-y-auto pr-1">
          <template v-if="isLoadingNearby">
            <div v-for="i in 5" :key="i" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-slate-200 animate-pulse"></div>
                <div>
                  <div class="h-3 w-40 bg-slate-200 rounded animate-pulse"></div>
                  <div class="h-2 w-24 bg-slate-200 rounded mt-2 animate-pulse"></div>
                </div>
              </div>
              <div class="h-3 w-14 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </template>

          <template v-else>
            <div v-for="(place, i) in filteredNearby" :key="place.id || i" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <component :is="place.icon" class="w-4 h-4" />
                </div>
                <div>
                  <h6 class="text-sm font-semibold text-slate-700">{{ place.name || "-" }}</h6>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wide">
                    {{ place.categoryLabel }}
                  </p>
                </div>
              </div>
              <span class="text-xs font-bold text-slate-600">
                {{ place.distanceLabel }}
              </span>
            </div>
          </template>
        </div>
      </div>

      <div ref="roomSectionRef" class="scroll-mt-20">
        <div class="w-full rounded-2xl bg-primary text-white px-5 py-5 shadow-lg flex justify-between items-center mb-8">
          <div>
            <p class="text-md font-semibold mb-2">Tanggal Menginap</p>

            <div class="flex items-center gap-2 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="w-4 h-4 opacity-90">
                <path stroke-linecap="round" stroke-linejoin="round" :d="CALENDAR_D" />
              </svg>

              <span>{{ staySummary }}</span>
            </div>
          </div>

          <button
            @click.stop="openBookingSheet"
            class="rounded-xl px-4 py-2 text-sm font-semibold bg-linear-to-r from-orange-500 to-yellow-400 text-white shadow-md"
          >
            Ubah
          </button>
        </div>

        <!-- ROOMS -->
        <template v-if="isLoadingRooms">
          <div v-for="i in 3" :key="i" class="mb-6 bg-white rounded-2xl border border-slate-100 p-4">
            <div class="h-40 bg-slate-200 rounded-xl animate-pulse"></div>
            <div class="mt-4 h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
            <div class="mt-2 h-3 w-1/2 bg-slate-200 rounded animate-pulse"></div>
            <div class="mt-4 h-10 w-full bg-slate-200 rounded-xl animate-pulse"></div>
          </div>
        </template>

        <template v-else-if="!propertiesRoomsData || propertiesRoomsData.length === 0">
          <div class="flex flex-col items-center justify-center py-14 px-4 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
  <div class="w-72 h-48 mb-6">
    <!-- Modern app-style SVG (no brand/logo) -->
<svg viewBox="0 0 640 420" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- background blobs -->
  <path d="M120 310c-60-55-55-150 10-200 70-55 210-65 300-10 95 58 130 175 60 240-85 80-290 65-370-30z" fill="#F1F5F9"/>
  <path d="M470 70c55 15 95 55 95 95 0 45-45 70-85 70-40 0-85-25-95-70-10-45 30-110 85-95z" fill="#EEF2FF"/>

  <!-- card shadow -->
  <g opacity="0.12">
    <rect x="150" y="98" width="340" height="250" rx="28" fill="#0F172A"/>
  </g>

  <!-- main card -->
  <rect x="140" y="88" width="340" height="250" rx="28" fill="white" stroke="#E2E8F0" stroke-width="2"/>

  <!-- header pills -->
  <rect x="170" y="118" width="110" height="26" rx="13" fill="#F1F5F9"/>
  <rect x="290" y="118" width="70" height="26" rx="13" fill="#F1F5F9"/>
  <rect x="370" y="118" width="80" height="26" rx="13" fill="#F1F5F9"/>

  <!-- calendar mini -->
  <g>
    <rect x="188" y="170" width="140" height="120" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="188" y="170" width="140" height="28" rx="18" fill="#E6F0F7"/>
    <path d="M220 164v18" stroke="#005BA1" stroke-width="8" stroke-linecap="round"/>
    <path d="M296 164v18" stroke="#005BA1" stroke-width="8" stroke-linecap="round"/>

    <!-- calendar dots -->
    <g fill="#CBD5E1">
      <circle cx="216" cy="220" r="6"/>
      <circle cx="246" cy="220" r="6"/>
      <circle cx="276" cy="220" r="6"/>
      <circle cx="306" cy="220" r="6"/>
      <circle cx="216" cy="250" r="6"/>
      <circle cx="246" cy="250" r="6"/>
      <circle cx="276" cy="250" r="6"/>
      <circle cx="306" cy="250" r="6"/>
    </g>

    <!-- blocked day -->
    <circle cx="276" cy="250" r="14" fill="#FFE4E6"/>
    <path d="M270 244l12 12M282 244l-12 12" stroke="#E11D48" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <!-- phone / room list -->
  <g>
    <rect x="344" y="152" width="108" height="160" rx="22" fill="#0B1220"/>
    <rect x="352" y="162" width="92" height="140" rx="16" fill="#F8FAFC"/>
    <rect x="370" y="172" width="56" height="10" rx="5" fill="#E2E8F0"/>
    <rect x="362" y="194" width="72" height="40" rx="12" fill="#EEF2FF"/>
    <rect x="362" y="242" width="72" height="40" rx="12" fill="#F1F5F9"/>
    <rect x="362" y="290" width="48" height="10" rx="5" fill="#E2E8F0"/>
    <circle cx="398" cy="312" r="10" fill="#E6F0F7" stroke="#005BA1" stroke-width="2"/>
    <path d="M405 319l10 10" stroke="#005BA1" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- cute mascot blob -->
  <g>
    <path d="M160 318c0-40 35-70 78-70 44 0 80 30 80 70 0 42-36 70-80 70-43 0-78-28-78-70z" fill="#E6F0F7"/>
    <path d="M190 318c0-26 22-46 48-46 27 0 50 20 50 46 0 28-23 46-50 46-26 0-48-18-48-46z" fill="#005BA1" opacity="0.15"/>

    <!-- eyes -->
    <circle cx="214" cy="318" r="6" fill="#0F172A"/>
    <circle cx="252" cy="318" r="6" fill="#0F172A"/>

    <!-- smile -->
    <path d="M224 336c8 10 22 10 30 0" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>

    <!-- small sparkle -->
    <path d="M286 276l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10z" fill="#005BA1" opacity="0.35"/>
  </g>

  <!-- subtle caption bars -->
  <rect x="170" y="306" width="210" height="10" rx="5" fill="#E2E8F0"/>
  <rect x="170" y="326" width="170" height="10" rx="5" fill="#E2E8F0"/>
</svg>

  </div>

  <h3 class="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
    Yah… kamar di tanggal itu lagi full 😅
  </h3>

  <p class="mt-2 text-sm sm:text-base text-slate-500 max-w-md leading-relaxed">
    Wah, semua kamar untuk pilihanmu udah keburu diambil. Coba geser tanggal atau ubah jumlah tamu ya.
  </p>

  <div class="mt-5 flex flex-col sm:flex-row gap-3">
    <button
      @click="$emit('change-dates')"
      class="rounded-xl bg-[#005BA1] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#004f8d] focus:outline-none focus:ring-4 focus:ring-slate-200 transition"
    >
      Ubah Tanggal
    </button>

    <button
      @click="$emit('change-dates')"
      class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 transition"
    >
      Lihat Kalender
    </button>
  </div>

  <div class="mt-6 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-4 py-2">
    Tips: coba maju/mundur 1–2 hari ✨
  </div>
</div>

        </template>

        <template v-else>
          <CardRoom
            class="mb-6"
            v-for="r in (propertiesRoomsData || [])"
            :key="r.propertiesRoomsSid"
            :room="r"
            :propertiesSlug="propertiesData?.propertiesSlug"
          />
        </template>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      v-show="!hideBottomBar"
      class="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-5 py-3 pb-safe z-[40] flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.05)] gap-3"
    >
      <div class="flex flex-col">
        <span class="text-[10px] text-slate-500 font-medium">Harga mulai dari</span>

        <div class="flex items-baseline gap-1">
          <span class="text-lg font-bold text-primary">
            {{ formatIDR(propertiesData?.minPrice || 0) }}
          </span>
          <span class="text-[10px] text-slate-400">/malam</span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-1">
        <button
          @click="scrollToRooms"
          class="bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
        >
          Lihat Kamar
        </button>

        <div class="flex items-center gap-2 mt-2">
          <img src="/images/icons/icon-point.svg" class="w-3.5 h-3.5" alt="Poin Icon" />
          <span class="text-[11px] block font-medium text-slate-600">Harga terbaik! Bonus 1.600 poin!</span>
        </div>
      </div>
    </div>

    <!-- ===== BottomSheet: Booking ===== -->
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
          <button type="button" class="w-full text-left py-4 px-4 active:bg-gray-50" @click="openDateSheet">
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
                <span class="text-[12px] font-semibold text-[#242B42]">{{ nights }} Malam</span>
              </div>

              <div class="flex items-center gap-2">
                <CalendarDaysIcon class="w-5 h-5 text-primary" />
                <span class="font-semibold text-[#242B42] text-[14px]">{{ checkOut }}</span>
              </div>
            </div>
          </button>

          <div class="h-px bg-[#E6E9ED] w-full"></div>

          <!-- Room & Guess -->
          <button type="button" class="w-full text-left py-4 px-4 active:bg-gray-50" @click="openRoomGuest">
            <span class="text-xs font-medium text-gray-500">Room &amp; Guess</span>
            <div class="flex items-center gap-3 mt-2">
              <UsersIcon class="w-5 h-5 text-primary" />
              <span class="font-semibold text-[#242B42] text-[14px]">{{ roomGuestLabel }}</span>
            </div>
          </button>
        </div>
      </div>

      <template #footer>
        <div class="px-5">
          <!-- ✅ hanya saat klik Selesai -> reload rooms -->
          <button
            type="button"
            class="w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
            @click="onBookingDone"
          >
            Selesai
          </button>
        </div>
      </template>
    </BaseBottomSheet>

    <!-- ===== BottomSheet: Set Date ===== -->
    <BaseBottomSheet v-model="isDateOpen" title="Set Date" bodyClass="px-0" footerClass="pt-4 pb-5" :draggable="true" headerClass="pt-3 pb-3">
      <RangeCalendar v-model="draftRange" :minDate="new Date()" :disableBeforeMin="true" :showTodayLabel="true" locale="en-US" />

      <template #footer>
        <div class="px-5">
          <div class="flex items-end justify-between text-[#7A869A]">
            <div class="w-[42%]">
              <div class="text-[14px]">Check-in</div>
              <div class="text-[18px] font-extrabold text-[#1F2433] mt-1">{{ fmtLong(draftRange.start) }}</div>
            </div>

            <div class="flex-1 px-3 pb-3">
              <div class="border-b border-dashed border-[#7A869A]" />
            </div>

            <div class="w-[42%] text-right">
              <div class="text-[14px]">Check-out</div>
              <div class="text-[18px] font-extrabold text-[#1F2433] mt-1">{{ fmtLong(draftRange.end) }}</div>
            </div>
          </div>

          <button
            type="button"
            class="mt-4 w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
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
    <BaseBottomSheet v-model="isRoomGuestOpen" title="Room &amp; Guess" bodyClass="px-0" footerClass="pt-6 pb-6" :draggable="true" headerClass="pt-3 pb-3">
      <div class="px-5">
        <div class="py-5 flex items-center justify-between">
          <div class="text-[16px] font-semibold text-[#1F2433]">Kamar</div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="dec('rooms')">
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">{{ draftRooms }}</div>
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="inc('rooms')">
              <PlusIcon class="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div class="h-px bg-[#E6E9ED]" />

        <div class="py-5 flex items-center justify-between">
          <div class="text-[16px] font-semibold text-[#1F2433]">Dewasa</div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="dec('adults')">
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">{{ draftAdults }}</div>
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="inc('adults')">
              <PlusIcon class="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div class="h-px bg-[#E6E9ED]" />

        <div class="py-5 flex items-center justify-between">
          <div class="text-[13px] font-semibold text-[#1F2433] leading-snug">Anak ( dibawah 7 tahun )</div>
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="dec('kids')">
              <MinusIcon class="w-5 h-5 text-primary" />
            </button>
            <div class="w-6 text-center text-[16px] font-semibold text-[#1F2433]">{{ draftKidsU7 }}</div>
            <button class="w-10 h-10 rounded-full border border-[#DDE3EA] flex items-center justify-center active:scale-95" @click="inc('kids')">
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
            <img v-for="(img, j) in cat.photos" :key="j" :src="img" class="w-full h-24 rounded-lg object-cover cursor-pointer" />
          </div>
        </div>
      </div>
    </BaseBottomSheet>

    <BaseBottomSheet v-model="openFasilitasSheet" title="Semua Fasilitas" cancelText="Tutup">
      <div class="grid grid-cols-4 gap-4 px-4 pb-6 pt-2">
        <div v-for="(item, i) in (propertiesData?.amenities || [])" :key="item.amenitiesSid" class="flex flex-col items-center gap-2">
          <img :src="item?.amenitiesIcon" class="w-8 h-8" />
          <span class="text-xs text-center">{{ item.amenitiesName }}</span>
        </div>
      </div>
    </BaseBottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue"
import { useHead, useRequestURL } from "#imports"
import {
  ChevronLeft,
  Share2,
  MapPin,
  Star,
  Map as MapIcon,
  ShoppingBag,
  Plane,
  Coffee,
  ChevronRight,
  CalendarDaysIcon,
  MoonIcon,
  UsersIcon,
  MinusIcon,
  PlusIcon,
  Hospital,
  TrainFront,
  Landmark,
  Fuel,
  TreePine,
  Church,
  Store,
  CircleHelp,
} from "lucide-vue-next"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import BaseBottomSheet from "@/components/BaseBottomSheet.vue"
import RangeCalendar, { type DateRangeValue } from "@/components/RangeCalendar.vue"

import type { Property } from "~/types/property"
import type { PropertyRooms } from "~/types/propertyRooms"
import type { Nearby } from "~/types/nearby"
import { formatIDR } from "~/helpers/utils.helper"

definePageMeta({ layout: "no-bottom" })

const route = useRoute()

const CALENDAR_D =
  "M6.75 3v2.25M17.25 3v2.25M3.75 18.75V7.5c0-1.243 1.007-2.25 2.25-2.25h12c1.243 0 2.25 1.007 2.25 2.25v11.25m-16.5 0A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25m-16.5 0v-7.5c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v7.5"

/* ===== HELPERS ===== */
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

const fmtShort = (d: Date | null) => {
  if (!d) return "-"
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(d)
}
const fmtLong = (d: Date | null) => {
  if (!d) return "-"
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d)
}
const formatISODateLocal = (d: Date) => {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}
const diffDays = (a: Date, b: Date) => {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime()
  return Math.max(0, Math.round(ms / 86400000))
}
const formatDistance = (m: number) => {
  const v = Number(m || 0)
  if (!Number.isFinite(v) || v <= 0) return "-"
  if (v < 1000) return `${Math.round(v)} m`
  return `${(v / 1000).toFixed(1)} km`
}

/* ===== DEFAULT BOOKING ===== */
const today = startOfDay(new Date())
const tomorrow = startOfDay(addDays(new Date(), 1))

const bookingRange = ref<DateRangeValue>({ start: today, end: tomorrow })
const draftRange = ref<DateRangeValue>({ start: null, end: null })

const checkIn = ref(fmtShort(today))
const checkOut = ref(fmtShort(tomorrow))
const nights = ref(1)

const checkInISO = computed(() => (bookingRange.value.start ? formatISODateLocal(bookingRange.value.start) : formatISODateLocal(today)))
const checkOutISO = computed(() => (bookingRange.value.end ? formatISODateLocal(bookingRange.value.end) : formatISODateLocal(tomorrow)))

/* Room & Guess defaults */
const rooms = ref(1) // ✅ default 1
const adults = ref(2)
const kidsU7 = ref(0) // ✅ default 0

const draftRooms = ref(rooms.value)
const draftAdults = ref(adults.value)
const draftKidsU7 = ref(kidsU7.value)

const roomGuestLabel = computed(() => `${rooms.value} Kamar, ${adults.value} Dewasa`)
const staySummary = computed(() => `${checkIn.value} - ${checkOut.value}, ${nights.value} Malam, ${rooms.value} Kamar`)

/* ===== SHEETS ===== */
const isBookingOpen = ref(false)
const isDateOpen = ref(false)
const isRoomGuestOpen = ref(false)

const openBookingSheet = () => (isBookingOpen.value = true)

const openDateSheet = () => {
  draftRange.value = { ...bookingRange.value }
  isDateOpen.value = true
}

const nightsFromDraft = computed(() => {
  if (!draftRange.value.start || !draftRange.value.end) return 0
  return diffDays(draftRange.value.start, draftRange.value.end)
})

/* ✅ hanya update state */
const saveDate = () => {
  if (!draftRange.value.start || !draftRange.value.end) return
  bookingRange.value = { ...draftRange.value }
  checkIn.value = fmtShort(bookingRange.value.start)
  checkOut.value = fmtShort(bookingRange.value.end)
  nights.value = diffDays(bookingRange.value.start!, bookingRange.value.end!)
  isDateOpen.value = false
}

const openRoomGuest = () => {
  draftRooms.value = rooms.value
  draftAdults.value = adults.value
  draftKidsU7.value = kidsU7.value
  isRoomGuestOpen.value = true
}

/* ✅ hanya update state */
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

/* ===== FETCH DATA (properties & nearby) ===== */
const { data: propertiesDataRaw, pending: isLoadingProperties } = useApiData<any>(`/api/v2/properties/${route.params.slug}`, { lazy: true })
const { data: propertiesNearbyRaw, pending: isLoadingNearby } = useApiData<any>(`/api/v2/properties/${route.params.slug}/nearby`, { lazy: true })

/** support response: langsung object ATAU { data: ... } */
const propertiesData = computed<Property | null>(() => {
  const v: any = propertiesDataRaw.value
  if (!v) return null
  return (v.data ?? v) as Property
})
const propertiesNearbyData = computed<Nearby[]>(() => {
  const v: any = propertiesNearbyRaw.value
  if (!v) return []
  const data = v.data ?? v
  return Array.isArray(data) ? (data as Nearby[]) : []
})

/* ===== ROOMS: manual fetch (biar nggak error ComputedRef) ===== */
const roomsApiUrl = computed(() => {
  return `/api/v2/properties-rooms/${route.params.slug}?checkIn=${checkInISO.value}&checkOut=${checkOutISO.value}&numberOfRooms=${rooms.value}&children=${kidsU7.value}`
})

const {
  data: propertiesRoomsRaw,
  pending: isLoadingRooms,
  refresh: refreshRooms,
} = useApiData<any>(roomsApiUrl.value, { lazy: true, watch: false as any })

// Normalize: support response API kamu bisa { data: [...] } atau langsung [...]
const propertiesRoomsData = computed<PropertyRooms[]>(() => {
  const res: any = propertiesRoomsRaw.value
  const data = res?.data ?? res
  return Array.isArray(data) ? (data as PropertyRooms[]) : []
})

/* ✅ hanya saat klik Selesai -> reload rooms */
const onBookingDone = async () => {
  isBookingOpen.value = false
  await nextTick()
  await refreshRooms()
}

/* ===== PHOTOS per CATEGORY (bottomsheet foto) ===== */
type PhotoCategoryBlock = { category: string; photos: string[] }
const photoCategories = computed<PhotoCategoryBlock[]>(() => {
  const photos = (propertiesData.value as any)?.photos ?? []
  const order: string[] = []
  const categoryMap: Record<string, string[]> = {}

  for (const p of photos as any[]) {
    const cat = p?.photoCategoriesName || "Lainnya"
    const img = p?.images
    if (!img) continue

    if (!categoryMap[cat]) {
      categoryMap[cat] = []
      order.push(cat)
    }
    categoryMap[cat].push(img)
  }

  const blocks = order.map((cat) => ({ category: cat, photos: categoryMap[cat] || [] }))
  return blocks.length ? blocks : [{ category: "Main", photos: [] }]
})

/* ===== SEO + Leaflet CDN (FIX duplicate link) ===== */
const url = useRequestURL()
const canonicalUrl = computed(() => `${url.origin}${url.pathname}`)
const pageTitle = computed(() => propertiesData.value?.propertiesName || "Detail Properti")

const fullAddress = computed(() => {
  const p = propertiesData.value
  if (!p) return ""
  const parts = [p.propertiesAddress, p.subDistrictsName, p.regenciesName, p.provincesName].filter(Boolean)
  return parts.join(", ")
})

const metaDescription = computed(() => {
  const p = propertiesData.value
  if (!p) return "Staigo — cek foto, fasilitas, ulasan tamu, dan pilihan kamar."
  const ratingPart = (p.ratingCount ?? 0) > 0 ? `Rating ${p.ratingAvg}/5 dari ${p.ratingCount} ulasan. ` : ""
  const pricePart = (p.minPrice ?? 0) > 0 ? `Harga mulai dari ${formatIDR(p.minPrice)} per malam. ` : ""
  const placePart = fullAddress.value ? `Lokasi: ${fullAddress.value}. ` : ""
  return `${p.propertiesName}. ${ratingPart}${pricePart}${placePart}`.trim()
})

const ogImage = computed(() => propertiesData.value?.propertiesThumbnail || `${url.origin}/images/og-default.jpg`)

const schemaJson = computed(() => {
  const p = propertiesData.value
  if (!p) return { "@context": "https://schema.org", "@type": "WebPage", name: pageTitle.value, url: canonicalUrl.value }

  const images = ((p.photos ?? []) as any[]).map((x) => x?.images).filter(Boolean).slice(0, 10)

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: p.propertiesName,
    url: canonicalUrl.value,
    image: images.length ? images : [ogImage.value],
    address: {
      "@type": "PostalAddress",
      streetAddress: p.propertiesAddress || "",
      addressLocality: p.regenciesName || "",
      addressRegion: p.provincesName || "",
      addressCountry: "ID",
    },
    geo: p.lat != null && p.long != null ? { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.long } : undefined,
  }

  if ((p.ratingCount ?? 0) > 0) {
    schema.aggregateRating = { "@type": "AggregateRating", ratingValue: p.ratingAvg ?? 0, reviewCount: p.ratingCount ?? 0 }
  }

  return schema
})

useHead(() => ({
  title: `${pageTitle.value} | Staigo`,
  link: [
    { rel: "canonical", href: canonicalUrl.value },
    { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" },
  ],
  meta: [
    { name: "description", content: metaDescription.value },
    { name: "robots", content: "index,follow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: `${pageTitle.value} | Staigo` },
    { property: "og:description", content: metaDescription.value },
    { property: "og:url", content: canonicalUrl.value },
    { property: "og:image", content: ogImage.value },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${pageTitle.value} | Staigo` },
    { name: "twitter:description", content: metaDescription.value },
    { name: "twitter:image", content: ogImage.value },
  ],
  script: [
    { type: "application/ld+json", children: JSON.stringify(schemaJson.value) },
    { src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", defer: true },
  ],
}))

/* ===== UI STATE ===== */
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

/* ===== Nearby: tabs lengkap + sort distance ===== */
const tabLabel = (category: string) => {
  const c = String(category || "").toLowerCase()
  const map: Record<string, string> = {
    toll_booth: "Toll",
    hospital: "Hospital",
    station: "Stasiun",
    restaurant: "Kuliner",
    park: "Taman",
    mall: "Mall",
    fuel: "SPBU",
    monument: "Monumen",
    attraction: "Atraksi",
    place_of_worship: "Tempat Ibadah",
  }
  return map[c] || c.replace(/_/g, " ")
}

const nearbyTabs = computed(() => {
  const list = propertiesNearbyData.value || []
  const uniq: string[] = []
  const seen: Record<string, boolean> = {}

  for (const n of list) {
    const key = String(n.category || "").toLowerCase()
    if (!key) continue
    if (!seen[key]) {
      seen[key] = true
      uniq.push(key)
    }
  }

  uniq.sort((a, b) => tabLabel(a).localeCompare(tabLabel(b)))
  return [{ key: "all", label: "Semua" }, ...uniq.map((k) => ({ key: k, label: tabLabel(k) }))]
})

const activeNearbyTab = ref<string>("all")

const nearbyWithIcon = computed(() => {
  const list = propertiesNearbyData.value.slice()

  // sort by distance ascending
  list.sort((a, b) => (a.distanceMeter || 0) - (b.distanceMeter || 0))

  const iconFor = (cat: string) => {
    const c = String(cat || "").toLowerCase()
    if (c === "hospital") return Hospital
    if (c === "station") return TrainFront
    if (c === "restaurant") return Coffee
    if (c === "mall") return Store
    if (c === "park") return TreePine
    if (c === "fuel") return Fuel
    if (c === "monument") return Landmark
    if (c === "place_of_worship") return Church
    if (c === "toll_booth") return Plane
    if (c === "attraction") return ShoppingBag
    return CircleHelp
  }

  return list.map((x) => ({
    ...x,
    categoryKey: String(x.category || "").toLowerCase(),
    categoryLabel: tabLabel(String(x.category || "")),
    distanceLabel: formatDistance(x.distanceMeter || 0),
    icon: iconFor(String(x.category || "")),
  }))
})

const filteredNearby = computed(() => {
  if (activeNearbyTab.value === "all") return nearbyWithIcon.value
  return nearbyWithIcon.value.filter((x) => x.categoryKey === activeNearbyTab.value)
})

/* ===== MAP (Leaflet via CDN) - statis ===== */
const mapEl = ref<HTMLDivElement | null>(null)
const isMapReady = ref(false)

let mapInst: any = null
let markersLayer: any = null

const waitLeaflet = async () => {
  if (typeof window === "undefined") return false

  // tunggu sampai window.L tersedia (script CDN sudah di-inject via useHead)
  for (let i = 0; i < 40; i++) {
    if ((window as any).L) return true
    await new Promise((r) => setTimeout(r, 100))
  }
  return false
}

const buildMap = async () => {
  if (!mapEl.value) return
  const p = propertiesData.value
  if (!p || p.lat == null || p.long == null) return

  const ok = await waitLeaflet()
  if (!ok) return

  const L = (window as any).L
  const lat = Number(p.lat)
  const lon = Number(p.long)
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return

  const ZOOM = 15 // ✅ atur zoom favorit kamu (14-16 enak)

  if (!mapInst) {
    mapInst = L.map(mapEl.value, {
      zoomControl: false,

      // ✅ disable interaksi map
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    })
    mapInst.tap?.disable?.()

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInst)

    markersLayer = L.layerGroup().addTo(mapInst)
  }

  // ✅ bersihin marker lama
  markersLayer.clearLayers()

  // ✅ marker properti
  markersLayer.addLayer(L.marker([lat, lon]))

  // ✅ PAKSA map ke koordinat properti (tanpa fitBounds)
  mapInst.setView([lat, lon], ZOOM, { animate: false })

  isMapReady.value = true

  for (const n of propertiesNearbyData.value || []) {
    if (n?.lat == null || n?.lon == null) continue
    markersLayer.addLayer(L.circleMarker([n.lat, n.lon], { radius: 5 }))
  }
}


const openExternalMap = () => {
  const p = propertiesData.value
  if (!p || p.lat == null || p.long == null) return
  const lat = p.lat
  const lon = p.long
  const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`
  window.open(link, "_blank")
}

/* ===== Reviews (dummy) ===== */
const reviews = [
  { name: "Rina", rating: 5, avatar: "/img/user1.jpg", text: "Pelayanan sangat ramah, kamar bersih, lokasi dekat banget pusat kota!" },
  { name: "Andi", rating: 4.5, avatar: "/img/user2.jpg", text: "Staff sangat cepat respon, makanan enak, cuma AC agak berisik." },
  { name: "Maya", rating: 4, avatar: "/img/user3.jpg", text: "Harga sesuai kualitas. Recommend buat liburan sama keluarga." },
]

onMounted(async () => {
  window.addEventListener("scroll", handleScroll)
  handleScroll()

  // initial load rooms
  await refreshRooms()

  // build map when data ready
  watch([() => propertiesData.value, () => propertiesNearbyData.value], async () => {
    await nextTick()
    await buildMap()
  }, { immediate: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
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

/* biar leaflet canvas full (walau map non-interactive) */
:global(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>
