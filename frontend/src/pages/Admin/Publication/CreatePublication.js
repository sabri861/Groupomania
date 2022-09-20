import React from 'react'
import {
  TextField,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Box,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: '#87A084',
    // background: 'red',
  },
}

const CreatePublication = () => {
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
              Ajouter une publication
            </h1>
            <TextField
              label="Titre"
              id="fullWidth"
              sx={{
                input: { ...styles.textField },
              }}
            />
            <TextField
              label="Description"
              sx={{
                input: { ...styles.textField },
              }}
            />
            <IconButton
              direction="row"
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
            <Button variant="contained" component="label">
              Ajouter une publication
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreatePublication
