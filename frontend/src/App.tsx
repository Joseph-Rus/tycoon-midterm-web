import { useGame } from './hooks/useGame'
import LoginPage from './pages/LoginPage'

export default function App() {
  const { loggedIn, player, logout } = useGame()

  if (!loggedIn) {
    return <LoginPage />
  }

  return (
    <main>
      <h1>Tycoon</h1>
      <p>Welcome {player?.username}</p>
      <button onClick={logout}>Log out</button>
    </main>
  )
}
