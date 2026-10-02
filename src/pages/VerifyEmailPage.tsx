import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { verifyEmail } from '../services/authService'

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Se verifica...')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setMessage('Token lipsa din link.')
      return
    }

    verifyEmail(token)
      .then((msg) => {
        setMessage(msg)
        setSuccess(true)
      })
      .catch(() => {
        setMessage('Token invalid sau expirat.')
      })
  }, [searchParams])

  return (
    <div>
      <h1>Verificare email</h1>
      <p>{message}</p>
      {success && <Link to="/login">Mergi la Login</Link>}
    </div>
  )
}

export default VerifyEmailPage