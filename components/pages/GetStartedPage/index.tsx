import React from 'react'
import Layout from '../../Layout'
import UnAuthenticatedNavbar from '../../UnAuthenticatedNavbar'
import Separator from '../../Separator'
import Navigation from './Content/Navigation'
import content from './Content'

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
                    {content.map((item, index) => (
                        <React.Fragment key={index}>
                            <item.component />
                            <Separator padding={40} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default GetStartedPage