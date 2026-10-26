# Application Folder Structure

This project is a monorepo managed with **Bun workspaces**. It separates the backend API, frontend application, and infrastructure configuration while keeping the database schema and related functionality organized within the API application.

## Root Folder Structure

```text
daily-mud-fluid-report/
├── .github/
│   └── dependabot.yml
├── apps/
│   ├── api/                       # Elysia backend API
│   └── web/                       # Next.js frontend
├── docs/                          # Project documentation
│   └── 1.folder-structure.md
├── infra/
│   ├── docker/                    # Docker Compose configurations
│   │   └── compose.dev.yml
│   └── nginx/                     # Nginx configuration
├── .dockerignore
├── .env.example
├── .gitignore
├── .npmrc
├── biome.json                     # Shared linting and formatting
├── bun.lock                       # Bun lockfile
└── package.json                   # Workspace configuration and root scripts
```

The root `package.json` defines the Bun workspaces and shared development scripts. Application-specific dependencies and scripts remain in their respective workspace packages.

## Backend Folder Structure

The backend is located in `apps/api` and uses Elysia for HTTP routing, Drizzle ORM for database operations, and PostgreSQL as the database.

```text
apps/api/
├── drizzle/                       # Generated database migrations
│   ├── meta/
│   └── seed/
├── src/
│   ├── config/
│   │   ├── db.config.ts            # Database configuration
│   │   └── openapi.config.ts       # OpenAPI configuration
│   ├── helper/                     # Utilities
│   ├── module/                     # Feature-based API modules
│   │   └── product/
│   │       ├── index.ts            # Product routes
│   │       ├── model.ts            # Request validation and types
│   │       └── service.ts          # Product business logic
│   ├── repository/                 # Database queries
│   ├── schema/                     # Drizzle database schema
│   │   ├── _shared/
│   │   │   └── columns.ts          # Shared column definitions
│   │   ├── enums.schema.ts         # PostgreSQL enums
│   │   ├── product.schema.ts       # Product table
│   │   └── relations.schema.ts     # Table relationships
│   └── validation/                 # Reusable validation schemas
├── Dockerfile                      # API container image
├── drizzle.config.ts               # Drizzle Kit configuration
├── package.json
└── tsconfig.json
```

### Backend Responsibilities

| Directory or file | Responsibility |
|---|---|
| `src/index.ts` | Application bootstrap, middleware, and module registration |
| `src/config/` | Database and OpenAPI configuration |
| `src/helper/` | Shared helper functions |
| `src/module/` | Feature modules, HTTP routes, and business logic |
| `src/repository/` | Database queries and persistence operations |
| `src/schema/` | Drizzle table definitions, enums, relations, and shared columns |
| `src/validation/` | Reusable request validation schemas |
| `drizzle/` | Generated SQL migrations, migration metadata, and seed data |
| `drizzle.config.ts` | Drizzle Kit schema, migration, and database configuration |

### Feature Module Architecture

Each feature module groups its HTTP routes, service logic, and module-specific request models.

For example, the product module contains:

- **`index.ts`** — defines the Elysia routes and connects them to the service layer.
- **`service.ts`** — implements product-related business rules and coordinates repository operations.
- **`model.ts`** — defines request models, validation, and inferred TypeScript types.

Database queries are kept in the repository layer rather than being duplicated across route handlers.

The typical request flow is:

```text
HTTP Request
     │
     ▼
Elysia Route (module/index.ts)
     │
     ▼
Service (module/service.ts)
     │
     ▼
Repository (repository/*.repository.ts)
     │
     ▼
Drizzle ORM
     │
     ▼
PostgreSQL
```

The validation directory contains reusable schemas shared by modules where appropriate. Module models can compose these schemas into request-specific models.

## Frontend Folder Structure

The frontend is located in `apps/web` and uses Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui.

```text
apps/web/
├── app/
│   ├── favicon.ico                # Application favicon
│   ├── globals.css                # Global styles and theme variables
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   └── ui/                        # shadcn/ui components
│       └── button.tsx
├── lib/
│   └── utils.ts                   # Shared frontend utilities
├── public/                        # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── components.json                # shadcn/ui configuration
├── next.config.ts                 # Next.js configuration
├── package.json
└── tsconfig.json
```

### Frontend Responsibilities

| Directory or file | Responsibility |
|---|---|
| `app/` | Pages, layouts, routes, and global styles |
| `components/ui/` | Reusable UI primitives generated or managed through shadcn/ui |
| `lib/utils.ts` | Shared utilities, including class-name composition |
| `public/` | Static files served directly by Next.js |
| `components.json` | shadcn/ui component generator configuration |
| `next.config.ts` | Next.js build and runtime configuration |
| `tsconfig.json` | TypeScript compiler configuration |

As the application grows, feature-specific UI components can be organized into dedicated directories, such as `components/products/` or `components/inventory/`, without mixing domain logic into generic UI primitives.

## Infrastructure Folder Structure

The `infra/` directory contains deployment and local development infrastructure.

```text
infra/
├── docker/
│   └── compose.dev.yml             # Local development services
└── nginx/                          # Reverse proxy configuration
```

### Infrastructure Responsibilities

| Directory or file | Responsibility |
|---|---|
| `infra/docker/compose.dev.yml` | Defines and coordinates development containers and their services |
| `infra/nginx/` | Stores Nginx configuration for reverse proxying and HTTP traffic routing |
| `apps/api/Dockerfile` | Defines how the backend API container image is built |

Infrastructure configuration should remain separate from application source code to make development, deployment, and maintenance easier.

## Database Migrations and Seed Data

Drizzle-related files are stored in `apps/api/drizzle/`.

- **SQL migrations** contain generated database schema changes.
- **`meta/`** contains Drizzle Kit migration metadata and schema snapshots.
- **`seed/`** contains seed data files, such as the inventory CSV.

The Drizzle schema source files are maintained in `apps/api/src/schema/`, while generated migrations are stored in `apps/api/drizzle/`.

Schema changes should be reflected in version-controlled migrations so that database changes can be reproduced across development and deployment environments.

## Development Guidelines

1. **Use Bun workspaces.** Keep workspace dependencies and scripts in the appropriate root or application `package.json`.
2. **Keep modules feature-oriented.** Product and inventory routes should remain in their respective modules.
3. **Separate persistence from business logic.** Put database queries in repositories and business rules in services.
4. **Reuse schemas and validation.** Shared database definitions belong in the schema layer; reusable input validation belongs in the validation layer.
5. **Keep secrets out of source control.** Use environment variables and provide safe defaults in `.env.example`, never real credentials.
6. **Keep migrations under version control.** Do not replace committed migration history casually with direct schema pushes in shared or production environments.
7. **Maintain consistent code quality.** Use the root Biome configuration for linting and formatting.
8. **Keep infrastructure separate.** Store Docker Compose and Nginx configuration under `infra/`.

## Summary

The repository follows a workspace-based monorepo structure with a clear separation of concerns:

- `apps/api/` — backend routes, business logic, persistence, validation, and database migrations.
- `apps/web/` — frontend pages, components, styling, and static assets.
- `infra/` — container orchestration and reverse proxy configuration.
- `docs/` — architecture, setup instructions, and project documentation.
- Root configuration files — shared tooling, dependency management, and workspace scripts.
