// import { useEffect } from 'react'
import { css } from '@emotion/react'
// import theme from '@/styles/Theme'
import logo from '@/assets/logo-yellow.png'

export default function Home() {

  return (
    <div css={contentStyle}>
      <img css={logoStyle} src={logo} alt="Logo" />
    </div>
  )
}

const contentStyle = css`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  `;

const logoStyle = css`
  position: fixed;
  top: 5%;
  left: 50%;
  height: auto;
  width:10rem;
  transform: translate(-50%, -50%);
`;