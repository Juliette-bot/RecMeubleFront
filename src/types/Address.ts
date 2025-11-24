import type { City } from '@/types/City'

export interface Address {
  id: number
  streetNumber: number
  streetName: string
  city: City
}

export interface AddressInput {
  streetNumber: number
  streetName: string
  cityId: number
}

export function formatAddress(address: Address): string {
  return `${address.streetNumber} ${address.streetName}, ${address.city.name} ${address.city.zipcode}`
}
