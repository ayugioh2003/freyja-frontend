
import { createBrowserRouter,  } from 'react-router-dom'

import Index from './routes/index'
import Signup from './routes/signup'
import Signin from './routes/signin'

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
    path: 'signin',
    element: <Signin />,
  },
])

export default router