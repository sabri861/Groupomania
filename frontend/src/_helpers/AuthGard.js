import { Navigate } from 'react-router-dom'
import { useAccountService } from '../hooks/useAccountService'

const AuthGard = ({ children }) => {
  const accountService = useAccountService()
  if (!accountService.isLogged()) {
    return <Navigate to="/auth" />
  }
  return children
}

export default AuthGard
