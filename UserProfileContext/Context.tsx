import React from 'react'
import { UserProfileContextType } from './types'

const AuthContext = React.createContext<UserProfileContextType>({})
export default AuthContext
