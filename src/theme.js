import { createMuiTheme } from '@material-ui/core';

const DCTX_THEME_FONT = 'Work Sans';

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      DCTX_THEME_FONT,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    info: {
      main: '#2E2E2E',
    },
    mainPurple: 'rgb(72, 34, 164)',
    white: '#FFFFFF',
    softBlack: '#444444',
    approvalGreen: '#81C784',
    denialRed: '#EB5757',
    denialDarkRed: '#C4495E',
    suspendOrange: '#FF8C00',
    linkPurple: '#5E35B1',
    linkBlue: '#04AFD4',
    sectionTitleBlue: '#5E35B1',
    rowStripeGray: 'rgb(246,246,246)',
    cancelGray: '#A7A7A7',
    borderGray: '#C4C4C4',
    labelGray: '#989898',
    fieldValueGray: '#343434',
    headerTextGray: '#2e2e2e',
    bodyTextBlack: '#2E2E2E',
    highlightAmber: '#FF7043',
  },
});

// TODO: add responsive font sizes (rem)?
// TODO: add breakpoints?
