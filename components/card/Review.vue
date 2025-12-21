<template>
  <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">

    <!-- Header -->
    <div class="flex items-center gap-3">
      <img :src="item.avatar" class="w-11 h-11 rounded-full object-cover"/>

      <div>
        <p class="font-medium text-[15px]">
          {{ item.name }}
        </p>
        <p class="text-xs text-gray-500">
          {{ item.date }}
        </p>
      </div>
    </div>

    <div class="mt-2">
      <StarRating :rating="item.rating"/>
    </div>

    <p class="mt-3 text-[14px] leading-relaxed text-gray-700">
      {{ item.comment }}
    </p>

    <!-- Photos -->
    <div v-if="item.photos?.length" class="mt-4">

      <Swiper :slides-per-view="1.25" space-between="10" class="overflow-visible">
        <SwiperSlide
          v-for="(img, i) in item.photos"
          :key="i"
        >
          <img
            :src="img"
            class="rounded-xl h-40 w-full object-cover"
            @click="$emit('open', img)"
          />
        </SwiperSlide>
      </Swiper>

    </div>

  </div>
</template>

<script setup lang="ts">
defineProps({
  item: Object
})
</script>
