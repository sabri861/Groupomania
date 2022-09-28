import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useAccountService } from '../../../hooks/useAccountService'
import { usePostService } from '../../../hooks/usePostService'
import { useNavigate } from 'react-router-dom'

const PostItem = (props) => {
  let navigate = useNavigate()
  const { post, onDelete } = props
  const accountService = useAccountService()
  const postService = usePostService()
  const userId = accountService.getUserId()
  const isAdmin = accountService.isAdmin()
  // regarde si post.usersLiked inclus le userId de la personne connecté
  const [liked, setLiked] = useState(false)
  const options = ['Supprimer', 'Modifier']

  useEffect(() => {
    setLiked(post.usersLiked.includes(userId))
  }, [])

  const likePost = async (hasLike) => {
    try {
      console.log(hasLike)
      setLiked(hasLike)
      await postService.likePost({
        userId: userId,
        postId: post._id,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = async (option) => {
    if (option === 'Supprimer') {
      await props.onDelete(post._id)
    }
    if (option === 'Modifier') {
      console.log('doit router vers la page de modification')
    }
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Card
      style={{
        backgroundColor: '#152D37',
      }}
    >
      <CardHeader
        action={
          <div>
            {post.userId === userId || isAdmin ? (
              <>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === 'Pyxis'}
                      onClick={() => handleClose(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : null}
          </div>
        }
        title={post.name || 'inconnu'}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="#87A084">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={async () => await likePost(!liked)}
          sx={{ color: liked ? 'red' : '#87A084' }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostItem
