<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check } from '@lucide/vue'
import type { Categoria, InspiracaoContagens } from '#shared/features/inspiracao/inspiracao.types'
import { cores } from '#shared/features/cor/cor.constants'
import type { FacetaId, Filtro } from '@/features/filtro/filtro.service'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import FiltroBotao from '@/components/filtro/FiltroBotao.vue'

const props = defineProps<{
  filtro: Filtro
  categorias: Categoria[]
  contagens: InspiracaoContagens
  /** Quantas inspirações a seleção atual mostra. */
  resultados: number
}>()

interface Opcao {
  valor: string
  nome: string
  /** Nome por extenso, quando `nome` é abreviado. */
  titulo?: string
  amostra?: string
  contagem: number
}

const facetas = computed<{ id: FacetaId, nome: string, opcoes: Opcao[] }[]>(() => {
  const doGrupo = (grupo: Categoria['grupo']) =>
    props.categorias
      .filter(categoria => categoria.grupo === grupo)
      .map(categoria => ({
        valor: categoria.slug,
        nome: categoria.nome,
        titulo: categoria.nomeCompleto,
        contagem: props.contagens.categorias[categoria.slug] ?? 0,
      }))

  return [
    { id: 'segmento', nome: 'Segmento', opcoes: doGrupo('segmento') },
    { id: 'estilo', nome: 'Estilo', opcoes: doGrupo('estilo') },
    {
      id: 'cor',
      nome: 'Cor',
      opcoes: cores.map(cor => ({ ...cor, valor: cor.slug, contagem: props.contagens.cores[cor.slug] ?? 0 })),
    },
    {
      id: 'acesso',
      nome: 'Acesso',
      opcoes: [
        { valor: 'livre', nome: 'Livres', contagem: props.contagens.acesso.livre },
        { valor: 'exclusivo', nome: 'Exclusivas', contagem: props.contagens.acesso.exclusivo },
      ],
    },
  ]
})

const aberto = ref(false)
const facetaAtual = ref<FacetaId>('segmento')
const faceta = computed(() => facetas.value.find(f => f.id === facetaAtual.value)!)
</script>

<template>
  <Popover v-model:open="aberto">
    <PopoverTrigger as-child>
      <FiltroBotao :ativos="filtro.totalAtivos.value" />
    </PopoverTrigger>

    <PopoverContent
      align="end"
      :side-offset="8"
      class="w-[min(36rem,calc(100vw-2rem))] gap-0 overflow-hidden rounded-2xl p-0 shadow-xl shadow-primary/5"
    >
      <div class="flex flex-col sm:h-80 sm:flex-row">
        <!-- Trilho de facetas: vira abas roláveis no celular -->
        <div
          role="tablist"
          aria-label="Filtros"
          class="flex shrink-0 gap-0.5 overflow-x-auto border-b p-1.5 [scrollbar-width:none] sm:w-44 sm:flex-col sm:border-r sm:border-b-0"
        >
          <button
            v-for="f in facetas"
            :key="f.id"
            role="tab"
            type="button"
            :aria-selected="f.id === facetaAtual"
            class="flex shrink-0 items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] text-primary/60 transition-colors outline-none hover:bg-soft hover:text-primary focus-visible:ring-2 focus-visible:ring-ring aria-selected:bg-soft-hover aria-selected:text-primary"
            @click="facetaAtual = f.id"
          >
            {{ f.nome }}
            <span v-if="filtro.selecao.value[f.id].length" class="font-mono text-[11px] text-highlight tabular-nums">
              {{ filtro.selecao.value[f.id].length }}
            </span>
          </button>
        </div>

        <div
          role="tabpanel"
          :aria-label="faceta.nome"
          class="max-h-72 min-w-0 flex-1 overflow-y-auto p-1.5 sm:max-h-none"
          :class="{ 'grid auto-rows-min grid-cols-2 gap-0.5': faceta.id === 'cor' }"
        >
          <button
            v-for="opcao in faceta.opcoes"
            :key="opcao.valor"
            type="button"
            :title="opcao.titulo"
            :aria-pressed="filtro.marcado(faceta.id, opcao.valor)"
            class="group/opcao flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-primary/70 transition-colors outline-none hover:bg-soft hover:text-primary focus-visible:ring-2 focus-visible:ring-ring aria-pressed:text-primary"
            @click="filtro.alternar(faceta.id, opcao.valor)"
          >
            <!-- Cor: a amostra faz o papel da caixa de seleção -->
            <span
              v-if="opcao.amostra"
              class="flex size-5 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/15 ring-inset"
              :style="{ backgroundColor: opcao.amostra }"
            >
              <Check
                class="size-3 opacity-0 transition-opacity group-aria-pressed/opcao:opacity-100"
                :class="['branco', 'amarelo'].includes(opcao.valor) ? 'text-jet' : 'text-white'"
                :stroke-width="3"
              />
            </span>
            <span
              v-else
              class="flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-primary/20 transition-colors group-aria-pressed/opcao:border-primary group-aria-pressed/opcao:bg-primary"
            >
              <Check class="size-3 text-primary-foreground opacity-0 group-aria-pressed/opcao:opacity-100" :stroke-width="3" />
            </span>
            {{ opcao.nome }}
            <span class="ml-auto font-mono text-[11px] text-muted-foreground tabular-nums">{{ opcao.contagem }}</span>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 border-t bg-card px-3 py-2.5">
        <Button variant="ghost" size="sm" :disabled="!filtro.totalAtivos.value" @click="filtro.limpar()">
          Limpar tudo
        </Button>
        <Button size="sm" @click="aberto = false">
          Mostrar {{ resultados }} {{ resultados === 1 ? 'inspiração' : 'inspirações' }}
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
