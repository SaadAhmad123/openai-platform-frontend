import React from 'react'
import { IContentComponent } from './types'
import { MainHeading, UL } from './common'
import { Text } from './common'
import Separator from '../../../Separator'

function WhatIsStack({ link }: IContentComponent) {
  return (
    <>
      <div id={link} />
      <Separator padding={40} />
      <section>
        <MainHeading>What is Stack?</MainHeading>
        <Separator padding={8} />
        <Text>
          A stack in MakeGPT refers to a unique integration architecture created
          in the cloud for each specific use case. MakeGPT{"'"}s primary goal is
          to provide a secure and scalable platform where users maintain
          complete control and ownership of their data. To achieve this, MakeGPT
          employs a serverless system, enabling cost-effective and highly
          scalable integrations.
        </Text>
        <Separator />
        <Text>
          The integration process with ChatGPT involves several moving
          components that must work together seamlessly. When you create a
          stack, MakeGPT provisions a new instance of the integration
          architecture in the cloud, complete with serverless functions,
          databases, and API gateways. This architecture includes not only the
          infrastructure but also the underlying data model and code.
        </Text>
        <Separator />
        <Text>
          A stack type or version can be thought of as a blueprint containing
          the infrastructure and code for each function within it. When you
          create a stack, a provisioning system utilizes the chosen stack
          version{"'"}s blueprint to create a new instance of the integration.
        </Text>
        <Separator />
        <Text>
          Each stack in MakeGPT is designed with specific trade-offs in mind,
          balancing factors such as cost, security, connectivity, and data
          handling capacity. Consequently, different stack versions are
          available to accommodate a variety of tasks and requirements.
        </Text>
        <Separator />
        <Text>
          In summary, a stack in MakeGPT represents a tailored integration
          architecture providing a secure, scalable, and cost-effective solution
          for connecting your data with ChatGPT.
        </Text>
      </section>
    </>
  )
}

export default WhatIsStack
