import { Link } from 'react-router-dom'

import useUserStore from '@/store/useUserStore'
import Layout from '@/components/Layout'

export default function Index() {
  const userStore = useUserStore()

  return (
    <Layout showFooter={false} className="bg-netural-120 h-screen ">
      <div className="container mx-auto text-white">
        <div>
        {userStore.name ? `${userStore.name} 使用者已登入` : ''}
        </div>
        <ul className='mt-10'>
          <li>
            <Link to="signup" className='text-primary'>註冊</Link>
          </li>
          <li>
            <Link to="signin" className='text-primary'>登入</Link>
          </li>
        </ul>
        <div className='mt-4' onClick={() => userStore.clearUser()}>
          <button className='btn'>登出</button>
        </div>
      </div>
    </Layout>
  )
}
