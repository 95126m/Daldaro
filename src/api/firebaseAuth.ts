import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/api/firebaseApp'

export const signInWithGoogleAndCreateUser = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)

    const userDoc = doc(db, 'Users', user.uid)
    const docSnapshot = await getDoc(userDoc)

    if (!docSnapshot.exists()) {
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid
      })

      const ItemlistsCollection = collection(db, 'Itemlists')
      const newItemlistDocRef = doc(ItemlistsCollection)
      const ItemId = newItemlistDocRef.id

      await setDoc(newItemlistDocRef, {
        itemId: ItemId,
        userId: user.uid,
      })
    }

    return user
  } catch (error) {
    console.error('구글 연동 로그인 실패', error)
    throw error
  }
}
