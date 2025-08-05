# Core Workflows

This section uses sequence diagrams to illustrate the flow of information through our system for critical user journeys.

## Workflow 1: New User's First Analysis

This diagram shows the end-to-end process from a new user uploading a file to seeing their first analysis report.

```mermaid
sequenceDiagram
    participant User as Browser
    participant FE as Frontend (Next.js)
    participant UploadSvc as Upload Service
    participant AuthSvc as Auth Service
    participant AnalysisSvc as Analysis Service
    participant ReportSvc as Report Service
    participant Gemini as Gemini API
    participant DB as MongoDB Atlas

    User->>FE: 1. Uploads files
    FE->>UploadSvc: 2. Sends files for storage
    UploadSvc-->>FE: 3. Returns file references
    FE->>User: 4. Redirects to Register/Login page
    User->>FE: 5. Submits registration form
    FE->>AuthSvc: 6. Register user request
    AuthSvc->>DB: 7. Create User record
    DB-->>AuthSvc: 8. User created
    AuthSvc-->>FE: 9. Session created (Logged in)
    FE->>AnalysisSvc: 10. Triggers analysis with file references
    AnalysisSvc->>Gemini: 11. Sends data for analysis
    Gemini-->>AnalysisSvc: 12. Returns analysis results
    AnalysisSvc->>ReportSvc: 13. Save report data
    ReportSvc->>DB: 14. Create Report record
    DB-->>ReportSvc: 15. Report saved
    ReportSvc-->>AnalysisSvc: 16. Confirmation
    AnalysisSvc-->>FE: 17. Analysis complete
    FE->>User: 18. Displays Report Dashboard
```

## Workflow 2: Asking a Question to the AI Co-Pilot

This diagram illustrates how a user interacts with the chat feature on an existing report.

```mermaid
sequenceDiagram
    participant User as Browser
    participant FE as Frontend (Chat UI)
    participant ChatSvc as Chat Service
    participant ReportSvc as Report Service
    participant Gemini as Gemini API
    participant DB as MongoDB Atlas

    User->>FE: 1. Types and sends a question
    FE->>ChatSvc: 2. POST /api/reports/{id}/chat with question
    ChatSvc->>ReportSvc: 3. Fetch context for the report
    ReportSvc->>DB: 4. Get report data from DB
    DB-->>ReportSvc: 5. Returns report data
    ReportSvc-->>ChatSvc: 6. Returns report context
    ChatSvc->>Gemini: 7. Sends question + context to Gemini
    Gemini-->>ChatSvc: 8. Returns answer
    ChatSvc-->>FE: 9. Sends answer back to client
    FE->>User: 10. Displays AI response in chat
```

-----

These diagrams clarify the dynamic interactions within our architecture.
