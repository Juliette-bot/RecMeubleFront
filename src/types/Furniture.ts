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
  status: string | null // ou un union type si tu veux être plus stricte
}
