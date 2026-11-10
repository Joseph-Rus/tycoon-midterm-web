import { useState } from 'react'
import { api, ApiError } from '../api'
import AuthForm from '../components/AuthForm'
import { useGame } from '../hooks/useGame'
import { useToast } from '../hooks/useToast'
import type { ErrorBody } from '../types'

export default function LoginPage() {
  const { login } = useGame()
  const showToast = useToast()
  const [isRegister, setIsRegister] = useState(false)
  const [errors, setErrors] = useState<ErrorBody>({})
  const [busy, setBusy] = useState(false)

  async function handleSubmit(username: string, password: string) {
    setBusy(true)
    setErrors({})
    try {
      const { token } = isRegister
        ? await api.register(username, password)
        : await api.login(username, password)
      login(token)
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        setErrors(err.body)
      } else {
        showToast(err instanceof Error ? err.message : 'Something went wrong.')
      }
      setBusy(false)
    }
  }

  function switchMode() {
    setIsRegister(!isRegister)
    setErrors({})
  }

  return (
    <main className="login">
      <h1>Tycoon</h1>
      <AuthForm
        title={isRegister ? 'Create account' : 'Log in'}
        errors={errors}
        busy={busy}
        onSubmit={handleSubmit}
      />
      <button className="link" onClick={switchMode}>
        {isRegister ? 'Already have an account? Log in' : 'New here? Create an account'}
      </button>
    </main>
  )
}
