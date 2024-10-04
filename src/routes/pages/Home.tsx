import { useEffect, useState } from 'react'
import { auth, db } from '@/api/firebaseApp'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import logo from '@/assets/logo-yellow.png'
import { BiPlus } from "react-icons/bi"

export default function Home() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState<boolean>()
  
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
    navigate('/add-item')
  }

  return (
    <div css={contentStyle}>
      <img css={logoStyle} src={logo} alt="Logo" />
      {isAdmin && <BiPlus onClick={handleAddBtn} css={addBtn} />}
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

const logoStyle = css`
  position: fixed;
  top: 5%;
  left: 50%;
  height: auto;
  width:10rem;
  transform: translate(-50%, -50%);
`;

const addBtn = css`
  position: fixed;
  left: 69rem;
  top: 48rem;
  border: none;
  width: 40px;
  height: 40px;
  color: ${theme.colors.white};
  border-radius: 30%;
  background-color: ${theme.colors.middleYellow};
  cursor: pointer;
  transition: width 0.4s ease, height 0.4s ease, background-color 2s ease;

  :hover {
    background-color: ${theme.colors.darkYellow};
    width: 45px;
    height: 45px;
  }
`