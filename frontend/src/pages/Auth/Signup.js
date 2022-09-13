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

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(credentials)
    axios
      .post('http://localhost:4200/api/auth/signup', credentials)
      .then((res) => {
        console.log(res)
      })
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
        inscription
      </Button>
    </Stack>
  )
}

export default Signup
