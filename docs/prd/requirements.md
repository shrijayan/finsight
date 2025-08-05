# Requirements

## Functional

1.  **FR1:** The system must allow users to upload one or more files simultaneously, supporting PDF, Word (.docx), Image (JPEG, PNG), and Markdown formats.
2.  **FR2:** The file upload interface must support drag-and-drop, standard file selection, and pasting from the clipboard (Ctrl+V/Cmd+V).
3.  **FR3:** After files are selected and the user initiates the analysis, the system must prompt the user to log in or create an account. The analysis will only proceed after successful authentication.
4.  **FR4:** Upon successful login, the system shall use the Gemini model to process the uploaded documents and generate a core financial analysis report.
5.  **FR5:** The core report must include: total income, total expenses, a categorical breakdown of spending (e.g., Food, Transport, Utilities), and savings projections for 1, 5, and 10-year periods.
6.  **FR6:** The generated report must be displayed in a clean, readable format within the web interface and must be downloadable as a PDF document.
7.  **FR7:** The system must provide a chat interface where users can ask specific, ad-hoc questions about their financial data.
    * **FR7.1:** A persistent chat component (input field and conversation log) shall be displayed on the main report view.
    * **FR7.2:** The chat AI's knowledge and context must be strictly limited to the financial data from the documents used to generate the currently viewed report.
    * **FR7.3:** The chat AI must be instructed to refuse to answer general knowledge or off-topic questions.
    * **FR7.4:** If a user's question cannot be answered from the provided data, the AI must return a clear, helpful message.
8.  **FR8:** All past analysis reports must be saved and accessible to the user in a "History" section of their account.
    * **FR8.1:** A dedicated "History" section must be accessible to authenticated users.
    * **FR8.2:** The History section will display a list of all previously generated reports, sorted in reverse chronological order.
    * **FR8.3:** Each item in the history list must display key metadata, including the date of analysis and the number of documents analyzed.
    * **FR8.4:** Selecting a report from the history list must load the full, original analysis report and its associated chat interface.
    * **FR8.5:** Each report in the history list must have a user-accessible option to permanently delete it.

## Non-Functional

1.  **NFR1:** The backend database must be MongoDB.
2.  **NFR2:** The entire application must be deployable on Vercel.
3.  **NFR3:** All user data, including uploaded documents and generated reports, must be encrypted at rest and in transit to ensure privacy and security.
4.  **NFR4:** The user interface must be responsive and provide a seamless experience on both desktop and mobile devices.
5.  **NFR5:** The P95 (95th percentile) for analysis and report generation time shall be under 30 seconds.
6.  **NFR6:** The application must maintain 99.9% uptime (availability).
7.  **NFR7:** The user database will be backed up daily, with backups retained for at least 30 days.
