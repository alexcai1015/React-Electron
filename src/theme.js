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
});

// TODO: add responsive font sizes (rem)?
// TODO: add breakpoints?