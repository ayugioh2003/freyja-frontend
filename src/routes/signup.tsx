import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

import cityTownList from '@/assets/data/cityTown.json'
import Layout from '@/components/Layout'
import { signup } from '@/services/UserService'

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
    status: {
      progress: number 
      label: string
    }
    index: number
    isActive: boolean
  }
  const Status = ({ status, index, isActive }: StatusProps) => {
    return (
      <>
        <div
          className="text-center cursor-pointer py-4 text-white"
          onClick={() => setProgress(status.progress)}
        >
          <div
            className={`inline-flex w-8 h-8 justify-center items-center mb-1 rounded-full ${
              isActive
                ? 'bg-primary'
                : 'border border-netural-60 text-netural-60'
            }`}
          >
            {status.progress}
          </div>
          <div className={`${isActive ? 'text-white' : 'text-netural-60'}`}>
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

          return (
            <Status
              status={status}
              index={index}
              isActive={isActive}
              key={status.progress}
            ></Status>
          )
        })}
      </div>
    </div>
  )
}

export default function Signup() {
  const [progress, setProgress] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const defaultValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    // birthday
    year: '',
    month: '',
    date: '',
    // address zipcode detail
    city: '',
    town: '',
    detail: '',
    confirm: false,
  }

  const {
    register, // 資料狀態
    handleSubmit, // 針對表單送出的處理方式。會觸發下面的 onSubmit
    control, // 讓 useWatch 知道在監聽哪個表單，定位用
    formState: { errors }, // 錯誤狀態
  } = useForm({
    defaultValues,
    mode: 'onTouched', // 點擊到 input 就會進行驗證
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: typeof defaultValues) => {
    const { name, email, password, phone, year, month, date, town, detail } =
      data
    setIsLoading(true)

    try {
      const response = await signup({
        name,
        email,
        password,
        phone,
        birthday: `${year}/${month}/${date}`,
        address: {
          zipcode: Number(town),
          detail,
        },
      })

      Swal.fire({
        toast: true,
        timer: 3000,
        position: 'top-end',
        showConfirmButton: false,
        title: 'oh ya!',
        text: `hi hi ${response.result.name} 註冊成功！`,
        icon: 'success',
      })

      Swal.fire({
        toast: true,
        timer: 3000,
        position: 'top-end',
        showConfirmButton: false,
        // title: 'oh ya!',
        text: `將在 3 秒後跳轉回首頁`,
        icon: 'info',
      })
      
      navigate('/')
    } catch (error) {
      console.error(error)
      Swal.fire({
        toast: true,
        timer: 3000,
        position: 'top-end',
        showConfirmButton: false,
        title: 'oh oh!',
        text: (error as ApiError)?.message,
        icon: 'error',
      })
    }

    setIsLoading(false)
  }

  const watchForm = useWatch({ control })
  useEffect(() => {
    // console.log('watchForm', watchForm)
  }, [watchForm])

  return (
    <Layout showFooter={false} className="bg-netural-120 min-h-screen ">
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
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-full w-md-1/2 flex justify-center"
        >
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
                    placeholder="hello@example.com"
                    className={`input w-full ${
                      errors.email && 'border-alert-100'
                    }`}
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'email 為必填',
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email 格式不正確'
                      }      
                    })}
                  />
                  {errors.email && (
                    <div className="text-alert-20">
                      {errors?.email?.message}
                    </div>
                  )}
                </label>
                <label htmlFor="">
                  <div className="mb-2">密碼</div>
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
                <label htmlFor="">
                  <div className="mb-2">確認密碼</div>
                  <input
                    type="password"
                    placeholder="請再輸入一次密碼"
                    className={`input w-full ${
                      errors.password && 'border-alert-100'
                    }`}
                    {...register('passwordConfirm', {
                      required: {
                        value: true,
                        message: 'passwordConfirm 為必填',
                      },
                      validate: {
                        validPassword: (passwordConfirm) => passwordConfirm === watchForm.password || '密碼不一致',                      },
                    })}
                  />
                  {errors.passwordConfirm && (
                    <div className="text-alert-20">
                      {errors?.passwordConfirm?.message}
                    </div>
                  )}
                </label>

                <div className="mt-8">
                  <button
                    className="btn bg-netural-40 text-netural-60 w-full"
                    onClick={(e) => {
                      const regex = /^\S+@\S+$/i
                      if (!regex.test(watchForm.email || '')) {
                        e.preventDefault()
                        e.stopPropagation()
                        return
                      }

                      if (
                        !watchForm.password ||
                        watchForm.password !== watchForm.passwordConfirm
                      ) {
                        e.preventDefault()
                        e.stopPropagation()
                        Swal.fire({
                          toast: true,
                          timer: 3000,
                          position: 'top-end',
                          showConfirmButton: false,
                          title: 'oh oh!',
                          text: `密碼未輸入 or 確認密碼不一致。請重新輸入`,
                          icon: 'info',
                        })
                        return
                      }
                      setProgress(2)
                    }}
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
                    placeholder="請輸入姓名"
                    className={`input w-full ${
                      errors.name && 'border-alert-100'
                    }`}
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'name 為必填',
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-alert-20">{errors?.name?.message}</div>
                  )}
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">手機號碼</div>
                  <input
                    type="phone"
                    placeholder="請輸入手機號碼"
                    className={`input w-full ${
                      errors.phone && 'border-alert-100'
                    }`}
                    {...register('phone', {
                      required: {
                        value: true,
                        message: 'phone 為必填',
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="text-alert-20">
                      {errors?.phone?.message}
                    </div>
                  )}
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">生日</div>
                  <div className="flex gap-1">
                    <div className="w-full">
                      <select
                        className={`input w-full ${
                          errors.password && 'border-alert-100'
                        }`}
                        {...register('year', {
                          required: {
                            value: true,
                            message: 'year 為必填',
                          },
                        })}
                      >
                        <option disabled value="">請選擇年份</option>
                        {[...new Array(100)].map((_, index) => {
                          return (
                            <option key={index}>
                              {dayjs().get('year') - 100 + index}
                            </option>
                          )
                        })}
                      </select>
                      {errors.year && (
                        <div className="text-alert-20">
                          {errors?.year?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        className={`input w-full ${
                          errors.month && 'border-alert-100'
                        }`}
                        {...register('month', {
                          required: {
                            value: true,
                            message: 'month 為必填',
                          },
                        })}
                      >
                        <option disabled value="">請選擇月份</option>
                        {[...new Array(12)].map((_, index) => {
                          return <option key={index}>{index + 1}</option>
                        })}
                      </select>
                      {errors.month && (
                        <div className="text-alert-20">
                          {errors?.month?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        className={`input w-full ${
                          errors.date && 'border-alert-100'
                        }`}
                        {...register('date', {
                          required: {
                            value: true,
                            message: 'date 為必填',
                          },
                        })}
                      >
                        <option disabled value="">請選擇日期</option>
                        {[...new Array(31)].map((_, index) => {
                          return <option key={index}>{index + 1}</option>
                        })}
                      </select>
                      {errors.date && (
                        <div className="text-alert-20">
                          {errors?.date?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
                <label htmlFor="">
                  <div className="mb-2 text-white">地址</div>
                  <div className="flex gap-1 mb-2">
                    <div className="w-full">
                      <select
                        className={`input w-full ${
                          errors.city && 'border-alert-100'
                        }`}
                        {...register('city', {
                          required: {
                            value: true,
                            message: 'city 為必填',
                          },
                        })}
                      >
                        <option disabled value="">請選擇縣市</option>
                        {cityTownList.map((cityTown) => {
                          return (
                            <option key={cityTown.city}>{cityTown.city}</option>
                          )
                        })}
                      </select>
                      {errors.city && (
                        <div className="text-alert-20">
                          {errors?.city?.message}
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <select
                        className={`input w-full ${
                          errors.town && 'border-alert-100'
                        }`}
                        {...register('town', {
                          required: {
                            value: true,
                            message: '鄉鎮區為必填',
                          },
                        })}
                      >
                        <option disabled value="">請選擇鄉鎮區</option>
                        {cityTownList
                          .find((item) => item.city === watchForm.city)
                          ?.districts.map((item) => {
                            return (
                              <option key={item.name} value={item.zip}>
                                {item.name}
                              </option>
                            )
                          })}
                      </select>
                      {errors.town && (
                        <div className="text-alert-20">
                          {errors?.town?.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="type"
                    placeholder="請輸入詳細地址"
                    className={`input w-full ${
                      errors.detail && 'border-alert-100'
                    }`}
                    {...register('detail', {
                      required: {
                        value: true,
                        message: 'detail 為必填',
                      },
                    })}
                  />
                  {errors.detail && (
                    <div className="text-alert-20">
                      {errors?.detail?.message}
                    </div>
                  )}
                </label>

                <label>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className={`checkbox-primary checkbox-md ${
                        errors.email && 'border-alert-100'
                      }`}
                      {...register('confirm', {
                        required: {
                          value: true,
                          message: 'confirm 為必填',
                        },     
                      })}
                    />
                    <span className="text-white">
                      我已閱讀並同意本網站個資使用規範
                    </span>
                  </div>
                  <div>
                    {errors.confirm && (
                      <div className="text-alert-20">
                        {errors?.confirm?.message}
                      </div>
                    )}
                  </div>
                </label>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="btn bg-netural-40 text-netural-60 w-full"
                  >
                    <span>完成註冊</span>
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : null}
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 mb-40">
              <span className="text-white">已經有會員了嗎？</span>
              <Link to="/signin" className="text-primary-100 underline">
                立即登入
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
