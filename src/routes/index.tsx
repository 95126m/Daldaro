import { createBrowserRouter } from 'react-router-dom';
import NavbarLayout from '@/components/layouts/NavbarLayout';
import Home from '@/routes/pages/Home';
import NewAccount from '@/routes/pages/NewAccount';
import Profile from '@/routes/pages/Profile';
import SignIn from '@/routes/pages/SignIn';
// import Search from '@/routes/pages/';
import Cart from '@/routes/pages/SignIn';
import Service from '@/routes/pages/SignIn';
import NotFound from '@/routes/pages/NotFound';
import dayjs from 'dayjs';
import RequiresAuth from '@/routes/protected/RequiresAuth';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const router = createBrowserRouter([
  {
    element: <NavbarLayout />, 
    children: [
      {
        element: <RequiresAuth />, 
        children: [
          { path: '/', element: <Home /> },
          // { path: '/search', element: <Search /> },
          { path: '/cart', element: <Cart /> },
          { path: '/profile', element: <Profile /> },
          { path: '/service', element: <Service /> },
        ],
      },
      { path: '/new-account', element: <NewAccount /> }, 
    ],
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '*', element: <NotFound /> },
]);
