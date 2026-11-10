const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatMoney(amount: number) {
  return dollars.format(amount)
}
