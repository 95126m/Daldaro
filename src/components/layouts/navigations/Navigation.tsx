import { BiSolidHome, BiSolidCat, BiCart, BiHeadphone, BiSearch } from "react-icons/bi";
  import { css } from '@emotion/react'
  import theme from '@/styles/Theme'
  import NavigationItem from './NavigationItem'
  import { useNavigate } from 'react-router-dom'
  
  const Navigation = () => {
    const navigate = useNavigate()
  
    const handleNavigation = (path: string) => {
      navigate(path)
    }
  
    return (
      <nav>
        <ul css={navbar}>
            <NavigationItem
            path="/"
            Icon={BiSolidHome}
            label="홈"
            onClick={() => handleNavigation('/')}
            />
            <NavigationItem
            path="/search"
            Icon={BiSearch}
            label="검색"
            onClick={() => handleNavigation('/search')}
            />
            <NavigationItem
            path="/cart"
            Icon={BiCart}
            label="장바구니"
            onClick={() => handleNavigation('/cart')}
            />
            <NavigationItem
            path="/profile"
            Icon={BiSolidCat}
            label="내 정보"
            onClick={() => handleNavigation('/profile')}
            />
                <NavigationItem
            path="/service"
            Icon={BiHeadphone}
            label="고객센터"
            onClick={() => handleNavigation('/service')}
          />
        </ul>
      </nav>
    )
  }
  
  const navbar = css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 72px;
    position: fixed;
    width: 429px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background-color: ${theme.colors.white};
    color: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.lightGrey};
    z-index: 9;
  `

  export default Navigation
