
# College Bus Tracking

The College Bus Tracking App is a mobile application developed using React Native and Firebase. It allows users to track buses in real-time and provides essential information about bus routes, schedules, and stops.

## Features

- Real-time bus tracking on a map.
- View bus routes, stops, and schedules.
- User authentication and registration using Firebase Authentication.
- Integration with Firebase Realtime Database for data storage.
- User-friendly interface with intuitive navigation.

## Screen Shots
![PHOTO-2023-03-13-00-47-38](https://github.com/kevinfranklin03/bus-Tracker/assets/91761444/93ad80e9-ed3b-42b4-a74a-39f725590820)
![PHOTO-2023-04-29-10-40-57](https://github.com/kevinfranklin03/bus-Tracker/assets/91761444/215ae71f-332f-45cb-aba3-c6698aca9438)
![PHOTO-2023-03-13-00-47-40](https://github.com/kevinfranklin03/bus-Tracker/assets/91761444/7994cd49-40b8-4cca-91d0-441e5de3f541)
![PHOTO-2023-04-29-10-39-58](https://github.com/kevinfranklin03/bus-Tracker/assets/91761444/09cb445a-8716-465a-a30f-bfcafbc71784)


## Installation

1. Clone the repository: `git clone https://github.com/kevinfranklin03/bus-Tracker.git`
2. Navigate to the project directory: `cd bus-tracker`
3. Install dependencies: `npm install`

## Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Set up Firebase Authentication and Realtime Database.
3. Add your Firebase configuration in `src/config/firebase.js`:
 
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
