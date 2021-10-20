import { Msg, Vote } from "@terra-money/terra.js"
import { formatCoin, formatCoins } from "./utility"

export const readMsg = (msg: Msg) => {
  try {
    const data = msg.toData()

    switch (data["@type"]) {
      case "/cosmos.bank.v1beta1.MsgSend": {
        const { amount, to_address } = data
        return `Send ${formatCoins(amount)} to ${to_address}`
      }

      case "/terra.market.v1beta1.MsgSwap": {
        const { ask_denom, offer_coin } = data
        return `Swap ${formatCoin(offer_coin)} to ${ask_denom}`
      }

      case "/cosmos.staking.v1beta1.MsgDelegate": {
        const { amount, validator_address } = data
        return `Delegate ${formatCoin(amount)} to ${validator_address}`
      }

      case "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
        const { amount, validator_dst_address, validator_src_address } = data
        return `Redelegate ${formatCoin(
          amount
        )} from ${validator_src_address} to ${validator_dst_address}`
      }

      case "/cosmos.staking.v1beta1.MsgUndelegate": {
        const { amount, validator_address } = data
        return `Undelegate ${formatCoin(amount)} to ${validator_address}`
      }

      case "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
        const { validator_address } = data
        return `Withdraw rewards from ${validator_address}`
      }

      case "/cosmos.gov.v1beta1.MsgDeposit": {
        const { amount, proposal_id } = data
        return `Deposit ${formatCoins(amount)} to proposal ${proposal_id}`
      }

      case "/cosmos.gov.v1beta1.MsgVote": {
        const { proposal_id, option } = data
        const voteOption = Vote.Option[option]
        return `Vote ${voteOption.replace(
          "VOTE_OPTION_",
          ""
        )} on proposal ${proposal_id}`
      }

      case "/terra.wasm.v1beta1.MsgExecuteContract": {
        const { contract, execute_msg, coins } = data
        const [key] = Object.keys(execute_msg)
        const payload = key ? ` ${key}` : ""
        const suffix = coins.length ? ` with ${formatCoins(coins)}` : ""

        return `Execute${payload} on ${contract}${suffix}`
      }

      default:
        return ""
    }
  } catch {
    return ""
  }
}
