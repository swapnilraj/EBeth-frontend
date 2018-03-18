/* tslint:disable:no-var-requires no-empty */
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

const bettingContractJSON = require('./Betting.json');
const managerContractJSON = require('./BetManager.json');

const bettingContract = new web3.eth.Contract(bettingContractJSON.abi);
const managerContract = new web3.eth.Contract(managerContractJSON.abi);
const managerAddress = '0x410a4bcb61bfe8ffe2cb281d12cfbb61d345c6a8';

managerContract.options.address = managerAddress;

export interface IBetInfo {
  /** First team, typically the home team. */
  outcomeOne: string;
  /** Draw. */
  outcomeTwo: string;
  /** Second team, typically the away team. */
  outcomeThree: string;
  /** Total pool for first team. */
  poolOne: number;
  /** Total pool for draw. */
  poolTwo: number;
  /** Total pool for second team. */
  poolThree: number;
  /** Overall total pool, sum of all other pools. */
  totalPool: number;
  /** Current state of the Betting Event. */
  state: number;
  /** Index of the outcome that won. */
  winningIndex: number;
  /** Score of the first team. */
  teamOneScore: number;
  /** Score of the second team. */
  teamTwoScore: number;
  /** Kickoff time of the match. */
  kickOffTime: Date;
}

export interface IUserBetInfo {
  /** How many Wei the user placed in the bet. */
  amount: number;
  /** If the user has been paid yet or not. */
  paid: boolean;
  /** How much the user won on the bet. */
  winnings: number;
  /** Index of the outcome user bet on. */
  outcomeIndex: number;
  /** Address of the BetEvent */
  address: string;
}

/**
 * Returns the amount of BetEvents managed by the smart contract.
 * @param account the address of the user account.
 * @returns amount of BetEvents managed by the smart contract.
 */
const _getAmountOfBets = async (account: string): Promise<number> => {
  const length = await managerContract.methods.length().call({ from: account });
  return length;
};

/**
 * returns an array of addresses to Betting contracts managed by the smart contract.
 * @param account Address of the user account.
 * @returns Array of addresses of Betting contracts.
 */
const _getAllBets = async (account: string): Promise<string[]> => {
  const length = await _getAmountOfBets(account);
  const addresses: string[] = [];
  for (let i = 0; i < length; i++) {
    addresses[i] = await managerContract.methods.betEvents(i).call({ from: account });
  }
  return addresses;
};

/**
 * Returns an array of the bet objects for bets placed by a user.
 * @param account Address of the user account.
 * @param betEvents Array of addresses of Betting contracts.
 * @returns Array of addresses of Betting contracts that user placed bet on.
 */
const _getPlacedBets = async (account: string, betEvents: string[]): Promise<string[]> => {
  const placedBets: string[] = [];
  for (const betEvent of betEvents) {
    bettingContract.options.address = betEvent;
    const bet = await bettingContract.methods.bets(account).call({ from: account });
    if (bet.amount !== '0') {
      placedBets.push(betEvent);
    }
  }
  return placedBets;
};

/**
 * Returns an array of bets for which the event is not over.
 * @param account Address of the user account.
 * @param betEvents Array of addresses of Betting contracts.
 * @returns Array of bets for which the event is not over.
 */
const _getAvailableBets = async (account: string, betEvents: string[]): Promise<string[]> => {
  const availableBets: string[] = [];
  for (const betEvent of betEvents) {
    bettingContract.options.address = betEvent;
    const state = await bettingContract.methods.state().call({ from: account });
    if (state < 2) {
      availableBets.push(betEvent);
    }
  }
  return availableBets;
};

/**
 * Returns Information about a bet event.
 * @param account Account the address of the user account.
 * @param betEvent Address of the Betting contract.
 * @returns Information about a bet event.
 */
const _getBetInfo = async (account: string, betEvent: string): Promise<IBetInfo> => {
  bettingContract.options.address = betEvent;
  const kickOff = await bettingContract.methods.kickOffTime().call({ from: account });
  const kickOffTime = new Date(parseInt(kickOff, 10));
  const outcomeOne = await bettingContract.methods.outcomeOne().call({ from: account });
  const outcomeTwo = await bettingContract.methods.outcomeTwo().call({ from: account });
  const outcomeThree = await bettingContract.methods.outcomeThree().call({ from: account });
  const poolOne = await bettingContract.methods.totalPools(0).call({ from: account });
  const poolTwo = await bettingContract.methods.totalPools(1).call({ from: account });
  const poolThree = await bettingContract.methods.totalPools(2).call({ from: account });
  const totalPool = await bettingContract.methods.totalPools(3).call({ from: account });
  const state = await bettingContract.methods.state().call({ from: account });
  const winningIndex = await bettingContract.methods.winningIndex().call({ from: account });
  const teamOneScore = await bettingContract.methods.teamOneScore().call({ from: account });
  const teamTwoScore = await bettingContract.methods.teamTwoScore().call({ from: account });

  const betInfo: IBetInfo = {
    kickOffTime,
    outcomeOne,
    outcomeTwo,
    outcomeThree,
    poolOne,
    poolTwo,
    poolThree,
    totalPool,
    state,
    winningIndex,
    teamOneScore,
    teamTwoScore,
  };
  return betInfo;
};

/**
 * Returns an object containing information about a bet a user placed.
 * @param account Account the address of the user account.
 * @param betEvent Address of the Betting contract.
 * @returns Information about a bet a user placed.
 */
const _getUserBetInfo = async (account: string, betEvent: string): Promise<IUserBetInfo> => {
  bettingContract.options.address = betEvent;
  const info = await bettingContract.methods.bets(account).call({ from: account });
  const userBetInfo: IUserBetInfo = {
    amount: info.amount,
    paid: info.paid,
    outcomeIndex: info.outcomeIndex,
    winnings: info.winnings,
    address: betEvent,
  };
  return userBetInfo;
};

/**
 * Allows a user to place a bet.
 * @param betEvent Address of the Betting contract.
 * @param outcomeIndex Index of the outcome that the user is betting on.
 * @param value Amount of Ether the user is betting.
 */
export const placeBet = async (betEvent: string, outcomeIndex: number, value: string) => {
  bettingContract.options.address = betEvent;
  const accounts = await web3.eth.getAccounts();
  bettingContract.methods.placeBet(outcomeIndex).send({
    from: accounts[0],
    value: web3.utils.toWei(value, 'ether'),
  });
};

/**
 * Allows a user to change a bet that they have placed.
 * @param betEvent Address of the Betting contract.
 * @param outcomeIndex Index of the outcome that the user is changing their bet to.
 */
export const changeBet = async (betEvent: string, outcomeIndex: number) => {
  bettingContract.options.address = betEvent;
  const accounts = await web3.eth.getAccounts();
  bettingContract.methods.changeBet(outcomeIndex).send({ from: accounts[0] });
};

/**
 * Allows a user to claim their winnings
 * @param betEvent Address of the Betting contract.
 */
export const claimWinnings = async (betEvent: string) => {
  try {
    bettingContract.options.address = betEvent;
    const accounts = await web3.eth.getAccounts();
    bettingContract.methods.claimWinnings().send({ from: accounts[0] });
  } catch {}
};

/**
 * Returns an array of the bet objects for bets placed by a user.
 * @returns Array of addresses of Betting contracts that user placed bet on.
 */
export const getPlacedBets = async (): Promise<string[]> => {
  let placedBets: string[] = [];
  try {
    const accounts = await web3.eth.getAccounts();
    const bets = await _getAllBets(accounts[0]);
    placedBets = await _getPlacedBets(accounts[0], bets);
  } catch {}
  return placedBets;
};

/**
 * Returns an array of bets for which the event is not over.
 * @returns Array of bets for which the event is not over.
 */
export const getAvailableBets = async (): Promise<string[]> => {
  let availableBets: string[] = [];
  try {
    const accounts = await web3.eth.getAccounts();
    const bets = await _getAllBets(accounts[0]);
    availableBets = await _getAvailableBets(accounts[0], bets);
  } catch {}
  return availableBets;
};

/**
 * Returns an array of bets for which the event is not over from a
 * list contract addresses.
 * @param betEvents Array of addresses of Betting contracts.
 * @returns Array of bets for which the event is not over.
 */
export const getAvailableBetsFromList = async (betEvents: string[]): Promise<string[]> => {
  let availableBets: string[] = [];
  try {
    const accounts = await web3.eth.getAccounts();
    availableBets = await _getAvailableBets(accounts[0], betEvents);
  } catch {}
  return availableBets;
};

/**
 * Returns information about a bet event.
 * @param betEvent Address of the Betting contract.
 * @returns Information about a match that a bet is a available for.
 */
export const getBetInfo = async (betEvent: string): Promise<IBetInfo> => {
  let betInfo: any = {};
  try {
    const accounts = await web3.eth.getAccounts();
    betInfo = await _getBetInfo(accounts[0], betEvent);
  } catch {}
  return betInfo;
};

/**
 * Returns information about a bet a user placed.
 * @param betEvent Address of the Betting contract.
 * @returns Information about a bet that a user has placed.
 */
export const getUserBetInfo = async (betEvent: string): Promise<IUserBetInfo> => {
  let userBetInfo: any = {};
  try {
    const accounts = await web3.eth.getAccounts();
    userBetInfo = await _getUserBetInfo(accounts[0], betEvent);
  } catch {}
  return userBetInfo;
};

/**
 * Used to check if a user is logged in.
 * @returns A boolean signifying if a user is logged in or not.
 */
export const isUserLoggedIn = async (): Promise<boolean> => {
  let userLoggedIn = false;
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0].length > 0) {
      userLoggedIn = true;
    }
  } catch {}
  return userLoggedIn;
};

/**
 * Returns an array of club names that are in our system.
 * @returns An array with club names that are in our system.
 */
export const getAllClubs = (): string[] => {
  const clubs: string[] = [
    'Arsenal',
    'Bournemouth',
    'Brighton',
    'Burnley',
    'Chelsea',
    'Crystal Palace',
    'Everton',
    'Huddersfield',
    'Leicester',
    'Liverpool',
    'Man City',
    'Man Utd',
    'Newcastle',
    'Southampton',
    'Stoke',
    'Swansea',
    'Spurs',
    'Watford',
    'West Brom',
    'West Ham',
  ];
  return clubs;
};

/**
 * Returns an array of bets for a specific club.
 * @param club The name of the club.
 * @returns An array of the bets for a specific club.
 */
export const getGamesByClub = async (club: string): Promise<string[]> => {
  const gamesByClub: string[] = [];
  try {
    const accounts = await web3.eth.getAccounts();
    const bets = await _getAllBets(accounts[0]);
    for (const betEvent of bets) {
      bettingContract.options.address = betEvent;
      const teamOne = await bettingContract.methods.outcomeOne().call({ from: accounts[0] });
      const teamTwo = await bettingContract.methods.outcomeOne().call({ from: accounts[0] });

      if (teamOne === club || teamTwo === club) {
        gamesByClub.push(betEvent);
      }
    }
  } catch {}
  return gamesByClub;
};
