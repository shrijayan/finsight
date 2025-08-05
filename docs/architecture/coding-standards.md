# Coding Standards

This section provides a minimal but critical set of rules for all developers (both human and AI) to follow. [cite_start]The goal is not to be exhaustive but to enforce key project-specific conventions that ensure consistency and prevent common errors. [cite: 798, 994]

## Critical Fullstack Rules

* **Type Sharing:** All TypeScript types and interfaces shared between the frontend and backend **must** be defined in the `packages/lib/src/types` directory and imported from there. [cite_start]This prevents type duplication and ensures consistency. [cite: 996]
* **Database Access:** All database operations **must** go through the Repository Pattern defined in the `packages/db` directory. [cite_start]API routes must not contain direct Mongoose or database driver calls. [cite: 803]
* **Environment Variables:** Environment variables **must** be accessed through a centralized configuration object, never directly via `process.env` in the application code. [cite_start]This provides a single source of truth for configuration. [cite: 996]
* [cite_start]**API Error Handling:** All API routes **must** use a standardized error handler to ensure consistent, predictable error responses to the client. [cite: 996]
* **State Management:** Global, cross-component state (e.g., user authentication) **must** be managed via our Zustand stores. [cite_start]State local to a single component should use React's built-in hooks (`useState`). [cite: 996]

## Naming Conventions

| Element | Frontend | Backend | Example |
| :--- | :--- | :--- | :--- |
| **Components** | PascalCase | - | `UserProfile.tsx` |
| **Hooks** | camelCase with 'use' | - | `useAuth.ts` |
| **API Routes** | - | kebab-case | `/api/user-profile` |
| **Database Collections** | - | camelCase | `analysisReports` |

***

Adhering to these standards is mandatory for all code contributions.
