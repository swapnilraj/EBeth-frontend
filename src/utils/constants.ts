/**
 * Color constants
 */
const Colors = {
  background: '#fafafa',
  primary: '#fb6235',
  accent: '#273142',
  black: '#000000',
  white: '#ffffff',
  shadow: '0 2px 27px -5px rgba(0, 0, 0, 0.15)',
  textLight: 'rgba(255, 255, 255, 0.87)',
  activeTab: '#1a232a',
  win: '#00c000',
  lose: '#ff0000',
  pending: '#fb6235',
  myBetBoxText: 'white',
  homeAwayText: 'rgb(140, 140, 140)',
};

/**
 * Dimension contants
 */
const Dimens = {
  sidebarBannerLeadingMargin: 64,
  sidebarBannerTextLeadingMargin: 41,
  sidebarCollapsedWidth: 107,
  sidebarWidth: 273,
  sidebarTabsLeadingMargin: 132,
  tabLeadingPadding: 30,
  tabImageTrailingMargin: 13,
  tabImageSize: 48,
  tabImageVeticalPadding: 8,
  tabTrailingMargin: 16,
  contentHorizontalPadding: 72,
  contentVerticalPadding: 64,
  contentTitleTrailingMargin: 28,
  textPaneHorizontalPadding: 40,
  textPaneTopPadding: 38,
  textPaneBottomPadding: 33,
  textPaneBottomMargin: 56,
  textPaneHeadingBottomMargin: 6,
  textPaneDescriptionColMargin: 44,
  textPaneDescriptionLineHeight: 2.06,
  miniTextPaneHorizontalPadding: 32,
  miniTextPaneTopPadding: 38,
  miniTextPaneBottomPadding: 28,
  ytFrameRightMargin: 28,
  myBetBoxMarginTop: '3%',
  myBetBoxPadding: '0.175rem',
  myBetBoxPaddingSides: '0.2rem',
  myBetBoxFontSize: '0.6rem',
  myBetBoxLetterSpacing: '0.08rem',
  homeAwayFontSize: '0.8rem',
  myBetBoxMarginLeft: {
    Home: 'unset',
    Away: 'auto',
  },
};

/**
 * Text contants
 */
const Text = {
  bannerShortTitle: 'E',
  bannerTitle: 'Ebeth',
  profilePlaceholder: 'John Doe',
  placeBetsTab: 'Place Bets',
  currentBetsTab: 'My current bets',
  resultsTab: 'All results',
  aboutTab: 'About Ebeth',
  profileAltTitle: 'Profile photo',
  aboutTitle: 'About Ebeth',
  aboutPaneHeading: 'Ebeth',
  loremTextLeft: `Orange Tribe is  a dutch innovator and incubator of new and exciting ideas, that specialise in being a creator of elite and elegant mobile applications. In the past they have collaborated with brands such as Microsoft, Sony Music and Web Summit to create customised solutions for their global consumer base and their focus on media, entertainment and lifestyle, enables them to develop products that are easy on the eye and easy in use.
  `.trim(),
  loremTextRight: `The objective of EBeth as a project is to demonstrate the potential cryptocurrency has in the near future to thrive in area of the online betting industry. What makes our project unique is that it:
  Is immutable
  Has transparent odds
  `.trim(),
  aboutBottomPaneHeading: 'Placing a bet',
  aboutBottomPaneLorem: `Essentially, by utilizing blockchain and its inherent trust establishing nature, in conjunction with the discarding of the trust based model which exists in current online offerings, we plan to offer a new outlook on the online betting industry. We want to display a method which future cryptocurrency companies can use to compete with traditional online bookmakers and  ultimately disrupt the industry. Placing a bet is as simple as clicking the place bet button and choosing the details of the your bet, which include your team and the amount of Ether you want to bet. Once you press the Place Bet button you need to finalise the transaction with the Metmask extension
  `.trim(),
  placeBetMenuTitle: 'Place a bet',
  placeBetMenuButton: 'Place Bet',
  placeBetPopUpTitle: 'Your Bet is being processed!',
  editBetMenuTitle: 'Edit your bet',
  editBetMenuButton: 'Edit Bet',
  editBetPopUpTitle: 'Your Bet is being edited!',
  editBetPopUpText: 'You betted on the outcome, that',
};

/**
 * Outcome constants
 */
const Outcome = {
  HOME: 0,
  Draw: 1,
  AWAY: 2,
};

export { Colors, Dimens, Text, Outcome };
