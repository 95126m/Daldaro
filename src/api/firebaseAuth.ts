import { auth, db, storage } from '@/api/firebaseApp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

// 이메일과 비밀번호로 회원가입
export const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, 'Users', user.uid), {
      displayName,
      email: user.email,
      userId: user.uid,
      createdAt: new Date(),
      photoURL: user.photoURL || '', // 프로필 사진이 없으면 빈 문자열
    });

    return user;
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    throw error;
  }
};

// 프로필 사진 업데이트 및 Firebase Storage에 업로드
export const updateProfilePhoto = async (userId: string, file: File) => {
  try {
    // Storage 경로 설정
    const storageRef = ref(storage, `profilePhotos/${userId}/${file.name}`);

    // Storage에 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);

    // 업로드된 파일의 URL 가져오기
    const photoURL = await getDownloadURL(snapshot.ref);

    // Firestore에 photoURL 업데이트
    const userDocRef = doc(db, 'Users', userId);
    await updateDoc(userDocRef, { photoURL });

    return photoURL;
  } catch (error) {
    console.error('프로필 사진 업데이트 중 오류 발생:', error);
    throw error;
  }
};

// 이메일과 비밀번호로 로그인
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에서 사용자 정보 확인
    const userDocRef = doc(db, 'Users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error('사용자 정보가 존재하지 않습니다.');
    }

    return user;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error;
  }
};

// 구글 로그인을 통한 사용자 생성 및 Firestore 저장
export const signInWithGoogleAndCreateUser = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDocRef = doc(db, 'Users', user.uid);
    const userDoc = await getDoc(userDocRef);

    // Firestore에 사용자 정보 저장 (존재하지 않으면)
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        userId: user.uid,
        photoURL: user.photoURL || '',
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Firebase 오류 발생:', error.message, error.code);
    } else if (error instanceof Error) {
    
      console.error('일반 오류 발생:', error.message);
    } else {
     
      console.error('알 수 없는 오류 발생:', error);
    }
    throw error; 
  }
  
};
