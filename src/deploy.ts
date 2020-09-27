import HDWalletProvider from "truffle-hdwallet-provider";
import Web3 from "web3";
import { mnemonic, infuraUri } from "./config";

const provider = new HDWalletProvider(mnemonic, infuraUri)

const web3 = new Web3(provider)

const deploy = async (compiledSource: any) => {
    try {
        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]

        console.log({ account })

        const contract = new web3.eth.Contract(JSON.parse(compiledSource.interface))

        const result = await contract.deploy({
            data: compiledSource.bytecode,
            arguments: ['hello world'],
        }).send({
            gas: 1000000,
            from: account
        })

        return result.options.address
    } catch (e) {
        throw e
    }
}

export {
    deploy
}