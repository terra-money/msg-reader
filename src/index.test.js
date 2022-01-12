const {
  MsgSend,
  MsgSwap,
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgWithdrawDelegatorReward,
  MsgDeposit,
  MsgVote,
  MsgMigrateCode,
  MsgExecuteContract,
  MsgTransfer,
  Coin,
  Coins,
  Vote,
  MsgSubmitProposal,
  TextProposal,
  CommunityPoolSpendProposal,
  ParameterChangeProposal,
  ParamChange,
} = require("@terra-money/terra.js")
const {
  CancelSoftwareUpgradeProposal,
  SoftwareUpgradeProposal,
} = require("@terra-money/terra.js/dist/core/upgrade/proposals")
const { readMsg } = require("./index")

const coin = new Coin("uluna", 1000000)
const coins = new Coins([new Coin("uluna", 1000000), new Coin("ukrw", 1000000)])

const address = "terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v"
const recipient = "terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"

describe("Bank", () => {
  test("Send", () => {
    const msg = new MsgSend(address, recipient, [coin])
    expect(readMsg(msg)).toBe(
      "Send 1000000uluna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"
    )
  })

  test("Send multiple coins", () => {
    const msg = new MsgSend(address, recipient, coins)
    expect(readMsg(msg)).toBe(
      "Send 1000000ukrw,1000000uluna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"
    )
  })
})

describe("Market", () => {
  test("Swap", () => {
    const msg = new MsgSwap(address, coin, "uusd")
    expect(readMsg(msg)).toBe("Swap 1000000uluna to uusd")
  })
})

describe("Staking", () => {
  const validator = "terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
  const source = "terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy"

  test("Delegate", () => {
    const msg = new MsgDelegate(address, validator, coin)
    expect(readMsg(msg)).toBe(
      "Delegate 1000000uluna to terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
    )
  })

  test("Undelegate", () => {
    const msg = new MsgUndelegate(address, validator, coin)
    expect(readMsg(msg)).toBe(
      "Undelegate 1000000uluna to terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
    )
  })

  test("Redelegate", () => {
    const msg = new MsgBeginRedelegate(address, source, validator, coin)
    expect(readMsg(msg)).toBe(
      "Redelegate 1000000uluna from terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy to terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
    )
  })

  test("Withdraw rewards", () => {
    const msg = new MsgWithdrawDelegatorReward(address, validator)
    expect(readMsg(msg)).toBe(
      "Withdraw rewards from terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
    )
  })
})

describe("Proposal", () => {
  test("Text", () => {
    const test = new TextProposal("testTitle", "testDesc")
    const msg = new MsgSubmitProposal(test, [coin], address)
    expect(readMsg(msg)).toBe("Submit a text proposal")
  })

  test("CommunityPoolSpend", () => {
    const test = new CommunityPoolSpendProposal(
      "testTitle",
      "testDesc",
      address,
      [coin]
    )
    const msg = new MsgSubmitProposal(test, [coin], address)
    expect(readMsg(msg)).toBe("Submit a community pool spend proposal")
  })

  test("ParameterChange", () => {
    const param = new ParamChange("sub", "key", "value")
    const test = new ParameterChangeProposal("testTitle", "testDesc", param)
    const msg = new MsgSubmitProposal(test, [coin], address)
    expect(readMsg(msg)).toBe("Submit a parameter change proposal")
  })

  test("CancelSoftwareUpgrade", () => {
    const test = new CancelSoftwareUpgradeProposal("testTitle", "testDesc")
    const msg = new MsgSubmitProposal(test, [coin], address)
    expect(readMsg(msg)).toBe("Submit a cancel software upgrade proposal")
  })

  test("SoftwareUpgrade", () => {
    const test = new SoftwareUpgradeProposal("testTitle", "testDesc")
    const msg = new MsgSubmitProposal(test, [coin], address)
    expect(readMsg(msg)).toBe("Submit a software upgrade proposal")
  })
})

describe("Gov", () => {
  test("Deposit", () => {
    const msg = new MsgDeposit(123, address, [coin])
    expect(readMsg(msg)).toBe("Deposit 1000000uluna to proposal 123")
  })

  test("Vote", () => {
    const msg = new MsgVote(123, address, Vote.Option.VOTE_OPTION_YES)
    expect(readMsg(msg)).toBe("Vote YES on proposal 123")
  })
})

describe("Wasm", () => {
  const contract = "terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u"
  test("Execute contract with coins", () => {
    const msg = new MsgExecuteContract(address, contract, { send: "" }, [coin])
    expect(readMsg(msg)).toBe(
      "Execute send on terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u with 1000000uluna"
    )
  })

  test("Execute contract without coins", () => {
    const msg = new MsgExecuteContract(address, contract, { send: "" })
    expect(readMsg(msg)).toBe(
      "Execute send on terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u"
    )
  })
})

test("Default", () => {
  const msg = new MsgMigrateCode(address, 1, "codes")
  expect(readMsg(msg)).toBe("Migrate code")
})

test("Decimal", () => {
  const msg = new MsgSend(address, recipient, new Coins({ uluna: 1234560 }))
  expect(readMsg(msg)).toBe(
    "Send 1234560uluna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"
  )
})

test("Transfer IBC token", () => {
  const msg = new MsgTransfer(
    "transfer",
    "channel",
    coin,
    "terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp",
    "terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp",
    undefined,
    1
  )
  expect(readMsg(msg)).toBe(
    "Send 1000000uluna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp via channel"
  )
})
