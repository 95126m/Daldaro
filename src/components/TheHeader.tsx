/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import theme from '@/styles/Theme'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { CgChevronLeft } from 'react-icons/cg'
import { useHeaderStore } from '@/stores/header'

export default function TheHeader() {
  const title = useHeaderStore(state => state.title)
  // const navigate = useNavigate()
  // const location = useLocation()

  return (
    <header css={headerStyle}>
      {title === 'Home' ? (
        <img
          css={logoStyle}
          src="/src/assets/logo-yellow.png"
          alt="logo"
        />
      ) : (
        <h2 css={titleStyle}>{title}</h2>
      )}
    </header>
  )
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: fixed;
  width: ${theme.width.max};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: ${theme.colors.white};
  background-color: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.grey};
  border-left: 1px solid ${theme.colors.grey};
`

const titleStyle = css`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.black};
`

const logoStyle = css`
  width: 80px;
  height: 25px;
`