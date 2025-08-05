# Frontend Architecture

This section provides specific, actionable guidance for developers on how to build the client-side of our Next.js application, ensuring consistency, maintainability, and scalability.

## Component Architecture

  * **Component Organization:**
    We will follow a structured approach to organizing our React components to maintain clarity as the application grows. The structure within our `src` directory will be:

    ```plaintext
    src/
    ├── components/
    │   ├── ui/         # Reusable, unstyled UI primitives from Shadcn/ui (e.g., Button, Input)
    │   ├── features/   # Components with business logic (e.g., ReportDashboard, ChatWindow)
    │   └── layouts/    # Components that define page structure (e.g., MainLayout, AuthLayout)
    └── app/            # Next.js App Router for pages and layouts
    ```

  * **Component Template:**
    All new components should follow this basic structure, using TypeScript for props and Tailwind CSS for styling.

    ```typescript
    import * as React from 'react';
    import { cn } from '@/lib/utils'; // A utility for conditional classnames

    interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
      // Define component-specific props here
      title: string;
    }

    const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
      ({ className, title, ...props }, ref) => {
        return (
          <div ref={ref} className={cn('p-4 border rounded-lg', className)} {...props}>
            <h3 className="text-lg font-bold">{title}</h3>
            {/* Component JSX goes here */}
          </div>
        );
      }
    );
    MyComponent.displayName = 'MyComponent';

    export { MyComponent };
    ```

## State Management Architecture

  * **State Structure:**
    We will use **Zustand** for global state management. State will be organized into "stores" or "slices" based on domain. Local component state will be managed with React's built-in `useState` and `useReducer` hooks.

    ```plaintext
    src/
    └── stores/
        ├── useAuthStore.ts     # Manages user session, authentication status
        └── useReportStore.ts   # Manages the currently active report and its state
    ```

  * **State Management Patterns:**

      * **Global State (Zustand):** Used for data that is shared across many components, such as user authentication status and profile information.
      * **Local State (React Hooks):** Used for state that is specific to a single component, such as form inputs or UI toggles.

## Routing Architecture

  * **Route Organization:**
    We will use the **Next.js App Router**. Routes are defined by the folder structure within the `src/app` directory. For example:

      * `src/app/page.tsx` -\> `/`
      * `src/app/dashboard/page.tsx` -\> `/dashboard`
      * `src/app/history/page.tsx` -\> `/history`
      * `src/app/login/page.tsx` -\> `/login`

  * **Protected Route Pattern:**
    We will use Next.js Middleware to protect routes that require authentication. A `middleware.ts` file will check for a valid session token from NextAuth.js and redirect unauthenticated users to the login page.

    ```typescript
    // src/middleware.ts
    export { default } from "next-auth/middleware";

    export const config = {
      matcher: [
        '/dashboard/:path*',
        '/history/:path*',
      ],
    };
    ```

## Frontend Services Layer

  * **API Client Setup:**
    We will create a centralized API client to handle all communication with our backend API routes. This ensures consistency in error handling and authentication headers.
    ```typescript
    // src/lib/apiClient.ts
    import { auth } from 'next-auth'; // Or a similar session utility

    const apiClient = {
      async request(endpoint: string, options: RequestInit = {}) {
        const session = await auth();
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (session?.accessToken) {
          headers['Authorization'] = `Bearer ${session.accessToken}`;
        }
        
        const response = await fetch(`/api${endpoint}`, { ...options, headers });

        if (!response.ok) {
          // Handle HTTP errors globally
          throw new Error(`API call failed: ${response.statusText}`);
        }
        return response.json();
      },
      // Methods like get, post, put, delete would be defined here
    };

    export default apiClient;
    ```

-----

This frontend architecture provides a clear and modern structure for building our user interface.
