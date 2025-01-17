# Project README

## About

This project is a Crypto wallet for sending and recieving USDC and SOL payments using Circle Api developer controlled wallet

## How to Run the Project

This project consists of two main parts: a React frontend application and a Node.js backend application. Each part is contained within its respective folder.

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v18 or later)
- npm (v8 or later)
- yarn (optional, but recommended for managing dependencies)

### Setting Up the Node.js Backend

1. **Navigate to the Node.js folder:**

    ```bash
    cd CircleWalletApi
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Create an `.env` file:**

    In the root of the Node.js folder, create an `.env` file and add the necessary environment variables. Here is an example of what your `.env` file might look like:

    ```env
    GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
MONGODB_URI
SESSION_SECRET='y3830974u39o09u3j9i2k0'
CLIENT_URL=http://localhost:5000
CLIENT_URL_UI=http://localhost:5173
CIRCLE_KEY=
ENTITY_SECRET=
    ```

4. **Getting the secrets**

As for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, you will have to create a new app in the Google Cloud Console and create credentials for Google Auth 2.0, and also you will have to set googles callback url to 
http://localhost:5000/auth/google/callback

As for `CIRCLE_KEY`, you will have to create an api key at circle.com and as for `ENTITY_SECRET`, you will have to generate it natively or at circle.com's documentation website and use it to generate an Entity Secret Ciphertext which will be registered at circle.com's configurator. `see their docs for more info`

and as for `MONGODB_URI`, you will have to register a mongodb atlas account and get a database connection uri

The other secrets are already predefined above

4. **Run the backend server:**

    ```bash
    node app
    ```

    This will start the Node.js server on the port 5000.

### Setting Up the React Frontend

1. **Navigate to the React folder:**

    ```bash
    cd walletUI
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

    If you prefer using yarn:

    ```bash
    yarn install
    ```

3. **Run the frontend application:**

    ```bash
    npm run dev
    ```

    Or, if you used yarn:

    ```bash
    yarn start
    ```

    This will start the React development server, typically on `http://localhost:5173`.

### Running the Project

1. Ensure both the Node.js backend and the React frontend are running.

2. Open your browser and navigate to `http://localhost:5173` to access the React application.

The React application should now be able to communicate with the Node.js backend. If any issues arise, check the console output for both the frontend and backend for error messages and resolve them accordingly.

## Additional Notes

- Make sure your environment variables are correctly set in the `.env` file for the Node.js application.
- If you encounter any issues with dependencies, try deleting the `node_modules` folder and the `package-lock.json` file (or `yarn.lock` if using yarn) in both folders, then reinstalling the dependencies.
- For production deployment, consider using tools like Docker, PM2, or hosting services like Heroku, AWS, or Vercel.

Happy coding!