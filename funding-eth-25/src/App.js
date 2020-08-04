import React, {Component} from 'react';
import web3 from './utils/InitWeb3'
//如果不是default，需要使用{}结构
import {fundingFactoryInstance} from './eth/instance'
import TabCenter from "./display/TabCenter";

class App extends Component {
    constructor() {
        super()

        this.state = {
            currentAccount: '',
        }
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        console.log(accounts)

        let platformManager = await fundingFactoryInstance.methods.platformManager().call()
        console.log('manager :', platformManager)

        this.setState({
            currentAccount: accounts[0]
        })
    }


    render() {


        return (
            <div>
                <h1>黑马众筹</h1>
                <img src="https://api.gushi.ci/all.svg" alt="poem"/>
                <p>当前账户: {this.state.currentAccount}</p>
                <TabCenter/>
            </div>
        );
    }
}

export default App;
