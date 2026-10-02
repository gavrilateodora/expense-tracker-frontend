import api from './api'

interface AuthRequest {
  email: string
  password: string
}

export async function login(data: AuthRequest): Promise<string> {
  const response = await api.post('/auth/login', data)
  return response.data
}

export async function register(data: AuthRequest): Promise<string> {
  const response = await api.post('/auth/register', data)
  return response.data
}

export async function verifyEmail(token: string): Promise<string> {
  const response = await api.post(`/auth/verify-email?token=${token}`)
  return response.data
}