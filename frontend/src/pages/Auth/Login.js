import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import { Button, Stack, TextField, Paper } from '@mui/material'

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

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    const login = await accountService.login(credentials)
    if (login.response.data.error) {
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
