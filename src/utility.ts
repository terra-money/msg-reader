import { Coin, Coins } from "@terra-money/terra.js"
import { BigNumber } from "bignumber.js"

export const formatCoins = (data: Coins.Data) => {
  return data.map(formatCoin).join(", ")
}

export const formatCoin = ({ amount, denom }: Coin.Data) => {
  return `${formatAmount(amount)} ${formatDenom(denom)}`
}

export const formatAmount = (amount: BigNumber.Value): string =>
  new BigNumber(amount)
    .div(1e6)
    .decimalPlaces(6, BigNumber.ROUND_DOWN)
    .toString()

export const formatDenom = (denom: string): string => {
  if (denom[0] === "u") {
    const f = denom.slice(1)
    return f === "luna" ? "Luna" : f.slice(0, 2).toUpperCase() + "T"
  }

  return denom
}
