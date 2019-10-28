export interface EventModel {
  id: string
  name: string
  date: string
  time: string
  price: number
  imageUrl: string
  location?: {
    address: string
    city: string
    country: string
  },
  onlineUrl?: string
  sessions: Session[]
}

export interface Session {
  id: number
  name: string
  presenter: string
  duration: number
  level: string
  abstract: string
  voters: string[]
}
