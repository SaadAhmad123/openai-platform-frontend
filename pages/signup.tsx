import React from 'react'
//import SignUpPage from '../components/pages/Registration/SignUpPage'
import { useRouter } from 'next/router'
import useCheckUserLoginStatus, {
  LoginCheckState,
} from '../hooks/useCheckUserLoginStatus'
import LoadingScreen from '../components/LoadingScreen'
import WaitListBox from '../components/pages/Registration/WaitListBox'

// eslint-disable-next-line react/display-name
export default function () {
  const router = useRouter()
  const status = useCheckUserLoginStatus()
  if (status === LoginCheckState.loading) return <LoadingScreen />
  if (status === LoginCheckState.loggedIn) {
    router.push('/dashboard')
    return <></>
  }

  return <WaitListBox />
}
