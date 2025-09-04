import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdNRDPbdoOecjwYpsTJpzyH43Qhdpjdjg',
  authDomain: 'rest-api-73661.firebaseapp.com',
  projectId: 'rest-api-73661',
  storageBucket: 'rest-api-73661.firebasestorage.app',
  messagingSenderId: '408763064638',
  appId: '1:408763064638:web:01308bc01628a4de240c6f',
  measurementId: 'G-K4SVF9R9MN',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
