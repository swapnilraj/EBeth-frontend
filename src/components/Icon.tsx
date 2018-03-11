/**
 * Icon component
 */

import MyBetsIcon from '../assets/MyBetsIcon';
import PlaceBetsIcon from '../assets/PlaceBetsIcon';
import ResultsIcon from '../assets/ResultsIcon';

export type TIconType = 'my-bets' | 'place-bets' | 'results';

const iconsMap = {
  /* tslint:disable:object-literal-key-quotes */
  'my-bets': MyBetsIcon,
  'place-bets': PlaceBetsIcon,
  results: ResultsIcon,
};

interface IProps {
  type: TIconType;
}

const Icon = ({ type }: IProps) => iconsMap[type]();

export default Icon;
