<script setup lang="ts">
// Metadata untuk Nuxt (opsional, sesuaikan dengan layout Anda)
definePageMeta({
  showBottomBar: true
})
</script>

<template>
  <div class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--ui-background)] px-6 py-10 sm:px-10">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.04]" 
         style="background-image: linear-gradient(var(--ui-primary) 1px, transparent 1px), linear-gradient(to right, var(--ui-primary) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--ui-secondary)] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--ui-primary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse-slow delay-700"></div>

    <div class="relative z-10 w-full max-w-md text-center flex flex-col items-center">
      
      <div class="relative w-full h-72 mb-4 flex items-center justify-center">
        <div class="animate-float">
          <svg width="260" height="260" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <ellipse cx="100" cy="175" rx="60" ry="10" class="fill-[var(--ui-primary)] opacity-20 animate-shadow-scale"/>

            <g class="animate-float-ticket-left" style="animation-delay: 0s;">
              <rect x="30" y="70" width="45" height="28" rx="3" class="fill-[var(--ui-background)] stroke-[var(--ui-secondary)]" stroke-width="1.5" transform="rotate(-15)"/>
              <circle cx="30" cy="84" r="4" class="fill-[var(--ui-background)] stroke-[var(--ui-secondary)]" stroke-width="1.5" transform="rotate(-15)"/>
              <text x="42" y="88" font-family="sans-serif" font-weight="800" font-size="12" fill="var(--ui-secondary)" transform="rotate(-15)">50%</text>
            </g>

            <g class="animate-float-ticket-right" style="animation-delay: 1s;">
              <rect x="125" y="60" width="45" height="28" rx="3" class="fill-[var(--ui-background)] stroke-[var(--ui-primary)]" stroke-width="1.5" transform="rotate(10)"/>
              <circle cx="170" cy="68" r="4" class="fill-[var(--ui-background)] stroke-[var(--ui-primary)]" stroke-width="1.5" transform="rotate(10)"/>
              <text x="135" y="80" font-family="sans-serif" font-weight="800" font-size="11" fill="var(--ui-primary)" transform="rotate(10)">SALE</text>
            </g>

            <path d="M50 120 L150 120 L145 170 C145 175 140 180 135 180 L65 180 C60 180 55 175 55 170 Z" 
                  class="fill-[var(--ui-primary)] stroke-[var(--ui-primary-dark)]" stroke-width="2"/>
            <rect x="90" y="120" width="20" height="60" class="fill-[var(--ui-primary-dark)] opacity-30"/>

            <g class="animate-lid-bounce origin-bottom">
               <rect x="45" y="100" width="110" height="20" rx="3" class="fill-[var(--ui-primary-light)] stroke-[var(--ui-primary-dark)]" stroke-width="2"/>
               <rect x="90" y="100" width="20" height="20" class="fill-[var(--ui-secondary)]"/>
               
               <path d="M100 100 C100 100 80 70 70 80 C60 90 90 100 100 100 Z" class="fill-[var(--ui-secondary)] stroke-[var(--ui-secondary-dark)]" stroke-width="1"/>
               <path d="M100 100 C100 100 120 70 130 80 C140 90 110 100 100 100 Z" class="fill-[var(--ui-secondary)] stroke-[var(--ui-secondary-dark)]" stroke-width="1"/>
               <circle cx="100" cy="100" r="6" class="fill-[var(--ui-secondary)] stroke-[var(--ui-secondary-dark)]"/>
            </g>

            <g class="animate-sparkle">
               <path d="M160 120 L163 113 L170 113 L165 108 L167 101 L160 105 L153 101 L155 108 L150 113 L157 113 Z" class="fill-[var(--ui-secondary)]"/>
               <circle cx="30" cy="140" r="3" class="fill-[var(--ui-primary-light)]"/>
               <rect x="170" y="160" width="5" height="5" transform="rotate(45)" class="fill-[var(--ui-primary)]"/>
            </g>

          </svg>
        </div>
      </div>

      <h1 class="font-display text-3xl sm:text-4xl font-bold text-[var(--ui-primary-dark)] mb-3 tracking-tight">
        Promo Spesial <br/> Segera Hadir!
      </h1>
      
      <p class="font-sans text-[var(--ui-foreground)] opacity-80 text-base sm:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-sm mx-auto">
        Kami sedang menyiapkan kejutan diskon dan penawaran menarik khusus untuk Anda.
      </p>

      <div class="flex flex-col gap-3 w-full max-w-[280px]">
        
        <div class="w-full bg-[var(--ui-primary-light)]/20 rounded-full h-1.5 overflow-hidden">
          <div class="h-full bg-[var(--ui-secondary)] w-2/3 animate-loading-bar rounded-full relative overflow-hidden">
            <div class="absolute inset-0 bg-white/30 w-full h-full animate-shimmer"></div>
          </div>
        </div>

        <div class="flex justify-between items-center text-xs font-medium text-[var(--ui-foreground)] opacity-60">
          <span>Wrapping gifts...</span>
          <span>Almost Ready</span>
        </div>
      </div>

    </div>

    <div class="absolute bottom-6 w-full text-center">
      <p class="text-xs font-sans font-medium text-[var(--ui-foreground)] opacity-40">
        &copy; 2025 Staigo
      </p>
    </div>

  </div>
</template>

<style scoped>
/* =========================================
   ANIMASI GABUNGAN (Gift Box + Standard UI)
   ========================================= */

/* 1. Floating Container Utama */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* 2. Shadow di bawah box (membesar/mengecil) */
@keyframes shadow-scale {
  0%, 100% { transform: scaleX(1); opacity: 0.2; }
  50% { transform: scaleX(0.8); opacity: 0.1; }
}

/* 3. Tutup Box yang memantul (Lid Bounce) */
@keyframes lid-bounce {
  0%, 100% { transform: translateY(0) rotate(0); }
  20% { transform: translateY(-5px) rotate(-2deg); }
  40% { transform: translateY(-2px) rotate(1deg); }
  60% { transform: translateY(-5px) rotate(-1deg); }
  80% { transform: translateY(-1px) rotate(0.5deg); }
}

/* 4. Tiket Melayang (Kiri & Kanan berbeda arah) */
@keyframes float-ticket-left {
  0%, 100% { transform: translate(0, 0) rotate(-15deg); }
  50% { transform: translate(-5px, -15px) rotate(-25deg); }
}
@keyframes float-ticket-right {
  0%, 100% { transform: translate(0, 0) rotate(10deg); }
  50% { transform: translate(5px, -12px) rotate(20deg); }
}

/* 5. Sparkles blinking */
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.1) rotate(45deg); }
}

/* 6. Progress Bar Loading (Standard UI) */
@keyframes loading-bar {
  0% { width: 5%; }
  50% { width: 50%; }
  100% { width: 85%; } /* Hype tinggi untuk promo */
}

/* 7. Shimmer Effect (Standard UI) */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 8. Background Pulse (Standard UI) */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.1); }
}

/* --- Applying Animations --- */

.animate-float {
  animation: float 5s ease-in-out infinite;
}
.animate-shadow-scale {
  animation: shadow-scale 5s ease-in-out infinite;
  transform-origin: center;
}
.animate-lid-bounce {
  animation: lid-bounce 4s ease-in-out infinite;
}
.animate-float-ticket-left {
  animation: float-ticket-left 4s ease-in-out infinite;
}
.animate-float-ticket-right {
  animation: float-ticket-right 4.5s ease-in-out infinite;
}
.animate-sparkle {
  animation: sparkle 2.5s ease-in-out infinite;
  transform-origin: center;
}
.animate-loading-bar {
  animation: loading-bar 2.5s ease-out forwards;
}
.animate-shimmer {
  animation: shimmer 1.5s infinite linear;
}
.animate-pulse-slow {
  animation: pulse-slow 5s ease-in-out infinite;
}
</style>