create table if not exists leads (
  id bigserial primary key,
  nome text not null,
  email text not null,
  telefone text,
  tipo_projeto text,
  mensagem text not null,
  origem text not null default 'site-pachbann',
  status text not null default 'novo',
  criado_em timestamptz not null default now()
);

create index if not exists leads_criado_em_idx on leads (criado_em desc);

create table if not exists site_content (
  id text primary key,
  data jsonb not null,
  atualizado_em timestamptz not null default now()
);
