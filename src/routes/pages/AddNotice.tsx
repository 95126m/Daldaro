import { useEffect } from 'react'
import { css } from '@emotion/react'
// import theme from '@/styles/Theme'
import { useHeaderStore } from '@/stores/header'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
      setTitle('게시글 추가')
  }, [setTitle])
  
  return (
    <div css={contentStyle}>
      <h1>ㅎㅇ</h1>
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