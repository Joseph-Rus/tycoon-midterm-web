import ClickButton from '../components/ClickButton'
import MoneyTicker from '../components/MoneyTicker'
import NodeCard from '../components/NodeCard'
import UpgradeCard from '../components/UpgradeCard'
import { formatMoney } from '../format'
import { useGame } from '../hooks/useGame'

export default function GamePage() {
  const { player, nodeTypes, upgrades, logout, click, buyNode, buyUpgrade } = useGame()

  if (!player) {
    return <p className="loading">Loading...</p>
  }

  function quantityOf(nodeTypeId: number) {
    return player?.nodes.find((node) => node.node_type === nodeTypeId)?.quantity ?? 0
  }

  function nodeName(nodeTypeId: number) {
    return nodeTypes.find((type) => type.id === nodeTypeId)?.name ?? ''
  }

  return (
    <main className="game">
      <header className="top-bar">
        <h1>Tycoon</h1>
        <div>
          <span>{player.username}</span>
          <button onClick={logout}>Log out</button>
        </div>
      </header>

      <section className="bank" aria-label="Your money">
        <MoneyTicker balance={player.balance} incomePerSecond={player.income_per_second} />
        <p>{formatMoney(player.income_per_second)} per second</p>
        <ClickButton onClick={click} />
      </section>

      <section>
        <h2>Businesses</h2>
        <div className="cards">
          {nodeTypes.map((type) => (
            <NodeCard
              key={type.id}
              name={type.name}
              baseCost={type.base_cost}
              baseIncome={type.base_income}
              quantity={quantityOf(type.id)}
              onBuy={() => buyNode(type.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Upgrades</h2>
        <div className="cards">
          {upgrades.map((upgrade) => (
            <UpgradeCard
              key={upgrade.id}
              name={upgrade.name}
              nodeName={nodeName(upgrade.node_type)}
              cost={upgrade.cost}
              multiplier={upgrade.multiplier}
              owned={player.upgrades.includes(upgrade.id)}
              onBuy={() => buyUpgrade(upgrade.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
