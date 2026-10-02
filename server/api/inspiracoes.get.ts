import { z } from 'zod'
import { cores } from '#shared/features/cor/cor.constants'
import type { CategoriaGrupo } from '#shared/features/inspiracao/inspiracao.types'
import { listarCategorias, listarInspiracoes } from '../features/inspiracao/inspiracao.service'

// Cada filtro chega como lista separada por vírgula: ?cor=azul,roxo.
// Valores desconhecidos são ignorados em vez de rejeitados: um link antigo ou editado
// à mão mostra o resto do filtro em vez de uma lista vazia.
function lista<T extends string>(validos: readonly T[]) {
  return z
    .string()
    .optional()
    .transform(valor => (valor ? valor.split(',') : []).filter((v): v is T => validos.includes(v as T)))
}

export default defineEventHandler(async (event) => {
  // Slugs de categoria vêm do banco, e cada um só vale no próprio grupo
  const categorias = await listarCategorias()
  const doGrupo = (grupo: CategoriaGrupo) =>
    categorias.filter(categoria => categoria.grupo === grupo).map(categoria => categoria.slug)

  const querySchema = z.object({
    segmento: lista(doGrupo('segmento')),
    estilo: lista(doGrupo('estilo')),
    cor: lista(cores.map(cor => cor.slug)),
    acesso: lista(['livre', 'exclusivo'] as const),
  })

  const query = await getValidatedQuery(event, querySchema.parse)
  return listarInspiracoes({
    segmentos: query.segmento,
    estilos: query.estilo,
    cores: query.cor,
    acesso: query.acesso,
  })
})
