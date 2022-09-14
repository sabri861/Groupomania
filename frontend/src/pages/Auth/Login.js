import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import { Button, Stack, TextField } from '@mui/material'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: 'white',
    // background: 'red',
  },
}

const Login = ({ accountService }) => {
  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [loginError, setLoginError] = useState('')

  const [emailError, setEmailError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    if (!regExEmail(credentials.email)) {
      setEmailError('email invalide')
      return
    }
    const login = await accountService.login(credentials)
    if (login.response && login.response.data.error) {
      setLoginError(login.response.data.error)
      return
    }
    navigate('/admin')
  }

  return (
    <Stack direction="column" spacing={2}>
      <TextField
        sx={{
          input: { ...styles.textField },
        }}
        id="outlined-basic"
        label="Email"
        variant="filled"
        helperText={emailError}
        onChange={(event) => {
          setCredentials({
            ...credentials,
            email: event.target.value,
          })
        }}
      />

      <TextField
        sx={{ input: { ...styles.textField } }}
        id="outlined-password-input"
        label="Password"
        type="password"
        variant="filled"
        autoComplete="current-password"
        onChange={(event) => {
          setCredentials({
            ...credentials,
            password: event.target.value,
          })
        }}
      />

      <Button variant="contained" onClick={onSubmit}>
        Connexion
      </Button>
      <p>{loginError}</p>
    </Stack>
  )
}

export default Login
