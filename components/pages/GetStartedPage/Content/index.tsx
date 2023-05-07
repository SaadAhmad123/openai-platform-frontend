import ConfiguringStack from './ConfiguringStack'
import StackUsage from './StackUsage'
import TypicalWorkflow from './TypicalWorkflow'
import UploadingData from './UploadingData'
import WhatIsStack from './WhatIsStack'
import { GetStartedContent, IContentComponent } from './types'

const content: GetStartedContent[] = []

interface IRegisterGetStartedContent {
  labelIndex: string
  label: string
  link: string
  Component: React.FC<IContentComponent>
}

export const registerGetStartedContent = ({
  label,
  labelIndex,
  link,
  Component,
}: IRegisterGetStartedContent) => {
  content.push({
    labelIndex: labelIndex,
    label: label,
    link: `#${link}`,
    component: function () {
      return <Component link={link} />
    },
  })
}

registerGetStartedContent({
  label: 'Typical Workflow',
  labelIndex: '1',
  Component: TypicalWorkflow,
  link: 'typical-workflow',
})

registerGetStartedContent({
  label: 'What is Stack?',
  labelIndex: '2',
  Component: WhatIsStack,
  link: 'what-is-stack',
})

registerGetStartedContent({
  label: 'Uploading Data',
  labelIndex: '3',
  Component: UploadingData,
  link: 'uploading-data',
})

registerGetStartedContent({
  label: 'Configuring Your Stack',
  labelIndex: '4',
  Component: ConfiguringStack,
  link: 'configuring-stack',
})

registerGetStartedContent({
  label: 'Stack Testing and Usage',
  labelIndex: '5',
  Component: StackUsage,
  link: 'stack-usage',
})

export default content
