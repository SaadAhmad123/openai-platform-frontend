import { motion } from 'framer-motion'
import Separator from '../../Separator'
import { HomePageActionButton } from '../../Buttons'
import { faUserPlus, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../../Layout'
import { useRouter } from 'next/router'
import useKeyboardControl from '../../../hooks/useKeyboardControl'

const IndexPage = () => {
  const router = useRouter()
  useKeyboardControl('Enter', () => router.push('/login'))
  useKeyboardControl('Equal', () => router.push('/signup'))
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="py-24">
          <div className="text-center">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Unleash the power of
              <span className="text-red-500"> your data</span> and
              <br className="hidden md:inline-block" />
              gain a competitive edge
              <br className="hidden md:inline-block" />
              with <span className="text-blue-500">ChatGPT!</span>
            </motion.h1>
          </div>
          <Separator padding={20} />
          <div className="text-center">
            <motion.p
              className="text-lg font-medium leading-relaxed"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Maximize your business potential with OpenAI{"'"}s ChatGPT: Your
              data, your competitive advantage.
            </motion.p>
          </div>
          <Separator padding={16} />
          <motion.div
            className="block sm:flex items-center justify-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <HomePageActionButton
              className={'w-full justify-center sm:w-auto min-w-[170px]'}
              text={'Sign Up'}
              icon={<FontAwesomeIcon icon={faUserPlus} size={'lg'} />}
              onClick={() => router.push('/signup')}
            />
            <div className="p-2" />
            <HomePageActionButton
              className={'w-full justify-center sm:w-auto min-w-[170px]'}
              text={'Log In'}
              icon={<FontAwesomeIcon icon={faLockOpen} size={'lg'} />}
              onClick={() => router.push('/login')}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
