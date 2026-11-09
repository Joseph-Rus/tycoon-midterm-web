import { useMemo } from 'react'

const COST_GROWTH = 1.15

export function useScaledCost(baseCost: number, quantity: number) {
  return useMemo(() => Math.round(baseCost * COST_GROWTH ** quantity * 100) / 100, [baseCost, quantity])
}
