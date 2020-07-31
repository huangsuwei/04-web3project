pragma solidity ^0.4.24;

contract Lottery {
    //管理员
    //彩民池
    //当前期数
    address public manager;
    address[] public players;
    uint256 public round;
    address public winner;

    constructor() public {
        manager = msg.sender;
    }

    //1.每个人可以投多次，但是每次只能投一个
    function play() payable public {
        require(msg.value == 1 ether);

        players.push(msg.sender);
    }

    //获取彩民人数
    function getPlayersCount() public view returns(uint256) {
        return players.length;
    }

    //获取余额
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    //获取彩民数组
    function getPlayers() public view returns(address[]) {
        return players;
    }

    //开奖函数：
    //目标：从彩民池（数组）中找到一个随机彩民（找一个随机数）
    //找彩民：
    //找到一个特别大的数（随机）， 对我们的彩民数组长度求余数。
    //用哈数值来实现大的随机数。
    //哈希内容的随机：当前时间，区块的挖矿难度，彩民数量，作为输入
    //
    //转账：
    //   9成给中奖者
    //   1成给管理员
    //清理：
    //   期数加一
    //   清理彩民池
    function getWinner() onlyManager public {
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 v2 = keccak256(v1);
        uint256 v3 = uint256(v2);

        uint256 index = v3 % players.length;

        winner = players[index];

        uint256 money = address(this).balance * 90 / 100;
        uint256 managerMoney = address(this).balance * 10 / 100;
        winner.transfer(money);
        manager.transfer(managerMoney);

        round ++;
        delete players;
    }

    // 退奖逻辑：
    // 1. 遍历palyers数组，逐一退款1ether
    // 2. 期数加一
    // 3. 彩民池清零

    // 调用者花费手续费（管理员）
    function refund() onlyManager public {
        for (uint256 i = 0; i < players.length; i ++) {
            players[i].transfer(1 ether);
        }

        round ++;
        delete players;
    }

    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
}