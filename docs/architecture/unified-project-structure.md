# Unified Project Structure

This section provides a detailed file and folder layout for our monorepo. This structure is designed to be logical, scalable, and to support our "share-by-default" philosophy, making it easy to reuse code and types between the frontend and backend.

```plaintext
bank-statement-analyzer/
├── apps/
│   └── web/                      # Our main Next.js application
│       ├── src/
│       │   ├── app/              # Next.js App Router
│       │   │   ├── (auth)/       # Route group for auth pages
│       │   │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   ├── (app)/        # Route group for authenticated app pages
│       │   │   │   ├── dashboard/
│       │   │   │   ├── history/
│       │   │   │   └── layout.tsx  # Protected layout
│       │   │   ├── api/          # Backend API Routes
│       │   │   │   ├── auth/
│       │   │   │   ├── reports/
│       │   │   │   └── ...
│       │   │   ├── layout.tsx    # Root layout
│       │   │   └── page.tsx      # Homepage
│       │   ├── components/
│       │   │   ├── ui/           # Shadcn/ui components (Button, Input, etc.)
│       │   │   ├── features/     # Business-logic components (ReportDashboard)
│       │   │   └── layouts/      # Page structure components
│       │   ├── lib/              # Utility functions (apiClient, utils)
│       │   └── stores/           # Zustand state management stores
│       └── package.json
├── packages/
│   ├── config/                   # Shared configurations
│   │   ├── eslint-preset.js
│   │   └── tsconfig/
│   │       └── base.json
│   ├── db/                       # Database models and repositories
│   │   ├── src/
│   │   │   ├── models/           # Mongoose schemas (User, AnalysisReport)
│   │   │   └── repositories/     # Repository classes (UserRepository)
│   │   └── package.json
│   └── lib/                      # Shared library code
│       ├── src/
│       │   ├── types/            # Shared TypeScript interfaces
│       │   └── index.ts
│       └── package.json
├── package.json                  # Root package.json with workspaces
└── turbo.json                    # Turborepo configuration
```

-----

This structure organizes our code cleanly and sets us up for efficient development within the monorepo.
