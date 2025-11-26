export interface Picture {
  id: number
  url: string
  altText: string
}

export interface CartFurniture {
  id: number
  name: string
  price: number
  typeName: string | null
  pictures?: Picture[]
  quantity: 1
}
