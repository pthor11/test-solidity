import { compiledSource } from "./compile"
import { deploy } from "./deploy"

const start = async() => {
    try {
        const source = compiledSource
        const contract =  await deploy(source)
        console.log({contract})
        
    } catch (e) {
        throw e
    }
}

start()