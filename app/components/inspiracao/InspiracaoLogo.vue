<script setup lang="ts">
import type { InspiracaoLogo } from '#shared/features/inspiracao/inspiracao.types'

defineProps<{ logo: InspiracaoLogo, nome: string }>()
</script>

<template>
  <span
    class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-muted text-base font-semibold text-primary ring-1 ring-primary/10 ring-inset"
  >
    <img v-if="logo.src" :src="logo.src" :alt="`Logo ${nome}`" class="size-full object-cover">
    <span v-else aria-hidden="true">{{ logo.iniciais }}</span>
  </span>
</template>
