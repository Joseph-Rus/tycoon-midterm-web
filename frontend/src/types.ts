export interface NodeType {
  id: number
  name: string
  base_cost: number
  base_income: number
}

export interface Upgrade {
  id: number
  name: string
  node_type: number
  cost: number
  multiplier: number
}

export interface OwnedNode {
  node_type: number
  quantity: number
}

export interface Player {
  username: string
  balance: number
  income_per_second: number
  last_collected: string
  nodes: OwnedNode[]
  upgrades: number[]
}

export type ErrorBody = Record<string, string | string[]>
