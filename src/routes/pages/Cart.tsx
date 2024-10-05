import { useEffect } from 'react'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
import theme from '@/styles/Theme'

export default function Home() {
    const setTitle = useHeaderStore(state => state.setTitle)

    useEffect(() => {
        setTitle('장바구니')
    }, [setTitle])

  return (
    <div css={contentStyle}>
      <div css={emptyText}>장바구니가 비어있어요 !</div>
    </div>
  )
}

const contentStyle = css`
  margin-top: 5rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  `;

const emptyText = css`
  margin-top: 80%;
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.darkYellow};
  font-weight: ${theme.fontWeight.bold};
`