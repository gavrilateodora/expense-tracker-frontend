import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getExpenses, type Expense } from '../services/expenseService'
import ExpenseForm from '../components/ExpenseForm'

function DashboardPage() {
  const { token } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return

    getExpenses(token)
      .then((data) => setExpenses(data))
      .catch((err) => {
        setError('Nu s-au putut incarca cheltuielile.')
        console.error(err)
      })
  }, [token])

  function handleExpenseAdded(newExpense: Expense) {
    setExpenses((prev) => [...prev, newExpense])
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ExpenseForm onExpenseAdded={handleExpenseAdded} />

      <h2>Cheltuielile tale</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} — {expense.amount} lei — {expense.date}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardPage