import { useAuth } from '@/stores/auth'

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const auth = useAuth()
  const headers = new Headers(init.headers || {})
  if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`)
  return fetch(input, { ...init, headers })
}
