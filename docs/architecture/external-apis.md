# External APIs

Our application relies on the following external APIs for its core functionality.

## Google Gemini AI API

* **Purpose:** To perform the core financial analysis of the user's uploaded documents. This is the AI engine of our application.
* **Documentation:** [https://ai.google.dev/docs](https://ai.google.dev/docs)
* **Authentication:** API Key sent in the request header. This key will be stored securely in our backend's environment variables and never exposed to the client.
* **Rate Limits:** We must operate within the defined rate limits of our chosen Gemini model tier to ensure service availability.
* **Integration Notes:** The `Analysis Service` and `Chat Service` on our backend will be the only components that communicate directly with the Gemini API.

## MongoDB Atlas Data API

* **Purpose:** To connect to and perform all database operations (Create, Read, Update, Delete) on our MongoDB Atlas cluster.
* **Documentation:** [https://www.mongodb.com/docs/atlas/api/data-api/](https://www.mongodb.com/docs/atlas/api/data-api/)
* **Authentication:** Connection String URI containing credentials. This string will be stored securely in our backend's environment variables.
* **Rate Limits:** Dependent on our selected MongoDB Atlas cluster tier.
* **Integration Notes:** While we will use the Mongoose library for easier interaction, it ultimately communicates with the MongoDB Atlas service. All backend services that require data persistence (`Auth Service`, `Report Service`) will depend on this connection.

***

These are the primary external dependencies for our application.
