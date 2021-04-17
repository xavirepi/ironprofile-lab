import { create } from "./BaseService";

const http = create()

export const getUserInfo = () => {
  return http.get('/auth/loggedin')
}

export const signup = (user) => {
  return http.post('/auth/signup', user)
}