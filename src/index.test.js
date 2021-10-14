const {
  MsgSend,
  MsgSwap,
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgWithdrawDelegationReward,
  MsgDeposit,
  MsgVote,
  MsgMigrateCode,
  MsgExecuteContract,
  Coin,
  Coins,
} = require("@terra-money/terra.js")
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
    const msg = new MsgWithdrawDelegationReward(address, validator)
    expect(readMsg(msg)).toBe(
      "Withdraw rewards from terravaloper1dcegyrekltswvyy0xy69ydgxn9x8x32zdy3ua5"
    )
  })
})

describe("Gov", () => {
  test("Deposit", () => {
    const msg = new MsgDeposit(123, address, [coin])
    expect(readMsg(msg)).toBe("Deposit 1000000uluna to proposal 123")
  })

  test("Vote", () => {
    const msg = new MsgVote(123, address, 1)
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
  expect(readMsg(msg)).toBe("")
})

test("Decimal", () => {
  const msg = new MsgSend(address, recipient, new Coins({ uluna: 1234560 }))
  expect(readMsg(msg)).toBe(
    "Send 1234560uluna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"
  )
})
