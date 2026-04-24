import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      scope: '/TempleOfMars/',
      base: '/TempleOfMars/',
      manifest: {
        name: 'Temple of Mars',
        short_name: 'Temple',
        description: 'Watchtower of the Order. Sister Monument to the Command Center.',
        theme_color: '#c41e3a',
        background_color: '#1a1a2e',
        display: 'standalone',
        scope: '/TempleOfMars/',
        start_url: '/TempleOfMars/',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,svg,woff,woff2,json}'],
        globIgnores: ['**/*.html'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/(?:[Rr]ishabh1804|rishabh1804)\/.*\.(?:json|md)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'codex-data-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: { enabled: false }
    })
  ]
});
