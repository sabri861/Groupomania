import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AccountService } from './_services/account.service'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const accountService = new AccountService(localStorage)

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // Purple and green play nicely together.
      main: '#87A084',
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: '#11cb5f',
    // },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <App accountService={accountService} />
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
