import axios from 'axios'
import { BACKEND_BASE_URL } from '../config/constants'

export class AccountService {
  constructor(localStorage) {
    this.localStorage = localStorage
    this.init()
  }

  async signup({ email, password }) {
    const credentials = { email, password }
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/auth/signup`,
        credentials
      )
      console.log(res)
      return res
    } catch (error) {
      alert(
        'Impossible de crée un compte pour le moment. Veuillez réessayer plus tard.'
      )
      throw error
    }
  }

  async login({ email, password }) {
    // console.log('login:', { email, password })
    const credentials = { email, password }
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/auth/login`,
        credentials
      )
      console.log(res)
      this.localStorage.setItem('token', res.data.token)
      this.localStorage.setItem('userId', res.data.userId)
      this.localStorage.setItem('isAdmin', res.data.isAdmin)
      this.localStorage.setItem('email', email)

      //*****PASSER PAR DEFAUT LE TOKEN DANS TOUTE LES REQUETTE DE L'APPLICATION *******/
      axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.token}`
      return res
    } catch (error) {
      alert('Impossible de ce connecter. Veuillez réessayer plus tard.')
      throw error
    }
  }

  async modifyEmail({ email }, id) {
    const user = { email }
    try {
      const res = await axios.put(`${BACKEND_BASE_URL}/api/auth/${id}`, user)
      this.localStorage.setItem('email', email)
      // console.log(res)
      return res
    } catch (error) {
      alert(
        'Impossible de modfier pour le moment. Veuillez réessayer plus tard.'
      )
      throw error
    }
  }

  async delete(id) {
    const res = await axios.delete(`${BACKEND_BASE_URL}/api/auth/${id}/`)
    // console.log('user:', res.data)
    this.localStorage.clear()
    return res.data
  }

  getUserEmail() {
    return this.localStorage.getItem('email')
  }

  logout() {
    console.log('here')
    this.localStorage.removeItem('token')
    this.localStorage.removeItem('userId')
  }

  getToken() {
    return this.localStorage.getItem('token')
  }

  getUserId() {
    return this.localStorage.getItem('userId')
  }

  isAdmin() {
    return JSON.parse(this.localStorage.getItem('isAdmin'))
  }

  isLogged() {
    return !!this.getToken()
  }

  getPseudo() {
    return this.getUserEmail().split('@')[0]
  }

  init() {
    //*****PASSER PAR DEFAUT LE TOKEN DANS TOUTE LES REQUETTE DE L'APPLICATION *******/
    axios.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`
  }
}
