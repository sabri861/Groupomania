import { useState } from 'react'
import { PostService } from '../_services/post.service'

export const usePostService = () => {
  const [postService] = useState(new PostService())
  return postService
}
