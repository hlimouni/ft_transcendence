import { ThemeOptions } from '@mui/material'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#6c5dd3',
    },
    secondary: {
      main: '#4c4d54',
    },
    background: {
      default: '#1e2129',
      paper: '#242731',
    },
    success: {
      main: '#7fba7a',
    },
    info: {
      main: '#3164a7',
    },
    warning: {
      main: '#ff754b',
    },
    divider: '#373a43',
    text: {
      primary: '#ffffff',
      secondary: '#808191',
      // hint: 'rgba(18,18,18,0.5)'
    },
  },
  typography: {
    fontFamily: 'Inter,sans-serif',
    fontWeightLight: 200,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 1000,
  },
  shape: {
    borderRadius: 10,
  },
};