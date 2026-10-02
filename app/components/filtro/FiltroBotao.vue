<script setup lang="ts">
import { SlidersHorizontal } from '@lucide/vue'
import { Button } from '@/components/ui/button'

defineProps<{ ativos: number }>()
</script>

<template>
  <Button variant="soft" class="has-data-[slot=filtro-contagem]:pr-1.5">
    <SlidersHorizontal data-icon="inline-start" />
    Filtrar
    <span
      v-if="ativos"
      data-slot="filtro-contagem"
      class="flex h-6 min-w-6 items-center justify-center rounded-full bg-highlight px-1.5 font-mono text-[11px] text-highlight-foreground tabular-nums"
    >
      {{ ativos }}
      <span class="sr-only">filtros ativos</span>
    </span>
  </Button>
</template>
