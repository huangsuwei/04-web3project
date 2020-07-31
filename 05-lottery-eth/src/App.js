import React, {Component} from 'react';
import CardExampleCard from './display/ui'

let web3 = require('./utils/initWeb3')
let lotteryInstance = require('./eth/lotteryInstance')

class App extends Component {
    constructor() {
        super()
        this.state = {
            manager: '',
            round: '',
            winner: '',
            playerCounts: 0,
            balance: 0,
            players: [],
            currentAccount: '',
        }


    }

    //内置钩子函数，在页面渲染之后自动调用
    componentDidMount() {

    }

    //内置钩子函数，在页面渲染之前调用
    async componentWillMount() {
        //获取当前的所有地址
        let accounts = await web3.eth.getAccounts()
        let manager = await lotteryInstance.methods.manager().call()
        let round = await lotteryInstance.methods.round().call()
        let winner = await lotteryInstance.methods.winner().call()
        let playerCounts = await lotteryInstance.methods.getPlayersCount().call()

        //单位是wei，我们需要转换为ether单位
        let balanceWei = await lotteryInstance.methods.getBalance().call()
        //从wei单位转换为'ether'单位
        let balance = web3.utils.fromWei(balanceWei, 'ether')

        let players = await lotteryInstance.methods.getPlayers().call()

        this.setState({
            // manager: manager,
            manager,
            round,
            winner,
            playerCounts,
            balance,
            players,
            currentAccount: accounts[0],
        })
    }

    //卸载钩子函数
    // componentDidMount


    render() {

        let a = 'HangTou'

        // props {
        //     manager : manager
        //      a : a
        // }

        return (
            <div>
                <CardExampleCard
                    manager={this.state.manager}
                    round={this.state.round}
                    winner={this.state.winner}
                    balance={this.state.balance}
                    players={this.state.players}
                    playersCounts={this.state.playerCounts}
                    currentAccount={this.state.currentAccount}
                />
            </div>
        );
    }
}

export default App;
