<script setup lang="ts">
import { Lock } from '@lucide/vue'
import type { Inspiracao } from '#shared/features/inspiracao/inspiracao.types'
import InspiracaoLogo from './InspiracaoLogo.vue'

defineProps<{ inspiracao: Inspiracao }>()
</script>

<template>
  <article class="group">
    <a
      :href="inspiracao.url"
      target="_blank"
      rel="noopener"
      class="relative flex aspect-[6/5] items-center justify-center overflow-hidden rounded-[1.75rem] bg-card px-[9%] transition-colors duration-300 group-hover:bg-soft-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <span class="sr-only">Abrir {{ inspiracao.nome }} em nova aba</span>

      <span
        v-if="inspiracao.bloqueado"
        class="absolute top-4 left-4 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary/80"
      >
        <Lock class="size-3" aria-hidden="true" />
        <span class="sr-only">Exclusivo</span>
      </span>

      <img
        :src="inspiracao.imagem"
        :alt="`Página inicial de ${inspiracao.nome}`"
        loading="lazy"
        class="aspect-[16/10] w-full rounded-md object-cover object-top shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] ring-1 ring-primary/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.015] motion-reduce:transition-none"
      >
    </a>

    <div class="mt-4 flex items-center gap-3">
      <InspiracaoLogo :logo="inspiracao.logo" :nome="inspiracao.nome" />
      <div class="min-w-0">
        <h3 class="text-[17px] leading-tight font-medium text-primary">{{ inspiracao.nome }}</h3>
        <p class="truncate text-[15px] text-muted-foreground">{{ inspiracao.descricao }}</p>
      </div>
    </div>
  </article>
</template>
