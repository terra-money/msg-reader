import { Coin, Coins } from "@terra-money/terra.js"

export const formatCoins = (data: Coins.Data) => data.map(formatCoin).join(", ")
export const formatCoin = ({ amount, denom }: Coin.Data) => `${amount}${denom}`
