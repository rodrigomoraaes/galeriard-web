<script setup lang="ts">
import { ArrowDown, ArrowUpRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SugestaoBotao from '@/components/sugestao/SugestaoBotao.vue'

const titleWords = ['Boas', 'interfaces,', 'reunidas', 'num', 'só', 'lugar']
</script>

<template>
  <section class="mx-auto w-full max-w-page px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:px-6">
    <div class="mx-auto max-w-3xl text-center">
      <div class="mb-6 flex justify-center animate-fade-up sm:mb-8">
        <Badge
          as="a"
          href="#explorar"
          variant="pill"
          class="group/pill focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Badge variant="highlight">Novo</Badge>
          <span class="whitespace-nowrap">
            <span class="font-medium">Filtre por cor, estilo e segmento</span>
            <span class="text-primary/20"> · </span>
            <span class="transition-colors group-hover/pill:text-primary/80">Ver agora</span>
          </span>
          <span
            class="flex size-6 items-center justify-center rounded-full bg-primary/[0.04] transition-colors group-hover/pill:bg-primary/[0.08]"
          >
            <ArrowUpRight class="size-3" />
          </span>
        </Badge>
      </div>

      <h1
        class="text-4xl font-[450] leading-[1.1] tracking-tight text-balance text-primary [perspective:1200px] sm:text-5xl lg:text-display"
      >
        <template v-for="(word, i) in titleWords" :key="word">
          <span class="inline-block animate-rise-in" :style="{ animationDelay: `${80 + i * 60}ms` }">{{ word }}</span>
          {{ ' ' }}
        </template>
      </h1>

      <p class="mx-auto mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-primary/70 [animation-delay:400ms]">
        Landing pages e interfaces de produtos reais, organizadas por segmento e estilo: SaaS, P&B, animado e mais.
      </p>

      <div class="mt-9 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:500ms]">
        <Button as="a" href="#explorar" size="lg">
          Explorar referências
          <ArrowDown data-icon="inline-end" />
        </Button>
        <SugestaoBotao size="lg" />
      </div>
    </div>
  </section>
</template>
