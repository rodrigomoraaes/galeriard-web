import type { MaybeRefOrGetter } from 'vue'
import type { FiltroInspiracoes } from '#shared/features/inspiracao/inspiracao.types'

// A interface chama só estas funções; as rotas ficam em server/api.
// useFetch busca no servidor durante o SSR e reaproveita o resultado na hidratação.

export function useCategorias() {
  return useFetch('/api/categorias', { default: () => [] })
}

/** Contagem de cada opção de filtro no catálogo inteiro. */
export function useContagens() {
  return useFetch('/api/inspiracoes/contagens', {
    default: () => ({ categorias: {}, cores: {}, acesso: { livre: 0, exclusivo: 0 } }),
  })
}

/** O filtro é reativo: mudar qualquer lista dispara uma nova busca. */
export function useInspiracoes(filtro: MaybeRefOrGetter<FiltroInspiracoes> = {}) {
  // Listas viajam separadas por vírgula (?cor=azul,roxo); lista vazia some da query
  const query = computed(() => {
    const { segmentos, estilos, cores, acesso } = toValue(filtro)
    const juntar = (lista?: string[]) => (lista?.length ? lista.join(',') : undefined)
    return { segmento: juntar(segmentos), estilo: juntar(estilos), cor: juntar(cores), acesso: juntar(acesso) }
  })

  return useFetch('/api/inspiracoes', { query, default: () => [] })
}
