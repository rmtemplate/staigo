<script setup lang="ts">
import { computed, ref } from "vue"
import {
  MapPinIcon,
  CalendarDaysIcon,
  MoonIcon,
  UsersIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-vue-next"
import BaseBottomSheet from "@/components/BaseBottomSheet.vue"
import RangeCalendar, { type DateRangeValue } from "@/components/RangeCalendar.vue"

const cityOrHotel = ref("Staigo Abian Klumpu Villa Bali")
const checkIn = ref("31 Jul")
const checkOut = ref("01 Agu")
const nights = ref(1)

// ===== Location sheet =====
const isLocationOpen = ref(false)

type LocationGroup = {
  city: string
  hotels: string[]
}

const locationGroups = ref<LocationGroup[]>([
  {
    city: "Medan",
    hotels: ["SG Premium Guest House By Helocus", "Beda Arga By Helocus"],
  },
  {
    city: "Berastagi",
    hotels: ["Hotel New Dieng By Helocus", "Mikie Holiday", "Grand Mutiara By Helocus"],
  },
  {
    city: "Parapat",
    hotels: ["Hotel New Dieng By Helocus", "Mikie Holiday", "Grand Mutiara By Helocus"],
  },
])

const openLocationSheet = () => {
  isLocationOpen.value = true
}
const selectHotel = (hotel: string) => {
  cityOrHotel.value = hotel
  isLocationOpen.value = false
}

// ===== Date sheet =====
const isDateOpen = ref(false)

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

const bookingRange = ref<DateRangeValue>({
  start: startOfDay(new Date()),
  end: startOfDay(addDays(new Date(), 1)),
})

const draftRange = ref<DateRangeValue>({ start: null, end: null })

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

// ===== Room & Guess =====
const rooms = ref(1)
const adults = ref(2)
const kidsU7 = ref(0)

const isRoomGuestOpen = ref(false)

const draftRooms = ref(1)
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
</script>

<template>
  <div class="relative min-h-screen bg-white">
    <NavigationAppBar
      title="Mau Nginep dimana?"
      bg-class="bg-primary"
      text-class="text-white"
      :showBack="true"
      :shadow="false"
      class="relative z-20"
    />

    <div class="absolute inset-x-0 top-0 h-44 bg-primary rounded-b-4xl"></div>

    <div class="relative z-10 px-5 mt-4">
      <div class="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
        <!-- Kota / Hotel -->
        <button
          type="button"
          class="w-full text-left py-4 px-4 active:bg-gray-50"
          @click="openLocationSheet"
        >
          <span class="text-xs font-medium text-gray-500">Kota atau Nama Hotel</span>
          <div class="flex items-center gap-3 mt-2">
            <MapPinIcon class="w-5 h-5 text-primary" />
            <h6 class="font-semibold text-[#242B42] text-[15px] leading-tight">
              {{ cityOrHotel }}
            </h6>
          </div>
        </button>

        <div class="h-px bg-[#E6E9ED] w-full"></div>

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

      <div class="mt-6">
        <button
          class="w-full bg-primary text-white rounded-full py-3 font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
        >
          Cari
        </button>
      </div>
    </div>

    <!-- ===== BottomSheet: Daftar Lokasi ===== -->
    <BaseBottomSheet
      v-model="isLocationOpen"
      title="Daftar Lokasi"
      bodyClass="px-0"
      footerClass="hidden"
      :draggable="true"
      headerClass="pt-3 pb-3"
    >
      <div class="divide-y divide-[#E6E9ED]">
        <div v-for="(group, idx) in locationGroups" :key="group.city" class="bg-white">
          <!-- City header (NOT clickable) -->
          <div class="w-full px-5 pt-4">
            <div class="flex items-center gap-2">
              <MapPinIcon class="w-4 h-4 text-primary" />
              <div class="text-[18px] font-extrabold text-primary leading-tight">
                {{ group.city }}
              </div>
            </div>
          </div>

          <!-- Hotel list (clickable) -->
          <div class="px-5 pb-3 pt-1">
            <button
              v-for="hotel in group.hotels"
              :key="hotel"
              type="button"
              class="w-full text-left py-2 text-[14px] font-semibold text-[#1F2433] active:opacity-70"
              @click="selectHotel(hotel)"
            >
              {{ hotel }}
            </button>
          </div>

          <div v-if="idx < locationGroups.length - 1" class="h-2 bg-[#F3F5F8]" />
        </div>
      </div>
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
        <div class="px-1">
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
        <button
          type="button"
          class="w-full bg-primary text-white rounded-full h-10 text-[14px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)] active:scale-[0.99]"
          @click="saveRoomGuest"
        >
          Simpan
        </button>
      </template>
    </BaseBottomSheet>
  </div>
</template>
