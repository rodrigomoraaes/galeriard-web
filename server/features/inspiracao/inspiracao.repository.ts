import type { FiltroInspiracoes } from '#shared/features/inspiracao/inspiracao.types'
import { prisma } from '../../database/prisma'

// Único ponto de acesso ao banco para inspirações; services não importam o prisma direto.

export function listarCategorias() {
  return prisma.categoria.findMany({ orderBy: [{ grupo: 'asc' }, { ordem: 'asc' }] })
}

export function listarInspiracoes(filtro: FiltroInspiracoes = {}) {
  // Segmento e estilo ficam na mesma relação, então cada um entra como uma condição do AND
  const categorias = [filtro.segmentos, filtro.estilos]
    .filter(slugs => slugs?.length)
    .map(slugs => ({ categorias: { some: { slug: { in: slugs } } } }))
  const acesso = filtro.acesso?.length === 1 ? filtro.acesso[0] === 'exclusivo' : undefined

  return prisma.inspiracao.findMany({
    where: {
      AND: categorias,
      cores: filtro.cores?.length ? { some: { cor: { slug: { in: filtro.cores } } } } : undefined,
      bloqueado: acesso,
    },
    include: {
      categorias: { select: { slug: true } },
      cores: { orderBy: { ordem: 'asc' }, select: { cor: { select: { slug: true } } } },
    },
    orderBy: { criadoEm: 'desc' },
  })
}

export async function contarInspiracoes() {
  const [categorias, cores, exclusivas, total] = await Promise.all([
    prisma.categoria.findMany({ select: { slug: true, _count: { select: { inspiracoes: true } } } }),
    prisma.cor.findMany({ select: { slug: true, _count: { select: { inspiracoes: true } } } }),
    prisma.inspiracao.count({ where: { bloqueado: true } }),
    prisma.inspiracao.count(),
  ])
  return { categorias, cores, exclusivas, total }
}
