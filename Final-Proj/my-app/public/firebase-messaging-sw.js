// // Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// import firebase from "firebase/compat/app";
// import { app } from "../src/app/firebaseConfig";
// const messaging = firebase.messaging(app);
// messaging.onBackgroundMessage(function(payload) {
//     console.log('Received background message ', payload);
  
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }