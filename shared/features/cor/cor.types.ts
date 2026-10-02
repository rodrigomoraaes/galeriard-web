export type CorSlug =
  | 'preto'
  | 'branco'
  | 'cinza'
  | 'azul'
  | 'roxo'
  | 'rosa'
  | 'vermelho'
  | 'laranja'
  | 'amarelo'
  | 'verde'

export interface Cor {
  slug: CorSlug
  nome: string
  /** Amostra usada na interface (ex.: bolinha no filtro). Não é a cor exata de nenhum site. */
  amostra: string
}
