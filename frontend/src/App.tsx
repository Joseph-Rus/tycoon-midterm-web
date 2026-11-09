import { useGame } from './hooks/useGame'
import GamePage from './pages/GamePage'
import LoginPage from './pages/LoginPage'

export default function App() {
  const { loggedIn } = useGame()
  return loggedIn ? <GamePage /> : <LoginPage />
}
