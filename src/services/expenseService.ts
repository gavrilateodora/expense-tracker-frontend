import api from './api'

export interface Expense {
  id: number
  amount: number
  description: string
  date: string
}

export async function getExpenses(token: string): Promise<Expense[]> {
  const response = await api.get('/expenses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}