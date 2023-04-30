import React from 'react'
import { GetStartedContent } from './types'
import Separator from '../../../Separator'


type NavigationContentItem = Omit<GetStartedContent, "component">

interface INavigation {
    contentList: Array<NavigationContentItem>
    onClickLink: (content: NavigationContentItem) => void
}

const Navigation = ({ contentList, onClickLink }: INavigation) => {
    return <>
        <div>
            <div className="sticky top-0 left-0 bg-gray-100 dark:bg-servian-black-dark overflow-y-scroll p-4">
                <h3 className="text-lg font-bold">Table of contents</h3>
                <Separator padding={4} />
                {
                    contentList.map((item, index) => (
                        <div key={index}>
                            <a href={item.link}>{item.labelIndex}. {item.label}</a>
                            <Separator padding={1} />
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default Navigation