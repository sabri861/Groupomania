import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import { Paper, Button, Grid, Stack } from '@mui/material'
import { ReactComponent as MainLogo } from '../../assets/logoAuth.svg'
import bgLogo from '../../assets/bgLogo.png'
import { useAccountService } from '../../hooks/useAccountService'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const accountService = useAccountService()

  useEffect(() => {
    // change root background color for overscroll
    document.documentElement.style.setProperty('background', 'black')
    if (accountService.isLogged()) {
      navigate('/admin')
    }
  }, [])

  return (
    <Paper
      style={{
        backgroundImage: `url('${bgLogo}'), linear-gradient(to right, #6DB3F2, #6DB3F2)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        // backgroundColor: 'black',
        padding: 0,
        height: '100vh',
        minWidth: '500px',
      }}
      component={Stack}
      direction="column"
      justifyContent="center"
      elevation={0}
      square={true}
      // sx={{ height: '100vh' }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Stack direction="row">
          <MainLogo />
        </Stack>
        <Grid item>
          <Stack direction="row" spacing={2} style={{ marginBottom: 20 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsLogin(true)
              }}
            >
              se connecter
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setIsLogin(false)
              }}
            >
              s'inscrire
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          // style={{
          //   backgroundColor: 'white',
          //   padding: 40,
          //   borderRadius: '10px',
          // }}
        >
          {/*( ? = if et le : = else ) /// Si le isLogin est a true on affiche le Login si non on affiche le Signup  ( ? = if et le : = else )*/}
          {isLogin == true ? <Login /> : <Signup />}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Auth
