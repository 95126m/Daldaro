import Container from '@/components/layouts/Container'
import TheHeader from '@/components/layouts/headers/TheHeader'
import Navigation from '@/components/layouts/navigations/Navigation'
import Splash from '@/components/common/Splash'
import { useLocation } from 'react-router-dom'

export default function NavbarLayout() {
  const location = useLocation()
  const hideHeaderOnRoutes = ['/'];
  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <TheHeader />}
      <Container />
      <Navigation />
      <Splash />
    </>
  )
}