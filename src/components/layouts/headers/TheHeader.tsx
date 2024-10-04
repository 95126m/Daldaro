import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import { useNavigate } from 'react-router-dom'
import { CgChevronLeft } from 'react-icons/cg'
import { useHeaderStore } from '@/stores/header'

type TheHeaderProps = {
  onOpenModal?: () => void
}

enum titleName {
  NewAccount = '회원가입',
  Profile = '프로필'
}

export default function TheHeader({ onOpenModal }: TheHeaderProps) {
  const title = useHeaderStore(state => state.title)
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (onOpenModal) {
      onOpenModal()
    } else {
      navigate(-1)
    }
  }

  return (
    <header css={headerStyle}>
      {title == titleName.NewAccount && (
        <CgChevronLeft
        css={iconStyle}
        onClick={handleBackClick}
      />
      )}
      <h1 css={titleStyle}>{title}</h1>
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
  z-index: 9;
  color: ${theme.colors.black};
`;

const iconStyle = css`
  font-size: 24px;
  color: ${theme.colors.darkYellow};
  position: absolute;
  left: 20px;
  cursor: pointer;
`;

const titleStyle = css`
  font-size: 20px;
  color: ${theme.colors.darkYellow};
  margin: 0;
  text-align: center;
  font-weight: ${theme.fontWeight.bold}
`;