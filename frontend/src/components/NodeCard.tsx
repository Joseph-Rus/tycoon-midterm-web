import { formatMoney } from '../format'

interface Props {
  name: string
  baseCost: number
  baseIncome: number
  quantity: number
  onBuy: () => void
}

export default function NodeCard({ name, baseCost, baseIncome, quantity, onBuy }: Props) {
  const cost = Math.round(baseCost * 1.15 ** quantity * 100) / 100

  return (
    <article className="card">
      <h3>{name}</h3>
      <p>Owned: {quantity}</p>
      <p>Earns {formatMoney(baseIncome)} / sec each</p>
      <button onClick={onBuy}>Buy for {formatMoney(cost)}</button>
    </article>
  )
}
