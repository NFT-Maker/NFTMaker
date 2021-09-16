import {
    testDo
} from '../../dapp'
import Web3 from './web3'

class TestDoControl {
    createContract = async function () {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }

        const accounts = await web3.eth.getAccounts()
        const contract = await new web3.eth.Contract(JSON.parse(testDo.abi))
            .deploy({
                data: testDo.bytecode
            })
            .send({
                from: accounts[0]
            })
        return contract
    }

    getBalance = async function (address, unit) {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }
        const balance = await web3.eth.getBalance(address)

        return web3.utils.fromWei(balance, unit)
    }

    changeName = async function (address, string) {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }
        let error
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(JSON.parse(testDo.abi), address)
            await contract.methods.changeName(string).send({
                from: accounts[0]
            })
        } catch (e) {
            error = e.message
        }
        return error

    }


    viewName = async function (address) {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }
        let error
        try {
            const contract = await new web3.eth.Contract(JSON.parse(testDo.abi), address)
            await contract.methods.viewName().call().then((result) => console.log(result))
        } catch (e) {
            error = e.message
        }
        return error
    }

    changeNum = async function (address, uint) {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }
        let error
        try {
            const accounts = await web3.eth.getAccounts()
            const contract = await new web3.eth.Contract(JSON.parse(testDo.abi), address)
            await contract.methods.changeNum(uint).send({
                from: accounts[0]
            })
        } catch (e) {
            error = e.message
        }
        return error

    }

    viewNum = async function (address) {
        const web3 = await Web3()
        if (!web3) {
            return undefined
        }
        let error
        try {
            const contract = await new web3.eth.Contract(JSON.parse(testDo.abi), address)
            await contract.methods.viewName().call().then((result)=> console.log(result))
        } catch (e) {
            error = e.message
        }
        return error

    }
}

export default TestDoControl