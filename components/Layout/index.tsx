import React, { useRef } from 'react'
import Head from 'next/head'
import ThemeButton from '../Buttons/ThemeButton'
import Container from './Container'
import Footer from '../Footer'
import Separator from '../Separator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import useKeyboard from '../../hooks/useKeyboard'
import useKeyboardControl from '../../hooks/useKeyboardControl'

interface ILayout {
  title?: string
  children: React.ReactNode
  navbar?: React.ReactNode
  noContainer?: boolean
}

const Layout = ({ children, title, navbar, noContainer }: ILayout) => {
  const feedbackRef = useRef<HTMLAnchorElement>(null)
  useKeyboardControl('KeyE', () => feedbackRef.current?.click())
  return (
    <>
      <Head>
        <title>{title || `MakeGPT`}</title>
      </Head>
      <div className="min-h-screen bg-servian-white dark:bg-servian-black text-servian-black dark:text-servian-white overflow-x-hidden">
        {navbar}
        {!noContainer && <Container>{children}</Container>}
        {noContainer && <>{children}</>}
        <Separator padding={24} />
        <Footer />
      </div>
      <ThemeButton />
      <a
        title={'Shift + Option(Mac) / Alt(Windows) + E'}
        ref={feedbackRef}
        target="_blank"
        href="https://forms.gle/eDhgnSAmE4Eto1AMA"
        className="text-sm flex items-center justify-center fixed left-4 md:left-6 lg:left-8 bottom-4 md:bottom-6 lg:bottom-8 hover:bg-[#1B1E1F] transition duration-200 shadow-lg bg-servian-orange text-servian-white py-1 px-2"
      >
        <FontAwesomeIcon icon={faComment} />
        &nbsp; Feedback
      </a>
    </>
  )
}

export default Layout
