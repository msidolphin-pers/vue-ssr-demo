import Axios from 'axios'
import {createError} from './utils'

const request = Axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333/' : '/'
})

const getCookies = () => {
  const request = global.__VUE_SSR_CONTEXT__.request
  const cookie = request.headers.cookie
  return cookie ? cookie : {}
}

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        reject(createError(400, 'no data'))
        return
      }
      if (!data.success) {
        reject(createError(400, data.message))
        return
      }
      resolve(data.data)
    }).catch((err) => {
      const resp = err.response
      reject(createError(resp.status, resp.data))
    })
  })
}

export default {
  
  getAllTodos () {
    if (process.env.VUE_ENV === 'server') {
      return handleRequest(request.get('/api/todos', {
        headers: {
          cookie: getCookies()
        }
      }))
    }
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  }
}
