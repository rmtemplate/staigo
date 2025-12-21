<template>
  <div class="min-h-screen bg-gray-50 pb-36 font-sans text-slate-800">

    <div class="sticky top-0 left-0 w-full bg-white z-40 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div class="flex items-center gap-4 px-5 h-16 border-b border-gray-100">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft class="w-6 h-6 text-slate-800" />
        </button>
        <h1 class="text-lg font-bold font-display text-slate-900">Menunggu Pembayaran</h1>
      </div>
    </div>

    <div class="sticky top-16 z-30">
      <div class="bg-orange-50 border-b border-orange-100 px-6 py-3 flex items-center justify-center gap-2 shadow-sm backdrop-blur-sm bg-opacity-95">
        <Clock class="w-4 h-4 text-orange-600 animate-pulse" />
        <span class="text-xs font-semibold text-orange-800 uppercase tracking-wide">Sisa Waktu:</span>
        <span class="text-lg font-bold text-orange-600 font-mono tracking-widest">{{ countdownDisplay }}</span>
      </div>
    </div>

    <div class="px-5 pt-6 transition-all duration-500 max-w-xl mx-auto space-y-6">

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Tagihan</p>
        <h2 class="text-3xl font-bold text-[var(--ui-primary)] font-display mb-6">Rp 402.000</h2>

        <div v-if="paymentMethod === 'QRIS'" class="animate-in fade-in zoom-in duration-300">
          <div class="relative bg-white p-4 rounded-xl border-2 border-slate-100 inline-block mb-4 shadow-sm">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
               alt="QRIS Code" 
               class="w-48 h-48 object-contain mix-blend-multiply opacity-90"
             />
             <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <QrCode class="w-20 h-20" />
             </div>
          </div>
          
          <div class="flex flex-col gap-2 mb-6">
            <span class="text-sm font-semibold text-slate-700">Scan QR code di atas</span>
          </div>
          
          <button class="w-full py-3 rounded-xl border border-[var(--ui-primary)] text-[var(--ui-primary)] font-bold text-sm hover:bg-blue-50 transition flex items-center justify-center gap-2">
            <Download class="w-4 h-4" /> Simpan QR Code
          </button>
        </div>

        <div v-else-if="paymentMethod === 'VA'" class="animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
          
          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div class="w-12 h-8 border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm">
              <span class="text-[10px] font-bold text-slate-700">BCA</span>
            </div>
            <div>
              <span class="block text-sm font-bold text-slate-900">BCA Virtual Account</span>
              <span class="block text-xs text-slate-500">Pengecekan Otomatis</span>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 relative">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">Nomor Virtual Account</span>
            <div class="flex items-center justify-between">
              <span class="text-xl font-mono font-bold text-slate-800 tracking-wide">{{ vaNumber }}</span>
              
              <button 
                @click="copyToClipboard"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold transition shadow-sm active:scale-95"
                :class="copied ? 'text-green-600 border-green-200 bg-green-50' : 'text-[var(--ui-primary)] hover:bg-[var(--ui-primary)] hover:text-white'"
              >
                <span v-if="copied">Disalin</span>
                <span v-else>Salin</span>
                <Check v-if="copied" class="w-3 h-3" />
                <Copy v-else class="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button 
          @click="toggleInstruction"
          class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-50 text-[var(--ui-primary)] flex items-center justify-center border border-blue-100">
              <HelpCircle class="w-4 h-4" />
            </div>
            <span class="text-sm font-bold text-slate-900">Cara Pembayaran</span>
          </div>
          <ChevronDown 
            class="w-5 h-5 text-gray-400 transition-transform duration-300" 
            :class="{'rotate-180': showInstruction}" 
          />
        </button>

        <div v-show="showInstruction" class="px-4 pb-4 bg-gray-50/50 border-t border-gray-100">
          <ul class="space-y-3 pt-3">
            <li v-for="(step, i) in steps" :key="i" class="flex gap-3 text-sm text-slate-600">
              <span class="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-bold flex items-center justify-center text-slate-500 shadow-sm">{{ i + 1 }}</span>
              <span class="leading-snug text-xs font-medium">{{ step }}</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 class="text-xs font-bold text-slate-500 mb-0 uppercase tracking-wider ml-1">Rincian Booking</h3>
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
        
        <div class="flex justify-between items-center mb-5 pb-4 border-b border-dashed border-gray-200">
           <div>
             <span class="text-[10px] text-slate-400 font-bold uppercase block">Booking ID</span>
             <span class="text-sm font-bold text-slate-800 font-mono">#HTL-88293-XBD</span>
           </div>
           <span class="px-2.5 py-1 rounded text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
             Menunggu Bayar
           </span>
        </div>

        <div class="flex gap-4 mb-5">
           <img 
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=150" 
            class="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0 border border-gray-100" 
          />
          <div class="flex flex-col justify-center">
            <h4 class="font-bold text-slate-900 text-base leading-tight mb-1">Deluxe Double Pool</h4>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span>2 Malam</span>
              <span class="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>2 Tamu</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 relative">
            <div class="absolute top-3 right-3 text-slate-300">
              <LogIn class="w-4 h-4" />
            </div>
            <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Check-in</span>
            <span class="text-sm font-bold text-slate-900 block">Jumat, 20 Des</span>
            <span class="text-xs text-slate-500 font-medium">14:00 WIB</span>
          </div>

          <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 relative">
            <div class="absolute top-3 right-3 text-slate-300">
              <LogOut class="w-4 h-4" />
            </div>
            <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Check-out</span>
            <span class="text-sm font-bold text-slate-900 block">Minggu, 22 Des</span>
            <span class="text-xs text-slate-500 font-medium">12:00 WIB</span>
          </div>
        </div>

        <div class="border-t border-dashed border-gray-200 -mx-5 mb-5 relative">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
        </div>

        <div class="space-y-2">
           <div class="flex justify-between text-xs text-slate-600">
             <span>Harga Kamar (2 Malam)</span>
             <span class="font-medium">Rp 400.000</span>
           </div>
           <div class="flex justify-between text-xs text-slate-600">
             <span>Biaya Layanan</span>
             <span class="font-medium">Rp 2.000</span>
           </div>
           <div class="flex justify-between text-xs text-green-600 font-bold">
             <span>Diskon Promo</span>
             <span>- Rp 0</span>
           </div>
           <div class="pt-3 mt-2 border-t border-gray-100 flex justify-between items-end">
             <span class="text-xs font-bold text-slate-900">Total Pembayaran</span>
             <span class="text-lg font-bold text-[var(--ui-primary)] font-display">Rp 402.000</span>
           </div>
        </div>

      </div>

    </div>

    <div class="hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 z-50 shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
      <div class="flex gap-3 max-w-xl mx-auto">
        <button class="flex-1 h-12 bg-white border border-gray-300 text-slate-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition active:scale-95">
          Cek Status
        </button>
        <button class="flex-[2] h-12 bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-dark)] text-white font-bold rounded-xl shadow-lg shadow-[var(--ui-primary)]/20 active:scale-95 transition-all">
          Saya Sudah Bayar
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
  import { 
    ArrowLeft, Clock, Download, Copy, Check, 
    HelpCircle, ChevronDown, LogIn, LogOut, QrCode
  } from "lucide-vue-next"
  import { ref, computed, onMounted, onUnmounted } from "vue"

  useHead({ title: 'Menunggu Pembayaran' })

  definePageMeta({
    layout: 'no-bottom'
  })

  // --- CONFIG (Ganti ini untuk test tampilan) ---
  const paymentMethod = ref<'QRIS' | 'VA'>('QRIS') // Coba ganti ke 'QRIS'
  const vaNumber = "8801234567890"

  // --- COUNTDOWN LOGIC ---
  const timeLeft = ref(15 * 60) // 15 Menit
  
  const countdownDisplay = computed(() => {
    const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
    const s = (timeLeft.value % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  })

  let interval: any
  onMounted(() => {
    interval = setInterval(() => {
      if (timeLeft.value > 0) timeLeft.value--
      else clearInterval(interval)
    }, 1000)
  })
  onUnmounted(() => clearInterval(interval))

  // --- UI LOGIC ---
  const copied = ref(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(vaNumber)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  }

  const showInstruction = ref(false)
  const toggleInstruction = () => showInstruction.value = !showInstruction.value

  // Data instruksi dinamis
  const steps = computed(() => {
    if (paymentMethod.value === 'QRIS') {
      return [
        "Buka aplikasi e-wallet atau m-banking.",
        "Pilih menu Scan QR.",
        "Scan kode QR di atas.",
        "Periksa nominal dan konfirmasi."
      ]
    }
    return [
      "Buka m-banking BCA atau ATM.",
      "Pilih menu Transfer > Virtual Account.",
      "Masukkan nomor 8801234567890.",
      "Pastikan nama tagihan sesuai.",
      "Selesaikan pembayaran."
    ]
  })
</script>