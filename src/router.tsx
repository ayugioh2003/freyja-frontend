
import { createBrowserRouter,  } from 'react-router-dom'

import Index from './routes/index'
import Signup from './routes/signup'
import Login from './routes/login'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Index />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'login',
    element: <Login />,
  },
])

export default router