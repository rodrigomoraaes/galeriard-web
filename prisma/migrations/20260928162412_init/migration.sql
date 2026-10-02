-- CreateEnum
CREATE TYPE "CategoriaGrupo" AS ENUM ('segmento', 'estilo');

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nome_completo" TEXT,
    "grupo" "CategoriaGrupo" NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cores" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "amostra" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspiracoes" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "logo_src" TEXT,
    "logo_iniciais" TEXT NOT NULL,
    "bloqueado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspiracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspiracoes_cores" (
    "inspiracao_id" TEXT NOT NULL,
    "cor_id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "inspiracoes_cores_pkey" PRIMARY KEY ("inspiracao_id","cor_id")
);

-- CreateTable
CREATE TABLE "_CategoriaToInspiracao" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriaToInspiracao_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cores_slug_key" ON "cores"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "inspiracoes_slug_key" ON "inspiracoes"("slug");

-- CreateIndex
CREATE INDEX "inspiracoes_cores_cor_id_idx" ON "inspiracoes_cores"("cor_id");

-- CreateIndex
CREATE INDEX "_CategoriaToInspiracao_B_index" ON "_CategoriaToInspiracao"("B");

-- AddForeignKey
ALTER TABLE "inspiracoes_cores" ADD CONSTRAINT "inspiracoes_cores_inspiracao_id_fkey" FOREIGN KEY ("inspiracao_id") REFERENCES "inspiracoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspiracoes_cores" ADD CONSTRAINT "inspiracoes_cores_cor_id_fkey" FOREIGN KEY ("cor_id") REFERENCES "cores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToInspiracao" ADD CONSTRAINT "_CategoriaToInspiracao_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToInspiracao" ADD CONSTRAINT "_CategoriaToInspiracao_B_fkey" FOREIGN KEY ("B") REFERENCES "inspiracoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
