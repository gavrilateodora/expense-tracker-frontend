import api from './api'

export interface Expense {
  id: number
  amount: number
  description: string
  date: string
}

export interface ExpenseInput {
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

export async function createExpense(
  token: string,
  expense: ExpenseInput
): Promise<Expense> {
  const response = await api.post('/expenses', expense, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export async function deleteExpense(token: string, id: number): Promise<void> {
  await api.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}