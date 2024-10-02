import { createBrowserRouter } from 'react-router-dom'
import Home from '@/routes/pages/Home'
import SignIn from '@/routes/pages/SignIn'
import NotFound from '@/routes/pages/NotFound'
import dayjs from 'dayjs'
import RequiresAuth from '@/routes/protected/RequiresAuth'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <RequiresAuth />,
        children: [
          { path: '/', element: <Home /> },
        ]
      }
    ]
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '*', element: <NotFound /> }
])
