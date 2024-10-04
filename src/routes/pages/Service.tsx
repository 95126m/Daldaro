import { useEffect } from 'react'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
// import theme from '@/styles/Theme'

export default function Home() {
    const setTitle = useHeaderStore(state => state.setTitle)

    useEffect(() => {
        setTitle('고객센터')
    }, [setTitle])

  return (
    <div css={contentStyle}>
      <h1>고객센터</h1>
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