import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Swal from 'sweetalert2'

import useUserStore from '@/store/useUserStore'
import { login } from '@/services/UserService'
import Layout from '@/components/Layout'

export default function Signin() {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const defaultValues = {
    email: '',
    password: '',
  }
  const {
    register, // 資料狀態
    handleSubmit, // 針對表單送出的處理方式。會觸發下面的 onSubmit
    // watch,
    // setValue,
    control, // 讓 useWatch 知道在監聽哪個表單，定位用
    formState: { errors }, // 錯誤狀態
  } = useForm({
    defaultValues,
    mode: 'onTouched', // 點擊到 input 就會進行驗證
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const { email, password } = data

    setIsLoading(true)

    try {
      const response = await login({
        email,
        password,
      })

      userStore.setUser(response)

      navigate('/')

      Swal.fire({
        toast: true,
        timer: 3000,
        position: 'top-end',
        showConfirmButton: false,
        title: 'oh ya!',
        text: `hihi ${response.result.name}`,
        icon: 'success',
      })
    } catch (error: unknown) {
      Swal.fire({
        toast: true,
        timer: 3000,
        position: 'top-end',
        showConfirmButton: false,
        title: 'oh oh!',
        text: (error as ApiError)?.message,
        icon: 'error',
      })

      console.error(error)
    }

    setIsLoading(false)
  }

  const watchForm = useWatch({ control })
  useEffect(() => {
    // console.log('watchForm', watchForm)
  }, [watchForm])

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
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="">
                <div className="mb-2 text-white">電子信箱</div>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className={`input w-full ${
                    errors.email && 'border-alert-100'
                  }`}
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'email 為必填',
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-alert-20">{errors?.email?.message}</div>
                )}
              </label>
              <label htmlFor="">
                <div className="mb-2 text-white">密碼</div>
                <input
                  type="password"
                  placeholder="請輸入密碼"
                  className={`input w-full ${
                    errors.password && 'border-alert-100'
                  }`}
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'password 為必填',
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-alert-20">
                    {errors?.password?.message}
                  </div>
                )}
              </label>

              <hr />

              <div className="flex justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="confirm"
                    id=""
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-white">記住帳號</span>
                </label>
                <Link to="/" className="text-primary underline">
                  忘記密碼？
                </Link>
              </div>

              <div className="mt-8 mb-4">
                <button
                  type="submit"
                  className="btn bg-netural-40 text-netural-60 w-full"
                >
                  會員登入
                  {isLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : null}
                </button>
              </div>
            </form>

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
