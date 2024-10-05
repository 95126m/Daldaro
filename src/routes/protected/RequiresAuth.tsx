import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import type { User } from 'firebase/auth'
import SplashLogo from '@/assets/splash-cat.gif'  
import Logo from '@/assets/logo-white.png'  
import { css } from '@emotion/react'
import theme from '@/styles/Theme'

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
    return (
      <div css={containerStyle}>
        <img src={SplashLogo} css={SplashLogoStyle} alt="Loading" />
        <img src={Logo} css={logoStyle} alt="Logo" />
      </div>
    )
  }

  return user ? <Outlet /> : null
}

const containerStyle = css`
  background-color: ${theme.colors.middleYellow};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100vh;
  width: 100%;
  max-width: 430px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9;
`;

const SplashLogoStyle = css`
  height: auto;
  width: 280px;
  text-align: center;
  position: relative;
  bottom: 4rem; 
`;

const logoStyle = css`
  height: auto;
  width: 300px;
  text-align: center;
  position: absolute;
  bottom: 22rem; 
`;
