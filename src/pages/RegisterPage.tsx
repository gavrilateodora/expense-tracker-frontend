import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { register } from '../services/authService'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Email, password and confirm password are required.')
      return false
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
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
      await register({ email, password })
      setSuccess(true)
    } catch (err) {
      setError('Registration failed. Try a different email.')
      console.error(err)
    }
  }

  if (success) {
    return (
      <AuthLayout
        eyebrow="Account created"
        title="Verify email"
        visualTitle="Check your inbox."
        visualCopy="We sent a confirmation link to your email. Open the backend console and copy the simulated verification link to continue."
        badge="✓"
        panelClassName="success-panel"
        cardClassName="success-card"
      >
        <div className="success-message">
          <p>
            We sent a confirmation link to your email. Check the backend console (simulated email) for the link.
          </p>
          <Link to="/login" className="primary-btn inline-btn">
            Back to login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Register"
      visualTitle="Build better habits with every payment."
      visualCopy="Create an account to track spending, monitor budget health, and gain clarity on where your money goes."
      badge="E"
      features={[
        'Secure personal account',
        'Expense summaries in one place',
        'Smarter money decisions',
      ]}
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
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
              placeholder="Create a password"
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

        <div className="field-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="password-input-wrap">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder="Repeat your password"
              onChange={(e) => {
                setError('')
                setConfirmPassword(e.target.value)
              }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage