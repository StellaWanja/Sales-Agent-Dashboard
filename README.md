# Sales Management Dashboard

This sales management dashboard is built using React, TypeScript, Tailwind CSS and JSON Server. The dashboard visualizes data using pie charts, graphs and tables. There is also extra functionalities to create, read, delete and update details of an invoice form.

**The link to the website can be found here: https://sales-agent-dashboard-six.vercel.app/**

## Features 
- Responsive design using Tailwind CSS
- Interactive UI components
- Data management with JSON Server
- Create, Read, Update and Delete (CRUD) operations

## Tech Stack
- React with TypeScript for building the UI
- Tailwind CSS for styling
- JSON Server for simulating a REST API during local development

## Setup Instructions
1. Clone the repository
  ```
  git clone https://github.com/StellaWanja/Sales-Agent-Dashboard.git
  cd the repo
  ```
2. Install dependencies:
  ```
  npm install
  ```
3. Replace the current API under the **Dashboard** and **SchoolManagement** pages, which can be found under the pages directory, with **http://localhost:3000/schools**.
4. Start the JSON Server
    ```
    npx json-server src/data/db.json
    ```
5. Start the React development server
   ```
    npm run dev
    ```
6. Open your browser and navigate to http://localhost:5173 to see the application in action.

## Key Design Decisions
1. Using TypeScript ensures type safety throughout the project, making the codebase more robust and less prone to runtime errors.
2. Tailwind CSS was chosen for its utility-first approach, enabling rapid styling and consistent design patterns across the application.
3. JSON Server is used to simulate a REST API, allowing for quick setup and testing of API interactions without the need for a full backend.
4. The project follows a component-based architecture, promoting reusability and maintainability of UI components.
