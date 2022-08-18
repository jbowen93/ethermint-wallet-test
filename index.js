import { Wallet } from "@ethersproject/wallet"
import { createMessageSend } from "@tharsis/transactions"
import { broadcast, getSender, signTransaction } from "@hanchon/evmos-ts-wallet"
import { ethToEthermint } from '@tharsis/address-converter'

(async () => {
    const localnetChain = {
        chainId: 69420,
        cosmosChainId: "opti_69420-1"
    }
    const localnetFee = {
        amount: "0",
        denom: "aphoton",
        gas: "0aphoton"
    }
    const privateMnemonic =
        'kit bread busy lonely sad silent ranch rose tip cup when umbrella village mimic neither sense unaware vacant culture glass crawl make saddle mixture'
    const wallet = Wallet.fromMnemonic(privateMnemonic)

    console.log("wallet: ", wallet)
    console.log("ethermint address: ", ethToEthermint(wallet.address))
    try {
     const sender = await getSender(wallet, "http://localhost:26659")
    }
    catch (err) {
        console.error("Couldnt Get Sender, err: ", err)
    }
    const txSimple = createMessageSend(
        localnetChain,
        sender,
        localnetFee,
        '',
        {
            destinationAddress: 'ethm1ft8d54035h04zvftqwv6vswnp8rzyc3hly4qpw',
            amount: '10000',
            denom: 'aphoton',
        },
    )
    try {
        const resKeplr = await signTransaction(wallet, txSimple)
    }
    catch (err) {
        console.error("Couldnt Sign Tx, err: ", err)
    }
    try {
        const broadcastRes = await broadcast(resKeplr, "http://localhost:26659")
    }
    catch (err) {
        console.error("Couldnt Broadcast, err: ", err)
    }
    if (broadcastRes.tx_response.code === 0) {
        console.log('Success')
    } else {
        console.log('Error')
    }
})()

// ethm1ft8d54035h04zvftqwv6vswnp8rzyc3hly4qpw 
// ethm1rxaz4ulx70lnnul8ar23nc8lm5f088h0h0an60
// 10000aphoton --node http://localhost:26659