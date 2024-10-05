import { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import theme from '@/styles/Theme'
import { useHeaderStore } from '@/stores/header'
import LongButton from '@/components/common/LongButton'
import { BsImage } from "react-icons/bs";

interface IUploadImage {
  setImg: React.Dispatch<React.SetStateAction<string>>
}

export default function Home({ setImg }: IUploadImage) {
  const setTitle = useHeaderStore(state => state.setTitle)
  const [preview, setPreview] = useState<string>('') // 이미지 미리보기 상태
  const uploadImg = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setTitle('상품 추가')
  }, [setTitle])

  const handleUpload = () => {
    if (uploadImg.current) {
      uploadImg.current.click() // 이미지 클릭 시 파일 선택 창을 여는 로직
    }
  }

  const handlePreview = () => {
    if (uploadImg.current?.files != null) {
      const file = uploadImg.current.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setPreview(imageUrl) // 이미지 URL로 미리보기 설정
        setImg(imageUrl) // 상위 컴포넌트의 img 상태도 업데이트
      }
    }
  }

  return (
    <div css={contentStyle}>
      <div css={formWrapper}>
        <div css={formInput}>
          
          <p css={{ color: '#ffc71d', fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>상품이미지</p>
          <div css={imageRow}>
            <div css={imageContainer} onClick={handleUpload}>
              {preview ? (
                <img src={preview} alt="미리보기" css={previewStyle} />
              ) : (
                  <div css={placeholderStyle}><BsImage css={{fontSize: '30px', color: '#ffc71d'}} /></div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePreview}
              ref={uploadImg}
              style={{ display: 'none' }} // input 요소는 숨겨놓고, 클릭 시 handleUpload로 열림
            />
          </div>
          
          <div css={inputWrap}>
            <p css={{ color: '#ffc71d', fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>제목</p>
            <input type="text" placeholder='제목을 입력하세요.' css={inputStyle} />
          </div>

          <div css={inputWrap}>
            <p css={{ color: '#ffc71d', fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>설명</p>
            <textarea  placeholder='설명을 입력하세요.' css={discriptionStyle} />
          </div>
        </div>

        <LongButton css={successBtn}>완료</LongButton>
      </div>
    </div>
  )
}

const contentStyle = css`
  display: flex;
  width: 100%;
  height: 53rem;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
`;

const formWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const formInput = css`
  display: flex;
  flex-direction: column;
  width: 23rem;
  justify-content: flex-start; 
  align-items: flex-start; 
`;

const imageRow = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const imageContainer = css`
  display: flex;
  width: 200px;
  height: 200px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.middleYellow};
  cursor: pointer; 
`;

const previewStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const placeholderStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: ${theme.colors.middleGrey};
  text-align: center;
`;

const inputWrap = css`
  position: relative;
  margin-top: 30px;
  width: 100%;
`
const inputStyle = css`
  height: 35px;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${theme.colors.darkYellow};
  outline: none;

  ::placeholder {
    padding-left: 10px;
    display: flex;
    width: 100%;
    height: 100%;
    font-size: ${theme.fontSize.xs};
    color: ${theme.colors.middleGrey};
  }
`;

const discriptionStyle = css`
  width: 100%;
  height: 180px;
  padding: 10px; 
  font-size: 16px;
  border: 1px solid ${theme.colors.darkYellow};
  outline: none;
  box-sizing: border-box; 
  resize: none; 
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap; 
  line-height: 1.5;
  margin-bottom: 80px;

  ::placeholder {
    color: ${theme.colors.middleGrey};
    font-size: ${theme.fontSize.xs};
  }
`;

const successBtn = css`
  position: absolute;
`;
