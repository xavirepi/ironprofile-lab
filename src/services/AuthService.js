import { create } from "./BaseService";

const http = create({
  useAccessToken: false,
  reloadOnUnauthorized: false,
})

export const login = (body) => {
  return http.post('/login', body)
}