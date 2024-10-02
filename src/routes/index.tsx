import { createBrowserRouter } from 'react-router-dom';
import NavbarLayout from '@/components/layouts/navigations/NavbarLayout';
import Home from '@/routes/pages/Home';
import NewAccount from '@/routes/pages/NewAccount';
import Profile from '@/routes/pages/Profile';
import SignIn from '@/routes/pages/SignIn';
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
          { path: '/profile', element: <Profile /> },
        ],
      },
      { path: '/new-account', element: <NewAccount /> }, 
    ],
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '*', element: <NotFound /> },
]);
