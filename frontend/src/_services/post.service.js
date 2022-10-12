import axios from 'axios'
import { BACKEND_BASE_URL } from '../config/constants'

export class PostService {
  async create({ name, description, image, userId }) {
    // const post = { name, description, image }
    // ---------- creation d'objet formeData -----------//
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('userId', userId)
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/posts`, formData)
      // console.log(res)
      return res
    } catch (error) {
      alert(
        'Impossible de crée un post pour le moment. Veuillez réessayer plus tard.'
      )
      throw error
    }
  }
  async getAll() {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/posts`)
      const data = res.data.map((post) => {
        return {
          ...post,
          imageUrl: post.imageUrl.replace(
            'http://localhost:4200',
            BACKEND_BASE_URL
          ),
        }
      })
      // console.log('posts:', data)
      return data
    } catch (error) {
      alert(
        'Impossible de récupérer les posts pour le moment. Veuillez réessayer plus tard.'
      )
      throw error
    }
  }
  async likePost({ userId, postId, like }) {
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/posts/${postId}/like`,
        { userId, like }
      )
      // console.log('posts:', res.data)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deletePost(id) {
    const res = await axios.delete(`${BACKEND_BASE_URL}/api/posts/${id}/`)
    // console.log('posts:', res.data)
    return res.data
  }
  async modify({ name, description, image, userId }, id) {
    const post = { name, description, image }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('userId', userId)
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/posts/${id}`,
        formData
      )
      // console.log(res)
      this.localStorage.setItem('name', name)
      return res
    } catch (error) {
      // console.log(error)
      return error
    }
  }
}
