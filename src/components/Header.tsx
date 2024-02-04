import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '@iconify-icon/react'

// import SvgIcon from './SvgIcon'
// import LogoImg from '@/assets/svg/LOGO.svg'
import LogoPng from '@/assets/png/logo_white.png'
import useUserStore from '@/store/useUserStore'

// const loginStatus = true

type HeaderProps = {
  className?: string
}
const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate()
  const userStore = useUserStore()
  // const location = useLocation()
  // const [isLogin] = useState<boolean>(loginStatus)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className={`px-3 md:px-20 py-4 md:py-20 sticky bg-transparent ${className}`}
    >
      <div className="flex justify-between items-center">
        <h2>
          <Link to="/">
            <img className="w-[110px] md:w-auto" src={LogoPng} alt="" />
          </Link>
        </h2>

        <div className="gap-4 text-white hidden md:flex">
          <div
            className="cursor-pointer py-4 px-8"
            onClick={() => navigate('/')}
          >
            房客旅宿
          </div>
          {!userStore.name ? (
            <div
              className="cursor-pointer py-4 px-8"
              onClick={() => navigate('/signin')}
            >
              會員登入
            </div>
          ) : (
            <div
              className="cursor-pointer py-4 px-8 flex gap-1"
              onClick={() => navigate('/')}
            >
              <Icon icon="iconamoon:profile-circle" width={24} height={24}></Icon>
              <span>{ userStore.name }</span>
            </div>
          )}
          <div
            className="cursor-pointer py-4 px-8 bg-primary-100 rounded-md"
            onClick={() => navigate('/')}
          >
            立即訂房
          </div>
        </div>

        <div
          className="block md:hidden text-white cursor-pointer p-4"
          onClick={() => setIsMenuOpen(true)}
        >
          <Icon icon="mdi:menu" width={24} height={24}></Icon>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-netural-120 text-white flex md:hidden flex-col justify-center">
          <div
            onClick={() => setIsMenuOpen(false)}
            className="p-4 text-right cursor-pointer absolute right-0 top-0"
          >
            <Icon icon="mdi:close" width={48} height={48}></Icon>
          </div>

          <div>
            <div className="gap-4 text-white">
              <div
                className="cursor-pointer py-4 px-8"
                onClick={() => navigate('/')}
              >
                房客旅宿
              </div>
              <div
                className="cursor-pointer py-4 px-8"
                onClick={() => navigate('/signin')}
              >
                會員登入
              </div>
              <div
                className="cursor-pointer py-4 px-8 mx-3 bg-primary-100 rounded-md"
                onClick={() => navigate('/')}
              >
                立即訂房
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
