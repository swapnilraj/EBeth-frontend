/**
 * About page component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens, Text } from '../utils/constants';
import LargeText from './LargeText';
import MiniTextPane from './MiniTextPane';
import TextPane from './TextPane';

const titleTextContainer = style({
  marginBottom: Dimens.contentTitleTrailingMargin,
});

const titleStyle = style({
  color: Colors.primary,
});

const paneHeading = style({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: Dimens.textPaneBottomPadding,
});

const paneDescriptionContainer = style({
  display: 'flex',
  lineHeight: Dimens.textPaneDescriptionLineHeight,
});

const paneDescriptionCol = style({
  marginRight: Dimens.textPaneDescriptionColMargin,
});

const bottomPanes = style({
  display: 'flex',
  $nest: {
    '& iframe': {
      marginRight: Dimens.ytFrameRightMargin,
    },
  },
});

const About = () => (
  <div>
    <div className={titleTextContainer}>
      <LargeText className={titleStyle} text={Text.aboutTitle} />
    </div>
    <TextPane>
      <div className={paneHeading}>{Text.aboutPaneHeading}</div>
      <div className={paneDescriptionContainer}>
        <div className={paneDescriptionCol}>{Text.loremTextLeft}</div>
        <div>{Text.loremTextRight}</div>
      </div>
    </TextPane>
    <div className={bottomPanes}>
      <iframe width="727" height="360" src="https://www.youtube.com/embed/24EjCaK9qR8" frameBorder="0" />
      <MiniTextPane>
        <div className={paneHeading}>{Text.aboutBottomPaneHeading}</div>
        <div className={paneDescriptionContainer}>{Text.aboutBottomPaneLorem}</div>
      </MiniTextPane>
    </div>
  </div>
);

export default About;
