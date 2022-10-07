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
import { useAccountService } from '../../../hooks/useAccountService'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: '#87A084',
    // background: 'red',
  },
}

const ModifPost = () => {
  const accountService = useAccountService()
  const postService = usePostService()
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const [image, setImage] = useState()
  const [name, setName] = useState(searchParams.get('name'))
  const [description, setDescription] = useState(
    searchParams.get('description')
  )
  const changeImage = (e) => {
    setImage(e.target.files[0])
  }
  const changeName = (e) => {
    setName(e.target.value)
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
    const post = {
      name,
      description,
      image,
      userId: accountService.getUserId(),
    }
    try {
      await postService.modify(post, params.id)

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
              Modifier la publication
            </h1>
            <TextField
              label="titre"
              value={name}
              id="fullWidth"
              onChange={(e) => changeName(e)}
              sx={{
                input: { ...styles.textField },
              }}
            />
            <TextField
              label="Description"
              value={description}
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
            <Stack>
              {image ? (
                <img
                  style={{
                    borderRadius: 10,
                  }}
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              ) : null}
            </Stack>
            <Button variant="contained" component="label" onClick={onSubmit}>
              Mettre à jour
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ModifPost

// import React from 'react'

// const ModifPost = () => {
//   return <div>modification du post</div>
// }

// export default ModifPost
