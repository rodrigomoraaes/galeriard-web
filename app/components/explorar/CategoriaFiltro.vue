<script setup lang="ts">
import { computed } from 'vue'
import type { Categoria, CategoriaGrupo, CategoriaSlug } from '#shared/features/inspiracao/inspiracao.types'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const props = defineProps<{ categorias: Categoria[] }>()

// '' representa "Todas"; null, uma combinação de filtros que nenhum chip representa
const selecionada = defineModel<CategoriaSlug | '' | null>({ required: true })

const ordemGrupos: CategoriaGrupo[] = ['segmento', 'estilo']
const grupos = computed(() =>
  ordemGrupos
    .map(grupo => props.categorias.filter(categoria => categoria.grupo === grupo))
    .filter(itens => itens.length),
)

function selecionar(valor: unknown) {
  // Clicar na categoria ativa não deixa o filtro vazio: volta para "Todas"
  selecionada.value = typeof valor === 'string' && valor !== 'todas' ? (valor as CategoriaSlug) : ''
}
</script>

<template>
  <!-- No celular vira uma linha rolável; no desktop quebra em várias linhas -->
  <ToggleGroup
    type="single"
    variant="pill"
    :spacing="1"
    :model-value="selecionada === null ? undefined : selecionada || 'todas'"
    aria-label="Filtrar por categoria"
    class="-mx-4 w-auto flex-nowrap overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:w-fit sm:flex-wrap sm:overflow-visible sm:px-0"
    @update:model-value="selecionar"
  >
    <ToggleGroupItem value="todas">Todas</ToggleGroupItem>

    <template v-for="itens in grupos" :key="itens[0]?.grupo">
      <span aria-hidden="true" class="mx-1.5 h-4 w-px shrink-0 bg-border" />
      <ToggleGroupItem
        v-for="categoria in itens"
        :key="categoria.slug"
        :value="categoria.slug"
        :title="categoria.nomeCompleto"
        :aria-label="categoria.nomeCompleto ?? categoria.nome"
      >
        {{ categoria.nome }}
      </ToggleGroupItem>
    </template>
  </ToggleGroup>
</template>
