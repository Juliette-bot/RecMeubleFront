import type { Address, AddressInput } from '@/types/Address'

export interface UserProfil {
  id: number
  firstname: string
  lastname: string
  mail: string
  address: Address
}

export interface UpdateUserProfile {
  firstname?: string
  lastname?: string
  mail?: string
  address?: AddressInput
}

export interface UpdatePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
