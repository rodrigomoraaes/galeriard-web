import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, from, salva) {
    if (salva) return salva
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // Trocar só os filtros (?segmento=, ?cor=…) mantém a rolagem
    if (to.path === from.path) return false
    return { top: 0 }
  },
} satisfies RouterConfig
