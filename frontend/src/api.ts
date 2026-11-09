import type { ErrorBody, NodeType, Player, Upgrade } from './types'

const TOKEN_KEY = 'token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  body: ErrorBody

  constructor(status: number, body: ErrorBody) {
    super(errorMessage(status, body))
    this.status = status
    this.body = body
  }
}

function errorMessage(status: number, body: ErrorBody) {
  const first = Object.values(body)[0]
  if (first) {
    return Array.isArray(first) ? first[0] : first
  }
  if (status === 403) return "You don't have permission to do that."
  if (status === 404) return 'That could not be found.'
  return 'Something went wrong on the server. Please try again.'
}

async function request<T>(path: string, method = 'GET', data?: object): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) {
    headers.Authorization = `Token ${token}`
  }

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!res.ok) {
    const body: ErrorBody = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body)
  }
  return res.json()
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string }>('/login/', 'POST', { username, password }),
  register: (username: string, password: string) =>
    request<{ token: string }>('/register/', 'POST', { username, password }),

  getPlayer: () => request<Player>('/player/'),
  click: () => request<Player>('/player/click/', 'POST'),

  getNodeTypes: () => request<NodeType[]>('/node-types/'),
  buyNode: (id: number) => request<Player>(`/node-types/${id}/buy/`, 'POST'),

  getUpgrades: () => request<Upgrade[]>('/upgrades/'),
  buyUpgrade: (id: number) => request<Player>(`/upgrades/${id}/buy/`, 'POST'),
}
