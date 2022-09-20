import axios from 'axios'

export class PostService {
  async create({ titre, description, image, name, userId }) {
    const post = { titre, description, image, name, userId }
    const formData = new FormData()
    formData.append('titre', titre)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('name', name)
    formData.append('userId', userId)
    try {
      const res = await axios.post('http://localhost:4200/api/posts', formData)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
