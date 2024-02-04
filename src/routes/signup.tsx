import { Link } from 'react-router-dom'
import { useState } from 'react'
import Layout from '@/components/Layout'

type ProgressBarProps = {
  progress: number
  setProgress: (progress: number) => void
}
const ProgressBar = ({ progress, setProgress }: ProgressBarProps) => {
  const progressStatusList = [
    {
      progress: 1,
      label: '輸入信箱及密碼',
    },
    {
      progress: 2,
      label: '填寫基本資料',
    },
  ]


  type StatusProps = {
    status: any 
    index: number 
    isActive: boolean
  }
  const Status = ({ status, index, isActive,  }: StatusProps) => {
    return (
      <>
        <div
          className="text-center cursor-pointer py-4 text-white"
          onClick={() => setProgress(status.progress)}
        >
          <div
            className={`inline-flex w-8 h-8 justify-center items-center mb-1 rounded-full ${
              isActive ? 'bg-primary' : 'border border-netural-60 text-netural-60'
            }`}
          >
            {status.progress}
          </div>
          <div
            className={`${isActive ? 'text-white' : 'text-netural-60'}`}
          >
            {status.label}
          </div>
        </div>
        {!(progressStatusList.length - 1 === index) ? (
          <div className="flex-1 h-[2px] bg-netural-60"></div>
        ) : null}
      </>
    )
  }

  return (
    <div className="py-4">
      <div className="pb-8 flex items-center justify-between gap-2">
        {progressStatusList.map((status, index) => {
          const isActive = progress >= status.progress

          return <Status status={status} index={index} isActive={isActive} key={status.progress}></Status>

        })}
      </div>
    </div>
  )
}

export default function Signup() {
  const [progress, setProgress] = useState(1)

  return (
    <Layout showFooter={false} className="bg-netural-120 h-100 ">
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
            <div className="mt-10 text-white">
              <div className="text-primary-100 font-bold mb-2">
                享樂酒店，誠摯歡迎
              </div>
              <div className="font-bold text-5xl pb-4">立即註冊</div>
            </div>

            <ProgressBar progress={progress} setProgress={setProgress} />

            {/* email and password */}
            {progress === 1 ? (
              <div className="flex flex-col gap-4">
                <label htmlFor="">
                  <div className="mb-2">電子信箱</div>
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    className="input w-full"
                  />
                </label>
                <label htmlFor="">
                  <div className="mb-2">密碼</div>
                  <input
                    type="password"
                    name="password"
                    placeholder="請輸入密碼"
                    className="input w-full"
                  />
                </label>
                <label htmlFor="">
                  <div className="mb-2">確認密碼</div>
                  <input
                    type="password"
                    placeholder="請再輸入一次密碼"
                    className="input w-full"
                  />
                </label>

                <div className="mt-8">
                  <button
                    className="btn bg-netural-40 text-netural-60 w-full"
                    onClick={() => setProgress(2)}
                  >
                    下一步
                  </button>
                </div>
              </div>
            ) : null}

            {/* basic info */}
            {progress === 2 ? (
              <div className="flex flex-col gap-4">
                <label htmlFor="">
                  <div className="mb-2 text-white">姓名</div>
                  <input
                    type="text"
                    name="name"
                    placeholder="請輸入姓名"
                    className="input w-full"
                  />
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">手機號碼</div>
                  <input
                    type="phone"
                    name="phone"
                    placeholder="請輸入手機號碼"
                    className="input w-full"
                  />
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">生日</div>
                  <div className="flex gap-1">
                    <select id="year" className="input w-full">
                      <option disabled>請選擇年份</option>
                      <option>...</option>
                    </select>
                    <select id="month" className="input w-full">
                      <option>請選擇月份</option>
                      <option>...</option>
                    </select>
                    <select id="date" className="input w-full">
                      <option>請選擇日期</option>
                      <option>...</option>
                    </select>
                  </div>
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">地址</div>
                  <div className='flex gap-1 mb-2'>
                    <select id="city" name="city" className="input w-full">
                      <option>請選擇縣市</option>
                      <option>...</option>
                    </select>
                    <select id="town" name="town" className="input w-full">
                      <option>請選擇鄉鎮</option>
                      <option>...</option>
                    </select>
                  </div>
                  <input
                    type="type"
                    name="address-detail"
                    placeholder="請輸入詳細地址"
                    className="input w-full"
                  />
                </label>

                <label htmlFor="">
                  <input type="checkbox" name="confirm" id="" />
                  <span className='text-white'>我已閱讀並同意本網站個資使用規範</span>
                </label>

                <div className="mt-8">
                  <button className="btn bg-netural-40 text-netural-60 w-full">
                    完成註冊
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 mb-40">
              <span className='text-white'>已經有會員了嗎？</span>
              <Link to="/signin" className="text-primary-100 underline">
                立即登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
