# Simple Issue Tracker

A full-stack issue tracking application built with **Angular** and **Spring Boot**.

This project was developed as a practical full-stack application to demonstrate frontend and backend development, REST API design, CRUD operations, form validation, and PostgreSQL integration.

## Features

* Create new issues
* View all issues
* View and edit an existing issue
* Delete issues with confirmation
* Filter issues by status and priority
* Form validation
* Backend validation with custom error responses
* Persistent data storage with PostgreSQL
* Responsive user interface
* RESTful API

## Tech Stack

### Frontend

* Angular 22
* TypeScript
* Tailwind CSS
* Angular Reactive Forms
* Angular Signals

### Backend

* Java
* Spring Boot 4
* Spring MVC
* Spring Data JPA
* Hibernate
* Jakarta Validation

### Database

* PostgreSQL

### Tools

* Maven
* Git
* GitHub

## Project Structure

```text
simple-issue-tracker/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── issue_tracker/
│   │       │       ├── controller/
│   │       │       │   └── IssueController.java
│   │       │       │
│   │       │       ├── dto/
│   │       │       │   └── ValidationErrorResponse.java
│   │       │       │
│   │       │       ├── exception/
│   │       │       │   └── GlobalExceptionHandler.java
│   │       │       │
│   │       │       ├── model/
│   │       │       │   ├── Issue.java
│   │       │       │   ├── IssuePriority.java
│   │       │       │   └── IssueStatus.java
│   │       │       │
│   │       │       ├── repository/
│   │       │       │   └── IssueRepository.java
│   │       │       │
│   │       │       ├── service/
│   │       │       │   └── IssueService.java
│   │       │       │
│   │       │       └── IssueTrackerApplication.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
└── frontend/
    └── src/
        └── app/
            ├── components/
            ├── models/
            ├── pages/
            └── services/
```

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/issues`      | Get all issues           |
| GET    | `/api/issues/{id}` | Get an issue by ID       |
| POST   | `/api/issues`      | Create a new issue       |
| PUT    | `/api/issues/{id}` | Update an existing issue |
| DELETE | `/api/issues/{id}` | Delete an issue          |

## Issue Model

Each issue contains the following fields:

| Field         | Description                      |
| ------------- | -------------------------------- |
| `id`          | Automatically generated issue ID |
| `title`       | Issue title                      |
| `description` | Issue description                |
| `status`      | `TODO`, `IN_PROGRESS`, or `DONE` |
| `priority`    | `LOW`, `MEDIUM`, or `HIGH`       |

## Validation

Issue validation is handled on the backend using Jakarta Validation.

Current validation rules include:

* Title is required
* Title must contain at least 3 characters
* Description is required
* Status is required
* Priority is required

Validation errors are handled centrally by `GlobalExceptionHandler` and returned in a structured response.

Example:

```json
{
  "message": "Validation failed",
  "errors": {
    "title": "Title must be at least 3 characters"
  }
}
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Java 21 or later
* Maven
* Node.js
* Angular CLI
* PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/zeynab-rs/simple-issue-tracker.git
cd simple-issue-tracker
```

### 2. Create the PostgreSQL database

Create a PostgreSQL database named:

```text
issue_tracker
```

The application is configured to connect to PostgreSQL using:

```text
localhost:5432
```

### 3. Configure the database password

The backend reads the PostgreSQL password from the `DB_PASSWORD` environment variable.

For example, on Windows PowerShell:

```powershell
$env:DB_PASSWORD="your_database_password"
```

On Linux/macOS:

```bash
export DB_PASSWORD="your_database_password"
```

Do not put your actual database password directly into `application.properties`.

### 4. Run the backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

### 5. Run the frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

The frontend will be available at:

```text
http://localhost:4200
```

## Environment Variables

The backend requires the following environment variable:

| Variable      | Description                  |
| ------------- | ---------------------------- |
| `DB_PASSWORD` | PostgreSQL database password |

The database username and connection URL are currently configured in `application.properties`.

## Development Notes

The application uses Spring Data JPA for database access and Hibernate for ORM.

The database schema is managed during development using:

```properties
spring.jpa.hibernate.ddl-auto=update
```

The Angular development server uses a proxy configuration to forward `/api` requests to the Spring Boot backend.

## Author

**Zeynab**

This project was created as a full-stack learning and portfolio project.
