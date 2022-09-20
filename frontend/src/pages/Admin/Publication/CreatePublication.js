import React, { useState } from 'react'
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
import { usePostService } from '../../../hooks/usePostService'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: '#87A084',
    // background: 'red',
  },
}

const CreatePublication = () => {
  const postService = usePostService()
  const [image, setImage] = useState()
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const changeImage = (e) => {
    setImage(e.target.files[0])
  }
  const changeTitre = (e) => {
    setTitre(e.target.value)
  }
  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // setLoginError('')

    // const regExEmail = (value) => {
    //   return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    // }
    // if (!regExEmail(credentials.email)) {
    //   setEmailError('email invalide')
    //   return
    // }
    // if (credentials.password.length < 6) {
    //   setPasswordError('mot de passe : minimum 6 caractères ')
    //   return
    // }
    const post = { titre, description, image }
    try {
      const create = await postService.create(post)
      // if (login.response && login.response.data.error) {
      //   setLoginError(login.response.data.error)
      //   return
      // }
      navigate('/admin')
    } catch (e) {
      console.log(e)
      // setLoginError('email ou mot de passe incorrect')
    }
  }

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
              onChange={(e) => changeTitre(e)}
              sx={{
                input: { ...styles.textField },
              }}
            />
            <TextField
              label="Description"
              onChange={(e) => changeDescription(e)}
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
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => changeImage(e)}
              />
              <PhotoCamera />
            </IconButton>
            <div>
              {image ? <img src={URL.createObjectURL(image)} alt="" /> : null}
              <input hidden onChange={(e) => onSubmit(e)} />
            </div>
            <Button variant="contained" component="label" onClick={onSubmit}>
              Ajouter une publication
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreatePublication
