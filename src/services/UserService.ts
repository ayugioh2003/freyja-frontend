import { get, post } from '@/utils/AjaxUtil'
import config from '@/config'

// 登入
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>(
    `${config.baseURL}/api/v1/user/login`,
    request
  )
  return response
}

// 註冊
export const signup = async (
  request: SignupRequest
): Promise<SignupResponse> => {
  const response = await post<SignupResponse>(
    `${config.baseURL}/api/v1/user/signup`,
    request
  )
  return response
}

// 檢查是否登入
export const check = async (token: string): Promise<CheckResponse> => {
  const response = await get<CheckResponse>(
    `${config.baseURL}/api/v1/user/check`,
    token
  )
  return response
}

// 忘記密碼
// export const forgot = async (request: ForgotRequest): Promise<ForgotResponse> => {
//     const repsonse = await post<ForgotResponse>(`${config.baseURL}/api/v1/user/forgot`, request)
//     return repsonse
// }

// // 取得使用者資訊
// export const queryUser = async (token: string): Promise<QueryUserResponse> => {
//     const repsonse = await get<QueryUserResponse>(`${config.baseURL}/api/v1/user/`, token)
//     return repsonse
// }

// // 更新使用者資訊
// export const updateUser = async (request: UpdateUserRequest, token: string): Promise<void> => {
//     await put(`${config.baseURL}/api/v1/user/`, request, token)
// }
