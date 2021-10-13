# @terra-money/msg-reader
Convert common terra.js msg to a sentence

## Installation

```
npm i @terra-money/msg-reader
```

## Example codes
```typescript

import { Coins } from "@terra-money/terra.js"
import { readMsg } from "@terra-money/msg-parser"

const coins = new Coins([new Coin("uluna", 1000000), new Coin("ukrw", 1000000)])

const address = "terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v"
const recipient = "terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp"

const msg = new MsgSend(address, recipient, [coin])

console.log(readMsg(msg))
// Send 1 Luna to terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp

```
