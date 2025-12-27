import apiClient from '@/lib/axios'

export const api = {
  // GET isteği
  get: <T>(url: string, params?: unknown) =>
    apiClient.get<T>(url, { params }),

  // POST isteği
  post: <T>(url: string, data?: unknown) =>
    apiClient.post<T>(url, data),

  // PUT isteği
  put: <T>(url: string, data?: unknown) =>
    apiClient.put<T>(url, data),

  // DELETE isteği
  delete: <T>(url: string) =>
    apiClient.delete<T>(url),
}
