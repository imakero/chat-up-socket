export interface Server {
  name: string
}

export interface Channel {
  name: string
  server: string
}

export interface Message {
  text: string
  user: string
  channel: string
}
