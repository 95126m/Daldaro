import LongButton from '@/components/common/LongButton'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { useNavigate } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import theme from '@/styles/Theme'

export default function Profile() {
    const setTitle = useHeaderStore(state => state.setTitle)

    useEffect(() => {
        setTitle('프로필')
    }, [setTitle])

    const user = auth.currentUser
    const navigate = useNavigate()

    async function logOut() {
        await signOut(auth)
        navigate('/sign-in')
    }

    return (
        <div css={pageStyle}>
          {user && (
          <>
            <img
              src={user.photoURL || ''}
              alt={user.displayName || ''}
              css={profileStyle}
            />
            <div css={textStyle}>
              <div css={titleText}>닉네임</div>
              <div css={inputText}>{user.displayName || ''}</div>
            </div>
            <div css={textStyle}>
              <div css={titleText}>이메일</div>
              <div css={inputText}>{user.email}</div>
            </div>
          </>
        )}
        <div css={logoutBtn}>
          <LongButton onClick={logOut}>로그아웃</LongButton>
        </div>
      </div>
    )
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const profileStyle = css`
  height:150px;
  width: 150px;
  margin-top: 9rem;
  margin-bottom: 2rem;
  border-radius: 50%;
  object-fit:cover;
`
const textStyle = css`
  margin-top: 3rem;
  border-bottom: 2px solid #ebebeb;
  font-size: ${theme.fontSize.md};
  height: 50px;
  width: 24.5em;
  padding-left: 3px;
`
const titleText = css`
  color: ${theme.colors.darkYellow};
  margin-bottom: 10px;
`
const inputText = css`
  color: ${theme.colors.grey};
`
const logoutBtn = css`
  margin-top: 9em;
`