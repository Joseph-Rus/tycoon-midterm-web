import { formatMoney } from '../format'

interface Props {
  name: string
  nodeName: string
  cost: number
  multiplier: number
  owned: boolean
  onBuy: () => void
}

export default function UpgradeCard({ name, nodeName, cost, multiplier, owned, onBuy }: Props) {
  return (
    <article className="card">
      <h3>{name}</h3>
      <p>
        {nodeName} income x{multiplier}
      </p>
      <button onClick={onBuy} disabled={owned}>
        {owned ? 'Owned' : `Buy for ${formatMoney(cost)}`}
      </button>
    </article>
  )
}
