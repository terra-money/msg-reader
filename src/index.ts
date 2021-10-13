import { Msg, Vote } from "@terra-money/terra.js"
import { formatCoin, formatDenom, formatCoins } from "./utility"

export const readMsg = (msg: Msg) => {
  try {
    const data = msg.toData()

    switch (data.type) {
      case "bank/MsgSend": {
        const { amount, to_address } = data.value
        return `Send ${formatCoins(amount)} to ${to_address}`
      }

      case "market/MsgSwap": {
        const { ask_denom, offer_coin } = data.value
        return `Swap ${formatCoin(offer_coin)} to ${formatDenom(ask_denom)}`
      }

      case "staking/MsgDelegate": {
        const { amount, validator_address } = data.value
        return `Delegate ${formatCoin(amount)} to ${validator_address}`
      }

      case "staking/MsgBeginRedelegate": {
        const { amount, validator_dst_address, validator_src_address } =
          data.value
        return `Redelegate ${formatCoin(
          amount
        )} from ${validator_src_address} to ${validator_dst_address}`
      }

      case "staking/MsgUndelegate": {
        const { amount, validator_address } = data.value
        return `Undelegate ${formatCoin(amount)} to ${validator_address}`
      }

      case "distribution/MsgWithdrawDelegationReward": {
        const { validator_address } = data.value
        return `Withdraw rewards from ${validator_address}`
      }

      case "gov/MsgDeposit": {
        const { amount, proposal_id } = data.value
        return `Deposit ${formatCoins(amount)} to proposal ${proposal_id}`
      }

      case "gov/MsgVote": {
        const { proposal_id, option } = data.value
        const voteOption = Vote.Option[option]
        return `Vote ${voteOption} on proposal ${proposal_id}`
      }

      case "wasm/MsgExecuteContract": {
        const { contract, execute_msg, coins } = data.value
        const key = Object.keys(execute_msg)[0]
        return `Execute ${key || "default"} on ${contract} ${
          coins && `(-${formatCoins(coins)})`
        }`
      }

      default:
        return ""
    }
  } catch {
    return ""
  }
}
