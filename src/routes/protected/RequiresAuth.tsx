import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import type { User } from 'firebase/auth'

export default function RequiresAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
      if (!user) {
        navigate('/sign-in')
      }
    });

    return () => unsubscribe()
  }, [navigate])

  if (isLoading) {
    return <div>로딩중😘</div>
  }

  return user ? <Outlet /> : null
}
