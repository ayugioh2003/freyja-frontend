import { Link } from 'react-router-dom'
// import { useState } from 'react'
import Layout from '@/components/Layout'

export default function Signin() {
  return (
    <Layout showFooter={false} className="bg-netural-120 h-screen ">
      <div className="flex gap-4">
        {/* left col */}
        <div className="w-1/2 hidden lg:block">
          <img
            style={{ height: 'calc(100vh - 230px)' }}
            className="object-cover object-center"
            src="https://github.com/hexschool/2022-web-layout-training/blob/089c08805225f9e5861d199b084cba8a05bdaa40/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/register.png?raw=true"
            alt=""
          />
        </div>

        {/* right col */}
        <div className="w-full w-md-1/2 flex justify-center">
          <div className="w-full max-w-[600px]">
            <div className="mt-10 text-white mb-8">
              <div className="text-primary-100 font-bold mb-2">
                享樂酒店，誠摯歡迎
              </div>
              <div className="font-bold text-5xl pb-4">立即開始旅程</div>
            </div>

            {/* email and password */}
            <div className="flex flex-col gap-4">
              <label htmlFor="">
                <div className="mb-2 text-white">電子信箱</div>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  className="input w-full"
                />
              </label>
              <label htmlFor="">
                <div className="mb-2 text-white">密碼</div>
                <input
                  type="password"
                  name="password"
                  placeholder="請輸入密碼"
                  className="input w-full"
                />
              </label>

              <div  className='flex justify-between'>
                <label  className='flex items-center gap-2'>
                  <input
                    type="checkbox"
                    name="confirm"
                    id=""
                    className='checkbox checkbox-primary'
                  />
                  <span className="text-white">記住帳號</span>
                </label>
                <Link to="/" className='text-primary underline'>忘記密碼？</Link>
              </div>

              <div className="mt-8 mb-4">
                <button className="btn bg-netural-40 text-netural-60 w-full">
                  會員登入
                </button>
              </div>
            </div>

            <div className="mt-4 mb-40">
              <span className="text-white">沒有會員嗎？</span>
              <Link to="/signup" className="text-primary-100 underline">
                前往註冊
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
