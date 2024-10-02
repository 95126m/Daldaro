import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/api/firebaseApp'
import { FirebaseError } from 'firebase/app'

// 구글 로그인을 통한 사용자 생성 및 Firestore 저장
export const signInWithGoogleAndCreateUser = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)

    const userDoc = doc(db, 'Users', user.uid)
    const docSnapshot = await getDoc(userDoc)

    if (!docSnapshot.exists()) {
      // Firestore에 사용자 정보 저장
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid,
      });

      // Itemlists에 사용자별 아이템 생성
      const ItemlistsCollection = collection(db, 'Itemlists');
      const newItemlistDocRef = doc(ItemlistsCollection);
      const ItemId = newItemlistDocRef.id;

      await setDoc(newItemlistDocRef, {
        itemId: ItemId,
        userId: user.uid,
      });
    }

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firebase 오류 발생:', error.message, error.code)
    } else if (error instanceof Error) {
      console.error('일반 오류 발생:', error.message)
    } else {
      console.error('알 수 없는 오류 발생')
    }
    throw error
  }
};

// 이메일과 비밀번호로 회원가입
export const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Firestore에 사용자 정보 저장
    const userDoc = doc(db, 'Users', user.uid);
    await setDoc(userDoc, {
      displayName,
      email: user.email,
      photoURL: null, // 사용자가 제공하는 것이 없으므로 null로 설정
      userId: user.uid,
    });

    // Itemlists에 사용자별 아이템 생성
    const ItemlistsCollection = collection(db, 'Itemlists')
    const newItemlistDocRef = doc(ItemlistsCollection)
    const ItemId = newItemlistDocRef.id

    await setDoc(newItemlistDocRef, {
      itemId: ItemId,
      userId: user.uid,
    });

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firebase 오류 발생:', error.message, error.code)
    } else if (error instanceof Error) {
      console.error('일반 오류 발생:', error.message)
    } else {
      console.error('알 수 없는 오류 발생')
    }
    throw error;
  }
};

// 이메일과 비밀번호로 로그인
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    console.log('로그인 성공:', user);

    // Firestore에서 사용자 정보 가져오기
    const userDoc = doc(db, 'Users', user.uid)
    const docSnapshot = await getDoc(userDoc)

    if (!docSnapshot.exists()) {
      console.error('사용자 정보가 존재하지 않습니다.')
    }

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firebase 오류 발생:', error.message, error.code)
    } else if (error instanceof Error) {
      console.error('일반 오류 발생:', error.message)
    } else {
      console.error('알 수 없는 오류 발생')
    }
    throw error
  }
}
