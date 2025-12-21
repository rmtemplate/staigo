<template>
    <div
        class="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100">

        <div class="relative w-full aspect-video rounded-t-xl overflow-hidden bg-slate-100">
            <Swiper class="h-full w-full" :modules="[Pagination]" :pagination="{ clickable: true }">
                <SwiperSlide v-for="(photo, index) in photos" :key="index">
                    <img :src="photo" class="w-full h-full object-cover" loading="lazy" />
                </SwiperSlide>
            </Swiper>

            <div
                class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10 shadow-sm">
                Hemat 40%
            </div>
        </div>

        <div class="mt-4  p-3">

            <h3 class="text-base font-bold text-slate-800 leading-tight mb-2">
                {{ title }}
            </h3>

            <div class="flex flex-wrap items-center gap-3 mb-4 pb-1">
                <div v-for="item in fasilitas?.slice(0,4)" :key="item?.id"
                    class="flex items-center gap-1.5 shrink-0 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <img :src="item?.icon" class="w-3.5 h-3.5 opacity-60" />
                    <span class="text-[10px] text-slate-600 font-medium">{{ item?.label }}</span>
                </div>
            </div>


            <hr class="border-slate-100 mb-4">

            <div class="flex items-end justify-between">

                <div>
                    <p class="text-[10px] text-slate-400 line-through mb-0.5">Rp{{ originalPrice }}</p>
                    <div class="flex items-baseline gap-1">
                        <span class="text-lg font-extrabold text-primary">Rp{{ price }}</span>
                        <span class="text-[10px] text-slate-500">/kamar/malam</span>
                    </div>
                    <div
                        class="flex gap-1.5 mt-1 w-fit px-1.5 py-0.5 rounded text-[10px] font-medium items-center">
                        <img src="/images/icons/icon-point.svg" class="w-3.5 h-3.5" alt="">
                        <span class="text-xs text-[#7E8CA0]">Lebih untung—bonus 1.600 poin!</span>
                    </div>
                </div>

                <NuxtLink
                    :to="`/properties/staigo-properties-124123213/rooms/deluxe-rooms-123123`"
                    class="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                    Pilih
                </NuxtLink>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        Swiper,
        SwiperSlide
    } from "swiper/vue";
    import {
        Pagination
    } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/pagination";

    const props = defineProps({
        title: String,
        photos: Array,
        fasilitas: Array,
        price: String,
        originalPrice: String
    });
</script>

<style scoped>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    :deep(.swiper-pagination-bullet) {
        background: white;
        opacity: 0.6;
    }

    :deep(.swiper-pagination-bullet-active) {
        opacity: 1;
        background: white;
    }
</style>