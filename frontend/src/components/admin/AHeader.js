import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as MainLogo } from '../../assets/logoAuth.svg'
import { useAccountService } from '../../hooks/useAccountService'

const drawerWidth = 240
const navItems = ['Accueil', 'Profil', 'new post', 'Déconnexion']

function AHeader(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const accountService = useAccountService()
  let navigate = useNavigate()
  const onMenuItemClick = (item) => {
    console.log(item)
    if (item == 'Déconnexion') {
      logout()
    } else if (item == 'new post') {
      navigate('/admin/createPublication')
    } else if (item == 'Profil') {
      navigate('/admin/profile')
    } else {
      navigate('/admin/acceuil')
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const logout = () => {
    console.log(accountService)
    accountService.logout()
    navigate('/')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <MainLogo style={{ height: 70, width: 200, marginTop: 13 }} />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => onMenuItemClick(item)}
              sx={{
                textAlign: 'center',
                color: '#87A084',
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" style={{ backgroundColor: '#001925' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <MainLogo style={{ height: 70, width: 200, marginTop: 7 }} />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                onClick={() => onMenuItemClick(item)}
                // sx={{ color: '#fff' }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#001925',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </Box>
  )
}

AHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default AHeader

// // import { AccountService } from '../../_services/account.service'
// import { useNavigate } from 'react-router-dom'

// const AHeader = ({ accountService }) => {
//   let navigate = useNavigate()
//   const logout = () => {
//     accountService.logout()
//     navigate('/')
//   }

//   return (
//     <div className="AHeader">
//       header admin
//       <button onClick={logout}>deconnexion</button>
//     </div>
//   )
// }

// export default AHeader
