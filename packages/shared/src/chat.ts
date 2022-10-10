export interface Server {
  _id?: string
  name: string
  owner: string
}

export interface Channel {
  name: string
  server: string
}
