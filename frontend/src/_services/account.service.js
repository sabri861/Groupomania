import axios from 'axios'

export class AccountService {
  constructor(localStorage) {
    this.localStorage = localStorage
    this.init()
  }

  async login({ email, password }) {
    const credentials = { email, password }
    try {
      const res = await axios.post(
        'http://localhost:4200/api/auth/login',
        credentials
      )
      console.log(res)
      this.localStorage.setItem('token', res.data.token)
      //*****PASSER PAR DEFAUT LE TOKEN DANS TOUTE LES REQUETTE DE L'APPLICATION *******/
      axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.token}`
    } catch (error) {
      console.log(error)
      return error
    }
  }

  logout() {
    this.localStorage.removeItem('token')
  }

  getToken() {
    return this.localStorage.getItem('token')
  }

  isLogged() {
    return !!this.getToken()
  }

  init() {
    //*****PASSER PAR DEFAUT LE TOKEN DANS TOUTE LES REQUETTE DE L'APPLICATION *******/
    axios.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`
  }
}
