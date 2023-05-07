import React from 'react'
import Layout from '../../Layout'
import UnAuthenticatedNavbar from '../../UnAuthenticatedNavbar'
import Separator from '../../Separator'
import Navigation from './Content/Navigation'
import content from './Content'
import YouTubePlayer from 'react-youtube'

const GetStartedPage = () => {
  return (
    <Layout navbar={<UnAuthenticatedNavbar />}>
      <Separator padding={40} />
      <h1 className="text-4xl md:text-5xl font-medium md:mt-[48px]">
        Get Started
      </h1>
      <Separator padding={8} />
      <p className="text-normal md:text-2xl font-thin">
        Following are the get started notes for MakeGPT
      </p>
      <Separator padding={16} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Navigation contentList={content} onClickLink={(item) => { }} />
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className='mx-[-16px] w-screen sm:mx-[-32px] sm:w-screen  md:mx-0 md:w-[100%]'>
            <YouTubePlayer videoId='ajArdno6Nx8' opts={{ width: "100%" }} />
          </div>
          <Separator padding={36} />
          {content.map((item, index) => (
            <React.Fragment key={index}>
              <item.component />
              <Separator padding={16} />
              <div className="h-[2px] w-[64px] bg-servian-black dark:bg-servian-white" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default GetStartedPage
