import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import { ReactNode } from 'react'

interface LongButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const LongButton = ({
  onClick,
  children,
  type = 'submit',
  disabled = false
}: LongButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      css={longButtonStyle(disabled)}>
      {children}
    </button>
  )
}

const longButtonStyle = (isDisabled: boolean) => css`
  display: flex;
  width: 327px;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: ${isDisabled ? theme.colors.lightGrey : theme.colors.darkYellow};
  border: none;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.white}; 
  cursor: ${isDisabled ? 'not-pointer' : 'pointer'};
  font-weight: ${theme.fontWeight.semiBold};
`

export default LongButton
