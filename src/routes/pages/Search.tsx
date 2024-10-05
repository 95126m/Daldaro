import { useEffect, useState } from 'react'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
import { BiSearch } from "react-icons/bi"
import theme from '@/styles/Theme'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    setTitle('검색')
  }, [setTitle])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div css={contentStyle}>
      <div css={overlayStyle(isFocused)} /> 
      <form css={formStyle}>
        <input 
          type="text" 
          placeholder="검색어를 입력하세요." 
          css={inputStyle} 
          onFocus={handleFocus} 
          onBlur={handleBlur}
        />
        <BiSearch css={buttonStyle(isFocused)} />
      </form>
    </div>
  )
}

const contentStyle = css`
  position: relative;
  margin-top: 5rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

const formStyle = css`
  display: flex;
  align-items: center;
`;

const inputStyle = css`
  width: 20rem;
  height: 40px;
  background-color: transparent; 
  color: ${theme.colors.middleGrey};
  font-size: ${theme.fontSize.md};
  padding: 0 10px;
  outline: none;
  border: none; 
  border-bottom: 1px solid ${theme.colors.middleGrey}; 
  position: relative;
  z-index: 9;
  transition: background-color 1s ease;

  &::placeholder {
    color: ${theme.colors.middleGrey};
    font-size: ${theme.fontSize.sm};
  }

  &:focus {
    color: ${theme.colors.middleYellow};
    border-bottom: 1px solid ${theme.colors.middleYellow}; 

    &::placeholder {
      color: ${theme.colors.grey};
      font-size: ${theme.fontSize.sm};
    }
  }
`;

const buttonStyle = (isFocused: boolean) => css`
  width: 20px;
  height: 20px;
  color: ${isFocused ? theme.colors.middleYellow : theme.colors.grey}; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease, color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const overlayStyle = (isFocused: boolean) => css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); 
  width: 100%;
  max-width: 430px;
  height: 100%;
  background-color: ${isFocused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'}; 
  z-index: 1;
  transition: background-color 0.5s ease;
  pointer-events: none; 
`;
