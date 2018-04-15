/**
 * About page component
 */

import * as React from 'react';
import { ResultsContainer } from '../containers/resultsContainer';

export interface IFixture {
  homeTeamName: string;
  awayTeamName: string;
  date: string;
  time: string;
  homeBets: number;
  awayBets: number;
  drawBets: number;
  potValue: number;
  betEvent: string;
}
export interface ITabState {
  message: string;
  color: string;
  expanded: boolean;
}

export interface IResult {
  homeTeamName: string;
  awayTeamName: string;
  winningTeamStatus: string; // should be Home Away Draw
  date: string;
  score: string;
  resultForUser: string;
  teamOfUser: string; // Home|Away|Draw
  amountWon: number;
  potValue: number;
  homeTeamBets: number;
  awayTeamBets: number;
  drawBets: number;
  yourBetValue: number;
}

export interface IResultComponent {
  result: IResult;
  id: number;
  status: string;
  potValue: number;
  message: string;
}

export const defaultResult:IResult = {
  homeTeamName: '',
  awayTeamName: '',
  winningTeamStatus: '',
  date: '',
  score: '',
  resultForUser: '',
  amountWon: 0,
  potValue: 0,
  homeTeamBets: 0,
  awayTeamBets: 0,
  drawBets: 0,
  yourBetValue: 0,
  teamOfUser:'Home'
};
export const defaultIResultComponent = {
  result: defaultResult,
  id: 0,
  status: 'contracted',
  potValue: 0,
  message: '',
};

const Results = () => (
  <div>
    <ResultsContainer />
  </div>
);

export default Results;
