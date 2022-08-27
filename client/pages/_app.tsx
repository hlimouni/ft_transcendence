import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { themeOptions } from '../unity'
import { createTheme, ThemeProvider } from '@mui/material'
import AppProvider from '../context/AppContext'
import Layout from '../components/Layout'
import { useContext } from 'react'

const theme = createTheme(themeOptions)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </AppProvider>
    </ThemeProvider>
  )
}

export default MyApp
