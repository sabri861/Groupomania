import axios from 'axios'

export class PostService {
  async create({ name, description, image, userId }) {
    const post = { name, description, image }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
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
  async getAll() {
    try {
      const res = await axios.get('http://localhost:4200/api/posts')
      console.log('posts:', res.data)
      return res.data
    } catch (error) {
      console.log(error)
      return error
    }
  }
  async likePost({ userId, postId, like }) {
    try {
      const res = await axios.post(
        `http://localhost:4200/api/posts/${postId}/like`,
        { userId, like }
      )
      console.log('posts:', res.data)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deletePost(id) {
    const res = await axios.delete(`http://localhost:4200/api/posts/${id}/`)
    console.log('posts:', res.data)
    return res.data
  }
  async modify({ name, description, image, userId }) {
    const post = { name, description, image }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image)
    formData.append('userId', userId)
    try {
      const res = await axios.put(
        'http://localhost:4200/api/posts/${id}',
        formData
      )
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
