import axios from 'axios'
import React, { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: 'white',
    // background: 'red',
  },
}

const Signup = ({ accountService }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [signupError, setSignupError] = useState('')

  const [emailError, setEmailError] = useState('')

  const [passwordError, setPasswordError] = useState('')

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

    const regExPassword = (value) => {
      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        value
      )
    }

    if (!regExPassword(credentials.passwor)) {
      setPasswordError(
        'password invalide: Au moins une lettre majuscule et minuscule, un chiffre, un caractère spécial, Minimum huit de longueur'
      )
      return
    }

    const signup = await accountService.signup(credentials)
    console.log(signup)
    if (signup.response && signup.response.data.error) {
      setSignupError(signup.response.data.error)
      return
    }
    setSignupError(signup.data.message)
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
        helperText={passwordError}
        autoComplete="current-password"
        onChange={(event) => {
          setCredentials({
            ...credentials,
            password: event.target.value,
          })
        }}
      />

      <Button variant="contained" onClick={onSubmit}>
        inscription
      </Button>
      <p>{signupError}</p>
    </Stack>
  )
}

export default Signup
