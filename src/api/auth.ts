export const URI_API = 'http://localhost:8080' // adapte selon ton backend

export async function login(email: string, password: string) {
  const res = await fetch(`${URI_API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // important pour le cookie HttpOnly (refresh)
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Email ou mot de passe invalide')
  const data = await res.json() // { accessToken }
  return data.accessToken as string
}

export async function logout() {
  await fetch(`${URI_API}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}
