export interface DecodedJwt {
  userId: string
  username: string
  iat: number
  exp: number
  sub: string
}
