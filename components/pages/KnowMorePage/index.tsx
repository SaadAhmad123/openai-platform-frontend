import React from 'react'
import Layout from '../../Layout'
import UnAuthenticatedNavbar from '../../UnAuthenticatedNavbar'
import Separator from '../../Separator'
import InfoTile from '../../InfoTile'
import ThemedImage from '../../ThemedImage'
import { useRouter } from 'next/router'

const KnowMorePage = () => {
  const router = useRouter()
  return (
    <Layout navbar={<UnAuthenticatedNavbar />}>
      <Separator padding={40} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:mt-[48px]">
        <div className="w-full h-[180px] lg:h-[400px] relative shadow bg-dark-byzantium z-500 lg:col-span-2">
          <ThemedImage
            src={
              require('../../../assets/default-developer-pic-dall-e.png')
                .default.src
            }
            alt="image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="z-100 lg:col-span-3 h-full flex items-center">
          <div>
            <InfoTile>
              <p className="text-lg italic font-medium leading-relaxed">
                {'"'}Dev in Flow (Male){'"'}
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
            <Separator padding={12} />
            <h1 className="text-4xl md:text-5xl font-medium">
              More about MakeGPT
            </h1>
            <Separator padding={8} />
            <p className="text-normal md:text-2xl font-thin lg:w-[70%]">
              I christened the platform {'"'}MakeGPT{'"'} as it was born from my
              endeavor to{' '}
              <strong className="italic">
                <span className="underline">Make</span> something innovative
                using Chat<span className="underline">GPT</span>
              </strong>
              . In my eyes, this name possesses a whimsical charm, making it
              both amusing and purposeful.
            </p>
          </div>
        </div>
      </div>
      <Separator padding={24} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: 'Developer Perview',
            description:
              'Explore the developer preview of MakeGPT, gain insights into its features and capabilities, and delve into the roadmap for future developments and enhancements.',
            onClick: () => router.push('/developer-preview'),
          },
          {
            title: 'My Vision',
            description:
              'Learn more about my vision for MakeGPT as a comprehensive platform and a versatile product, designed to transform the way we communicate and interact with technology.',
            onClick: () => router.push('/my-vision'),
          },
          {
            title: 'Getting Started',
            description:
              'Discover how to begin your journey with MakeGPT, and learn the essentials for constructing applications and seamless integrations.',
            onClick: () => router.push('/get-started'),
          },
          {
            title: 'Try MakeGPT Assistant',
            description:
              "The MakeGPT Assistant, built using the power of MakeGPT, is designed to help you access relevant information and provide tailored assistance. To explore the capabilities of the MakeGPT Assistant, simply open it.",
            onClick: () => window?.open?.("https://mgpt-client.saad-ahmad.com/?socket=wss://u3qjcorbuf.execute-api.ap-southeast-2.amazonaws.com/prod&name=MakeGPT&prompt_type=default", "_blank"),
          },
          {
            title: 'Terms and Conditions',
            description:
              "Please take a moment to review MakeGPT's Terms and Conditions by clicking here. It is important to understand the guidelines and requirements for using this service.",
            onClick: () => router.push('/terms-and-conditions'),
          },

        ].map((item, index) => (
          <InfoTile key={index} onClick={item.onClick}>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <Separator />
            <p>{item.description}</p>
            <Separator />
          </InfoTile>
        ))}
      </div>
    </Layout>
  )
}

export default KnowMorePage
