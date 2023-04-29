import { motion } from 'framer-motion'
import Separator from '../../Separator'
import { HomePageActionButton } from '../../Buttons'
import { faUserPlus, faLockOpen, faVideo, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../../Layout'
import { useRouter } from 'next/router'
import useKeyboardControl from '../../../hooks/useKeyboardControl'
import useSegment from '../../../hooks/useSegment'
import onMount from '../../../hooks/onMount'
import ThemedImage from '../../ThemedImage'
import UnAuthenticatedNavbar from '../../UnAuthenticatedNavbar'
import InfoTile from '../../InfoTile'
import YoutubeVideoModal from '../../YoutubeVideoModal'
import { useState } from 'react'

const IndexPage = () => {
  const router = useRouter()
  const segment = useSegment()
  const [introVideoOpen, setIntroVideoOpen] = useState(false)
  onMount(() => {
    segment()?.identify()
  })
  useKeyboardControl('Enter', () => router.push('/login'))
  useKeyboardControl('Equal', () => router.push('/signup'))
  return (
    <Layout navbar={<UnAuthenticatedNavbar />}>
      <div className="flex justify-center items-center md:py-[48px] lg:py-[96px]">
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
            <div className="p-1 md:p-2" />
            <HomePageActionButton
              className={'w-full justify-center sm:w-auto min-w-[170px]'}
              text={'Play Intro'}
              icon={<FontAwesomeIcon icon={faPlayCircle} size={'lg'} />}
              onClick={() => setIntroVideoOpen(!introVideoOpen)}
            />
            <div className="p-1 md:p-2" />
            <HomePageActionButton
              className={'w-full justify-center sm:w-auto min-w-[170px]'}
              text={'Log In'}
              icon={<FontAwesomeIcon icon={faLockOpen} size={'lg'} />}
              onClick={() => router.push('/login')}
            />
          </motion.div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className={
              'w-full h-[180px] lg:h-[500px] relative shadow bg-dark-byzantium z-500 lg:col-span-2'
            }
          >
            <ThemedImage
              src={
                require('../../../assets/ordering-automaton-dall-e.png').default
                  .src
              }
              alt="image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="z-100 lg:col-span-3 h-full"
          >
            <InfoTile>
              <p className="text-lg italic font-medium leading-relaxed">
                {'"'}The Usurping Automaton{'"'}
              </p>
              <p className="text-sm">
                -{' '}
                <a
                  href="https://www.saad-ahmad.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  Saad
                </a>{' '}
                prompted it via Dall-E
              </p>
            </InfoTile>
            <div className="py-8 lg:px-8 text-lg md:text-2xl lg:text-3xl xl:text-4xl flex items-center font-thin">
              <p>
                <strong>MakeGPT</strong> is a game-changing, low-code{' '}
                <strong>SaaS platform</strong> that enables users with&nbsp;
                <strong>fundamental</strong> Python <strong>skills</strong> to
                swiftly and securely merge data with&nbsp;
                <strong>ChatGPT</strong>.
                <br />
                <br />
                <strong>Unlock the potential of AI</strong>-driven chatbots,
                personalized content, and knowledge base assistants with
                MakeGPT{"'"}s rapid setup, data ownership, and scalability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Separator padding={36} />
      <div>
        <h1 className="text-4xl font-bold">What MakeGPT allows you to do?</h1>
        <Separator padding={16} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
          {[
            "Seamless integration with ChatGPT and related services",
            "Data ownership and control",
            "Customizable monitoring for chat experiences",
            "Rapid setup and experimentation",
            "Scalable infrastructure built on AWS serverless architecture",
            "Versatile applications for internal knowledge base assistants, domain-specific chatbots, and AI-driven personalized content",
            "Integration with tools like Twilio Chat and Confluence",
          ].map((index, item) => (<InfoTile key={index}>
            <p>{item}</p>
          </InfoTile>))}
        </div>
      </div>
      <Separator padding={36} />
      <div>
        <h1 className="text-4xl font-bold">What MakeGPT is NOT?</h1>
        <Separator padding={16} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" >
          {[
            "Public search and recommendation systems(use ChatGPT plugins instead)",
            "Expert systems(as it is an LLM, not an expert system)",
            "MLOps pipeline or systems",
            "Web scraping systems",
            "Training or database system"
          ].map((index, item) => (<InfoTile key={index}>
            <p>{item}</p>
          </InfoTile>))}
        </div>
      </div>
      <Separator padding={36} />
      <YoutubeVideoModal
        videoUrl={'https://youtu.be/djpednhL5ec'}
        isOpen={introVideoOpen}
        onClose={() => setIntroVideoOpen(!introVideoOpen)}
      />
    </Layout>
  )
}

export default IndexPage
