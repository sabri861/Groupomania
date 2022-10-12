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
      // console.log(e)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  // console.log('state 2 : ', posts)
  const theme = useTheme()
  const isSmallScreenAndUp = useMediaQuery(theme.breakpoints.up('sm'))
  const updateList = async (id) => {
    await postService.deletePost(id)
    setPosts((prevState) => {
      return prevState.filter((item) => item._id !== id)
    })
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
            {posts.map((p, index) => {
              return (
                <PostItem
                  key={index}
                  post={p}
                  onDelete={async (id) => await updateList(id)}
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
