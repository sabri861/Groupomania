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

  const [passwordError, setPasswordError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    setLoginError('')
    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    if (!regExEmail(credentials.email)) {
      setEmailError('email invalide')
      return
    }
    if (credentials.password.length < 6) {
      setPasswordError('mot de passe : minimum 6 caractères ')
      return
    }
    try {
      const login = await accountService.login(credentials)
      if (login.response && login.response.data.error) {
        setLoginError(login.response.data.error)
        return
      }
      navigate('/admin')
    } catch {
      setLoginError('email ou mot de passe incorrect')
    }
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
        error={emailError}
        onChange={(event) => {
          if (emailError) {
            setEmailError('')
          }
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
        helperText={passwordError}
        error={passwordError}
        autoComplete="current-password"
        onChange={(event) => {
          if (passwordError) {
            setPasswordError('')
          }
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
