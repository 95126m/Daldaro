import { initializeApp } from 'firebase/app';  // Firebase 앱 초기화 모듈
import { getAuth } from 'firebase/auth';  // Firebase 인증 모듈
import { getFirestore } from 'firebase/firestore';  // Firestore 모듈
import { getStorage } from 'firebase/storage';  // Firebase Storage 모듈

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA3_nx7tHbhULYeEuZRNFmbEGx3nmBzTnE",
  authDomain: "daldaro-shop-project.firebaseapp.com",
  projectId: "daldaro-shop-project",
  storageBucket: "daldaro-shop-project.appspot.com",
  messagingSenderId: "890663764432",
  appId: "1:890663764432:web:b6f60c123207954765b9d5"
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);

// Firestore, 인증, Storage 내보내기
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);  // Firebase Storage 추가

export default firebaseApp;
