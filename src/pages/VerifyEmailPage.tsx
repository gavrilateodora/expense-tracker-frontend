import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { verifyEmail } from '../services/authService'

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Checking your email verification...')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setMessage('Missing verification token in the link.')
      return
    }

    verifyEmail(token)
      .then((msg) => {
        setMessage(msg)
        setSuccess(true)
      })
      .catch(() => {
        setMessage('The token is invalid or expired.')
      })
  }, [searchParams])

  return (
    <AuthLayout
      eyebrow="Email verification"
      title={success ? 'Verified' : 'Checking...'}
      visualTitle={success ? 'Your email is confirmed.' : 'Almost there.'}
      visualCopy={
        success
          ? 'Your account is now ready to use. You can sign in and continue tracking your expenses.'
          : 'We are validating your email address to finish the setup process.'
      }
      badge={success ? '✓' : 'E'}
    >
      <div className="success-message verification-message">
        <p>{message}</p>
        {success && <Link to="/login" className="primary-btn inline-btn">Go to login</Link>}
      </div>
    </AuthLayout>
  )
}

export default VerifyEmailPage