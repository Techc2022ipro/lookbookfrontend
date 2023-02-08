import {Dispatch, SetStateAction} from "react"

export type Comment = {
  cid: number
  uid: number
  pid: number
  comment: string[]
}
export type Product = {
  pid: string
  name: string
  brand: string
  description: string
  quantity: string
  price: string
  uid: string
  comment: Comment[]
  username: string
  image: string
  tags: string[]
  createdAt: Date
}

export type ProductModalType = {
  pid: string
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
  pid: string
  username: string
  tags: string[]
  image: string
  comment: Comment[]
  description: string
  createdAt: Date
}

export type Profile = {
  uid: string
  firstName: string
  lastName: string
  profilePic: string | null
  address: string | null
  phoneNo: string | null
  tags: string[]
}
