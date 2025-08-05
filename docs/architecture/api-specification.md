# API Specification

This specification describes the REST API for the Bank Statement Analyzer. It provides a clear contract for all client-server communication.

## REST API Specification (OpenAPI 3.0)

```yaml
openapi: 3.0.0
info:
  title: Bank Statement Analyzer API
  version: 1.0.0
  description: API for analyzing financial documents, managing user accounts, and providing AI-powered insights.

servers:
  - url: /api
    description: Local development server

paths:
  /auth/register:
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                password:
                  type: string
      responses:
        '201':
          description: User created successfully

  /auth/login:
    post:
      summary: Log in a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Login successful

  /reports:
    get:
      summary: Get all analysis reports for the current user
      responses:
        '200':
          description: A list of reports
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AnalysisReport'
    post:
      summary: Initiate a new analysis
      description: This endpoint would be triggered after file uploads are complete.
      responses:
        '202':
          description: Analysis started, returns the new report object.

  /reports/{reportId}:
    get:
      summary: Get a specific analysis report by ID
      parameters:
        - name: reportId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: A single analysis report
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AnalysisReport'

  /reports/{reportId}/chat:
    post:
      summary: Post a message to the AI co-pilot for a specific report
      parameters:
        - name: reportId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
      responses:
        '200':
          description: The AI's response message

components:
  schemas:
    AnalysisReport:
      type: object
      properties:
        _id:
          type: string
        userId:
          type: string
        reportTitle:
          type: string
        sourceDocumentCount:
          type: number
        generatedData:
          type: object
        createdAt:
          type: string
          format: date-time
