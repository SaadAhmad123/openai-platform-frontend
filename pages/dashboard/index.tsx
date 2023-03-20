import React from 'react'
import DashboardPage from '../../components/pages/DashboardPage'
import AuthProvider from '../../AuthContext'

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <AuthProvider>
      <DashboardPage />
    </AuthProvider>
  )
}
