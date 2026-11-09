import { useState } from 'react'
import type { ErrorBody } from '../types'

interface Props {
  title: string
  errors: ErrorBody
  busy: boolean
  onSubmit: (username: string, password: string) => void
}

function errorText(errors: ErrorBody, field: string) {
  const error = errors[field]
  return Array.isArray(error) ? error.join(' ') : error
}

export default function AuthForm({ title, errors, busy, onSubmit }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameError = errorText(errors, 'username')
  const passwordError = errorText(errors, 'password')
  const formError = errorText(errors, 'non_field_errors')

  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(username, password)
      }}
    >
      <h2>{title}</h2>
      {formError && (
        <p className="error" role="alert">
          {formError}
        </p>
      )}

      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        required
        aria-invalid={Boolean(usernameError)}
        aria-describedby={usernameError ? 'username-error' : undefined}
      />
      {usernameError && (
        <p id="username-error" className="error">
          {usernameError}
        </p>
      )}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
        aria-invalid={Boolean(passwordError)}
        aria-describedby={passwordError ? 'password-error' : undefined}
      />
      {passwordError && (
        <p id="password-error" className="error">
          {passwordError}
        </p>
      )}

      <button type="submit" disabled={busy}>
        {busy ? 'Please wait...' : title}
      </button>
    </form>
  )
}
