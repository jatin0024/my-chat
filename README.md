# React Native Chat App with Firebase & Deep Linking

## Overview
This is a **React Native Chat Application** built with **Expo** and **Firebase**. It allows users to:
- Create accounts & log in (Firebase Authentication)
- Create & join chat rooms
- Send and receive messages in real time (Firebase Firestore)
- Invite others to join a specific chat room using **deep links**

## Features
- **Firebase Authentication** for secure sign-up/login
- **Real-time messaging** with Firebase Firestore
- **Deep Linking** to join chat rooms via an invite link (`mychatapp://join/:roomId`)
- Attractive, minimal UI built with React Native components
- **Cross-platform**: works on Android, iOS, and Web (with Expo)

## Tech Stack
- **React Native** (Expo)
- **Firebase Authentication & Firestore**
- **React Navigation** for navigation
- **Expo Linking** for deep linking
- **JavaScript / ES6**

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase

Go to Firebase Console

Create a new project

Enable Email/Password Authentication in Firebase Authentication settings

Create a Firestore Database (start in test mode for development)

Copy your Firebase config object from the Firebase Console and paste it into source/firebase.js:

```// source/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 3. Set Up Deep Linking

Edit app.json and add:

```
"scheme": "mychatapp"
```

This allows links like mychatapp://join/ROOM_ID to open your app.

### 4. Run the App

```bash
expo start
```

Scan the QR code with Expo Go app on your phone.

Usage

Register a new account or login.

Create a new chat room.

Tap on Invite to share a deep link with someone.

When the recipient clicks the link, the app will open directly in that chat room.

Start chatting!

Invite Link Example
```
mychatapp://join/abc123roomid
```

Future Improvements

Add push notifications for new messages

Add profile pictures for users

Show typing indicators

Support multimedia messages (images, files)
