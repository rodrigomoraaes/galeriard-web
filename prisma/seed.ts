import { prisma } from '../server/database/prisma'
import { cores } from '../shared/features/cor/cor.constants'
import { categorias, inspiracoes } from './seed.dados'

// Popula o banco com os dados iniciais do MVP. Idempotente: pode rodar várias vezes.

async function main() {
  for (const [ordem, cor] of cores.entries()) {
    const dados = { nome: cor.nome, amostra: cor.amostra, ordem }
    await prisma.cor.upsert({
      where: { slug: cor.slug },
      update: dados,
      create: { slug: cor.slug, ...dados },
    })
  }

  for (const [ordem, categoria] of categorias.entries()) {
    const dados = {
      nome: categoria.nome,
      nomeCompleto: categoria.nomeCompleto ?? null,
      grupo: categoria.grupo,
      ordem,
    }
    await prisma.categoria.upsert({
      where: { slug: categoria.slug },
      update: dados,
      create: { slug: categoria.slug, ...dados },
    })
  }

  const corIdPorSlug = new Map(
    (await prisma.cor.findMany({ select: { id: true, slug: true } })).map(c => [c.slug, c.id]),
  )

  for (const item of inspiracoes) {
    const dados = {
      nome: item.nome,
      descricao: item.descricao,
      url: item.url,
      imagem: item.imagem,
      logoSrc: item.logo.src ?? null,
      logoIniciais: item.logo.iniciais,
      bloqueado: item.bloqueado ?? false,
    }
    const categoriasDoItem = item.categorias.map(slug => ({ slug }))

    const inspiracao = await prisma.inspiracao.upsert({
      where: { slug: item.id },
      update: { ...dados, categorias: { set: categoriasDoItem } },
      create: { slug: item.id, ...dados, categorias: { connect: categoriasDoItem } },
    })

    await prisma.inspiracaoCor.deleteMany({ where: { inspiracaoId: inspiracao.id } })
    await prisma.inspiracaoCor.createMany({
      data: item.cores.map((slug, ordem) => ({
        inspiracaoId: inspiracao.id,
        corId: corIdPorSlug.get(slug)!,
        ordem,
      })),
    })
  }

  console.log(
    `Seed: ${cores.length} cores, ${categorias.length} categorias, ${inspiracoes.length} inspirações`,
  )
}

main()
  .catch((erro) => {
    console.error(erro)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
