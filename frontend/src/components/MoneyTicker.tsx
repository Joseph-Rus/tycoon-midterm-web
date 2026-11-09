import { useEffect, useState } from 'react'
import { formatMoney } from '../format'

interface Props {
  balance: number
  incomePerSecond: number
}

export default function MoneyTicker({ balance, incomePerSecond }: Props) {
  const [shown, setShown] = useState(balance)

  useEffect(() => {
    const start = Date.now()
    const timer = setInterval(() => {
      setShown(balance + (incomePerSecond * (Date.now() - start)) / 1000)
    }, 100)
    return () => clearInterval(timer)
  }, [balance, incomePerSecond])

  return <p className="balance">{formatMoney(shown)}</p>
}
