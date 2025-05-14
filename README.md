# Taskadrama

A simple, personalized task management web application built with React. Users can register, log in, and manage their own list of tasks via a simulated REST API.

## Features

*   User Registration: Create a new user account.
*   User Authentication (Login/Logout): Securely log in and out to access personalized tasks.
*   Protected Routes: Access to task management is restricted to authenticated users.
*   Navigation Bar: Provides links for login, registration, and tasks, updated based on authentication status.
*   Personalized Task List: View tasks associated with the logged-in user.
*   Add New Task: Create new tasks linked to the current user.
*   Mark Task Complete: Toggle the completion status of tasks.
*   Delete Task: Remove tasks from the list.
*   Data Persistence (simulated): Task and user data is managed via a REST API (simulated with JSON Server).

## Technologies Used

*   React.js
*   React Router DOM (for routing)
*   Hooks (`useState`, `useEffect`, `useContext`)
*   Context API (for authentication state management)
*   Fetch API (for making REST API requests)
*   JSON Server (to simulate the backend REST API)
*   Plain CSS (for styling)
*   Git (for version control)
*   GitHub (for remote repository and commit history)

## Setup and Installation

1.  **Clone the repository:**
    ```
    bash
    git clone https://github.com/kriskata-andonov/taskadrama
    cd taskadrama
    ```

2.  **Install dependencies:**
    ```
    bash
    npm install
    # OR
    # yarn install
    ```

3.  **Start the JSON Server (Backend Simulation):**
    Open a **new** terminal window, navigate to the project directory, and run:
    ```
    bash
    npm run server
    # OR if you don't have the npm script set up:
    # npx json-server --watch db.json --port 3001
    ```
    *Keep this terminal window open and the server running.*

4.  **Start the React Development Server (Frontend):**
    Open your **original** terminal window, navigate to the project directory (if you left it), and run:
    ```
    bash
    npm start
    # OR if using Vite:
    # npm run dev
    # OR
    # yarn start / yarn dev
    ```
    *Keep this terminal window open and the server running.*

5.  **Access the application:**
    Open your web browser and go to `http://localhost:5173` (or the address shown by your React dev server, typically 3000 or 5173).

## How to Use

1.  **Register:** Navigate to the "Register" page to create a new user account.
2.  **Login:** Navigate to the "Login" page and log in with your registered credentials.
3.  **Manage Tasks:** Once logged in, you will be redirected to the "My Tasks" page.
    *   See your existing tasks (if any).
    *   Use the form to add new tasks.
    *   Click the checkbox next to a task to mark it complete/incomplete.
    *   Click the "Delete" button to remove a task.
4.  **Logout:** Click the "Logout" button in the navigation bar to end your session.

## GitHub Repository and Commit History

The complete code for this project is hosted on GitHub. You can view the repository and the full commit history at:

https://github.com/kriskata-andonov/taskadrama/commits/main/

The commit history reflects the incremental development process, with distinct commits for key features and states of the application, as required by the assignment.

---

**Note:** This application uses JSON Server for mock backend capabilities. In a real-world scenario, this would be replaced by a robust backend server and database with proper password hashing, secure authentication mechanisms (like JWT), etc.
