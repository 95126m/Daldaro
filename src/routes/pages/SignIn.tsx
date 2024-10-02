/** @jsxImportSource @emotion/react */
import { signInWithGoogleAndCreateUser } from '@/api/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import googleLogo from '@/assets/googleLogo.png';
import logo from '@/assets/logo-yellow.png';
import LongButton from '@/components/LongButton';
import { css } from '@emotion/react';
import theme from '@/styles/Theme';

export default function SignIn() {
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      await signInWithGoogleAndCreateUser();
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img css={logoStyle} src={logo} alt="Logo" data-testid="main-logo" />
      </div>

      <div css={buttonStyle}>
        <input type="text" placeholder="이메일을 입력해주세요." css={emailInputStyle} />
        <input type="password" placeholder="비밀번호를 입력해주세요." css={passwordInputStyle} />
        <LongButton onClick={handleSignIn} css={loginButtonStyle}>회원 로그인</LongButton>
        <LongButton onClick={handleSignIn} css={googleButtonStyle}>
          <img
            src={googleLogo}
            alt="Google Logo"
            data-testid="google-logo"
            style={{ width: '20px', height: '20px' }}
          />
          Google 로그인
        </LongButton>
        <button css={signUpButtonStyle}>회원가입</button>
        <button css={findPasswordButtonStyle}>비밀번호 찾기</button>
      </div>

      <div>
        <p css={signInText}>ⓒ MAZI. All Rights Reserved.</p>
      </div>
    </div>
  );
}

const containerStyle = css`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background-color: ${theme.colors.white};
  height: 100%;
  overflow-y: auto;
  border: 1px solid ${theme.colors.grey};

  &::before {
    content: '';
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 1000px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const buttonStyle = css`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const logoStyle = css`
  position: absolute;
  top: 20%;
  left: 50%;
  height: 55px;
  width: 180px;
  transform: translate(-50%, -50%);
`;

const signInText = css`
  color: ${theme.colors.grey};
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${theme.fontSize.sm};
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
  border: 2px solid ${theme.colors.darkYellow};
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
  margin-bottom: 20px; 
`;

const googleButtonStyle = css`
  margin-bottom: 16px; 
`;

const signUpButtonStyle = css`
  margin-bottom: 8px;
  outline: none;
  background-color: transparent;
  border: none;
`;

const findPasswordButtonStyle = css`
  outline: none;
  background-color: transparent;
  border: none;
`;

