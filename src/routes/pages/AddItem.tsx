import { useEffect } from 'react'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
// import theme from '@/styles/Theme'

export default function AddItem() {
    const setTitle = useHeaderStore(state => state.setTitle)

    useEffect(() => {
        setTitle('상품 추가')
    }, [setTitle])

  return (
    <div css={contentStyle}>
      <h1>상품 추가</h1>
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