import type { CorSlug } from '../cor/cor.types'

export type CategoriaSlug =
  // Segmento: o que o produto faz
  | 'saas'
  | 'fintech'
  | 'ia'
  | 'dev-tools'
  // Estilo: como a interface se parece
  | 'pb'
  | 'modo-escuro'
  | 'minimalista'
  | 'moderno'
  | 'gradiente'
  | 'editorial'
  | 'animado'

export type CategoriaGrupo = 'segmento' | 'estilo'

export interface Categoria {
  slug: CategoriaSlug
  nome: string
  /** Nome por extenso quando `nome` é abreviado (ex.: P&B). */
  nomeCompleto?: string
  grupo: CategoriaGrupo
}

export interface InspiracaoLogo {
  /** URL da imagem; sem ela o card mostra as iniciais sobre um fundo neutro. */
  src?: string
  iniciais: string
}

export interface Inspiracao {
  id: string
  nome: string
  descricao: string
  url: string
  /** Um site pode ter várias categorias: um segmento e vários estilos. */
  categorias: CategoriaSlug[]
  /** Cores dominantes do site, da mais presente para a menos. */
  cores: CorSlug[]
  imagem: string
  logo: InspiracaoLogo
  /** Conteúdo exclusivo: o card mostra o cadeado. */
  bloqueado?: boolean
}

export type InspiracaoAcesso = 'livre' | 'exclusivo'

/** Dentro de cada lista vale "ou"; entre listas vale "e". Lista vazia não filtra. */
export interface FiltroInspiracoes {
  segmentos?: CategoriaSlug[]
  estilos?: CategoriaSlug[]
  cores?: CorSlug[]
  acesso?: InspiracaoAcesso[]
}

/** Quantas inspirações do catálogo inteiro têm cada opção de filtro. */
export interface InspiracaoContagens {
  categorias: Partial<Record<CategoriaSlug, number>>
  cores: Partial<Record<CorSlug, number>>
  acesso: Record<InspiracaoAcesso, number>
}
