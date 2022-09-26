import React, { useEffect, useState } from 'react'

import { useTheme, useMediaQuery, Stack, Grid, Box } from '@mui/material'
import { usePostService } from '../../../hooks/usePostService'
import PostItem from './postItem'

const styles = {
  textField: {
    // backgroundColor: 'white',
    color: '#87A084',
    // background: 'red',
  },
}
const ITEM_HEIGHT = 48
const Acceuil = () => {
  const postService = usePostService()
  const [posts, setPosts] = useState([])

  const getAll = async () => {
    try {
      const posts = await postService.getAll()
      setPosts(posts)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  console.log('state 2 : ', posts)
  const theme = useTheme()
  const isSmallScreenAndUp = useMediaQuery(theme.breakpoints.up('sm'))

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
            <h1 style={{ color: '#87A084', textAlign: 'center' }}>Accueil</h1>
            {posts.map((p) => {
              return (
                <PostItem
                  post={p}
                  handleClick={handleClick}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  ITEM_HEIGHT={ITEM_HEIGHT}
                />
              )
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Acceuil