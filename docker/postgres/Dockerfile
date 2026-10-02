FROM postgres:17-alpine

# Ordenação em português via ICU (a imagem alpine não traz locales do sistema)
ENV POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale-provider=icu --icu-locale=pt-BR" \
    TZ=America/Sao_Paulo

# Scripts desta pasta rodam só na primeira inicialização do volume
COPY init/ /docker-entrypoint-initdb.d/
