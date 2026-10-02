import type { Cor } from './cor.types'

// Ordem pensada para um filtro: neutros primeiro, depois o círculo cromático
export const cores: Cor[] = [
  { slug: 'preto', nome: 'Preto', amostra: '#0a0a0a' },
  { slug: 'branco', nome: 'Branco', amostra: '#ffffff' },
  { slug: 'cinza', nome: 'Cinza', amostra: '#9ca3af' },
  { slug: 'azul', nome: 'Azul', amostra: '#3b82f6' },
  { slug: 'roxo', nome: 'Roxo', amostra: '#8b5cf6' },
  { slug: 'rosa', nome: 'Rosa', amostra: '#ec4899' },
  { slug: 'vermelho', nome: 'Vermelho', amostra: '#ef4444' },
  { slug: 'laranja', nome: 'Laranja', amostra: '#f97316' },
  { slug: 'amarelo', nome: 'Amarelo', amostra: '#eab308' },
  { slug: 'verde', nome: 'Verde', amostra: '#22c55e' },
]
