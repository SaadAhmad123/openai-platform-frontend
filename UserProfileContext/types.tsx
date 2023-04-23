export type Profile = {
  first_name: string
  last_name: string
  organisation: string
  email: string
}

export type UserProfileContextType = {
  loading?: boolean
  profile?: Profile
}
