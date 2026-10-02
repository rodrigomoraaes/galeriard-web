-- Busca sem acento e por similaridade (ex.: "inspiracao" encontra "inspiração")
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
