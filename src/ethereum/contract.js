var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

var bettingContract = new web3.eth.Contract([{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_outcomeIndex", "type": "uint256" }], "name": "placeBet", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "outcomeOne", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "eventStarted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "totalPools", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "outcomeTwo", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "kickOffTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "outcomeThree", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "bets", "outputs": [{ "name": "outcomeIndex", "type": "uint256" }, { "name": "amount", "type": "uint256" }, { "name": "paid", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "claimWinnings", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_outcomeIndex", "type": "uint256" }], "name": "eventOver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "winningIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_outcomeIndex", "type": "uint256" }], "name": "changeBet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_outcomeOne", "type": "string" }, { "name": "_outcomeTwo", "type": "string" }, { "name": "_outcomeThree", "type": "string" }, { "name": "_kickOffTime", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
var managerContract = new web3.eth.Contract([{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "betEvents", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "length", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "eventAddr", "type": "address" }], "name": "addEvent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
var managerAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

managerContract.options.address = managerAddress;

/**
 * getAmountOfBets
 * returns the amount of BetEvents managed by the smart contract.
 * @param {String} account the address of the user account.
 * @param {String} managerAddress the address of the manager contract.
 * @returns {Number} amount of BetEvents managed by the smart contract.
 */
const getAmountOfBets = async (account, managerAddress) => {
    managerContract.options.address = managerAddress;
    var length = await managerContract.methods.length().call({ from: account })
    return length;
}

/**
 * getAllBets
 * returns an array of addresses to Betting contracts managed by the smart contract.
 * @param {String} account the address of the user account.
 * @param {String} managerAddress the address of the manager contract.
 * @returns {String[]} array of addresses of Betting contracts.
 */
const getAllBets = async (account, managerAddress) => {
    var length = await getAmountOfBets(account, managerAddress);
    var addresses = [];
    for (var i = 0; i < length; i++) {
        addresses[i] = await managerContract.methods.betEvents(i).call({ from: account })
    }
    return addresses;
}

/**
 * getPlacedBets
 * returns an array of the bet objects for bets placed by a user.
 * @param {String} account the address of the user account.
 * @param {String[]} betEvents an array of addresses of Betting contracts.
 * @returns {Object[]} an array of the bet objects for bets placed by a user.
 */
const getPlacedBets = async (account, betEvents) => {
    var placedBets = [];
    for (var i = 0; i < betEvents.length; i++) {
        bettingContract.options.address = betEvents[i];
        var bet = await bettingContract.methods.bets(account).call({ from: account });
        bet['address'] = betEvents[i];
        if (bet !== 0) placedBets.push(bet);
    }
    return placedBets;
}

/**
 * getAvailableBets
 * returns an array of bets for which the event is not over.
 * @param {String} account the address of the user account. 
 * @param {String[]} betEvents an array of addresses of Betting contracts.
 * @returns {String[]} array of bets for which the event is not over.
 */
const getAvailableBets = async (account, betEvents) => {
    var availableBets = [];
    for (var i = 0; i < betEvents.length; i++) {
        bettingContract.options.address = betEvents[i];
        var state = await bettingContract.methods.state().call({ from: account });
        if (state < 2) availableBets.push(betEvents[i]);
    }
    return availableBets;
}

/**
 * getBetInfo
 * returns an object containing useful information about a bet event.
 * @param {String} account account the address of the user account. 
 * @param {String} betEvent address of the Betting contract.
 * @returns {Object} object containing useful information about a bet event.
 */
const getBetInfo = async (account, betEvent) => {
    var betInfo = {};
    bettingContract.options.address = betEvent;
    betInfo['outcomeOne'] = await bettingContract.methods.outcomeOne().call({ from: account });
    betInfo['outcomeTwo'] = await bettingContract.methods.outcomeTwo().call({ from: account });
    betInfo['outcomeThree'] = await bettingContract.methods.outcomeThree().call({ from: account });
    betInfo['poolOne'] = await bettingContract.methods.totalPools(0).call({ from: account });
    betInfo['poolTwo'] = await bettingContract.methods.totalPools(1).call({ from: account });
    betInfo['poolThree'] = await bettingContract.methods.totalPools(2).call({ from: account });
    betInfo['totalPool'] = await bettingContract.methods.totalPools(3).call({ from: account });
    betInfo['state'] = await bettingContract.methods.state().call({ from: account });
    betInfo['winningIndex'] = await bettingContract.methods.winningIndex().call({ from: account });
    var kickOffTime = await bettingContract.methods.kickOffTime().call({ from: account });
    betInfo['kickOffDate'] = new Date(kickOffTime * 1000);
    return betInfo;
}

/**
 * getUserBetInfo
 * returns an object containing information about a bet a user placed
 * @param {String} account account the address of the user account. 
 * @param {String} betEvent address of the Betting contract.
 * @returns {Object} object containing information about a bet a user placed.
 */
const getUserBetInfo = async (account, betEvent) => {
    bettingContract.options.address = betEvent;
    var userBetInfo = await bettingContract.methods.bets(account).call({ from: account });
    userBetInfo['address'] = betEvent;
    return userBetInfo;
}

export default {
    /**
     * placeBet
     * allows a user to place a bet.
     * @param {String} contractAddress address of the Betting contract.
     * @param {Number} outcomeIndex index of the outcome that the user is betting on.
     * @param {String} value amount of Ether the user is betting.
     */
    placeBet: function (contractAddress, outcomeIndex, value) {
        bettingContract.options.address = contractAddress;
        web3.eth.getAccounts(function (error, accounts) {
            bettingContract.methods.placeBet(outcomeIndex).send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            }).then(function (receipt) {
                console.log(receipt.transactionHash);
            }).catch(function (error) {
                console.log("Placing bet cancelled.");
            });
        });
    },
    /**
     * changeBet
     * allows a user to change a bet that they have placed.
     * @param {String} contractAddress address of the Betting contract.
     * @param {Number} outcomeIndex index of the outcome that the user is changing their bet to.
     */
    changeBet: function (contractAddress, outcomeIndex) {
        bettingContract.options.address = contractAddress;
        web3.eth.getAccounts(function (error, accounts) {
            bettingContract.methods.changeBet(outcomeIndex).send({ from: accounts[0] })
                .then(function (receipt) {
                    console.log(receipt.transactionHash);
                })
                .catch(function (error) {
                    console.log("Changing bet cancelled");
                });
        });
    },
    /**
     * claimWinnings
     * allows a user to claim their winnings
     * @param {String} contractAddress address of the Betting contract.
     */
    claimWinnings: function (contractAddress) {
        bettingContract.options.address = contractAddress;
        web3.eth.getAccounts(function (error, accounts) {
            bettingContract.methods.claimWinnings().send({ from: accounts[0] })
                .then(function (receipt) {
                    console.log(receipt.transactionHash);
                })
                .catch(function (error) {
                    console.log("Claiming winnings cancelled.")
                });
        });
    },
    /**
    * getPlacedBets
    * returns an array of the bet objects for bets placed by a user.
    * @returns {Object[]} an array of the bet objects for bets placed by a user.
    */
    getPlacedBets: async function () {
        try {
            var accounts = await web3.eth.getAccounts();
            var bets = await getAllBets(accounts[0]);
            var placedBets = await getPlacedBets(accounts[0], bets);
            return placedBets;
        } catch (err) {
            console.log(err);
        }
    },
    /**
    * getAvailableBets
    * returns an array of bets for which the event is not over.
    * @returns {String[]} array of bets for which the event is not over.
    */
    getAvailableBets: async function () {
        try {
            var accounts = await web3.eth.getAccounts();
            var bets = await getAllBets(accounts[0]);
            var availableBets = await getAvailableBets(accounts[0], bets);
            return availableBets;
        } catch (err) {
            console.log(err);
        }
    },
    /**
    * getBetInfo
    * returns an object containing useful information about a bet event.
    * @param {String} betEvent address of the Betting contract.
    * @returns {Object} object containing useful information about a bet event.
    */
    getBetInfo: async function (betEvent) {
        try {
            var accounts = await web3.eth.getAccounts();
            var betInfo = await getBetInfo(accounts[0], betEvent);
            return betInfo;
        } catch (err) {
            console.log(err);
        }
    },
    /**
    * getUserBetInfo
    * returns an object containing information about a bet a user placed.
    * @param {String} betEvent address of the Betting contract.
    * @returns {Object} object containing information about a bet a user placed.
    */
    getUserBetInfo: async function (betEvent) {
        try {
            var accounts = await web3.eth.getAccounts();
            var userBetInfo = await getUserBetInfo(accounts[0], betEvent);
            return userBetInfo;
        } catch (err) {
            console.log(err);
        }
    }
};