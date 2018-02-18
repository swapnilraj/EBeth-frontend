var Web3 = require('web3');
 
var bettingContract;
 
function startUp() {
 
    var web3 = new Web3(Web3.givenProvider);
    web3.eth.contract([{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"outcomeOne","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_outcome","type":"string"}],"name":"changeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"outcomeTwo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"outcomeThree","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"bets","outputs":[{"name":"outcome","type":"string"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_outcome","type":"string"}],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"claimWinnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"testCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_outcomeOne","type":"string"},{"name":"_outcomeTwo","type":"string"},{"name":"_outcomeThree","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);

}
 
function placeBet(contractAddress, outcome, value, receiptfunc) {
    bettingContract.options.address = contractAddress;
    bettingContract.methods.placeBet(outcome).send({ from: web3.eth.accounts[0], value: web3.utils.toWei(value, 'ether') })
        .then(function (receipt) {
            receiptfunc(receipt);
        });
}

function changeBet(contractAddress, outcome, receiptfunc) {
    bettingContract.options.address = contractAddress;
    bettingContract.methods.changeBet(outcome).call({ from: web3.eth.accounts[0] })
        .then(function (receipt) {
            receiptfunc(receipt);
        });
}

function claimWinnings(contractAddress, receiptfunc) {
    bettingContract.options.address = contractAddress;
    bettingContract.methods.claimWinnings(outcome).call({ from: web3.eth.accounts[0] })
        .then(function (receipt) {
            receiptfunc(receipt);
        });
}

export {startUp, placeBet}