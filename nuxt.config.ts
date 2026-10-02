import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  // Componentes são importados explicitamente, como antes da migração.
  // Também evita que os barrels do shadcn (components/ui/*/index.ts) virem nomes duplicados.
  components: { dirs: [] },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Galeria RD',
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      script: [
        {
          // Segue o tema do sistema, como o x.ai. Roda antes da pintura para não piscar.
          innerHTML:
            'if (matchMedia("(prefers-color-scheme: dark)").matches) document.documentElement.classList.add("dark")',
          tagPosition: 'head',
        },
      ],
    },
  },

  typescript: {
    // prisma.config.ts e o seed rodam no Node, fora do app e do Nitro
    nodeTsConfig: {
      include: ['../prisma.config.ts', '../prisma/**/*.ts'],
    },
  },
})
