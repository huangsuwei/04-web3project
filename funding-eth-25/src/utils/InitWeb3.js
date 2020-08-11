let Web3 = require('web3')

let web3 = new Web3(window.web3.currentProvider)
// let web3 = new Web3('http://localhost:7545')

//export导出，es6语法，default标识默认导出，在使用时，名字可以改变
//使用时，使用import
export default web3;
