# Development Workflow

This section provides the essential commands and configuration steps a developer will need to get the project running on their local machine.

## Local Development Setup

  * **Prerequisites:**
    Before starting, ensure you have the following installed:

      * **Node.js** (LTS Version, e.g., 20.x)
      * **pnpm** (as our package manager)
      * **Git**

  * **Initial Setup:**
    These are the one-time setup commands to initialize the project locally.

    ```bash
    # 1. Clone the repository
    git clone <repository_url>
    cd bank-statement-analyzer

    # 2. Install all dependencies for the monorepo
    pnpm install

    # 3. Create a local environment file from the template
    cp .env.example .env.local
    ```

    After this, you will need to fill in the required values in the `.env.local` file.

  * **Development Commands:**
    The project uses Turborepo to manage tasks.

    ```bash
    # Start the development server for the Next.js app
    pnpm dev

    # Run all tests (unit, integration) across the monorepo
    pnpm test
    ```

## Environment Configuration

  * **Required Environment Variables:**
    Your `.env.local` file must be populated with the following keys for the application to run correctly.
    ```bash
    # .env.local

    # Database
    DATABASE_URL="mongodb+srv://<user>:<password>@<cluster_url>/"

    # Google AI
    GEMINI_API_KEY="your_google_ai_api_key"

    # Authentication (NextAuth.js)
    # Generate a secret with: openssl rand -base64 32
    NEXTAUTH_SECRET="your_secret_key_for_nextauth"
    NEXTAUTH_URL="http://localhost:3000"
    ```

-----

This workflow ensures a consistent and straightforward setup process for all developers on the project.
