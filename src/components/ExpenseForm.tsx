import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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

  function handleAmountChange(nextValue: string) {
    if (nextValue === '') {
      setAmount('')
      return
    }

    if (nextValue.includes('-') || nextValue.includes('+') || nextValue.includes('e') || nextValue.includes('E')) {
      return
    }

    const sanitizedValue = nextValue.replace(/[^0-9.]/g, '')

    if (sanitizedValue !== nextValue) {
      return
    }

    const parts = sanitizedValue.split('.')
    if (parts.length > 2) {
      return
    }

    setAmount(sanitizedValue)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const parsedAmount = Number(amount)

    if (!description.trim() || !date || !amount) {
      setError('Please complete all fields.')
      return
    }

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be greater than 0.')
      return
    }

    if (!token) return

    try {
      const newExpense = await createExpense(token, {
        amount: parsedAmount,
        description: description.trim(),
        date,
      })

      onExpenseAdded(newExpense)

      setAmount('')
      setDescription('')
      setDate('')
    } catch (err) {
      setError('Could not add expense.')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel expense-form">
      <div className="panel-header">
        <h2>Add expense</h2>
      </div>

      {error && <div className="form-alert">{error}</div>}

      <div className="field-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={amount}
          placeholder="0.00"
          onChange={(e) => handleAmountChange(e.target.value)}
          onKeyDown={(e) => {
            if (['-', '+', 'e', 'E'].includes(e.key)) {
              e.preventDefault()
            }
          }}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          placeholder="Groceries, rent, transport..."
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="date">Date</label>
        <DatePicker
          id="date"
          selected={date ? new Date(date) : null}
          onChange={(selectedDate: Date | null) => {
            if (!selectedDate) {
              setDate('')
              return
            }

            const formattedDate = selectedDate.toISOString().split('T')[0]
            setDate(formattedDate)
          }}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="date-picker-input"
          maxDate={new Date()}
          required
        />
      </div>

      <button type="submit" className="primary-btn">
        Add expense
      </button>
    </form>
  )
}

export default ExpenseForm