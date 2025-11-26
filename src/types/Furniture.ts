export interface Picture {
  id: number
  url: string
  altText: string
}

export interface Furniture {
  id: number
  name: string
  description: string
  price: number
  height: number
  width: number
  typeName: string | null
  cityName: string | null
  zipcode: string | null
  status: string | null
  pictures?: Picture[]
  quantity: number
  deliveryCosts: number
}
