import { formatMoney } from '../format'
import { useScaledCost } from '../hooks/useScaledCost'

interface Props {
  name: string
  baseCost: number
  baseIncome: number
  quantity: number
  onBuy: () => void
}

export default function NodeCard({ name, baseCost, baseIncome, quantity, onBuy }: Props) {
  const cost = useScaledCost(baseCost, quantity)

  return (
    <article className="card">
      <h3>{name}</h3>
      <p>Owned: {quantity}</p>
      <p>Earns {formatMoney(baseIncome)} / sec each</p>
      <button onClick={onBuy}>Buy for {formatMoney(cost)}</button>
    </article>
  )
}
