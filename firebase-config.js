// Olo Coffee - Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPbQhTuyp0sEM_Th6qq3GIOWgyoTlIPP8",
  authDomain: "olocoffee-5a798.firebaseapp.com",
  projectId: "olocoffee-5a798",
  storageBucket: "olocoffee-5a798.firebasestorage.app",
  messagingSenderId: "630103155078",
  appId: "1:630103155078:web:8fa77a372d82003bae4c07",
  measurementId: "G-XCJPZB46MZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Global references for Admin Panel (MUZOM suffix is used in your admin.html)
if (typeof firebase.auth === 'function') window.MUZOM_AUTH = firebase.auth();
if (typeof firebase.firestore === 'function') window.MUZOM_DB = firebase.firestore();
if (typeof firebase.storage === 'function') window.MUZOM_STORAGE = firebase.storage();
