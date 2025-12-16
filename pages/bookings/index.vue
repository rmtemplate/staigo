<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  showBottomBar: true
})

// Tidak perlu logic form email jika hanya informasi statis, 
// tapi bisa diaktifkan kembali jika butuh notify.
</script>

<template>
  <div class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--ui-background)] px-6 py-10 sm:px-10">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.04]" 
         style="background-image: linear-gradient(var(--ui-primary) 1px, transparent 1px), linear-gradient(to right, var(--ui-primary) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--ui-primary-light)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--ui-secondary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse-slow delay-700"></div>

    <div class="relative z-10 w-full max-w-md text-center flex flex-col items-center">
      
      <div class="relative w-full h-72 mb-6 flex items-center justify-center">
        <div class="animate-float">
          <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <rect x="50" y="45" width="100" height="130" rx="12" class="fill-[var(--ui-primary)] opacity-10" transform="rotate(-5 100 100)"/>
            
            <rect x="45" y="40" width="110" height="140" rx="12" 
                  class="fill-[var(--ui-background)] stroke-[var(--ui-primary)]" stroke-width="2"/>
            
            <rect x="55" y="55" width="40" height="6" rx="3" class="fill-[var(--ui-primary)] opacity-80"/>
            <circle cx="135" cy="58" r="3" class="fill-[var(--ui-error)] opacity-50"/>
            <circle cx="125" cy="58" r="3" class="fill-[var(--ui-secondary)] opacity-50"/>

            <g class="opacity-60">
                <rect x="55" y="80" width="70" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                <rect x="135" y="80" width="10" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                
                <rect x="55" y="100" width="50" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                <rect x="135" y="100" width="10" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                
                <rect x="55" y="120" width="80" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                <rect x="135" y="120" width="10" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>

                <rect x="55" y="140" width="60" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
                <rect x="135" y="140" width="10" height="8" rx="2" class="fill-[var(--ui-primary-light)]"/>
            </g>

            <g class="animate-scan">
                <rect x="35" y="0" width="130" height="40" fill="url(#scan-gradient)" opacity="0.4"/>
                <line x1="35" y1="40" x2="165" y2="40" class="stroke-[var(--ui-primary)]" stroke-width="2"/>
            </g>
            
            <g class="animate-bounce-slow" style="animation-delay: 0s;">
                <circle cx="170" cy="80" r="16" class="fill-[var(--ui-background)] stroke-[var(--ui-primary-dark)]" stroke-width="2"/>
                <path d="M165 80h10M170 75v10" class="stroke-[var(--ui-primary-dark)]" stroke-width="2" stroke-linecap="round"/>
            </g>

            <g class="animate-bounce-slow" style="animation-delay: 1s;">
                 <rect x="20" y="130" width="24" height="24" rx="6" class="fill-[var(--ui-background)] stroke-[var(--ui-secondary)]" stroke-width="2"/>
                 <path d="M26 142l12 0M32 136l0 12" class="stroke-[var(--ui-secondary)]" stroke-width="2" stroke-linecap="round"/>
            </g>

            <path d="M155 110 Q170 110 170 96" class="stroke-[var(--ui-primary-light)] opacity-50" stroke-width="1" stroke-dasharray="4 4"/>
            <path d="M45 142 Q20 142 32 130" class="stroke-[var(--ui-primary-light)] opacity-50" stroke-width="1" stroke-dasharray="4 4"/>

            <defs>
                <linearGradient id="scan-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--ui-primary)" stop-opacity="0"/>
                    <stop offset="100%" stop-color="var(--ui-primary)" stop-opacity="0.5"/>
                </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <h1 class="font-display text-3xl sm:text-4xl font-bold text-[var(--ui-primary-dark)] mb-3 tracking-tight">
        Fitur Pemesanan <br/> Sedang Disiapkan
      </h1>
      
      <p class="font-sans text-[var(--ui-foreground)] opacity-80 text-base sm:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-sm mx-auto">
        Kami sedang meningkatkan performa sistem booking agar pesanan Anda diproses lebih cepat dan akurat.
      </p>

      <div class="flex flex-col gap-3 w-full max-w-[280px]">
        
        <div class="w-full bg-[var(--ui-primary-light)]/20 rounded-full h-1.5 overflow-hidden">
          <div class="h-full bg-[var(--ui-primary)] w-2/3 animate-loading-bar rounded-full relative overflow-hidden">
            <div class="absolute inset-0 bg-white/30 w-full h-full animate-shimmer"></div>
          </div>
        </div>

        <div class="flex justify-between items-center text-xs font-medium text-[var(--ui-foreground)] opacity-60">
          <span>Optimizing Database...</span>
          <span>85%</span>
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
/* ANIMATIONS 
   Membuat efek Scanner bergerak naik turun dan floating elements
*/

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes scan {
  0% { transform: translateY(40px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(150px); opacity: 0; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes loading-bar {
  0% { width: 10%; }
  50% { width: 60%; }
  100% { width: 85%; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-scan {
  animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.animate-loading-bar {
  animation: loading-bar 2s ease-out forwards;
}

.animate-shimmer {
  animation: shimmer 1.5s infinite linear;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>