import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { themeOptions } from '../unity'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme(
  themeOptions
);

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>);
}

export default MyApp
