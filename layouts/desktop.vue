<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-gray-100">
      Sidebar
    </aside>

    <main class="flex-1">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
