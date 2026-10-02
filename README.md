# Galeria RD

Uma galeria de referências de interface. Landing pages, componentes e telas de produtos reais, organizadas de um jeito que dá para achar de novo depois.

## Por que isso existe

Todo mundo que trabalha com produto tem uma pasta de prints no desktop, uma aba de favoritos que nunca mais foi aberta e um monte de links mandados para si mesmo no WhatsApp. Quando chega a hora de desenhar uma tela nova, a referência boa que eu vi semana passada simplesmente some.

Existem sites que fazem curadoria de design, mas quase todos organizam por tipo de página ("landing", "pricing", "dashboard") e isso ajuda pouco. Na prática eu não procuro "uma landing page". Procuro "uma landing de fintech com cara séria" ou "algo em preto e branco que use bem a tipografia". A pergunta real mistura o tipo de produto com o visual.

## Design system

A base visual segue o site da xAI: fundo limpo, tipografia grande com peso intermediário, botões em pílula e quase nenhuma cor. A ideia é que a interface da galeria desapareça e as referências fiquem em primeiro plano. Uma galeria de design com visual chamativo competiria com o próprio conteúdo.

Tudo mora em `app/assets/main.css`, usando o Tailwind v4 com configuração direto no CSS.

### Componentes

Os componentes base vêm do shadcn-vue (em `app/components/ui`) e foram ajustados para o visual do projeto:

- **Button** virou pílula por padrão. Ganhou a variante `soft` e os tamanhos `default` e `lg` passaram a seguir as medidas da xAI.
- **Badge** ganhou `pill` (o anúncio com borda sutil que aparece no topo do hero) e `highlight` (o selo laranja).
- **Toggle** ganhou a variante `pill`, usada nos filtros de categoria.

### Movimento

Só duas animações, as duas na entrada da página. As palavras do título sobem com uma leve rotação (`animate-rise-in`) e o resto aparece deslizando de baixo (`animate-fade-up`). Nos cards, o screenshot sobe um pouco no hover. Quem usa "reduzir movimento" no sistema não vê nenhuma delas.

## Arquitetura

Nuxt 4 (Vue 3 + TypeScript) com renderização no servidor, para as páginas chegarem prontas e serem indexadas. Tailwind v4 para estilo, shadcn-vue (sobre o Reka UI) para os componentes base. O banco é Postgres, acessado pelo Prisma.

O código é organizado por domínio. Cada assunto tem sua pasta, e os arquivos levam o nome do domínio no começo:

```
app/                          o que roda no navegador (e no SSR)
  pages/index.vue             Explorar, a única página do MVP
  layouts/default.vue         SiteHeader + conteúdo + SiteFooter
  features/inspiracao/
    inspiracao.service.ts     useInspiracoes(), useCategorias(): o que a interface chama
  features/filtro/
    filtro.service.ts         useFiltro(): lê e escreve o filtro na URL
  components/
    ui/                       componentes base do shadcn
    layout/                   SiteHeader, SiteFooter
    explorar/                 ExplorarHero, CategoriaFiltro
    inspiracao/               InspiracaoCard, InspiracaoGrid, InspiracaoLogo
    filtro/                   FiltroBotao, FiltroPopover
    sugestao/                 SugestaoBotao
shared/features/              tipos e constantes usados pelos dois lados (#shared)
  inspiracao/inspiracao.types.ts
  cor/cor.types.ts, cor.constants.ts
server/                       o que roda só no servidor
  api/                        rotas HTTP (GET /api/inspiracoes, /api/categorias, /api/inspiracoes/contagens)
  features/inspiracao/
    inspiracao.service.ts     converte o banco para os tipos compartilhados
    inspiracao.repository.ts  único lugar que fala com o Prisma
    inspiracao.mock.ts        dados do MVP, servidos direto enquanto não há admin
  database/prisma.ts          instância do PrismaClient
prisma/                       schema, migrations e seed
```

A regra: lógica fica em `features/<dominio>` (no `app/` ou no `server/`), tipos que atravessam a rede ficam em `shared/`, componentes visuais ficam em `components/<dominio>`. Os componentes são importados explicitamente; o auto-import de componentes do Nuxt está desligado.

### Fluxo dos dados

```
pages/index.vue → app service (useFetch) → server/api → server service → repository → Prisma → Postgres
```

A página não sabe de onde os dados vêm. O filtro fica na URL (`?segmento=saas,ia&cor=azul`), então dá para compartilhar o link e o servidor já devolve a página filtrada.

**Por enquanto os dados vêm do mock.** Ainda não existe um painel para cadastrar inspirações, então o service do servidor lê direto de `inspiracao.mock.ts` e o repository fica desligado. Schema, migrations e seed continuam no projeto, e o seed usa os mesmos mocks. Para voltar ao banco, é só descomentar as chamadas ao repository no service.

### Rodando localmente

Precisa de Node 22.18+ (ou 24.12+) e, para o banco, Docker.

```bash
cp .env.example .env
npm install
npm run dev
```

Com os dados vindo do mock, isso basta. Para subir o banco:

```bash
npm run db:up        # sobe o Postgres no Docker (porta 5433)
npm run db:migrate   # aplica as migrations
npm run db:seed      # popula com os dados do MVP
```

Outros scripts: `db:studio` (Prisma Studio), `db:reset` (zera, migra e popula de novo), `db:down` (derruba o container).

Os screenshots dos dados iniciais ficam em `public/mock/`. São capturas das páginas iniciais de cada site, feitas só para o desenvolvimento. Screenshots e logos pertencem aos seus respectivos donos.

### O MVP

Por enquanto existe uma página só, a **Explorar**: o hero no topo, o filtro e a grade de cards. O botão **Filtrar** abre um painel com quatro facetas (segmento, estilo, cor e acesso) e mostra quantas referências cada opção tem. O botão "Sugerir um site" já aparece, mas fica desativado até existir o fluxo de sugestão. Cada card mostra o screenshot, o logo, o nome e uma descrição curta, e abre o site original em nova aba. Referências marcadas como `bloqueado` mostram um cadeado, pensando numa área exclusiva no futuro.

## Licença

Todos os direitos reservados. O código está público para visualização e portfólio, mas não pode ser copiado, modificado, distribuído ou usado sem autorização por escrito. Detalhes em [LICENSE](LICENSE).

---

Criado por Rodrigo Moraes · [rodrigoprojetos.com](https://rodrigoprojetos.com)
