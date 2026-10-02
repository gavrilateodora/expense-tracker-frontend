import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { login } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.')
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }  

    try {
      const token = await login({ email, password })
      setToken(token)
      navigate('/dashboard')
    } catch (err) {
      setError('Authentication failed. Check your credentials.')
      console.error(err)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Login"
      visualTitle="Stay in control of your spending."
      visualCopy="Track expenses, spot trends, and make smarter decisions with a clear view of your budget."
      badge="E"
      features={[
        'Smart budget overview',
        'Daily spending insights',
        'Faster financial decisions',
      ]}
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </>
      }
    >
      {error && (
        <div className="form-alert" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => {
                setError('')
                setEmail(e.target.value)
            }}
          />
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrap">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="••••••••"
              onChange={(e) => {
                setError('')
                setPassword(e.target.value)
              }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage