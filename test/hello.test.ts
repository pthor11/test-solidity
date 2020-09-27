import { strictEqual, ok } from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";
import { compiledSource } from "../src/compile";

const provider = ganache.provider()
const web3 = new Web3(provider)

let accounts, contract

const message = 'hello world'

beforeEach(async () => {
    try {
        accounts = await web3.eth.getAccounts()

        contract = await new web3.eth.Contract(JSON.parse(compiledSource.interface)).deploy({
            data: compiledSource.bytecode,
            arguments: [message]
        }).send({
            from: accounts[0],
            gas: 1000000
        })

        contract.setProvider(provider)

        // console.log({contract: contract.options.address})

    } catch (e) {
        throw e
    }
})

describe('Contract: Hello', () => {
    it('deploys a contract', () => {
        ok(contract.options.address)
    })

    it('has a default message', async () => {
        const result = await contract.methods.getMessage().call()
        strictEqual(result, message)
    })

    it('can change the message', async () => {
        const newMessage = 'bye bye'
        await contract.methods.setMessage(newMessage).send({ from: accounts[0] })
        const result = await contract.methods.getMessage().call()
        strictEqual(result, newMessage)
    })
})