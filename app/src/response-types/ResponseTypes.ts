import {Dispatch, SetStateAction} from "react"

export type Product = {
  pid: number,
  name: string,
  brand: string,
  description: string,
  quantity: string,
  price: string,
  uid: string,
  image: string
}

export type ProductModalType = {
  pid: number,
  name: string,
  brand: string,
  description: string,
  quantity: string,
  price: string,
  uid: string,
  image: string,
  onClose: Dispatch<SetStateAction<Boolean>>
}
export type LoginCredentials = {
  username?: string,
  email?: string,
  password: string
}
