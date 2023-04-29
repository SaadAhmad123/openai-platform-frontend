import React from 'react'
import Head from 'next/head'
import ThemeButton from '../Buttons/ThemeButton'
import Container from './Container'
import Footer from '../Footer'

interface ILayout {
  title?: string
  children: React.ReactNode
  navbar?: React.ReactNode
  noContainer?: boolean
}

const Layout = ({ children, title, navbar, noContainer }: ILayout) => {
  return (
    <>
      <Head>
        <title>{title || `MakeGPT`}</title>
      </Head>
      <div className="min-h-screen bg-servian-white dark:bg-servian-black text-servian-black dark:text-servian-white overflow-x-hidden">
        {navbar}
        {!noContainer && <Container>{children}</Container>}
        {noContainer && <>{children}</>}
        <Footer />
      </div>
      <ThemeButton />

    </>
  )
}

export default Layout
