import React, { useState } from 'react'
import AuthContext from './Context'
import useAuth from '../hooks/useAuth'
import onMount from '../hooks/onMount'
import { useRouter } from 'next/router'
import LoadingScreen from '../components/LoadingScreen'
import axios from 'axios'
import { AppEnvironment } from '../helpers/AppEnvironmentManager'
import { Profile } from './types'
import safeConsole from '../helpers/safeConsole'


interface IUserProfileProvider {
  children: React.ReactNode
  mustHaveProfile?: boolean
}


const UserProfileProvider = ({ children, mustHaveProfile = false }: IUserProfileProvider) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { getUser, getAuth } = useAuth({})
  const [profile, setProfile] = useState<Profile | undefined>()

  const goToProfile = () => router.push("/profile")

  const getProfile = async (IdToken: string) => {
    const resp = await axios.get(AppEnvironment.makeRestUrl('/user'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: IdToken,
      },
    })
    return resp.data as Profile | undefined
  }

  onMount(async () => {
    setLoading(true)
    let _profile = undefined as (Profile | undefined)
    try {
      const _auth = await getAuth()
      if (!_auth) throw new Error('No User')
      const _authUser = await getUser()
      if (!_authUser) throw new Error('No Auth User')
      _profile = await getProfile((_auth as any)?.IdToken || "")
      setProfile(_profile)
    } catch (e) {
      safeConsole()?.error(e)
    } finally {
      setLoading(false)
    }
    if (mustHaveProfile && !_profile) {
      goToProfile()
    }
    return
  })

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        profile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default UserProfileProvider
