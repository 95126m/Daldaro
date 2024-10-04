import { useState, useRef, useEffect } from 'react';
import { updateProfilePhoto, signUpWithEmailAndPassword } from '@/api/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from '@/stores/header';
import LongButton from '@/components/common/LongButton';
import { css } from '@emotion/react';
import theme from '@/styles/Theme';
import { FaCamera } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/api/firebaseApp';

export default function NewAccount() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTitle('회원가입');
  }, [setTitle]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 회원가입 진행
      const signedUpUser = await signUpWithEmailAndPassword(email, password, displayName);
      
      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, 'Users', signedUpUser.uid), {
        displayName,
        email,
        uid: signedUpUser.uid,
        photoURL: previewPhoto || '',
        createdAt: new Date(),
      });

      // 선택된 파일이 있으면 프로필 사진 업로드
      if (file) {
        const photoURL = await updateProfilePhoto(signedUpUser.uid, file);
        setPreviewPhoto(photoURL); // 저장 후 미리보기 업데이트
      }

      navigate('/sign-in', {state: { showToast: true }})
    } catch (err) {
      setError('회원가입 실패!');
      console.error(err);
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // 파일 상태에 저장
      const fileURL = URL.createObjectURL(selectedFile); // 브라우저에서 미리보기 URL 생성
      setPreviewPhoto(fileURL); // 미리보기 이미지 설정
    }
  };

  return (
    <div css={containerStyle}>
      <form onSubmit={handleSubmit} css={formStyle}>
        <div css={photoContainerStyle}>
          <img
            src={previewPhoto || '/src/assets/default-profile.jpg'} // 기본 이미지 경로 지정
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
          <input
            type="text"
            placeholder="닉네임"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            css={inputStyle}
          />
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            css={inputStyle}
          />
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
          <LongButton type="submit">가입하기</LongButton>
        </div>
      </form>      
    </div>
  );
}
const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 7rem;
  background-color: ${theme.colors.white};
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
  width: 100%;
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
