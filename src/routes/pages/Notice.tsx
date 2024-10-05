import { useEffect, useState } from 'react'
import { auth, db } from '@/api/firebaseApp'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import { useHeaderStore } from '@/stores/header'
import { BiPlus } from "react-icons/bi"

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState<boolean>()

  useEffect(() => {
      setTitle('공지사항')
  }, [setTitle])
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'Users', user.uid))
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true)
        }
      }
    }
    checkAdminStatus()
  }, [])
  
  const handleAddBtn = () => {
    navigate('/add-notice')
  }

  return (
    <div css={contentStyle}>
      <div css={formInput}>
      </div>
      {isAdmin && <BiPlus onClick={handleAddBtn} css={addBtn} />}
    </div>
  )
}

const contentStyle = css`
  display: flex;  
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  `;

const formInput = css`
  display: flex;
  position: fixed;
  top: 7rem;
  width: 23rem;
  height: 40rem;
  border-top: 1px solid ${theme.colors.darkYellow};
  border-bottom: 1px solid ${theme.colors.darkYellow};
  justify-content: center;
  align-items: center;
`;

const addBtn = css`
  z-index: 3;
  position: fixed;
  left: 69rem;
  top: 48rem;
  border: none;
  width: 45px;
  height: 45px;
  color: ${theme.colors.white};
  border-radius: 30%;
  background-color: ${theme.colors.middleYellow};
  cursor: pointer;
  transition: transform 0.7s ease;
  :hover {
    transform: rotate(180deg);
  }
`;