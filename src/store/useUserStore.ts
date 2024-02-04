import { create } from 'zustand'

const userTemplate = {
  token: '',
    name: '',
    email: '',
    phone: '',
    id: '',
    address: {
        zipcode: 0,
        detail: '',
        city: '',
        county: '',
    },
}

const useUserStore = create<UserState>(set => ({
    ...JSON.parse(JSON.stringify(userTemplate)),
    setToken: (token: string) => set(() => ({token})),
    setUser: (user) => set(() => ({
        token: user.token,
        name: user.result.name,
        email: user.result.email,
        phone: user.result.phone,
        id: user.result.id,
        address: user.result.address
    })),
    clearUser: () => set(() => {
      return JSON.parse(JSON.stringify(userTemplate))
    })
}))

export default useUserStore
