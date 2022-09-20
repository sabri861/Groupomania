import { useState } from 'react'
import { AccountService } from '../_services/account.service'

export const useAccountService = () => {
  const [accountService] = useState(new AccountService(localStorage))
  return accountService
}
