import React from 'react'
import Layout from '../../Layout'
import Navbar from '../../Navbar'
import Separator from '../../Separator'

const DashboardPage = () => {
  return (
    <Layout navbar={<Navbar />}>
      <Separator padding={10} />
    </Layout>
  )
}

export default DashboardPage
