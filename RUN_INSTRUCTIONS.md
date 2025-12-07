# How to Run the Router Admin Project

This guide will help you set up and run the Router Admin project locally.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   npm (usually comes with Node.js)

## Project Structure

*   `server/` - The backend Node.js/Express server.
*   `client/` - The frontend React application.

## Step 1: Start the Server

1.  Open a terminal.
2.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    node oop_server.js
    ```
    *   The server will start on port `5000`.
    *   It will initialize data files in `server/data/` if they don't exist.

## Step 2: Start the Client

1.  Open a **new** terminal window (keep the server running).
2.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  The application usually starts at `http://localhost:5173`. check the terminal output for the exact link.

## Step 3: Access the Application

1.  Open your browser and navigate to the client URL (e.g., `http://localhost:5173`).
2.  You will be redirected to the Login page.
3.  Use the default credentials:
    *   **Username:** `admin`
    *   **Password:** `admin`
4.  Enjoy exploring the Router Admin interface!

## Troubleshooting

*   **Port In Use:** If port 5000 is occupied, you may need to change the port in `oop_server.js` or kill the process using that port.
*   **API Connection Error:** Ensure the server is running. The client expects the API at `http://localhost:5000`.
