import React, { useState } from 'react'
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

const PostItem = (props) => {
  const { post, handleClick, anchorEl, handleClose, ITEM_HEIGHT } = props
  const accountService = useAccountService()
  const postService = usePostService()
  const userId = accountService.getUserId()
  // regarde si post.usersLiked inclus le userId de la personne connecté
  const [liked, setLiked] = useState(post.usersLiked.includes(userId))

  const likePost = async (hasLiked) => {
    try {
      await postService.likePost({
        userId: userId,
        postId: post._id,
        like: hasLiked ? 1 : -1,
      })
      setLiked(hasLiked)
    } catch (e) {
      console.log(e)
    }
  }

  const options = ['Supprimer', 'Modifier']
  const open = Boolean(anchorEl)

  return (
    <Card>
      <CardHeader
        action={
          <div>
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
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
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
          onClick={() => likePost(!liked)}
          sx={{ color: liked ? 'white' : '#87A084' }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostItem
