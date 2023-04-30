import React, { useState } from 'react'
import { INavbar, NavbarOption } from '../types'
import {
  createButton,
  IconButton,
  NavEmphasisedOptionButton,
  NavOptionButton,
} from '../Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faBars,
  faList,
  faLock,
  faBook,
} from '@fortawesome/free-solid-svg-icons'
import Separator from '../Separator'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import useKeyboardControl from '../../hooks/useKeyboardControl'
import Logo from '../Logo'

const Navbar = ({ title, options }: INavbar) => {
  const router = useRouter()
  const { signOut } = useAuth({})
  useKeyboardControl('Slash', () => router.push('/dashboard'))
  useKeyboardControl('KeyP', () => router.push('/profile'))
  useKeyboardControl('KeyA', () => router.push('/know-more'))
  useKeyboardControl('Escape', async () => {
    await signOut()
    router.push('/')
    return
  })
  options =
    options ||
    ([
      {
        icon: <FontAwesomeIcon icon={faList} />,
        text: 'Dashboard',
        onClick: () => router.push('/dashboard'),
      },
      {
        icon: <FontAwesomeIcon icon={faUserCircle} />,
        text: 'Profile',
        onClick: () => router.push('/profile'),
      },
      {
        icon: <FontAwesomeIcon icon={faBook} />,
        text: 'Know More',
        onClick: () => router.push('/know-more'),
      },
      {
        icon: <FontAwesomeIcon icon={faLock} />,
        text: 'Sign Out',
        onClick: async () => {
          await signOut()
          router.push('/')
          return
        },
        type: 'EMPHASIS',
      },
    ] as Array<NavbarOption>)

  const [open, setOpen] = useState(false)
  const toggleDrawer = () => setOpen(!open)

  return (
    <>
      <div className="sticky top-0 mb-4 py-3 bg-white dark:bg-[#1B1E1F] shadow dark:shadow-none dark:border-b dark:border-gray-700 z-50">
        <div className="max-w-[1600px] w-screen mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div>{title || <Logo />}</div>
          <div className="items-center hidden sm:flex">
            {options.map((item, index) => (
              <React.Fragment key={index.toString() + 'desktop-0'}>
                {item.type === undefined && (
                  <NavOptionButton
                    key={index.toString() + '-desktop-1'}
                    text={item.text}
                    icon={item.icon}
                    onClick={item.onClick}
                  />
                )}
                {item.type === 'EMPHASIS' && (
                  <NavEmphasisedOptionButton
                    key={index.toString() + '-desktop-2'}
                    text={item.text}
                    icon={item.icon}
                    onClick={item.onClick}
                  />
                )}
                {(options?.length || 0) === index + 1 ? (
                  <></>
                ) : (
                  <Separator
                    horizontal
                    padding={8}
                    key={index.toString() + '-desktop-3-sep'}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="inline-block sm:hidden">
            <IconButton
              text={'Menu'}
              icon={<FontAwesomeIcon icon={faBars} />}
              onClick={toggleDrawer}
            />
          </div>
        </div>
      </div>
      <Drawer open={open} direction={'left'} onClose={toggleDrawer}>
        <div className="h-screen overflow-y w-full py-12 px-6 flex flex-col justify-center bg-white dark:bg-servian-black">
          {options.map((item, index) => (
            <React.Fragment key={index.toString() + 'desktop-0'}>
              {item.type === undefined && (
                <NavOptionButton
                  key={index.toString() + '-mobile-1'}
                  text={item.text}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              )}
              {item.type === 'EMPHASIS' && (
                <NavEmphasisedOptionButton
                  key={index.toString() + '-mobile-2'}
                  text={item.text}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              )}
              {(options?.length || 0) === index + 1 ? (
                <></>
              ) : (
                <Separator
                  key={index.toString() + '-mobile-3-sep'}
                  padding={8}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </>
  )
}

export default Navbar
