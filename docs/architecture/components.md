# Components

This section describes the high-level building blocks of our system, covering both the frontend and backend. Each component has a distinct responsibility, which helps in organizing the development work.

## Frontend Components

  * **Auth UI Component**

      * **Responsibility:** Provides the user interface for registration and login.
      * **Key Interfaces:** Renders on the `/login` route; captures user credentials.
      * **Dependencies:** `Auth Service` on the backend.
      * **Technology Stack:** Next.js, React, Shadcn/ui, Tailwind CSS.

  * **File Upload Component**

      * **Responsibility:** Handles the user-facing file upload experience, including drag-and-drop, file selection, and paste.
      * **Key Interfaces:** Renders on the homepage; sends files to the `Upload Service`.
      * **Dependencies:** `Upload Service` on the backend.
      * **Technology Stack:** React, a library like `react-dropzone`.

  * **Report Dashboard Component**

      * **Responsibility:** Renders the complete financial analysis report, including charts and data visualizations.
      * **Key Interfaces:** The main view for a generated report; displays data fetched from the `Report Service`.
      * **Dependencies:** `Report Service`, `Chat Component`.
      * **Technology Stack:** React, a charting library (e.g., Recharts), Shadcn/ui.

  * **Chat Component**

      * **Responsibility:** Manages the interactive conversation with the AI co-pilot.
      * **Key Interfaces:** Renders on the Report Dashboard; sends user messages to the `Chat Service`.
      * **Dependencies:** `Chat Service`.
      * **Technology Stack:** React, Zustand (for state management).

## Backend Components (Services)

  * **Auth Service**

      * **Responsibility:** Manages all user authentication logic, including registration, login, session management, and password hashing.
      * **Key Interfaces:** Exposes the `/api/auth/*` endpoints.
      * **Dependencies:** `MongoDB Atlas` (for user data).
      * **Technology Stack:** Next.js API Route, Mongoose, NextAuth.js.

  * **Analysis Service**

      * **Responsibility:** Orchestrates the core analysis process. It takes uploaded file references, calls the Gemini API, receives the results, and instructs the `Report Service` to save the new report.
      * **Key Interfaces:** Internal service logic, triggered after a successful file upload.
      * **Dependencies:** `Gemini AI API`, `Report Service`, `Vercel Blob` (for file access).
      * **Technology Stack:** Next.js API Route, Gemini SDK.

  * **Report Service**

      * **Responsibility:** Handles all data operations (Create, Read, Delete) for analysis reports in the database.
      * **Key Interfaces:** Exposes the `/api/reports/*` endpoints.
      * **Dependencies:** `MongoDB Atlas`.
      * **Technology Stack:** Next.js API Route, Mongoose.

  * **Chat Service**

      * **Responsibility:** Manages the context for a specific report's conversation and proxies messages to the Gemini API.
      * **Key Interfaces:** Exposes the `/api/reports/{id}/chat` endpoint.
      * **Dependencies:** `Gemini AI API`, `Report Service` (to fetch report context).
      * **Technology Stack:** Next.js API Route, Gemini SDK.

## Component Interaction Diagram

```mermaid
graph TD
    subgraph Frontend (Browser)
        A[Auth UI] --> B[Backend];
        C[File Upload UI] --> B;
        D[Report Dashboard UI] --> B;
        E[Chat UI] --> B;
    end

    subgraph Backend (Vercel)
        B -- /api/auth --> F[Auth Service];
        B -- /api/uploads --> G[Upload Service (Vercel Blob)];
        B -- /api/reports --> H[Report Service];
        B -- Triggers --> I[Analysis Service];
        B -- /api/chat --> J[Chat Service];
    end
    
    subgraph Database
        K[(MongoDB Atlas)];
    end

    subgraph External AI
        L[(Gemini API)];
    end

    F --> K;
    H --> K;
    I --> L;
    I --> H;
    J --> L;
    J --> H;
