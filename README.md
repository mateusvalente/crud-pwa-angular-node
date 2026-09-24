# CRUD PWA - Angular + Node.js + PostgreSQL + Docker

Exemplo didático de um CRUD SPA Angular evoluído para PWA.

## Tecnologias

- Angular 22
- Angular Service Worker
- Web App Manifest
- Node.js 24
- Express
- PostgreSQL
- Docker Compose

## Arquitetura

```text
                 navegador
                     |
              Angular SPA / PWA
                     |
          +----------+----------+
          |                     |
   Service Worker            HTTP / JSON
   cache do app                 |
   cache de GET /api            v
                         Node.js + Express
                                |
                                v
                           PostgreSQL
```

## O que torna este projeto um PWA

Além do comportamento SPA, o frontend possui:

- `manifest.webmanifest`
- ícones para instalação
- `@angular/service-worker`
- `ngsw-config.json`
- cache dos arquivos da aplicação
- cache da API de produtos para leitura offline
- indicador visual Online / Offline

## Importante sobre o offline

Este exemplo implementa offline de forma simples e didática.

Depois que a lista de produtos for carregada online ao menos uma vez,
o Service Worker pode devolver a última resposta GET armazenada quando
a rede estiver indisponível.

Operações de escrita:

```text
POST
PUT
DELETE
```

não são armazenadas em fila para sincronização posterior.

Implementar criação/edição/exclusão totalmente offline exigiria outra
camada, por exemplo IndexedDB + estratégia de sincronização.

## Estrutura

```text
crud-pwa-angular-node/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── products.js
│   │   ├── db.js
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
│
├── db/
│   └── init.sql
│
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   └── manifest.webmanifest
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── app.component.*
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── Dockerfile
│   ├── angular.json
│   ├── ngsw-config.json
│   ├── package.json
│   └── proxy.conf.json
│
├── docker-compose.yml
└── README.md
```

## Docker sem COPY

Assim como no exemplo SPA anterior, os Dockerfiles não utilizam `COPY`.

Código do frontend:

```yaml
- ./frontend:/app
```

Código do backend:

```yaml
- ./backend:/app
```

Dependências:

```yaml
- frontend_node_modules:/app/node_modules
- backend_node_modules:/app/node_modules
```

Banco:

```yaml
- postgres_data:/var/lib/postgresql/data
```

## Executar

Na raiz:

```bash
docker compose up --build
```

Abra:

```text
http://localhost:4200
```

API:

```text
http://localhost:3000/api/products
```

## Testar como PWA

1. Acesse `http://localhost:4200`.
2. Abra a lista de produtos.
3. No DevTools, abra `Application`.
4. Confira `Manifest`.
5. Confira `Service Workers`.
6. Recarregue a página uma vez para garantir que a versão esteja controlada.
7. Em `Network`, ative `Offline`.
8. Recarregue a aplicação.

A interface deve continuar abrindo pelo cache.

A listagem de produtos já visitada também poderá ser lida do cache da API.

## Testar instalação

Em navegadores compatíveis, use a opção de instalar o aplicativo
disponível na barra de endereço ou no menu do navegador.

Depois de instalado, o PWA é aberto em modo `standalone`.

## SPA x PWA neste exemplo

```text
SPA
Angular Router
HttpClient
API REST
sem reload completo entre rotas

PWA
tudo da SPA
+
Manifest
Service Worker
cache
offline básico
instalação
```

## Rotas Angular

```text
/produtos
/produtos/novo
/produtos/:id/editar
```

## Rotas da API

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Recriar o banco

```bash
docker compose down -v
docker compose up --build
```
