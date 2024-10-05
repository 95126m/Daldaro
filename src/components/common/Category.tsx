// import React from "react";
import { css } from '@emotion/react'
import theme from '@/styles/Theme'

interface CategoryProps {
  selectedCategory: string[];  // 타입 지정
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;  // 타입 지정
}

export default function Category({selectedCategory, setSelectedCategory} : CategoryProps) {
  const categories = ['전체', '커피', '차', '간식']

  const handleCategoryClick = (category: string) => {
    setSelectedCategory([category])
  }

  return (
    <div css={containerStyle}>
      <div css={buttonContainer}>
        {categories.map((category) => (
          <button
            key={category}
            css={categoryButton(selectedCategory.includes(category))}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory}
    </div>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const buttonContainer = css`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const categoryButton = (isSelected: boolean) => css`
  padding: 5px 15px;
  font-weight: ${theme.fontWeight.bold};
  background-color: ${isSelected ? '#ffc71d' : '#fff'};
  color: ${isSelected ? '#fff' : '#ffc71d'};
  border: 1px solid ${theme.colors.darkYellow};
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:active {
    background-color: #ffc71d;
    color: white;
  }
`;