import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTgr79xZ76ozJ0UBYBJXwnOMuFLcSRVVs',
  authDomain: 'react-firebase-todo-145.firebaseapp.com',
  projectId: 'react-firebase-todo-145',
  storageBucket: 'react-firebase-todo-145.appspot.com',
  messagingSenderId: '207837152651',
  appId: '1:207837152651:web:dfff04c27e2fd347915b8e',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
