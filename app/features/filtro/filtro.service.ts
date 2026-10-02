import type { MaybeRefOrGetter } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { cores } from '#shared/features/cor/cor.constants'
import type { CorSlug } from '#shared/features/cor/cor.types'
import type {
  Categoria,
  CategoriaSlug,
  FiltroInspiracoes,
  InspiracaoAcesso,
} from '#shared/features/inspiracao/inspiracao.types'

// O filtro mora na URL (?segmento=saas,ia&cor=azul) para poder ser compartilhado.
// Cada faceta é uma lista; a chave na URL é o id da faceta.

export type FacetaId = 'segmento' | 'estilo' | 'cor' | 'acesso'
export type FiltroSelecao = Record<FacetaId, string[]>

const facetaIds: FacetaId[] = ['segmento', 'estilo', 'cor', 'acesso']

function lerLista(valor: LocationQueryValue | LocationQueryValue[] | undefined) {
  return typeof valor === 'string' ? valor.split(',').filter(Boolean) : []
}

export function useFiltro(categorias: MaybeRefOrGetter<Categoria[]>) {
  const route = useRoute()
  const router = useRouter()

  const daUrl = computed(
    () => Object.fromEntries(facetaIds.map(id => [id, lerLista(route.query[id])])) as FiltroSelecao,
  )

  // Valores desconhecidos (link antigo, URL editada à mão) não contam como filtro ativo
  // e somem da URL na próxima mudança
  const selecao = computed(() => {
    const doGrupo = (grupo: Categoria['grupo']) =>
      toValue(categorias)
        .filter(categoria => categoria.grupo === grupo)
        .map(categoria => categoria.slug as string)
    const validos: FiltroSelecao = {
      segmento: doGrupo('segmento'),
      estilo: doGrupo('estilo'),
      cor: cores.map(cor => cor.slug),
      acesso: ['livre', 'exclusivo'],
    }
    return Object.fromEntries(
      facetaIds.map(id => [id, daUrl.value[id].filter(valor => validos[id].includes(valor))]),
    ) as FiltroSelecao
  })

  // A busca usa a URL crua porque começa no SSR antes de as categorias chegarem;
  // quem descarta o que não existe é o servidor
  const filtro = computed<FiltroInspiracoes>(() => ({
    segmentos: daUrl.value.segmento as CategoriaSlug[],
    estilos: daUrl.value.estilo as CategoriaSlug[],
    cores: daUrl.value.cor as CorSlug[],
    acesso: daUrl.value.acesso as InspiracaoAcesso[],
  }))

  const totalAtivos = computed(() => facetaIds.reduce((soma, id) => soma + selecao.value[id].length, 0))

  function aplicar(mudancas: Partial<FiltroSelecao>) {
    const nova = { ...selecao.value, ...mudancas }
    const query = Object.fromEntries(
      facetaIds.filter(id => nova[id].length).map(id => [id, nova[id].join(',')]),
    )
    router.replace({ query })
  }

  function marcado(faceta: FacetaId, valor: string) {
    return selecao.value[faceta].includes(valor)
  }

  function alternar(faceta: FacetaId, valor: string) {
    const valores = selecao.value[faceta]
    aplicar({ [faceta]: marcado(faceta, valor) ? valores.filter(v => v !== valor) : [...valores, valor] })
  }

  function limpar() {
    aplicar(Object.fromEntries(facetaIds.map(id => [id, []])))
  }

  /**
   * Os chips de categoria são um atalho para "só esta categoria".
   * '' = nenhuma categoria; null = combinação que nenhum chip representa.
   */
  function categoriaUnica() {
    return computed<CategoriaSlug | '' | null>({
      get: () => {
        const slugs = [...selecao.value.segmento, ...selecao.value.estilo]
        if (slugs.length > 1) return null
        return (slugs[0] as CategoriaSlug | undefined) ?? ''
      },
      set: (slug) => {
        const grupo = toValue(categorias).find(categoria => categoria.slug === slug)?.grupo
        aplicar({
          segmento: grupo === 'segmento' ? [slug!] : [],
          estilo: grupo === 'estilo' ? [slug!] : [],
        })
      },
    })
  }

  return { selecao, filtro, totalAtivos, marcado, alternar, limpar, categoriaUnica }
}

export type Filtro = ReturnType<typeof useFiltro>
