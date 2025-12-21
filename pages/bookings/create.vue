<template>
  <div class="min-h-screen bg-gray-50 pb-36 font-sans text-slate-800">

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isLoading" class="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
        <div class="relative w-28 h-28 mb-8">
           <div class="absolute inset-0 bg-[var(--ui-primary)]/10 rounded-full animate-ping"></div>
           <div class="absolute inset-4 bg-[var(--ui-primary)]/20 rounded-full animate-pulse delay-75"></div>
           
           <div class="relative w-full h-full bg-white rounded-full shadow-2xl shadow-[var(--ui-primary)]/20 flex items-center justify-center border border-gray-100">
             <Calendar class="w-10 h-10 text-[var(--ui-primary)] animate-bounce" />
             <div class="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center animate-in zoom-in duration-500 delay-300">
               <Check class="w-3 h-3 text-white" />
             </div>
           </div>
        </div>
        
        <h2 class="text-xl font-bold font-display text-slate-900 mb-2">Menyiapkan Pesanan Anda</h2>
        <p class="text-sm text-slate-500 max-w-xs leading-relaxed">
          Mohon tunggu sebentar, kami sedang memverifikasi ketersediaan kamar dan harga terbaik untuk Anda.
        </p>
      </div>
    </Transition>

    <div class="fixed top-0 left-0 w-full bg-white z-40 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div class="flex items-center gap-4 px-5 h-16 border-b border-gray-100">
        <button @click="handleBack" class="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
          <ChevronLeft class="w-6 h-6 text-slate-800" />
        </button>
        <h1 class="text-lg font-bold font-display text-slate-900">Checkout</h1>
      </div>

      <div class="px-6 pb-0 bg-white">
        <div class="flex items-center justify-between relative py-4">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-100 -z-10">
            <div class="h-full bg-[var(--ui-primary)] transition-all duration-500 ease-out" :style="{ width: currentStep === 2 ? '100%' : '0%' }"></div>
          </div>
          
          <div 
            @click="goToStep(1)"
            class="flex items-center gap-2 bg-white pr-4 cursor-pointer group"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2"
              :class="currentStep >= 1 ? 'bg-[var(--ui-primary)] border-[var(--ui-primary)] text-white shadow-lg shadow-[var(--ui-primary)]/20' : 'bg-white border-gray-300 text-gray-400'"
            >
              1
            </div>
            <span class="text-xs font-bold tracking-wide" :class="currentStep >= 1 ? 'text-[var(--ui-primary)]' : 'text-gray-400'">Data Pemesan</span>
          </div>

          <div class="flex items-center gap-2 bg-white pl-4">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2"
              :class="currentStep === 2 ? 'bg-[var(--ui-primary)] border-[var(--ui-primary)] text-white shadow-lg shadow-[var(--ui-primary)]/20' : 'bg-white border-gray-300 text-gray-400'"
            >
              2
            </div>
            <span class="text-xs font-bold tracking-wide" :class="currentStep === 2 ? 'text-[var(--ui-primary)]' : 'text-gray-400'">Pembayaran</span>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5 pt-[150px] transition-all duration-500 max-w-xl mx-auto">
      
      <div v-if="currentStep === 1" class=" duration-500">
        
        <h3 class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider ml-1">Ringkasan Menginap</h3>
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
          
          <div class="flex gap-4 mb-5 border-b border-dashed border-gray-100 pb-5">
            <div class="relative w-20 h-20 shrink-0">
               <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=200" 
                class="w-full h-full rounded-xl object-cover shadow-sm" 
                alt="Room"
              />
              <div class="absolute bottom-0 right-0 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-tl-lg rounded-br-lg backdrop-blur-sm">
                x1
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <h4 class="font-bold text-slate-900 font-display text-lg leading-tight mb-1">Deluxe Double Pool</h4>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-semibold bg-orange-50 text-orange-600 px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1">
                   <User class="w-3 h-3"/> 2 Dewasa
                 </span>
                 <span class="text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                   <Baby class="w-3 h-3"/> 1 Anak
                 </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 relative group hover:border-[var(--ui-primary)]/30 transition-colors">
              <div class="absolute top-3 right-3 text-slate-300 group-hover:text-[var(--ui-primary)] transition-colors">
                <LogIn class="w-4 h-4" />
              </div>
              <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Check-in</span>
              <span class="text-sm font-bold text-slate-900 block">Jumat, 20 Des</span>
              <span class="text-xs text-slate-500 font-medium">Dari 14:00</span>
            </div>

            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 relative group hover:border-[var(--ui-primary)]/30 transition-colors">
              <div class="absolute top-3 right-3 text-slate-300 group-hover:text-[var(--ui-primary)] transition-colors">
                <LogOut class="w-4 h-4" />
              </div>
              <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Check-out</span>
              <span class="text-sm font-bold text-slate-900 block">Minggu, 22 Des</span>
              <span class="text-xs text-slate-500 font-medium">Sebelum 12:00</span>
            </div>
          </div>
          
          <div class="mt-4 flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800">
             <span class="font-medium">Total Durasi</span>
             <span class="font-bold">2 Malam</span>
          </div>
        </div>

        <h3 class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider ml-1">Data Pemesan</h3>
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          
          <form @submit.prevent="handleNextAction">
            
            <div class="mb-5">
              <div class="flex bg-slate-100 p-1 rounded-xl">
                 <button 
                  v-for="salute in ['Tuan', 'Nyonya', 'Nona']" 
                  :key="salute"
                  type="button"
                  @click="formData.salutation = salute"
                  class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200"
                  :class="formData.salutation === salute ? 'bg-primary text-white shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'"
                 >
                   {{ salute }}
                 </button>
              </div>
            </div>

            <div class="mb-5">
              <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Nama Lengkap</label>
              <div class="relative group">
                <UserCircle class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--ui-primary)] transition-colors" />
                <input 
                  v-model="formData.name"
                  type="text" 
                  placeholder="Isi nama sesuai kartu identitas" 
                  class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[var(--ui-primary)] focus:ring-4 focus:ring-[var(--ui-primary)]/10 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Email</label>
                <div class="relative group">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--ui-primary)] transition-colors" />
                  <input 
                    v-model="formData.email"
                    type="email" 
                    placeholder="contoh@email.com" 
                    class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[var(--ui-primary)] focus:ring-4 focus:ring-[var(--ui-primary)]/10 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Nomor Handphone</label>
                <div class="relative group">
                  <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--ui-primary)] transition-colors" />
                  <input 
                    v-model="formData.phone"
                    type="tel" 
                    placeholder="0812xxxx" 
                    class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[var(--ui-primary)] focus:ring-4 focus:ring-[var(--ui-primary)]/10 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div v-else-if="currentStep === 2" class=" duration-500">
        
        <div class="flex items-center justify-between mb-5">
           <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pilih Pembayaran</h3>
        </div>

        <div class="space-y-4">

          <div 
            @click="selectPayment('poin')"
            class="relative overflow-hidden bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
            :class="selectedPayment === 'poin' ? 'border-[var(--ui-primary)] bg-blue-50/20 ring-1 ring-[var(--ui-primary)]' : 'border-gray-100 hover:border-gray-200'"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 border border-yellow-100">
                 <img src="/images/icons/icon-point.svg" class="w-6 h-6" alt="Poin" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-slate-900">Tukar Poin Loyalty</h4>
                <p class="text-xs text-slate-500 mt-0.5">Saldo Anda: <span class="text-slate-800 font-semibold">2.500 Poin</span></p>
              </div>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors" :class="selectedPayment === 'poin' ? 'border-[var(--ui-primary)]' : 'border-gray-200'">
                 <div class="w-3 h-3 rounded-full bg-[var(--ui-primary)] scale-0 transition-transform duration-200" :class="{ 'scale-100': selectedPayment === 'poin' }"></div>
              </div>
            </div>
          </div>

          <div 
            @click="selectPayment('qris')"
            class="relative bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
            :class="selectedPayment === 'qris' ? 'border-[var(--ui-primary)] bg-blue-50/20 ring-1 ring-[var(--ui-primary)]' : 'border-gray-100 hover:border-gray-200'"
          >
            <div class="absolute -top-px -right-px bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-sm z-10">
              DISARANKAN
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 p-1">
                 <img src="/images/payment/qris.png" class="w-full object-contain" alt="QRIS" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-slate-900">QRIS Instan</h4>
                <p class="text-xs text-slate-500 mt-0.5">Gopay, OVO, Dana, ShopeePay</p>
              </div>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors" :class="selectedPayment === 'qris' ? 'border-[var(--ui-primary)]' : 'border-gray-200'">
                 <div class="w-3 h-3 rounded-full bg-[var(--ui-primary)] scale-0 transition-transform duration-200" :class="{ 'scale-100': selectedPayment === 'qris' }"></div>
              </div>
            </div>
          </div>

          <div class="bg-white border rounded-2xl overflow-hidden transition-all duration-300" :class="selectedPayment === 'va' ? 'border-[var(--ui-primary)] shadow-sm' : 'border-gray-100'">
            <div 
              @click="toggleVA"
              class="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div class="w-12 h-12 rounded-xl  flex items-center justify-center text-[var(--ui-primary)] shrink-0 border border-gray-100">
                <img src="/images/payment/va.png" class="w-full object-contain" alt="QRIS" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-slate-900">Virtual Account</h4>
                <p class="text-xs text-slate-500 mt-0.5">Transfer otomatis dicek</p>
              </div>
              <ChevronDown 
                class="w-5 h-5 text-gray-400 transition-transform duration-300" 
                :class="{ 'rotate-180': isVaExpanded }" 
              />
            </div>

            <div 
              v-show="isVaExpanded" 
              class="border-t border-gray-100 bg-slate-50/50"
            >
              <div 
                v-for="bank in vaBanks" 
                :key="bank.code"
                @click="selectPayment('va', bank.code)"
                class="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-white transition group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <span class="text-[10px] font-bold text-slate-600">{{ bank.name }}</span>
                  </div>
                  <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">{{ bank.label }}</span>
                </div>
                <div class="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center" :class="(selectedPayment === 'va' && selectedVaBank === bank.code) ? 'border-[var(--ui-primary)]' : ''">
                   <div v-if="selectedPayment === 'va' && selectedVaBank === bank.code" class="w-2.5 h-2.5 rounded-full bg-[var(--ui-primary)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div 
            @click="selectPayment('cod')"
            class="relative bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
            :class="selectedPayment === 'cod' ? 'border-[var(--ui-primary)] bg-blue-50/20 ring-1 ring-[var(--ui-primary)]' : 'border-gray-100 hover:border-gray-200'"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 shrink-0 border border-gray-200">
                    <img src="/images/payment/cod.png" class="w-full object-contain" alt="Bayar Ditempat" />

              </div>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-slate-900">Bayar di Tempat</h4>
                <p class="text-xs text-slate-500 mt-0.5">Bayar saat Check-in (Cash/Card)</p>
              </div>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors" :class="selectedPayment === 'cod' ? 'border-[var(--ui-primary)]' : 'border-gray-200'">
                 <div class="w-3 h-3 rounded-full bg-[var(--ui-primary)] scale-0 transition-transform duration-200" :class="{ 'scale-100': selectedPayment === 'cod' }"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 z-50 shadow-[0_-5px_25px_rgba(0,0,0,0.05)]">
      <div class="flex items-center justify-between gap-4 max-w-xl mx-auto">
        
        <div class="flex flex-col">
          <span class="text-[11px] text-slate-400 font-medium mb-1">Total Tagihan</span>
          <div class="flex items-center gap-2 cursor-pointer group">
             <span class="text-xl font-bold text-[var(--ui-primary)] font-display">Rp 402.000</span>
             <ChevronUp class="w-4 h-4 text-slate-300 group-hover:text-[var(--ui-primary)] transition-colors" />
          </div>
        </div>

        <button 
          @click="handleNextAction"
          class="flex-1 h-12 bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-dark)] text-white font-bold rounded-xl shadow-lg shadow-[var(--ui-primary)]/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentStep === 1 && !isFormValid"
        >
          <span>{{ currentStep === 1 ? 'Lanjut Pembayaran' : 'Bayar Sekarang' }}</span>
          <ArrowRight v-if="currentStep === 1" class="w-5 h-5" />
          <Lock v-else class="w-4 h-4" />
        </button>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
  import { 
    ChevronLeft, ChevronDown, ChevronUp, Check,
    User, UserCircle, Baby, Mail, Phone,
    CreditCard, ArrowRight, Lock, Store, Calendar,
    LogIn, LogOut, Clock
  } from "lucide-vue-next"
  import { ref, computed, reactive } from 'vue'

  // --- Meta ---
  useHead({ title: 'Checkout & Pembayaran' })

  definePageMeta({
    layout: 'no-bottom'
  })

  // --- State ---
  const currentStep = ref(1)
  const isLoading = ref(false)

  // --- Step 1 Data ---
  const formData = reactive({
    salutation: 'Tuan',
    name: '',
    email: '',
    phone: ''
  })

  // Validasi Form
  const isFormValid = computed(() => {
    return formData.name.length > 2 && formData.email.includes('@') && formData.phone.length > 9
  })

  // --- Step 2 Data ---
  const selectedPayment = ref('') 
  const selectedVaBank = ref('')
  const isVaExpanded = ref(false)

  const vaBanks = [
    { code: 'BCA', name: 'BCA', label: 'BCA Virtual Account' },
    { code: 'MANDIRI', name: 'MANDIRI', label: 'Mandiri Virtual Account' },
    { code: 'BRI', name: 'BRI', label: 'BRI Virtual Account' },
  ]

  const router = useRouter();
  // --- Methods ---
  const handleBack = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    } else {
        router.back()
    }
  }

  // Fungsi untuk klik stepper (hanya bisa mundur)
  const goToStep = (step: number) => {
    if (step < currentStep.value) {
      currentStep.value = step
    }
  }

  const toggleVA = () => {
    isVaExpanded.value = !isVaExpanded.value
    if (isVaExpanded.value && !selectedPayment.value) {
       // Optional: Auto open logic
    }
  }

  const selectPayment = (type: string, bankCode?: string) => {
    selectedPayment.value = type
    
    if (type === 'va') {
      isVaExpanded.value = true
      if (bankCode) selectedVaBank.value = bankCode
    } else {
      isVaExpanded.value = false 
      selectedVaBank.value = ''
    }
  }

  const handleNextAction = () => {
    if (currentStep.value === 1) {
      if (isFormValid.value) {
        // Start Loading Animation
        isLoading.value = true
        
        // Simulasi API Call
        setTimeout(() => {
          isLoading.value = false
          currentStep.value = 2
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 2500) // Delay 2.5 detik
      }
    } else {
      if (!selectedPayment.value) return alert("Pilih metode pembayaran dulu")
      router.push("/bookings/123123123123/detail")
    }
  }
</script>

<style scoped>
/* Animasi Zoom In untuk Badge Check */
.animate-in {
  animation: zoomIn 0.5s ease-out forwards;
}
@keyframes zoomIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>