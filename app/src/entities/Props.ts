export type ImageProps = {
  image: string
  class: string
}

export type ProfileQuery = {
  firstName: string,
  lastName: string,
  address?: string,
  phoneNo?: string ,
  tags: string[]
}

export type Tags = {
  tagid: number,
  tag: string,
  createdAt: Date,
  updatedAt: Date
}
