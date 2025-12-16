<script setup lang="ts">
definePageMeta({
  showBottomBar: true
})
</script>

<template>
  <div class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--ui-background)] px-6 py-10 sm:px-10">
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.04]" 
         style="background-image: linear-gradient(var(--ui-primary) 1px, transparent 1px), linear-gradient(to right, var(--ui-primary) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--ui-primary-light)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--ui-accent)] rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-pulse-slow delay-700"></div>

    <div class="relative z-10 w-full max-w-md text-center flex flex-col items-center">
      
      <div class="relative w-full h-72 mb-6 flex items-center justify-center">
        <div class="animate-float">
          <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <ellipse cx="100" cy="175" rx="50" ry="8" class="fill-[var(--ui-primary)] opacity-20 animate-shadow-scale"/>
            
            <circle cx="50" cy="60" r="40" class="fill-[var(--ui-primary-light)] opacity-10"/>
            <rect x="140" y="40" width="30" height="30" rx="8" class="fill-[var(--ui-secondary)] opacity-10" transform="rotate(15)"/>

            <g class="origin-center">
               <rect x="50" y="50" width="100" height="130" rx="16" 
                     class="fill-[var(--ui-background)] stroke-[var(--ui-primary)]" stroke-width="2"/>
               
               <path d="M50 80 L150 80" class="stroke-[var(--ui-primary-light)] opacity-30" stroke-width="1"/>

               <circle cx="100" cy="90" r="24" class="fill-[var(--ui-primary-light)] opacity-20 stroke-[var(--ui-primary)]" stroke-width="1.5"/>
               <path d="M100 82 C103 82 106 85 106 88 C106 91 103 94 100 94 C97 94 94 91 94 88 C94 85 97 82 100 82 Z" class="fill-[var(--ui-primary)] opacity-40"/>
               <path d="M84 108 C84 100 92 96 100 96 C108 96 116 100 116 108" class="stroke-[var(--ui-primary)] opacity-40" stroke-width="2" stroke-linecap="round"/>
               
               <g class="origin-[100px_90px] animate-spin-slow">
                 <path d="M100 62 A28 28 0 0 1 128 90" class="stroke-[var(--ui-secondary)]" stroke-width="2" stroke-linecap="round"/>
               </g>

               <rect x="70" y="130" width="60" height="6" rx="3" class="fill-[var(--ui-primary)] opacity-20 animate-pulse"/>
               <rect x="60" y="145" width="80" height="6" rx="3" class="fill-[var(--ui-primary)] opacity-10 animate-pulse delay-75"/>
               <rect x="60" y="158" width="80" height="6" rx="3" class="fill-[var(--ui-primary)] opacity-10 animate-pulse delay-150"/>
            </g>

            <g class="animate-bounce-slow" style="animation-delay: 0.5s;">
               <circle cx="165" cy="80" r="14" class="fill-[var(--ui-background)] stroke-[var(--ui-primary-dark)]" stroke-width="2"/>
               <path d="M165 74v12M159 80h12" class="stroke-[var(--ui-primary-dark)]" stroke-width="2"/>
               <circle cx="165" cy="80" r="4" class="fill-[var(--ui-primary-dark)]"/>
            </g>

            <g class="animate-bounce-slow" style="animation-delay: 0s;">
               <rect x="30" y="140" width="28" height="28" rx="8" class="fill-[var(--ui-background)] stroke-[var(--ui-accent)]" stroke-width="2" transform="rotate(-10)"/>
               <path d="M38 148 L42 158 L50 144" class="stroke-[var(--ui-accent)]" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-10 44 154)"/>
            </g>
            
            <path d="M152 80 L160 80" class="stroke-[var(--ui-primary-dark)] opacity-30" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="M48 145 L55 145" class="stroke-[var(--ui-accent)] opacity-30" stroke-width="1" stroke-dasharray="2 2"/>

          </svg>
        </div>
      </div>

      <h1 class="font-display text-3xl sm:text-4xl font-bold text-[var(--ui-primary-dark)] mb-3 tracking-tight">
        Profil Sedang <br/> Diperbarui
      </h1>
      
      <p class="font-sans text-[var(--ui-foreground)] opacity-80 text-base sm:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-sm mx-auto">
        Kami sedang meningkatkan fitur profil agar data dan privasi Anda lebih aman dan personal.
      </p>

      <div class="flex flex-col gap-3 w-full max-w-[280px]">
        
        <div class="w-full bg-[var(--ui-primary-light)]/20 rounded-full h-1.5 overflow-hidden">
          <div class="h-full bg-[var(--ui-accent)] w-3/4 animate-loading-bar rounded-full relative overflow-hidden">
            <div class="absolute inset-0 bg-white/30 w-full h-full animate-shimmer"></div>
          </div>
        </div>

        <div class="flex justify-between items-center text-xs font-medium text-[var(--ui-foreground)] opacity-60">
          <span>Updating User Data...</span>
          <span>75%</span>
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
/* ANIMASI (Sama dengan halaman sebelumnya untuk konsistensi) */

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes shadow-scale {
  0%, 100% { transform: scaleX(1); opacity: 0.2; }
  50% { transform: scaleX(0.8); opacity: 0.1; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes loading-bar {
  0% { width: 10%; }
  50% { width: 50%; }
  100% { width: 75%; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.1); }
}

/* Applying Animation Classes */
.animate-float {
  animation: float 5s ease-in-out infinite;
}
.animate-shadow-scale {
  animation: shadow-scale 5s ease-in-out infinite;
  transform-origin: center;
}
.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
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
  animation: pulse-slow 5s ease-in-out infinite;
}
</style>