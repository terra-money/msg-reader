import { Coin, Coins } from "@terra-money/terra.js"
import { sentenceCase } from "sentence-case"

export const formatCoins = (data: Coins.Data) => data.map(formatCoin).join(",")
export const formatCoin = ({ amount, denom }: Coin.Data) => `${amount}${denom}`

export const defaultMessage = (type: string) => {
  const result = type.split(".")
  return sentenceCase(result[result.length - 1].replace("Msg", ""))
}
