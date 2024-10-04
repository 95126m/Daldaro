import { useState, useRef, useEffect } from 'react'
import { updateProfilePhoto, signUpWithEmailAndPassword } from '@/api/firebaseAuth'
import { useNavigate } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import LongButton from '@/components/common/LongButton'
import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import { FaCamera } from 'react-icons/fa'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp'
import Modal from '@/components/common/Modal'
import TheHeader from '@/components/layouts/headers/TheHeader'

export default function NewAccount() {
  const setTitle = useHeaderStore((state) => state.setTitle)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const initialDisplayName = useRef(displayName)
  const initialEmail = useRef(email)
  const initialPhotoURL = useRef(previewPhoto)
  const [isModified, setIsModified] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setTitle('회원가입')
  }, [setTitle])

  useEffect(() => {
    setIsModified(
      displayName !== initialDisplayName.current || email !== initialEmail.current || previewPhoto !== initialPhotoURL.current
    );
  }, [displayName, email, previewPhoto])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!displayName || !email || !previewPhoto) return
    try {
      // 회원가입 진행
      const signedUpUser = await signUpWithEmailAndPassword(email, password, displayName)
      
      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, 'Users', signedUpUser.uid), {
        displayName,
        email,
        uid: signedUpUser.uid,
        photoURL: previewPhoto || '',
        createdAt: new Date(),
      })

      if (file) {
        const photoURL = await updateProfilePhoto(signedUpUser.uid, file)
        setPreviewPhoto(photoURL);
      }

      navigate('/sign-in', {state: { showToast: true }})
    } catch (err) {
      setError('회원가입 실패!')
      console.error(err)
    }
  }

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile) 
      const fileURL = URL.createObjectURL(selectedFile) 
      setPreviewPhoto(fileURL) 
    }
  }

  const handleOpenModal = () => {
    if (isModified) {
      setShowConfirmModal(true)
    } else {
      navigate(-1)
    }
  }

  const handleCloseModal = () => {
    setShowConfirmModal(false)
  }

  const handleConfirmLeave = () => {
    setShowConfirmModal(false)
    navigate(-1)
  }

  return (
    <div css={containerStyle}>
      <TheHeader onOpenModal={handleOpenModal} />
      <form onSubmit={handleSubmit} css={formStyle}>
        <div css={photoContainerStyle}>
          <img
            src={previewPhoto || '/src/assets/default-profile.jpg'} 
            alt="프로필 사진"
            css={profilePhoto}
            onClick={handlePhotoClick}
          />
          <div css={iconStyle} onClick={handlePhotoClick}>
            <FaCamera size={20} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            css={fileInputStyle}
          />
        </div>
        <div css={inputWrapperStyle}>
          <div style={{ marginBottom: '10px', color: '#ffc71d', fontWeight: 'bold' }}>닉네임</div>
          <input
            type="text"
            placeholder="닉네임"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            css={inputStyle}
          />

          <div style={{ marginBottom: '10px', color: '#ffc71d', fontWeight: 'bold' }}>이메일</div>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            css={inputStyle}
          />

          <div style={{ marginBottom: '10px', color: '#ffc71d', fontWeight: 'bold' }}>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            css={inputStyle}
          />
        </div>
        {error && <p>{error}</p>}
        <div css={buttonWrapperStyle}>
          <LongButton type="submit" disabled={!displayName || !email || !password}>가입하기</LongButton>
        </div>
      </form>   
      
      {showConfirmModal && (
        <Modal 
          isOpen={showConfirmModal}
          onClose={handleCloseModal} 
          onConfirm={handleConfirmLeave} 
          title="작성중이던 내용이 있어요! 😦" 
          description="페이지를 나가면 내용이 저장되지않아요." 
        />
      )}

    </div>
  )
}
const containerStyle = css`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding-top: 6rem;
  background-color: ${theme.colors.white};
  height: 100%;
  overflow-y: auto;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 430px;
  padding: 20px;
  background-color: ${theme.colors.white};
`;

const inputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 84%;
  margin-top: 3rem;
`;

const inputStyle = css`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.darkYellow};
  border-radius: 3px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.darkGrey};
  font-weight: ${theme.fontWeight.semiBold};
  outline: none;
  margin-bottom: 30px;

  &::placeholder {
    color: ${theme.colors.middleGrey};
    font-size: ${theme.fontSize.sm};
  }
`;

const buttonWrapperStyle = css`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const photoContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const profilePhoto = css`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const iconStyle = css`
  position: absolute;
  bottom: 0px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  color: white;
`;

const fileInputStyle = css`
  display: none;
`;
