import React from 'react'
import { IContentComponent } from './types'
import { MainHeading } from './common'
import { Text } from './common'
import Separator from '../../../Separator'

function ConfiguringStack({ link }: IContentComponent) {
  return (
    <>
      <div id={link} />
      <Separator padding={40} />
      <section>
        <MainHeading>Configuring your stack</MainHeading>
        <Separator padding={8} />
        <Text>
          A stack is a software solution that enables you to integrate your data
          with OpenAI LLMs (e.g., ChatGPT) for enhanced functionality. To
          achieve this, you need to connect their services with your chosen
          stack. In every stack, it{"'"}s necessary to establish a connection with
          an OpenAI LLM, either through OpenAI or Azure services. Different
          stacks offer various options for LLM configuration, which will be
          detailed in stack-specific documentation.
        </Text>
        <Separator />
        <Text>
          For stacks capable of handling more than 10,000 records, especially
          those requiring connection to a vector database, the setup process is
          quite simple. All you need to do is provide the connection endpoint
          and API keys, and you{"'"}ll be well on your way to leveraging the full
          potential of your stack.
        </Text>
      </section>
    </>
  )
}

export default ConfiguringStack
