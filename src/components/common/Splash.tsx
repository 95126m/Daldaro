import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { css } from '@emotion/react'
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
  z-index: 9;
`
const floatingAnimation = css`
  @keyframes floating {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px); 
    }
    100% {
      transform: translateY(0); 
    }
  }
  animation: floating 3s ease-in-out infinite;
`;

const logoStyle = css`
  height: 60px;
  width: 200px;
  text-align: center;
  z-index: 2;
  ${floatingAnimation}
  `

