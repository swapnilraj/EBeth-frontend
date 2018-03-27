/**
 * About page component
 */

import * as React from 'react';

import { PlaceBetsContainer } from '../containers/placeBetsContainer';

class Fixtures {
  public homeTeamName: string;
  public awayTeamName: string;
  public date: string;
  public time: string;
  public homeBets: string;
  public awayBets: string;
  public drawBets: string;
  public potValue: string;

  constructor(homeTeamName, awayTeamName, date, time, homeBets, drawBets, awayBets, potValue) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.date = date;
    this.time = time;
    this.homeBets = homeBets;
    this.awayBets = awayBets;
    this.drawBets = drawBets;
    this.potValue = potValue;
  }
}

const fixture1 = new Fixtures('Arsenal', 'Brighton', 'Saturday | 21st March', '3pm', 40, 40, 60, 1.2);
const fixture2 = new Fixtures('Watford City', 'Arsenal', 'Saturday | 21st March', '3pm', 100, 45, 92, 0.45);
const fixture3 = new Fixtures('Stoke City', 'Newcastle United', 'Saturday | 21st March', '5.30pm', 100, 45, 92, 0.9);
const fixture4 = new Fixtures('Liverpool', 'Everton', 'Sunday | 28th March', '4pm', 169, 82, 120, 2.0);
const fixture5 = new Fixtures('Huddersfield United', 'West Brom', 'Sunday | 28th March', '5.30pm', 169, 82, 120, 1.12);

const fixture6 = new Fixtures('West Ham United', 'Southampton', 'Saturday | 31st March', '3pm', 40, 40, 60, 1.2);
const fixture7 = new Fixtures('Brighton', 'Leicester City', 'Saturday | 31st March', '3pm', 100, 45, 92, 0.45);
const fixture8 = new Fixtures('Chelsea FC', 'Tottenham Hotspur', 'Sunday | 1st April', '4pm', 169, 82, 120, 2.0);
const fixture9 = new Fixtures('Everton', 'Manchester City', 'Saturday | 31st March', '5.30pm', 169, 82, 120, 1.12);

const array = [fixture1, fixture2, fixture3, fixture4, fixture5, fixture6, fixture7, fixture8, fixture9];

const PlaceBets = () => (
  <div>
    <PlaceBetsContainer fixtureList={array} width="80%" marginLeft="5%" />
  </div>
);

export default PlaceBets;
