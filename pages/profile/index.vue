<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top Header -->
    <header class="bg-primary pb-12">
      <div class="px-5 pt-10 text-center mb-5">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500">
          <span class="text-lg font-bold text-white">{{ user.initials }}</span>
        </div>

        <p class="mt-3 text-[15px] font-semibold text-white">
          {{ user.name }}
        </p>
        <p class="mt-0.5 text-[12px] text-white/80">
          {{ user.phone }}
        </p>
      </div>

      <!-- GoPoin Card -->
      <section class="px-5" aria-labelledby="gopoin-title">
        <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <article class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="mb-2 flex items-center gap-2">
                <img
                  src="/images/icons/icon-point.png"
                  width="14"
                  height="14"
                  class="h-3.5 w-3.5"
                  alt="Ikon GoPoin"
                  loading="lazy"
                  decoding="async"
                />
                <span class="text-xs font-medium text-gray-700">GoPoin</span>
              </div>

              <h2 id="gopoin-title" class="text-[18px] font-semibold text-gray-900 leading-none">
                {{ gopoin }}
              </h2>
              <p class="mt-2 text-xs font-medium text-gray-500">
                1 poin setara 1 rupiah
              </p>
            </div>

            <div class="shrink-0">
              <button
                type="button"
                class="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Lihat Poin"
                @click="onViewPoints"
              >
                Lihat Poin
              </button>
            </div>
          </article>
        </div>
      </section>
    </header>

    <!-- Menu Wrapper (1:1 seperti desain: putih, rounded atas besar) -->
    <main class="bg-white -mt-7 rounded-t-4xl">
      <div class="px-5 pt-5 pb-28 space-y-6">
        <!-- Data Pribadi -->
        <section>
          <p class="text-[14px] font-semibold text-gray-900">Data Pribadi</p>
          <div class="mt-2">
            <MenuItem
              label="Informasi Data Pribadi"
              to="/profile/personal"
              :icon="User"
              chevron
            />
          </div>
        </section>

        <!-- Layanan Pelanggan -->
        <section>
          <p class="text-[14px] font-semibold text-gray-900">Layanan Pelanggan</p>
          <div class="mt-2 divide-y divide-gray-200">
            <MenuItem
              label="Pusat Bantuan"
              to="/help"
              :icon="CircleHelp"
              chevron
              noTopRadius
              noBottomRadius
            />
            <MenuButton
              label="Live Chat"
              :icon="MessageCircle"
              @click="onLiveChat"
              noTopRadius
              noBottomRadius
              hideChevron
            />
          </div>
        </section>

        <!-- Yang Lain -->
        <section>
          <p class="text-[14px] font-semibold text-gray-900">Yang Lain</p>
          <div class="mt-2 divide-y divide-gray-200">
            <MenuItem
              label="Syarat &amp; Ketentuan"
              to="/terms"
              :icon="FileText"
              chevron
              noTopRadius
              noBottomRadius
            />
            <MenuItem
              label="Kebijakan Privasi"
              to="/privacy"
              :icon="Shield"
              chevron
              noTopRadius
              noBottomRadius
            />
          </div>
        </section>

        <!-- Logout -->
        <button
          type="button"
          class="w-full rounded-full bg-primary py-3 text-[15px] font-semibold text-white shadow-sm active:scale-[0.99] transition"
          @click="onLogout"
        >
          Keluar
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { h } from "vue";
import {
  User,
  CircleHelp,
  MessageCircle,
  FileText,
  Shield,
  ChevronRight,
} from "lucide-vue-next";

definePageMeta({ layout: "default" });

const user = {
  initials: "RM",
  name: "Reza Maulana",
  phone: "085380896861",
};

const gopoin = "550.000";

function onViewPoints() {
  console.log("Lihat Poin");
}

function onLiveChat() {
  console.log("Live Chat");
}

function onLogout() {
  console.log("Keluar");
}

/**
 * MenuItem (NuxtLink) & MenuButton (button)
 * dibuat inline biar 1 file, dan styling 1:1 (compact, flat, divider).
 */
const baseRow =
  "w-full flex items-center gap-3 py-3 text-left bg-white";

const iconWrap =
  "h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0";

const labelCls = "flex-1 text-[13px] font-medium text-gray-700";

const cardCls = (noTopRadius, noBottomRadius) => {
  const top = noTopRadius ? "" : "rounded-t-2xl";
  const bottom = noBottomRadius ? "" : "rounded-b-2xl";
  return `overflow-hidden  ${top} ${bottom}`.trim();
};

const MenuItem = (props) =>
  h(
    "div",
    { class: cardCls(props.noTopRadius, props.noBottomRadius) },
    [
      h(
        "a",
        {
          href: props.to,
          class: baseRow,
        },
        [
          h("div", { class: iconWrap }, [h(props.icon, { class: "h-4 w-4 text-gray-600" })]),
          h("span", { class: labelCls, innerHTML: props.label }),
          props.chevron
            ? h(ChevronRight, { class: "h-5 w-5 text-gray-400" })
            : null,
        ]
      ),
    ]
  );

const MenuButton = (props, { emit }) =>
  h(
    "div",
    { class: cardCls(props.noTopRadius, props.noBottomRadius) },
    [
      h(
        "button",
        {
          type: "button",
          class: baseRow,
          onClick: () => emit("click"),
        },
        [
          h("div", { class: iconWrap }, [h(props.icon, { class: "h-4 w-4 text-gray-600" })]),
          h("span", { class: labelCls, innerHTML: props.label }),
          props.hideChevron ? null : h(ChevronRight, { class: "h-5 w-5 text-gray-400" }),
        ]
      ),
    ]
  );
</script>
