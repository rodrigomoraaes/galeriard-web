import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

function criarPrisma() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

// Reaproveita a instância entre reloads do dev server para não esgotar conexões
const globalParaPrisma = globalThis as unknown as { prisma?: ReturnType<typeof criarPrisma> }

export const prisma = globalParaPrisma.prisma ?? criarPrisma()

if (process.env.NODE_ENV !== 'production') globalParaPrisma.prisma = prisma
