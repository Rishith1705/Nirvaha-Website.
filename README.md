# Nirvaha - Meditation App

A modern meditation application built with React, Express, and Firebase.

## Project Structure

This project is divided into two main directories:

- **frontend**: React application (UI, styling, routing)
- **backend**: Express API server (authentication, database operations)

## Technology Stack

### Frontend
- React with Vite
- Firebase Client SDK for user authentication
- React Router for navigation
- Axios for API calls
- Framer Motion for animations
- Tailwind CSS for styling

### Backend
- Node.js with Express
- Firebase Admin SDK for server-side operations
- Firestore for database

## Setting Up Firebase

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Give your project a name and configure settings

2. **Enable Authentication Methods**
   - In the Firebase console, navigate to "Authentication" > "Sign-in method"
   - Enable "Email/Password" and "Google" providers
   - For Google auth, configure the OAuth consent screen

3. **Create a Firestore Database**
   - Go to "Firestore Database" in the Firebase console
   - Click "Create database"
   - Start in production or test mode (you can adjust security rules later)
   - Choose a database location close to your users

4. **Set Up Firebase Security Rules**
   - Go to "Firestore Database" > "Rules" tab
   - Update rules to secure your collections:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Profiles collection
       match /profiles/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Meditation collections
       match /meditations/{meditationId} {
         allow read: if true;  // Public read access
         allow write: if request.auth != null && request.auth.token.admin == true;
       }
       
       // User sessions and achievements
       match /meditation_sessions/{sessionId} {
         allow read: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
         allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
       }
       
       match /user_achievements/{achievementId} {
         allow read: if request.auth != null && request.auth.uid == resource.data.userId;
         allow write: if false;  // Only backend can write achievements
       }
     }
   }
   ```

5. **Generate Service Account Key**
   - Go to "Project settings" > "Service accounts"
   - Click "Generate new private key"
   - Save the JSON file securely
   - This will be used by the backend to authenticate with Firebase

6. **Get Web Config**
   - In "Project settings" > "General", scroll to "Your apps"
   - Click the web app icon (</>) or add a new web app if none exists
   - Register your app with a nickname
   - Copy the Firebase configuration object

## Environment Setup

1. **Frontend Environment**
   - Create a `.env` file in the frontend directory using `.env.example` as a template
   - Add your Firebase web configuration values

2. **Backend Environment**
   - Create a `.env` file in the backend directory using `.env.example` as a template
   - For local development, place your service account JSON file in the backend directory as "firebase-service-account.json"
   - For production, set the entire service account JSON as an environment variable

## Installation & Running

### Backend
```bash
cd backend
npm install
npm run dev  # For development
npm start    # For production
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # For development
npm run build  # For production build
```

## API Documentation

The backend provides RESTful API endpoints for:

- Authentication (register, login, Google auth)
- User profile management
- Meditation content
- Session tracking
- User statistics and achievements

See the API documentation in each controller file for details.

## Frontend Features

- User authentication flow
- Meditation session player
- Progress tracking
- User profile management
- Achievement system

## Deployment

### Backend
- Deploy to a Node.js hosting service (Heroku, DigitalOcean, AWS, etc.)
- Set all required environment variables

### Frontend
- Build the frontend with `npm run build`
- Deploy the resulting `dist` directory to a static hosting service (Netlify, Vercel, Firebase Hosting, etc.)

## License

MIT
#   N i r v a h a - W e b s i t e  
 #   N i r v a h a - W e b s i t e  
 