import { useState } from 'react'
import { register } from '../services/authService'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await register({ email, password })
      setSuccess(true)
    } catch (err) {
      setError('Inregistrare esuata. Incearca alt email.')
      console.error(err)
    }
  }

  if (success) {
    return (
      <div>
        <h1>Verifica-ti emailul</h1>
        <p>
          Ti-am trimis un link de confirmare. Verifica consola backend-ului
          (simulare email) pentru link.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage