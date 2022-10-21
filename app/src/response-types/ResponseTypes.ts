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

export type LoginCredentials = {
  username?: string,
  email?: string,
  password: string
}
