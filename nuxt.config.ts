// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  devServer: {
    port: 3001,
    host: '0.0.0.0' // kalau mau bisa diakses dari network lain
  },
  
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/device'
  ],
  vite: {
    plugins: [
      svgLoader()
    ]
  },
  css: ['@/assets/css/main.css']
})