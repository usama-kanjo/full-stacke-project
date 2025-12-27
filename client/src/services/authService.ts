import { api } from './apiClient'
import { User, LoginData, RegisterData } from '@/types/user'

export const authService = {
  // Giriş yap
  login: async (data: LoginData): Promise<{ user: User }> => {
    const response = await api.post<{ user: User }>('/user/login', data)
    return response.data
  },

  // Kayıt ol
  register: async (data: RegisterData): Promise<{ user: User }> => {
    const response = await api.post<{ user: User }>('/user/register', data)
    return response.data
  },

  // Profil bilgilerini getir
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile')
    return response.data
  },

  // Çıkış yap
  logout: async (): Promise<void> => {
    await api.post('/user/logout')
  },
  emailVerify: async (token: string): Promise<void> => {
    await api.get(`/user/verify-email/${token}`)
  },
  resendVerificationEmail: async (): Promise<void> => {
    await api.post('/user/resend-verification-email')
  }
}
