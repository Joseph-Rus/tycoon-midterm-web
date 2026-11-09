import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, ApiError, clearToken, getToken, saveToken } from '../api'
import { GameContext } from '../hooks/useGame'
import { useToast } from '../hooks/useToast'
import type { NodeType, Player, Upgrade } from '../types'

export default function GameProvider({ children }: { children: ReactNode }) {
  const showToast = useToast()
  const [loggedIn, setLoggedIn] = useState(() => getToken() !== null)
  const [player, setPlayer] = useState<Player | null>(null)
  const [nodeTypes, setNodeTypes] = useState<NodeType[]>([])
  const [upgrades, setUpgrades] = useState<Upgrade[]>([])

  const login = useCallback((token: string) => {
    saveToken(token)
    setLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setLoggedIn(false)
    setPlayer(null)
  }, [])

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 401) {
        logout()
        showToast('Your session ended. Please log in again.')
      } else {
        showToast(err instanceof Error ? err.message : 'Something went wrong.')
      }
    },
    [logout, showToast],
  )

  const playerAction = useCallback(
    async (request: () => Promise<Player>) => {
      try {
        setPlayer(await request())
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  useEffect(() => {
    if (!loggedIn) return

    Promise.all([api.getPlayer(), api.getNodeTypes(), api.getUpgrades()])
      .then(([newPlayer, newNodeTypes, newUpgrades]) => {
        setPlayer(newPlayer)
        setNodeTypes(newNodeTypes)
        setUpgrades(newUpgrades)
      })
      .catch(handleError)
  }, [loggedIn, handleError])

  const value = useMemo(
    () => ({
      loggedIn,
      player,
      nodeTypes,
      upgrades,
      login,
      logout,
      click: () => playerAction(api.click),
      buyNode: (id: number) => playerAction(() => api.buyNode(id)),
      buyUpgrade: (id: number) => playerAction(() => api.buyUpgrade(id)),
    }),
    [loggedIn, player, nodeTypes, upgrades, login, logout, playerAction],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
