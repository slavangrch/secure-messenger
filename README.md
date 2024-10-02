## Overview

This project is a secure web-based messaging application that ensures user privacy by utilizing encryption techniques. It allows users to exchange encrypted messages, ensuring that the communication is private and secure. The application uses **end-to-end encryption** for text messages and implements various security measures like **JWT authentication** and **bcrypt for password hashing**.

## Features

- **End-to-End Encryption**: Uses the ECDH algorithm to generate shared symmetric keys for encrypting messages using AES-GCM.
- **Secure Authentication**: Implements JWT (JSON Web Token) for session management and user authentication.
- **Fake Password Functionality**: Allows users to create a fake password for additional security which allows users to protect their secret messages in case of access demand, giving users more control over their data.
- **Password Security**: Passwords are hashed with bcrypt to ensure they are securely stored and cannot be easily compromised.
- **Encryption Algorithms**: Utilizes the Web Crypto API for message encryption and decryption.

## Technologies Used

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Security**: Web Crypto API (AES-GCM, ECDH), bcrypt, JWT

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
    git clone https://github.com/slavangrch/secure-messenger.git
   ```
2. Navigate to the backend folder and install dependencies:
   ```bash
    cd backend
    npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```bash
    cd ../frontend
    npm install
   ```
4. Configure Environment Variables:
   Create a .env file in the backend folder and add the following:
   ```bash
   SECRET_KEY=your_secret_key
   DB_URL=your_mongodb_connection_string
   ```
5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```
7. Access the application:
   Open your browser and go to http://localhost:5173 to interact with the app.

## Usage

Once the application is running, you can register, log in, and start sending encrypted messages. Each message will be securely stored and encrypted, ensuring privacy.
