import React from 'react'
import {
  useTheme,
  useMediaQuery,
  TextField,
  Stack,
  Button,
  Grid,
  Box,
} from '@mui/material'

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
              id="fullWidth"
              sx={{
                input: { ...styles.textField },
              }}
            />
            <TextField
              label="Adresse e-mail"
              sx={{
                input: { ...styles.textField },
              }}
            />
            <Button variant="contained" component="label">
              Mettre à jour
            </Button>
            <Button variant="contained" component="label">
              supprimer mon compte
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile
