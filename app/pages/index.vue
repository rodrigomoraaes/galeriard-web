<script setup lang="ts">
import { useCategorias, useContagens, useInspiracoes } from '@/features/inspiracao/inspiracao.service'
import { useFiltro } from '@/features/filtro/filtro.service'
import ExplorarHero from '@/components/explorar/ExplorarHero.vue'
import CategoriaFiltro from '@/components/explorar/CategoriaFiltro.vue'
import FiltroPopover from '@/components/filtro/FiltroPopover.vue'
import InspiracaoGrid from '@/components/inspiracao/InspiracaoGrid.vue'

const buscaCategorias = useCategorias()

// O filtro fica na URL (?segmento=saas&cor=azul) para poder ser compartilhado
const filtro = useFiltro(buscaCategorias.data)

const [{ data: categorias }, { data: contagens }, { data: inspiracoes }] = await Promise.all([
  buscaCategorias,
  useContagens(),
  useInspiracoes(filtro.filtro),
])

const categoria = filtro.categoriaUnica()
</script>

<template>
  <main>
    <ExplorarHero />

    <section id="explorar" class="mx-auto w-full max-w-page scroll-mt-6 px-4 pb-24 lg:px-6">
      <!-- No celular o botão fica na linha do título, para não cobrir os chips roláveis -->
      <div class="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-4">
        <h2 class="text-2xl font-[450] tracking-tight text-primary">
          Explorar
          <span class="ml-1 font-mono text-sm text-muted-foreground">{{ inspiracoes.length }}</span>
        </h2>

        <div class="sm:col-start-2 sm:row-start-2 sm:self-start sm:pt-1">
          <FiltroPopover
            :filtro="filtro"
            :categorias="categorias"
            :contagens="contagens"
            :resultados="inspiracoes.length"
          />
        </div>

        <div class="col-span-2 sm:col-span-1 sm:row-start-2">
          <CategoriaFiltro v-model="categoria" :categorias="categorias" />
        </div>
      </div>

      <InspiracaoGrid :inspiracoes="inspiracoes" />
    </section>
  </main>
</template>
