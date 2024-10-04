import { useState, useEffect, useRef } from 'react'
import { loginWithEmailAndPassword, signInWithGoogleAndCreateUser } from '@/api/firebaseAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '@/assets/logo-yellow.png'
import LongButton from '@/components/common/LongButton'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import theme from '@/styles/Theme'
import { FaCheckCircle } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const initialEmail = useRef(email)
  const initialpassword = useRef(password)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    setIsModified(
      email !== initialEmail.current || password !== initialpassword.current
    )
  }, [email, password])

  useEffect(() => {
    if (location.state?.showToast) {
      toast(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <FaCheckCircle style={{ marginRight: '10px' }} /> 
          환영합니다!
        </div>,
        {
          position: "bottom-center",  
          autoClose: 2000,           
          hideProgressBar: false,     
          progress: undefined,
          closeButton: false
        }
      )
    }
  }, [location.state])

  async function handleNormalSignIn() {
    try {
      await loginWithEmailAndPassword(email, password)
      navigate('/'); 
    } catch (err) {
      setError('로그인 실패!')
      console.error(err)
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogleAndCreateUser();
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }

  const handleNewAccount = () => {
    navigate('/new-account')
    }
    
  const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast {
      background-color: rgba(0, 0, 0, 0.6); 
      color: white; 
    }
    --toastify-toast-width: 230px;
    --toastify-color-progress-light: linear-gradient(
      to right, #ffc71d, #FDDE76
    )
  `


  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img css={logoStyle} src={logo} alt="Logo" />
      </div>

      <div css={buttonStyle}>
      <div style={{ marginBottom: '10px', color: '#ffc71d', fontWeight: 'bold' }}>이메일</div>
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          css={emailInputStyle}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <div style={{ marginBottom: '10px', color: '#ffc71d', fontWeight: 'bold' }}>비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          css={passwordInputStyle}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && <p css={errorStyle}>{error}</p>}
        <div css={middleBtn}>
          <LongButton type="submit" disabled={!isModified} onClick={handleNormalSignIn} css={loginButtonStyle}>로그인</LongButton>
          <div css={or}>또는</div>
          <LongButton onClick={handleGoogleSignIn} css={googleButtonStyle}>
          Google 로그인
          </LongButton>
        </div>

      </div>

      <div css={bottomBtn}>
        <button onClick={handleNewAccount} css={signUpButtonStyle}>회원가입</button>
        <span css={dividerStyle}>|</span>
        <button css={findPasswordButtonStyle}>비밀번호 찾기</button>
      </div>

      <StyledToastContainer />

    </div>
  )
}

const containerStyle = css`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background-color: ${theme.colors.white};
  height: 100%;
  overflow-y: auto;
  &::before {
    content: '';
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 0;
  }
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  z-index: 2;
`;

const buttonStyle = css`
  position: absolute;
  bottom: 43%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const middleBtn = css`
  position: absolute;
  margin-top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.darkYellow};
  z-index: 2;
`
const bottomBtn = css`
  position: absolute;
  margin-top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.colors.darkYellow};
  cursor: pointer; 
  z-index: 2;
`;

const floatingAnimation = css`
  @keyframes floating {
    0% {
      top: 20%; 
    }
    50% {
      top: 18%;  
    }
    100% {
      top: 20%;  
    }
  }
  animation: floating 3s ease-in-out infinite;  
`;

const logoStyle = css`
  position: absolute;
  top: 20%;
  left: 50%;
  height: auto;
  width: 20rem;
  transform: translate(-50%, -50%);
  ${floatingAnimation};
`;

const inputStyle = css`
  display: flex;
  width: 327px;
  height: 40px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid ${theme.colors.darkYellow};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.darkGrey};
  font-weight: ${theme.fontWeight.semiBold};
  outline: none;

  &::placeholder {
    color: ${theme.colors.middleGrey};
    font-size: ${theme.fontSize.sm};
  }
`;

const emailInputStyle = css`
  ${inputStyle};
  margin-bottom: 16px;
`;

const passwordInputStyle = css`
  ${inputStyle};
  margin-bottom: 24px;
`;

const loginButtonStyle = css`
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
  cursor: pointer; 
  z-index: 3;
`;

const googleButtonStyle = css`
  margin-bottom: 16px;
  cursor: pointer; 
  z-index: 3;
`;

const signUpButtonStyle = css`
  margin-bottom: 8px;
  outline: none;
  background-color: transparent;
  border: none;
  color: ${theme.colors.grey}; 
  transition: color 0.5s ease;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.darkYellow}; 
  }
`;

const findPasswordButtonStyle = css`
  outline: none;
  background-color: transparent;
  border: none;
  color: ${theme.colors.grey}; 
  transition: color 0.5s ease;
  cursor: point;
  &:hover {
    color: ${theme.colors.darkYellow}; 
  }
`;

const or = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.grey};
  width: 100%;
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: ${theme.colors.lightGrey};
    margin: 0 10px;
  }
`;

const dividerStyle = css`
  margin: 0 10px;
  color: ${theme.colors.lightGrey}; 
  font-size: ${theme.fontSize.sm}; 
`;

const errorStyle = css`
  color: red;
  margin-top: 10px;
`;
