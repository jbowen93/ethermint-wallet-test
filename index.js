import { Wallet } from "@ethersproject/wallet"
import { createMessageSend } from "@tharsis/transactions"
import { broadcast, getSender, LOCALNET_CHAIN, LOCALNET_FEE, signTransaction } from "@hanchon/evmos-ts-wallet"


(async () => {
    const privateMnemonic =
        'kit bread busy lonely sad silent ranch rose tip cup when umbrella village mimic neither sense unaware vacant culture glass crawl make saddle mixture'
    const wallet = Wallet.fromMnemonic(privateMnemonic)

    const sender = await getSender(wallet, "http://localhost:26659")
    const txSimple = createMessageSend(
        LOCALNET_CHAIN,
        sender,
        LOCALNET_FEE,
        '',
        {
            destinationAddress: 'ethm1ft8d54035h04zvftqwv6vswnp8rzyc3hly4qpw',
            amount: '10000',
            denom: 'aphoton',
        },
    )

    const resKeplr = await signTransaction(wallet, txSimple)
    const broadcastRes = await broadcast(resKeplr, "http://localhost:26659")
    if (broadcastRes.tx_response.code === 0) {
        console.log('Success')
    } else {
        console.log('Error')
    }
})()

// ethm1ft8d54035h04zvftqwv6vswnp8rzyc3hly4qpw 
// ethm1rxaz4ulx70lnnul8ar23nc8lm5f088h0h0an60
// 10000aphoton --node http://localhost:26659