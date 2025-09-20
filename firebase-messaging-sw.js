// This file should be in the public folder

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "__VITE_API_KEY_PLACEHOLDER__",
  authDomain: "app-formativa-apa.firebaseapp.com",
  projectId: "app-formativa-apa",
  storageBucket: "app-formativa-apa.appspot.com",
  messagingSenderId: "765337791019",
  appId: "1:765337791019:web:2035652cfcdad827e7186e",
  measurementId: "G-T6SMKC08XF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/logo-apa.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});