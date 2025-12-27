// Kullanıcı tipi
export interface User {
  id: string | number
  email: string
  name?: string
  createdAt?: string
  updatedAt?: string
  // 👇 İhtiyacına göre bu alanları değiştirebilirsin
  // username?: string
  // role?: 'user' | 'admin'
  // isActive?: boolean
}

// Giriş yaparken kullanılacak veri tipi
export interface LoginData {
  email: string
  password: string
  // 👇 Unutma şifreyi hatırla gibi ek alanlar ekleyebilirsin
  // rememberMe?: boolean
}

// Kayıt olurken kullanılacak veri tipi
export interface RegisterData {
  email: string
  password: string
  passwordConfirm?: string
  name: string
  // 👇 İhtiyacın olan diğer alanları ekleyebilirsin
  // username?: string
  acceptTerms?: boolean
}

// Hata tipi (opsiyonel)
export interface AuthError {
  message: string
  code?: string
  field?: string
}
