import { createContext, useContext } from 'react'
import type { NodeType, Player, Upgrade } from '../types'

export interface GameState {
  loggedIn: boolean
  player: Player | null
  nodeTypes: NodeType[]
  upgrades: Upgrade[]
  login: (token: string) => void
  logout: () => void
  click: () => void
  buyNode: (id: number) => void
  buyUpgrade: (id: number) => void
}

export const GameContext = createContext<GameState | null>(null)

export function useGame() {
  const game = useContext(GameContext)
  if (!game) {
    throw new Error('useGame has to be used inside <GameProvider>')
  }
  return game
}
