import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getExpenses, deleteExpense, type Expense } from '../services/expenseService'
import ExpenseForm from '../components/ExpenseForm'

function DashboardPage() {
  const { token } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [error, setError] = useState('')
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  const expenseToDelete = expenses.find((expense) => expense.id === pendingDeleteId) ?? null

  useEffect(() => {
    if (!token) return

    getExpenses(token)
      .then((data) => setExpenses(data))
      .catch((err) => {
        setError('Could not load expenses.')
        console.error(err)
      })
  }, [token])

  function handleExpenseAdded(newExpense: Expense) {
    setExpenses((prev) => [...prev, newExpense])
  }

  async function handleDelete(id: number) {
    if (!token) return

    try {
      await deleteExpense(token, id)
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
      setPendingDeleteId(null)
    } catch (err) {
      setError('Could not delete expense.')
      console.error(err)
    }
  }

  return (
    <div className="dashboard-page">
      {expenseToDelete && (
        <div className="modal-backdrop" onClick={() => setPendingDeleteId(null)}>
          <div className="delete-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Delete expense?</h3>
            <p>
              Are you sure you want to delete <strong>{expenseToDelete.description}</strong> from{' '}
              {expenseToDelete.date}?
            </p>

            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setPendingDeleteId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="delete-btn modal-delete-btn"
                onClick={() => handleDelete(expenseToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow subtle">Overview</p>
            <h1>Dashboard</h1>
          </div>

          <div className="dashboard-summary">
            <div className="summary-card">
              <span className="summary-label">Total spent</span>
              <strong>{totalExpenses.toFixed(2)} lei</strong>
            </div>
            <div className="summary-card">
              <span className="summary-label">Transactions</span>
              <strong>{expenses.length}</strong>
            </div>
          </div>
        </header>

        {error && <div className="form-alert">{error}</div>}

        <div className="dashboard-grid">
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />

          <section className="panel expenses-panel">
            <div className="panel-header">
              <h2>Your expenses</h2>
              <span>{expenses.length} items</span>
            </div>

            {expenses.length === 0 ? (
              <div className="empty-state">
                <strong>No expenses yet.</strong>
                <span>Add your first expense to start tracking your spending.</span>
              </div>
            ) : (
              <ul className="expense-list">
                {sortedExpenses.map((expense) => (
                  <li key={expense.id} className="expense-item">
                    <div className="expense-main">
                      <div>
                        <p className="expense-name">{expense.description}</p>
                        <span className="expense-date">{expense.date}</span>
                      </div>
                    </div>

                    <div className="expense-actions">
                      <span className="expense-amount">{Number(expense.amount).toFixed(2)} lei</span>
                      <button className="delete-btn" onClick={() => setPendingDeleteId(expense.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage