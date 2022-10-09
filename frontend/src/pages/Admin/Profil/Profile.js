import React, { useState } from 'react'
import {
  useTheme,
  useMediaQuery,
  TextField,
  Stack,
  Button,
  Grid,
  Box,
} from '@mui/material'
import { useAccountService } from '../../../hooks/useAccountService'
import { useNavigate } from 'react-router-dom'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: '#87A084',
    // background: 'red',
  },
}

const Profile = () => {
  const theme = useTheme()
  const isSmallScreenAndUp = useMediaQuery(theme.breakpoints.up('sm'))
  const accountService = useAccountService()
  const navigate = useNavigate()

  const [email, setEmail] = useState(accountService.getUserEmail())
  const pseudo = accountService.getPseudo()

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onDelete = async (e) => {
    e.preventDefault()
    try {
      await accountService.delete(accountService.getUserId())

      navigate('/Auth')
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await accountService.modifyEmail({ email }, accountService.getUserId())

      navigate('/admin')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={0}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Stack
            spacing={4}
            style={{
              backgroundColor: '#152D37',
              padding: 20,
              borderRadius: isSmallScreenAndUp ? 10 : 0,
            }}
          >
            <h1 style={{ color: '#87A084', textAlign: 'center' }}>
              Modifier mon profil
            </h1>
            <TextField
              label="Pseudonyme"
              value={pseudo}
              id="fullWidth"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                input: { ...styles.textField },
              }}
            />
            <TextField
              label="Adresse e-mail"
              value={email}
              onChange={(e) => changeEmail(e)}
              sx={{
                input: { ...styles.textField },
              }}
            />
            <Button variant="contained" component="label" onClick={onSubmit}>
              Mettre à jour
            </Button>
            <Button variant="contained" component="label" onClick={onDelete}>
              supprimer mon compte
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile
