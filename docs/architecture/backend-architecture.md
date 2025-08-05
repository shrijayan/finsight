# Backend Architecture

This section provides specific patterns and templates for building our serverless API using Next.js API Routes, ensuring our backend is as well-structured and maintainable as our frontend.

## Service Architecture (Serverless)

  * **Function Organization:**
    We will use the file-system-based routing provided by the Next.js App Router for our API. Each API endpoint will be a `route.ts` file within a specific folder structure inside `src/app/api/`. This convention provides a clear and organized way to manage our backend services.

    ```plaintext
    src/app/api/
    ├── auth/
    │   ├── register/
    │   │   └── route.ts  # Handles POST /api/auth/register
    │   └── ...           # Other auth routes (login, logout)
    ├── reports/
    │   ├── route.ts      # Handles GET & POST /api/reports
    │   └── [reportId]/
    │       └── route.ts  # Handles GET /api/reports/{id}
    └── ...
    ```

  * **Function Template (API Route):**
    All API routes will follow this structure to ensure consistent request handling, response formatting, and error management.

    ```typescript
    import { NextResponse } from 'next/server';
    import { z } from 'zod'; // For input validation

    // Define the expected input schema
    const requestSchema = z.object({
      email: z.string().email(),
    });

    export async function POST(request: Request) {
      try {
        const body = await request.json();
        const validatedData = requestSchema.parse(body);

        // --- Call a service or repository to perform business logic ---
        // const result = await UserService.createUser(validatedData);
        
        return NextResponse.json({ message: 'Success', data: {} }, { status: 201 });

      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
        }
        // Generic error handler
        console.error('API Error:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
      }
    }
    ```

## Database Architecture

  * **Schema Design:**
    The database collections and their schemas are defined in **Section 9: Database Schema** of this document.

  * **Data Access Layer (Repository Pattern):**
    To keep our API routes clean and testable, all direct database interactions will be handled by a "repository" layer.

    ```typescript
    // src/repositories/UserRepository.ts
    import User from '@/models/User'; // Mongoose User model

    class UserRepository {
      async findByEmail(email: string) {
        return User.findOne({ email }).exec();
      }

      async create(userData: { name: string; email: string; passwordHash: string }) {
        const user = new User(userData);
        return user.save();
      }
    }

    export const userRepository = new UserRepository();
    ```

## Authentication and Authorization

  * **Auth Flow (Login):**
    The login process will be managed by NextAuth.js, which handles the credentials verification and session creation securely.

    ```mermaid
    sequenceDiagram
        participant User as Browser
        participant FE as Frontend
        participant NextAuth as NextAuth.js Endpoint
        participant DB as MongoDB

        User->>FE: 1. Submits login form
        FE->>NextAuth: 2. POST /api/auth/callback/credentials
        NextAuth->>DB: 3. Find user by email & verify password hash
        DB-->>NextAuth: 4. Returns user document
        NextAuth-->>FE: 5. Creates session token (JWT) & sets secure cookie
        FE->>User: 6. Redirects to dashboard (logged in)
    ```

  * **Middleware/Guards:**
    As defined in the Frontend Architecture section, a `middleware.ts` file will protect all sensitive API routes and pages, ensuring only authenticated users can access them.

-----

This backend architecture provides a robust and scalable foundation for our serverless services.
