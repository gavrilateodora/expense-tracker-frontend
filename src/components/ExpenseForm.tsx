import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createExpense, type Expense } from '../services/expenseService'

interface ExpenseFormProps {
  onExpenseAdded: (expense: Expense) => void
}

function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const { token } = useAuth()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!token) return

    try {
      const newExpense = await createExpense(token, {
        amount: parseFloat(amount),
        description,
        date,
      })

      onExpenseAdded(newExpense)

      setAmount('')
      setDescription('')
      setDate('')
    } catch (err) {
      setError('Nu s-a putut adauga cheltuiala.')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adauga cheltuiala</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Suma</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descriere</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Adauga</button>
    </form>
  )
}

export default ExpenseForm