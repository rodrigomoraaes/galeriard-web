import type {
  Categoria,
  FiltroInspiracoes,
  Inspiracao,
  InspiracaoContagens,
} from '#shared/features/inspiracao/inspiracao.types'
// import * as repository from './inspiracao.repository'
import * as mock from './inspiracao.mock'

// Converte as linhas do banco para os tipos compartilhados com o front.
// O slug vira o `id` público: o cuid do banco não sai do servidor.

// TEMPORÁRIO: sem admin dashboard para cadastrar inspirações, os dados vêm de
// inspiracao.mock.ts. Para voltar ao banco, descomente o repository e as buscas abaixo
// (e rode `npm run db:seed` para levar os mocks ao banco).

export async function listarCategorias(): Promise<Categoria[]> {
  // const linhas = await repository.listarCategorias()
  // return linhas.map(linha => ({
  //   slug: linha.slug as CategoriaSlug,
  //   nome: linha.nome,
  //   nomeCompleto: linha.nomeCompleto ?? undefined,
  //   grupo: linha.grupo,
  // }))

  // O mock já está na ordem do banco: grupo e depois posição dentro do grupo
  return mock.categorias
}

/** Lista vazia ou ausente não restringe nada. */
function algum<T>(lista: T[] | undefined, teste: (valor: T) => boolean) {
  return !lista?.length || lista.some(teste)
}

export async function listarInspiracoes(filtro: FiltroInspiracoes = {}): Promise<Inspiracao[]> {
  // const linhas = await repository.listarInspiracoes(filtro)
  // return linhas.map(linha => ({
  //   id: linha.slug,
  //   nome: linha.nome,
  //   descricao: linha.descricao,
  //   url: linha.url,
  //   categorias: linha.categorias.map(categoria => categoria.slug as CategoriaSlug),
  //   cores: linha.cores.map(({ cor }) => cor.slug as CorSlug),
  //   imagem: linha.imagem,
  //   logo: { src: linha.logoSrc ?? undefined, iniciais: linha.logoIniciais },
  //   bloqueado: linha.bloqueado,
  // }))

  return mock.inspiracoes.filter(
    (inspiracao) =>
      algum(filtro.segmentos, (slug) => inspiracao.categorias.includes(slug)) &&
      algum(filtro.estilos, (slug) => inspiracao.categorias.includes(slug)) &&
      algum(filtro.cores, (slug) => inspiracao.cores.includes(slug)) &&
      algum(filtro.acesso, (acesso) => (acesso === 'exclusivo') === !!inspiracao.bloqueado),
  )
}

export async function contarInspiracoes(): Promise<InspiracaoContagens> {
  // const { categorias, cores, exclusivas, total } = await repository.contarInspiracoes()
  // return {
  //   categorias: Object.fromEntries(categorias.map(c => [c.slug, c._count.inspiracoes])),
  //   cores: Object.fromEntries(cores.map(c => [c.slug, c._count.inspiracoes])),
  //   acesso: { livre: total - exclusivas, exclusivo: exclusivas },
  // }

  const contagens: InspiracaoContagens = {
    categorias: {},
    cores: {},
    acesso: { livre: 0, exclusivo: 0 },
  }
  for (const inspiracao of mock.inspiracoes) {
    for (const slug of inspiracao.categorias)
      contagens.categorias[slug] = (contagens.categorias[slug] ?? 0) + 1
    for (const slug of inspiracao.cores) contagens.cores[slug] = (contagens.cores[slug] ?? 0) + 1
    contagens.acesso[inspiracao.bloqueado ? 'exclusivo' : 'livre']++
  }
  return contagens
}
