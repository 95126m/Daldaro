import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { css } from '@emotion/react'
import SplashLogo from '@/assets/splash-cat.gif'
import Logo from '@/assets/logo-white.png'
import theme from '@/styles/Theme'

export default function App() {
  const [isSplash, setIsSplash] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, user => {
      setTimeout(() => {
        setIsSplash(false); 
        if (!user) {
          navigate('/sign-in')
        }
      }, 2000)
    })
      
    return () => {
        authListener();
      };
    }, [navigate]);

  return (
    <>
      <div>
        {isSplash && (
          <div css={containerStyle}>
            <img
              src={SplashLogo}
              css={SplashLogoStyle}
            />
            <img
              src={Logo}
              css={logoStyle}
            />
          </div>
        )}
      </div>
    </>
  )
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