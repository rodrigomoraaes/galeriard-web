<script setup lang="ts">
import type { Inspiracao } from '#shared/features/inspiracao/inspiracao.types'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import InspiracaoCard from './InspiracaoCard.vue'

defineProps<{ inspiracoes: Inspiracao[] }>()
</script>

<template>
  <ul v-if="inspiracoes.length" class="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="item in inspiracoes" :key="item.id">
      <InspiracaoCard :inspiracao="item" />
    </li>
  </ul>

  <Empty v-else class="rounded-[1.75rem] border border-border py-20">
    <EmptyHeader>
      <EmptyTitle>Nenhuma referência com esses filtros</EmptyTitle>
      <EmptyDescription>Tire algum filtro para ver mais referências.</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
