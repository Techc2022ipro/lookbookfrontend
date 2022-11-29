import {Dispatch, SetStateAction} from "react"

export type Product = {
  pid: number
  name: string
  brand: string
  description: string
  quantity: string
  price: string
  uid: string
  username: string
  image: string
  tags: string[]
  createdAt: Date
}

export type ProductModalType = {
  pid: number
  name: string
  brand: string
  description: string
  quantity: string
  price: string
  uid: string
  image: string
  onClose: Dispatch<SetStateAction<Boolean>>
}
export type LoginCredentials = {
  username?: string
  email?: string
  password: string
}

export type ProductCard = {
  uid: string
  username: string
  tags: string[]
  image: string
  description: string
  date: Date
}
