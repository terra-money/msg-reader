import { Msg, Vote } from "@terra-money/terra.js"
import { defaultMessage, formatCoin, formatCoins } from "./utility"

export const readMsg = (msg: Msg) => {
  try {
    const data = msg.toData()
    const msgType = data["@type"]

    switch (msgType) {
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
      case "/cosmos.gov.v1beta1.MsgSubmitProposal": {
        const { content } = data
        const type = content["@type"]

        if (
          type === "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal"
        ) {
          return "Submit a community pool spend proposal"
        } else if (type === "/cosmos.gov.v1beta1.TextProposal") {
          return "Submit a text proposal"
        } else if (type === "/cosmos.params.v1beta1.ParameterChangeProposal") {
          return "Submit a parameter change proposal"
        } else if (
          type === "/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal"
        ) {
          return "Submit a cancel software upgrade proposal"
        } else if (type === "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal") {
          return "Submit a software upgrade proposal"
        }

        return defaultMessage(msgType)
      }

      case "/ibc.applications.transfer.v1.MsgTransfer": {
        const { receiver, token, source_channel } = data
        const coin = token ? formatCoins([token]) : ""
        return `Send ${coin} to ${receiver} via ${source_channel}`
      }

      default:
        return defaultMessage(msgType)
    }
  } catch {
    return ""
  }
}
